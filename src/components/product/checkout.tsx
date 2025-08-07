'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth-context';
import { useCurrency } from '@/lib/currency-context';
import { useLanguage } from '@/lib/language-context';
import {
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Plane,
  Truck,
  User,
} from 'lucide-react';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AsyncSelect from 'react-select/async';

interface CheckoutItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  photo: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
  totalPrice: number;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface DeliveryOption {
  key: ShippingKey;
  name: string;
  description: string;
  price: number; // price in option.currency
  currency: 'KZT' | 'USD';
  timeframe: string;
  countries: string[]; // '*' = all
  icon: JSX.Element;
}

type ShippingKey =
  | 'cdek'
  | 'kazpost'
  | 'ems_kazpost'
  | 'rika'
  | 'express_avia'
  | 'self-delivery';

/* ------------------------------------------------------------------ */
/*  Delivery configuration                                            */
/* ------------------------------------------------------------------ */
const USD_TO_KZT = 450; // ≈ rate, or fetch dynamically

const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    key: 'cdek',
    name: 'CDEK',
    description:
      'СНГ, Азербайджан, Армения, Беларусь, Казахстан, Кыргызстан, Молдова, Россия, Таджикистан, Узбекистан, Украина',
    price: 20,
    currency: 'USD',
    timeframe: '5-10 дней',
    countries: [
      'Russia',
      'Belarus',
      'Uzbekistan',
      'Kyrgyzstan',
      'Kazakhstan',
      'Armenia',
      'Moldova',
      'Tajikistan',
      'Ukraine',
    ],
    icon: <Truck className="h-5 w-5" />,
  },
  {
    key: 'kazpost',
    name: 'Kazpost',
    description: 'По Казахстану',
    price: 2200,
    currency: 'KZT',
    timeframe: '7-10 дней',
    countries: ['Kazakhstan'],
    icon: <Package className="h-5 w-5" />,
  },
  {
    key: 'ems_kazpost',
    name: 'EMS Kazpost',
    description: 'Международно',
    price: 39,
    currency: 'USD',
    timeframe: '6-16 дней',
    countries: ['*'],
    icon: <Plane className="h-5 w-5" />,
  },
  {
    key: 'rika',
    name: 'Rika до двери',
    description: 'По Казахстану',
    price: 4000,
    currency: 'KZT',
    timeframe: '2-3 раб. дня',
    countries: ['Kazakhstan'],
    icon: <Truck className="h-5 w-5" />,
  },
  {
    key: 'express_avia',
    name: 'Express Avia (Air Astana)',
    description: 'Пункт выдачи в аэропорту (срочно)',
    price: 10000,
    currency: 'KZT',
    timeframe: '1-2 дня',
    countries: ['Kazakhstan'],
    icon: <Plane className="h-5 w-5" />,
  },
  {
    key: 'self-delivery',
    name: 'Самовывоз',
    description: 'Из нашего магазина',
    price: 0,
    currency: 'KZT',
    timeframe: 'По готовности',
    countries: ['Kazakhstan'],
    icon: <MapPin className="h-5 w-5" />,
  },
];

