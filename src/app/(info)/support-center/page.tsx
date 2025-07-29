'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';
import { Clock, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export default function SupportCenterPage() {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: t('email'),
      value: 'inoyahelp@gmail.com',
      description: t('reply_24h'),
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: t('phone'),
      value: '+7 (771) 141 08 48',
      description: t('working_hours_contact'),
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'WhatsApp',
      value: t('write_whatsapp'),
      description: t('fast_messenger'),
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Telegram',
      value: t('write_telegram'),
      description: t('convenient_messenger'),
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      title: 'Instagram',
      value: '@inoya_official',
      description: t('follow_and_ask'),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">{t('support_title')}</h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              {t('support_intro')}
            </p>
          </div>

          {/* Contact Methods */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold">
              {t('how_to_contact')}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-6 text-center transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex justify-center text-gray-600">
                    {method.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{method.title}</h3>
                  <p className="mb-2 font-medium">{method.value}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Online Chat */}
          <div className="mb-16 rounded-lg bg-black p-8 text-center text-white">
            <MessageCircle className="mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-4 text-2xl font-semibold">{t('online_chat')}</h3>
            <button className="rounded bg-white px-8 py-3 text-black transition-colors hover:bg-gray-100">
              {t('start_chat')}
            </button>
          </div>

          {/* Working Hours */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-3 rounded-lg bg-gray-50 px-8 py-4">
              <Clock className="h-6 w-6 text-gray-600" />
              <div>
                <h3 className="font-semibold">{t('working_hours')}</h3>
                <p className="text-gray-600">{t('working_time')}</p>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-semibold">
              {t('frequently_asked')}
            </h3>
            <p className="mb-6 text-gray-600">{t('faq_redirect_text')}</p>
            <Link href="/faq">
              <button className="rounded bg-black px-8 py-3 text-white transition-colors hover:bg-gray-800">
                {t('go_to_faq')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
