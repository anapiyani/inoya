'use client';

import { Header } from '@/components/layout/header';
import { useLanguage } from '@/lib/language-context';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function AboutUsPage() {
  const { t } = useLanguage();

  const values = [
    { letter: 'I', title: t('value_i'), description: t('value_i_text') },
    { letter: 'N', title: t('value_n'), description: t('value_n_text') },
    { letter: 'O', title: t('value_o'), description: t('value_o_text') },
    { letter: 'Y', title: t('value_y'), description: t('value_y_text') },
    { letter: 'A', title: t('value_a'), description: t('value_a_text') },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold">{t('about_title')}</h1>
            <h2 className="mb-8 text-2xl text-gray-600">
              {t('about_subtitle')}
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                {t('about_intro')}
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                {t('about_brand')}
              </p>
            </div>
          </div>

          {/* Brand Values */}
          <div className="mb-16">
            <h3 className="mb-12 text-center text-3xl font-bold">
              {t('about_values')}
            </h3>
            <div className="space-y-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-8 md:flex-row"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl font-bold text-white">
                      {value.letter}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-4 text-2xl font-bold">{value.title}</h4>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Studio Location */}
          <div className="mb-16 rounded-lg bg-gray-50 p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-6 text-2xl font-bold">{t('visit_studio')}</h3>
                <div className="mb-4 flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-gray-600" />
                  <p className="text-gray-700">{t('studio_location')}</p>
                </div>

                <h4 className="mb-4 text-xl font-semibold">
                  {t('our_contacts')}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span>inoyahelp@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <span>+7 (771) 141 08 48</span>
                  </div>
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-lg bg-gray-200">
                <img
                  src="adress.png"
                  alt="Inoyá Studio"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
