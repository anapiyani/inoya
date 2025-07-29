'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';
import { AlertCircle, Clock, RotateCcw, Shield } from 'lucide-react';

export default function RefundPolicyPage() {
  const { t } = useLanguage();

  const refundSteps = [
    {
      step: '1',
      title: t('refund_step_1_title'),
      description: t('refund_step_1_desc'),
    },
    {
      step: '2',
      title: t('refund_step_2_title'),
      description: t('refund_step_2_desc'),
    },
    {
      step: '3',
      title: t('refund_step_3_title'),
      description: t('refund_step_3_desc'),
    },
    {
      step: '4',
      title: t('refund_step_4_title'),
      description: t('refund_step_4_desc'),
    },
    {
      step: '5',
      title: t('refund_step_5_title'),
      description: t('refund_step_5_desc'),
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
              {t('refund_intro')}
            </p>
          </div>

          {/* Key Points */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Clock className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t('refund_14_days')}
              </h3>
              <p className="text-gray-600">{t('refund_14_days_desc')}</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <RotateCcw className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('refund_full')}</h3>
              <p className="text-gray-600">{t('refund_full_desc')}</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <Shield className="h-12 w-12 text-gray-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {t('refund_quality')}
              </h3>
              <p className="text-gray-600">{t('refund_quality_desc')}</p>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('refund_process')}
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
                {t('refund_what_can')}
              </h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>{t('refund_can_1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>{t('refund_can_2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>{t('refund_can_3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>{t('refund_can_4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-600"></div>
                  <span>{t('refund_can_5')}</span>
                </li>
              </ul>
            </div>

            {/* What cannot be returned */}
            <div className="rounded-lg border border-red-200 bg-red-50 p-8">
              <h3 className="mb-6 text-2xl font-bold text-red-800">
                {t('refund_what_cannot')}
              </h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>{t('refund_cannot_1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>{t('refund_cannot_2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>{t('refund_cannot_3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>{t('refund_cannot_4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-600"></div>
                  <span>{t('refund_cannot_5')}</span>
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
                  {t('refund_notice')}
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• {t('refund_notice_1')}</li>
                  <li>• {t('refund_notice_2')}</li>
                  <li>• {t('refund_notice_3')}</li>
                  <li>• {t('refund_notice_4')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg bg-black p-8 text-center text-white">
            <h3 className="mb-4 text-2xl font-semibold">
              {t('refund_help_title')}
            </h3>
            <p className="mb-6">{t('refund_help_desc')}</p>
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
