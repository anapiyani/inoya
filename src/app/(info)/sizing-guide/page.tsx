'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';

export default function SizingGuidePage() {
  const { t } = useLanguage();

  // Mock size chart data
  const cinchingCorsetSizes = [
    { size: 'XS', bust: '80-84', waist: '60-64', hips: '86-90' },
    { size: 'S', bust: '84-88', waist: '64-68', hips: '90-94' },
    { size: 'M', bust: '88-92', waist: '68-72', hips: '94-98' },
    { size: 'L', bust: '92-96', waist: '72-76', hips: '98-102' },
    { size: 'XL', bust: '96-100', waist: '76-80', hips: '102-106' },
    { size: 'XXL', bust: '100-104', waist: '80-84', hips: '106-110' },
  ];

  const lightCorsetSizes = [
    { size: 'XS', bust: '82-86', waist: '62-66', hips: '88-92' },
    { size: 'S', bust: '86-90', waist: '66-70', hips: '92-96' },
    { size: 'M', bust: '90-94', waist: '70-74', hips: '96-100' },
    { size: 'L', bust: '94-98', waist: '74-78', hips: '100-104' },
    { size: 'XL', bust: '98-102', waist: '78-82', hips: '104-108' },
    { size: 'XXL', bust: '102-106', waist: '82-86', hips: '108-112' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-bold">
              {t('sizing_guide_title')}
            </h1>
            <div className="mx-auto max-w-4xl space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">{t('sizing_intro')}</p>
              <p className="text-lg leading-relaxed">{t('sizing_charts')}</p>
              <p className="text-lg leading-relaxed">{t('sizing_custom')}</p>
              <p className="text-lg leading-relaxed">{t('sizing_beatrice')}</p>
            </div>
          </div>

          {/* Size Charts */}
          <div className="space-y-12">
            {/* Cinching Corsets */}
            <div>
              <h3 className="mb-4 text-center text-2xl font-bold">
                Утягивающие корсеты (7-10 см утяжки)
              </h3>
              <p className="mb-6 text-center text-gray-600">
                {t('cinching_corsets')}
              </p>

              <div className="overflow-x-auto">
                <table className="mx-auto w-full max-w-2xl border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Размер
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Грудь (см)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Талия (см)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Бедра (см)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cinchingCorsetSizes.map((size, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">
                          {size.size}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {size.bust}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {size.waist}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {size.hips}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Light Corsets */}
            <div>
              <h3 className="mb-4 text-center text-2xl font-bold">
                Корсеты с легкой утяжкой (3-5 см)
              </h3>
              <p className="mb-6 text-center text-gray-600">
                {t('light_corsets')}
              </p>

              <div className="overflow-x-auto">
                <table className="mx-auto w-full max-w-2xl border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Размер
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Грудь (см)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Талия (см)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Бедра (см)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lightCorsetSizes.map((size, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">
                          {size.size}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {size.bust}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {size.waist}
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {size.hips}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Measurement Guide */}
          <div className="mt-16 rounded-lg bg-gray-50 p-8">
            <h3 className="mb-6 text-center text-2xl font-bold">
              Как правильно снять мерки
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-4 text-xl font-semibold">
                  Инструкция по измерению:
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Грудь:</strong> Измеряйте по самой выступающей части
                    груди
                  </li>
                  <li>
                    <strong>Талия:</strong> Измеряйте в самом узком месте талии
                  </li>
                  <li>
                    <strong>Бедра:</strong> Измеряйте по самой широкой части
                    бедер
                  </li>
                  <li>
                    <strong>Важно:</strong> Измеряйте в нижнем белье, не
                    затягивая сантиметр
                  </li>
                </ul>
              </div>
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  src="/placeholder.svg?height=400&width=400&text=Measurement+Guide"
                  alt="Measurement Guide"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Contact for Help */}
          <div className="mt-16 rounded-lg bg-black p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-semibold">
              Нужна помощь с размером?
            </h3>
            <p className="mb-6">
              Наши специалисты помогут вам выбрать идеальный размер
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                WhatsApp
              </button>
              <button className="rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-100">
                Telegram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
