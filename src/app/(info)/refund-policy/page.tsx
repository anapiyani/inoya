'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';
import { AlertCircle, Clock, RotateCcw, Shield } from 'lucide-react';

export default function RefundPolicyPage() {
  const { t } = useLanguage();

  const refundSteps = [
    {
      step: '1',
      title: 'Свяжитесь с нами',
      description: 'Напишите нам в течение 14 дней с момента получения товара',
    },
    {
      step: '2',
      title: 'Опишите причину возврата',
      description: 'Укажите причину возврата и приложите фото товара',
    },
    {
      step: '3',
      title: 'Получите инструкции',
      description: 'Мы вышлем вам инструкции по возврату товара',
    },
    {
      step: '4',
      title: 'Отправьте товар',
      description: 'Упакуйте товар и отправьте по указанному адресу',
    },
    {
      step: '5',
      title: 'Получите возврат',
      description: 'После проверки товара мы вернем деньги в течение 7-10 дней',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">{t('refund_policy')}</h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Мы заботимся о ваших покупках и предлагаем справедливую политику
              возврата
            </p>
          </div>

          {/* Key Points */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Clock className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">14 дней</h3>
              <p className="text-gray-600">
                на возврат товара с момента получения
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <RotateCcw className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Полный возврат</h3>
              <p className="text-gray-600">средств при соблюдении условий</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Shield className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Гарантия качества</h3>
              <p className="text-gray-600">90 дней гарантии на все изделия</p>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Процесс возврата
            </h2>
            <div className="space-y-6">
              {refundSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* What can be returned */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-8">
              <h3 className="mb-6 text-2xl font-bold text-green-800">
                Что можно вернуть
              </h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>Товар в оригинальной упаковке</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>Изделия без следов носки</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>Товар с сохраненными бирками</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>Возврат в течение 14 дней</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>Товар не подошел по размеру</span>
                </li>
              </ul>
            </div>

            {/* What cannot be returned */}
            <div className="rounded-lg border border-red-200 bg-red-50 p-8">
              <h3 className="mb-6 text-2xl font-bold text-red-800">
                Что нельзя вернуть
              </h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>Товары индивидуального пошива</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>Изделия со следами носки</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>Товар без оригинальной упаковки</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>Лимитированные коллекции (указано в описании)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>Возврат после 14 дней</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mb-16 rounded-lg border border-yellow-200 bg-yellow-50 p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-600" />
              <div>
                <h3 className="mb-4 text-xl font-semibold text-yellow-800">
                  Важная информация
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>
                    • Стоимость обратной доставки оплачивается покупателем
                  </li>
                  <li>
                    • Возврат средств осуществляется тем же способом, которым
                    была произведена оплата
                  </li>
                  <li>
                    • Срок возврата средств: 7-10 рабочих дней после получения
                    товара
                  </li>
                  <li>
                    • При возврате товара ненадлежащего качества стоимость
                    доставки компенсируется
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg bg-black p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-semibold">
              Нужна помощь с возвратом?
            </h3>
            <p className="mb-6">
              Свяжитесь с нашей службой поддержки для получения помощи
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                WhatsApp
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                Telegram
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                inoyahelp@gmail.com
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