export function CheckoutModal({
  isOpen,
  onClose,
  items,
  totalPrice,
}: CheckoutModalProps) {
  const { formatPrice } = useCurrency();
  const { t } = useLanguage(); // still available if you need i18n
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'cash' | 'bank_transfer'
  >('card');
  const [selectedDelivery, setSelectedDelivery] = useState<ShippingKey | ''>(
    ''
  );
  const [notes, setNotes] = useState('');

  /* ------------------------------------------------------------------
   *  Countries / cities (lazy-load & cache)
   * ----------------------------------------------------------------- */
  type Option = { value: string; label: string };

  const countryCache = useRef<Record<string, Option[]>>({});
  const cityCache = useRef<Record<string, Option[]>>({});

  const loadCountryOptions = useCallback(
    async (inputValue: string): Promise<Option[]> => {
      const q = inputValue.trim();

      // don’t query until the user types ≥ 1 char
      if (q.length === 0) return [];

      // cached?
      if (countryCache.current[q]) return countryCache.current[q];

      try {
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(q)}?fields=name`;
        const res = await fetch(url);

        if (!res.ok) return [];

        const data = await res.json(); // [{ name: { common } }]
        const opts: Option[] = data
          .map((c: { name: { common: string } }) => ({
            value: c.name.common,
            label: c.name.common,
          }))
          // dedupe & alpha-sort
          .filter(
            (v: Option, i: number, arr: Option[]) =>
              arr.findIndex((o) => o.value === v.value) === i
          )
          .sort((a: Option, b: Option) => a.label.localeCompare(b.label));

        countryCache.current[q] = opts;
        return opts;
      } catch (err) {
        console.error('Country search failed', err);
        countryCache.current[q] = [];
        return [];
      }
    },
    []
  );

  const loadCityOptions = useCallback(
    async (inputValue: string): Promise<Option[]> => {
      const country = shippingAddress.country; // current country
      const q = inputValue.trim();

      if (!country || q.length < 2) return []; // wait until 2 chars typed

      const key = `${country}|${q.toLowerCase()}`;
      if (cityCache.current[key]) return cityCache.current[key];

      try {
        const url =
          `https://geocoding-api.open-meteo.com/v1/search` +
          `?name=${encodeURIComponent(q)}&count=25&language=en`;

        const res = await fetch(url);
        if (!res.ok) return [];

        const { results = [] } = await res.json();

        const opts: Option[] = results
          .filter((r: { country: string }) => r.country === country) // keep only chosen country
          .map((r: { name: string }) => ({ value: r.name, label: r.name }))
          // dedupe and alpha-sort
          .filter(
            (v: Option, i: number, arr: Option[]) =>
              arr.findIndex((o) => o.value === v.value) === i
          )
          .sort((a: Option, b: Option) => a.label.localeCompare(b.label))
          .slice(0, 50); // keep dropdown light

        cityCache.current[key] = opts;
        return opts;
      } catch (err) {
        console.error('City search failed', err);
        cityCache.current[key] = [];
        return [];
      }
    },
    [shippingAddress.country]
  );

  /* ------------------------------------------------------------------
   *  Delivery helpers
   * ----------------------------------------------------------------- */
  const availableDeliveryOptions = (): DeliveryOption[] => {
    return DELIVERY_OPTIONS.filter((opt) =>
      opt.countries.includes('*')
        ? true
        : opt.countries.includes(shippingAddress.country)
    );
  };

  const isFreeDeliveryEligible = (): boolean => {
    if (shippingAddress.country === 'Kazakhstan') {
      return totalPrice >= 200000;
    }
    return totalPrice / USD_TO_KZT >= 600;
  };

  const getDeliveryPrice = (opt: DeliveryOption): number =>
    isFreeDeliveryEligible() ? 0 : opt.price;

  // Find selected option
  const selectedDeliveryOption = DELIVERY_OPTIONS.find(
    (o) => o.key === selectedDelivery
  );

  // Convert chosen delivery price into KZT for totals
  const deliveryPriceInKZT =
    selectedDeliveryOption === undefined
      ? 0
      : selectedDeliveryOption.currency === 'USD'
        ? getDeliveryPrice(selectedDeliveryOption) * USD_TO_KZT
        : getDeliveryPrice(selectedDeliveryOption);

  const finalTotal = totalPrice + deliveryPriceInKZT;

  /* ------------------------------------------------------------------
   *  Form & validation helpers
   * ----------------------------------------------------------------- */
  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    if (field === 'country') {
      setSelectedDelivery(''); // country change resets delivery choice
    }
  };

  const validateStep1 = (): boolean => {
    const required: (keyof ShippingAddress)[] = [
      'fullName',
      'address',
      'city',
      'postalCode',
      'phone',
    ];
    const addressComplete = required.every(
      (f) => shippingAddress[f].trim() !== ''
    );
    return addressComplete && selectedDelivery !== '';
  };

  /* ------------------------------------------------------------------
   *  Submit order
   * ----------------------------------------------------------------- */
  const handleSubmitOrder = async () => {
    if (!validateStep1()) {
      toast.error(
        'Пожалуйста, заполните все обязательные поля и выберите способ доставки'
      );
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        orderItems: items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
        shippingAddress,
        paymentMethod,
        deliveryType: selectedDelivery,
        deliveryPrice: deliveryPriceInKZT,
        notes: notes.trim() || undefined,
        totalAmount: finalTotal,
      };

      const response = await fetch(
        'https://inoya-back-production.up.railway.app/api/orders',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              `Bearer ${localStorage.getItem('accessToken')}` || '',
          },
          body: JSON.stringify(orderData),
        }
      );

      const resData = await response.json();

      if (response.ok && resData.success) {
        toast.success('Заказ успешно создан!');
        toast.success(`Номер заказа: ${resData.data.orderNumber}`, {
          duration: 5000,
        });
        onClose();
      } else {
        throw new Error(resData.message || 'Ошибка при создании заказа');
      }
    } catch (err) {
      console.error('Order error:', err);
      toast.error(
        err instanceof Error
          ? err.message
          : 'Произошла ошибка при создании заказа'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------------------------------------------------------
   *  Prefill user + geo-ip
   * ----------------------------------------------------------------- */
  useEffect(() => {
    if (user) {
      setShippingAddress((prev) => ({
        ...prev,
        fullName: user.name || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    const detect = async () => {
      try {
        const res = await fetch(
          'https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en'
        );
        const d = await res.json();
        if (d.countryName) {
          setShippingAddress((prev) => ({ ...prev, country: d.countryName }));
        }
        if (d.city) {
          setShippingAddress((prev) => ({ ...prev, city: d.city }));
        }
      } catch (e) {
        console.warn('Detect location failed', e);
      }
    };
    detect();
  }, []);

  /* ------------------------------------------------------------------
   *  Render
   * ----------------------------------------------------------------- */
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Оформление заказа
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
          {/* -------------------------------------------------- */}
          {/* MAIN COLUMN (steps)                               */}
          {/* -------------------------------------------------- */}
          <div className="space-y-6 lg:col-span-2">
            {/* progress */}
            <div className="mb-6 flex w-full items-center space-x-4">
              {([1, 2] as const).map((s) => (
                <>
                  <div
                    key={s}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      currentStep >= s ? 'bg-black text-white' : 'bg-gray-200'
                    }`}
                  >
                    {s}
                  </div>
                  {s === 1 && <div className="h-px flex-1 bg-gray-200" />}
                </>
              ))}
            </div>

            {/* --------------------------------------------------
                STEP 1 — Address + Delivery
               -------------------------------------------------- */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* address */}
                <div className="space-y-4">
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Адрес доставки</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* full name */}
                    <div className="sm:col-span-2">
                      <Label htmlFor="fullName">Полное имя *</Label>
                      <div className="relative mt-2">
                        <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="fullName"
                          value={shippingAddress.fullName}
                          onChange={(e) =>
                            handleInputChange('fullName', e.target.value)
                          }
                          placeholder="Иван Иванов"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* address */}
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Адрес *</Label>
                      <Input
                        id="address"
                        value={shippingAddress.address}
                        onChange={(e) =>
                          handleInputChange('address', e.target.value)
                        }
                        placeholder="ул. Абая, 123, кв. 45"
                        required
                        className="mt-2"
                      />
                    </div>

                    {/* country */}
                    <div>
                      <Label htmlFor="country">Страна *</Label>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={loadCountryOptions}
                        value={
                          shippingAddress.country
                            ? {
                                value: shippingAddress.country,
                                label: shippingAddress.country,
                              }
                            : null
                        }
                        onChange={(opt) => {
                          handleInputChange('country', opt?.value || '');
                          handleInputChange('city', '');
                        }}
                        placeholder="Начните вводить..."
                        classNamePrefix="rs"
                        inputId="country"
                      />
                    </div>

                    {/* city */}
                    <div>
                      <Label htmlFor="city">Город *</Label>
                      <AsyncSelect
                        key={shippingAddress.country}
                        isDisabled={!shippingAddress.country}
                        cacheOptions
                        loadOptions={loadCityOptions}
                        value={
                          shippingAddress.city
                            ? {
                                value: shippingAddress.city,
                                label: shippingAddress.city,
                              }
                            : null
                        }
                        onChange={(opt) =>
                          handleInputChange('city', opt?.value || '')
                        }
                        placeholder={
                          shippingAddress.country
                            ? 'Начните вводить...'
                            : 'Сначала выберите страну'
                        }
                        classNamePrefix="rs"
                        inputId="city"
                      />
                    </div>

                    {/* postal */}
                    <div>
                      <Label htmlFor="postalCode">Почтовый индекс *</Label>
                      <Input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) =>
                          handleInputChange('postalCode', e.target.value)
                        }
                        placeholder="050000"
                        required
                        className="mt-2"
                      />
                    </div>

                    {/* phone */}
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="phone"
                          value={shippingAddress.phone}
                          onChange={(e) =>
                            handleInputChange('phone', e.target.value)
                          }
                          placeholder="+7 777 123 4567"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* delivery */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Способ доставки *</h3>
                  </div>

                  {isFreeDeliveryEligible() && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <p className="text-sm font-medium text-green-800">
                          🎉 Поздравляем! Вы получили бесплатную доставку
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-green-600">
                        {shippingAddress.country === 'Kazakhstan'
                          ? 'Для заказов от 200 000 ₸'
                          : 'Для заказов от $600'}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {availableDeliveryOptions().map((opt) => {
                      const price = getDeliveryPrice(opt);
                      const isSel = selectedDelivery === opt.key;
                      const priceLabel =
                        price === 0
                          ? 'Бесплатно'
                          : opt.currency === 'KZT'
                            ? formatPrice(price)
                            : `$${price}`;

                      return (
                        <div
                          key={opt.key}
                          role="button"
                          className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                            isSel
                              ? 'border-black bg-gray-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedDelivery(opt.key)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">{opt.icon}</div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{opt.name}</p>
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {opt.timeframe}
                                  </Badge>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                  {opt.description}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold">{priceLabel}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {availableDeliveryOptions().length === 0 && (
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                      <p className="text-sm text-yellow-800">
                        Для выбранной страны доставка временно недоступна.
                        Попробуйте другую страну или свяжитесь с нами.
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-black text-white hover:bg-gray-800"
                  disabled={!validateStep1()}
                  onClick={() => setCurrentStep(2)}
                >
                  Продолжить к оплате
                </Button>
              </div>
            )}

            {/* --------------------------------------------------
                STEP 2 — Payment
               -------------------------------------------------- */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Способ оплаты</h3>
                </div>

                {(
                  [
                    {
                      key: 'card',
                      title: 'Банковская карта',
                      subtitle: 'Visa, MasterCard, МИР',
                    },
                    {
                      key: 'cash',
                      title: 'Наличными при получении',
                      subtitle: 'Оплата курьеру',
                    },
                    {
                      key: 'bank_transfer',
                      title: 'Банковский перевод',
                      subtitle: 'Переводом на счёт',
                    },
                  ] as const
                ).map(({ key, title, subtitle }) => (
                  <div
                    key={key}
                    role="button"
                    className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                      paymentMethod === key
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod(key)}
                  >
                    <div className="flex items-center gap-3">
                      {key === 'card' && <CreditCard className="h-5 w-5" />}
                      {key === 'cash' && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                          <span className="text-xs text-white">₸</span>
                        </div>
                      )}
                      {key === 'bank_transfer' && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                          <span className="text-xs text-white">B</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-gray-600">{subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* notes */}
                <div>
                  <Label htmlFor="notes">Комментарий к заказу</Label>
                  <div className="relative">
                    <MessageSquare className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Дополнительные пожелания..."
                      className="min-h-[80px] pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setCurrentStep(1)}
                  >
                    Назад
                  </Button>
                  <Button
                    disabled={isLoading}
                    onClick={handleSubmitOrder}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{' '}
                        Оформление...
                      </>
                    ) : (
                      'Оформить заказ'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* -------------------------------------------------- */}
          {/* SUMMARY COLUMN                                     */}
          {/* -------------------------------------------------- */}
          <div className="h-fit rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-lg font-semibold">Ваш заказ</h3>

            {/* items */}
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <img
                    src={item.photo || '/placeholder.svg'}
                    alt={item.name}
                    className="h-20 w-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-gray-600">
                      {item.color} • {item.size} • Кол-во: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* totals */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Товары:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              {selectedDeliveryOption && (
                <div className="flex justify-between">
                  <span>Доставка ({selectedDeliveryOption.name}):</span>
                  <span>
                    {deliveryPriceInKZT === 0
                      ? 'Бесплатно'
                      : formatPrice(deliveryPriceInKZT)}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Итого:</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* extra delivery box */}
            {selectedDeliveryOption && (
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="flex items-center gap-2">
                  {selectedDeliveryOption.icon}
                  <p className="font-medium text-blue-800">
                    {selectedDeliveryOption.name}
                  </p>
                </div>
                <p className="mt-1 text-xs text-blue-600">
                  {selectedDeliveryOption.description}
                </p>
                <p className="text-xs text-blue-600">
                  Срок доставки: {selectedDeliveryOption.timeframe}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
