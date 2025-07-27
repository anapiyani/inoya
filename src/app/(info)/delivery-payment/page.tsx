'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';
import { Clock, CreditCard, Globe, Package, Shield, Truck } from 'lucide-react';

export default function DeliveryPaymentPage() {
  const { t } = useLanguage();

  const deliveryMethods = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Стандартная доставка',
      time: '5-7 рабочих дней',
      price: '2000 тг',
      description: 'Доставка курьерской службой по Казахстану',
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: 'Экспресс доставка',
      time: '2-3 рабочих дня',
      price: '4000 тг',
      description: 'Быстрая доставка в крупные города',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Международная доставка',
      time: '10-14 рабочих дней',
      price: 'Рассчитывается индивидуально',
      description: 'Доставка в страны СНГ и дальнее зарубежье',
    },
  ];

  const paymentMethods = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Банковские карты',
      description: 'Visa, MasterCard, American Express, UnionPay, Discover',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Электронные кошельки',
      description: 'PayPal, Google Pay, Apple Pay',
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: 'Банковский перевод',
      description:
        'Для клиентов из России: Сбербанк, Альфа-Банк, ВТБ, Тинькофф',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {t('delivery_and_payment')}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Мы предлагаем удобные способы доставки и оплаты для вашего
              комфорта
            </p>
          </div>

          {/* Delivery Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">Доставка</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {deliveryMethods.map((method, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-6 text-center"
                >
                  <div className="mb-4 flex justify-center text-gray-600">
                    {method.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{method.title}</h3>
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {method.time}
                      </span>
                    </div>
                    <p className="text-lg font-semibold">{method.price}</p>
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>

            {/* Free Shipping Notice */}
            <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-green-800">
                Бесплатная доставка
              </h3>
              <p className="text-green-700">
                При заказе от 50 000 тг доставка по Казахстану бесплатная!
              </p>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Способы оплаты
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-6 text-center"
                >
                  <div className="mb-4 flex justify-center text-gray-600">
                    {method.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">{method.title}</h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Delivery Info */}
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-6 text-2xl font-bold">Информация о доставке</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>
                    Все заказы обрабатываются в течение 3-4 рабочих дней
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>Вы получите трек-номер для отслеживания заказа</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>Доставка осуществляется с понедельника по пятницу</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>
                    При отсутствии дома курьер свяжется с вами для согласования
                    времени
                  </span>
                </li>
              </ul>
            </div>

            {/* Payment Info */}
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-6 text-2xl font-bold">Информация об оплате</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>Все платежи защищены SSL-шифрованием</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>Оплата производится в момент оформления заказа</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>
                    В некоторых случаях может потребоваться предоплата доставки
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black"></div>
                  <span>
                    Для банковского перевода свяжитесь с нами для получения
                    реквизитов
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact for Questions */}
          <div className="mt-16 rounded-lg bg-black p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-semibold">Остались вопросы?</h3>
            <p className="mb-6">
              Свяжитесь с нами для получения дополнительной информации
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                WhatsApp
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                Telegram
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
