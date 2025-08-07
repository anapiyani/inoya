'use client';

import { Header } from '@/components/layout/header';
import { RefundExchangeForm } from '@/components/{admin,search,lookbook,cart,checkout,profile,journal}/refund-exchange-form';
import { useLanguage } from '@/lib/language-context';
import { AlertCircle, Clock, RotateCcw, Shield } from 'lucide-react';
import { Great_Vibes } from 'next/font/google';
import Link from 'next/link';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

export default function RefundExchangePolicyPage() {
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
          <div className="mb-12 text-center">
            <Link
              href="/"
              className={`${greatVibes.className} text-[48px] leading-none tracking-wide`}
            >
              Inoyá
            </Link>
          </div>

          <div className="itens-center mb-12 w-full justify-center">
            <h2 className="mb-4 text-center text-3xl font-bold">
              {t('how_to_return_exchange')}
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-center text-lg text-gray-700">
              {t('inoya_slogan')}
            </p>
            <RefundExchangeForm />
          </div>

          {/* Initial Policy Text */}
          <div className="mx-auto mb-12 max-w-3xl leading-relaxed text-gray-700">
            <p className="mb-4">{t('return_exchange_quality_intro')}</p>
            <p className="mb-8">{t('custom_items_no_return')}</p>
            <h3 className="mb-4 text-2xl font-bold">{t('refund_of_funds')}</h3>
            <p>{t('refund_process_details')}</p>
          </div>

          {/* Existing Page Header (adapted) */}
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

          {/* Detailed Policy Section */}
          <div className="mx-auto mb-16 max-w-4xl leading-relaxed text-gray-700">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {t('refund_policy')}
            </h2>

            {/* General Provisions */}
            <h3 className="mb-4 text-2xl font-bold">
              {t('policy_general_provisions')}
            </h3>
            <p className="mb-2">{t('policy_1_1')}</p>
            <p className="mb-2">{t('policy_1_2')}</p>
            <p className="mb-2">{t('policy_1_3')}</p>
            <p className="mb-2">{t('policy_1_4')}</p>
            <p className="mb-2">{t('policy_1_5')}</p>
            <p className="mb-2">{t('policy_1_6')}</p>
            <p className="mb-2">{t('policy_1_7')}</p>
            <p className="mb-6">{t('policy_1_8')}</p>

            {/* Return of Quality Goods */}
            <h3 className="mb-4 text-2xl font-bold">
              {t('policy_return_quality_goods')}
            </h3>
            <p className="mb-2">{t('policy_2_1')}</p>
            <ul className="mb-2 ml-4 list-inside list-disc">
              <li>{t('policy_2_1_bullet_1')}</li>
              <li>{t('policy_2_1_bullet_2')}</li>
              <li>{t('policy_2_1_bullet_3')}</li>
              <li>{t('policy_2_1_bullet_4')}</li>
            </ul>
            <p className="mb-2">{t('policy_2_2')}</p>
            <p className="mb-2">{t('policy_2_3')}</p>
            <p className="mb-2">{t('policy_2_4')}</p>
            <p className="mb-2">{t('policy_2_5')}</p>
            <ul className="mb-2 ml-4 list-inside list-disc">
              <li>{t('policy_2_5_bullet_1')}</li>
              <li>{t('policy_2_5_bullet_2')}</li>
              <li>{t('policy_2_5_bullet_3')}</li>
              <li>{t('policy_2_5_bullet_4')}</li>
            </ul>
            <p className="mb-2">{t('policy_2_6')}</p>
            <p className="mb-6">{t('policy_2_6_items')}</p>

            {/* Exchange of Defective Goods */}
            <h3 className="mb-4 text-2xl font-bold">
              {t('policy_exchange_defective_goods')}
            </h3>
            <p className="mb-2">{t('policy_3_1')}</p>
            <p className="mb-2">{t('policy_3_2')}</p>
            <ul className="mb-2 ml-4 list-inside list-disc">
              <li>{t('policy_3_2_bullet_1')}</li>
              <li>{t('policy_3_2_bullet_2')}</li>
              <li>{t('policy_3_2_bullet_3')}</li>
              <li>{t('policy_3_2_bullet_4')}</li>
            </ul>
            <p className="mb-2">{t('policy_3_2_guarantee_cases')}</p>
            <ul className="mb-2 ml-4 list-inside list-disc">
              <li>{t('policy_3_2_guarantee_bullet_1')}</li>
              <li>{t('policy_3_2_guarantee_bullet_2')}</li>
              <li>{t('policy_3_2_guarantee_bullet_3')}</li>
              <li>{t('policy_3_2_guarantee_bullet_4')}</li>
              <li>{t('policy_3_2_guarantee_bullet_5')}</li>
            </ul>
            <p className="mb-2">{t('policy_3_3')}</p>
            <p className="mb-2">{t('policy_3_4')}</p>
            <p className="mb-2">{t('policy_3_5')}</p>
            <ul className="mb-2 ml-4 list-inside list-disc">
              <li>{t('policy_3_5_bullet_1')}</li>
              <li>{t('policy_3_5_bullet_2')}</li>
              <li>{t('policy_3_5_bullet_3')}</li>
              <li>{t('policy_3_5_bullet_4')}</li>
            </ul>
            <p className="mb-2">{t('policy_3_5_delivery_cost')}</p>
            <p className="mb-2">{t('policy_3_6')}</p>
            <p className="mb-2">{t('policy_3_7')}</p>
            <p className="mb-2">{t('policy_3_8')}</p>
            <p className="mb-2">{t('policy_3_8_desc')}</p>
            <p className="mb-2">{t('policy_3_9')}</p>
            <p className="mb-6">{t('policy_3_9_desc')}</p>

            {/* Grounds for Refusal */}
            <h3 className="mb-4 text-2xl font-bold">
              {t('policy_grounds_for_refusal')}
            </h3>
            <p className="mb-2">{t('policy_4_1')}</p>
            <p className="mb-2">{t('policy_4_2')}</p>
            <p className="mb-2">{t('policy_4_3')}</p>
            <p className="mb-2">{t('policy_4_4')}</p>
            <p className="mb-2">{t('policy_4_4_desc')}</p>
            <p className="mb-2">{t('policy_4_5')}</p>
            <p className="mb-6">{t('policy_4_5_desc')}</p>
            <p className="text-center text-lg font-semibold">
              {t('policy_agreement_confirmation')}
            </p>
          </div>

          {/* Return Process (from original component, adapted) */}
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

          {/* Conditions (from original component) */}
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

          {/* Important Notice (from original component) */}
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

          {/* Contact Information (from original component) */}
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
