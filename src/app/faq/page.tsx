'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';
import Link from 'next/link';

export default function FAQPage() {
  const { t } = useLanguage();

  const faqItems = [
    { question: t('faq_q1'), answer: t('faq_a1') },
    { question: t('faq_q2'), answer: t('faq_a2') },
    {
      question: t('faq_q3'),
      answer: (
        <>
          {t('faq_a3')}{' '}
          <Link
            href="/delivery-payment"
            className="inline-block rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
          >
            {t('here')}
          </Link>
          .
        </>
      ),
    },
    {
      question: t('faq_q4'),
      answer: (
        <>
          {t('faq_a4')}{' '}
          <Link
            href="/sizing-guide"
            className="inline-block rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
          >
            {t('here')}
          </Link>
          .
        </>
      ),
    },
    { question: t('faq_q5'), answer: t('faq_a5') },
    { question: t('faq_q6'), answer: t('faq_a6') },
    { question: t('faq_q7'), answer: t('faq_a7') },
    { question: t('faq_q8'), answer: t('faq_a8') },
    { question: t('faq_q9'), answer: t('faq_a9') },
    {
      question: t('faq_q10'),
      answer: (
        <>
          {t('faq_a10').replace('"Partnership"', '"')}
          <Link
            href="/cooperation"
            className="inline-block rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
          >
            Сотрудничество
          </Link>
          {"'"}.
        </>
      ),
    },
    {
      question: t('faq_q11'),
      answer: (
        <>
          {t('faq_a11')}{' '}
          <Link
            href="/refund-policy"
            className="inline-block rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
          >
            {t('here')}
          </Link>
          .
        </>
      ),
    },
    { question: t('faq_q12'), answer: t('faq_a12') },
    { question: t('faq_q13'), answer: t('faq_a13') },
    {
      question: t('faq_q14'),
      answer: (
        <>
          {t('faq_a14')}{' '}
          <Link
            href="/support-center"
            className="inline-block rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
          >
            {t('here')}
          </Link>
          .
        </>
      ),
    },
    {
      question: t('faq_q15'),
      answer: (
        <>
          <Link
            href="/support-center"
            className="inline-block rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700"
          >
            {t('faq_a15')}
          </Link>
          {'. Если размер не подошел, вы всегда можете обменять товар.'}
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">{t('faq_title')}</h1>
          </div>

          {/* FAQ Items */}
          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {item.question}
                  </h3>
                  <div className="leading-relaxed text-gray-600">
                    {typeof item.answer === 'string'
                      ? item.answer
                      : item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-16 rounded-lg bg-gray-50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-semibold">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="mb-6 text-gray-600">
              Обратитесь в нашу службу поддержки, и мы поможем вам.
            </p>
            <Link href="/support-center">
              <button className="rounded bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800">
                Связаться с поддержкой
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
