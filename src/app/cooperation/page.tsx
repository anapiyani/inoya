'use client';

import type React from 'react';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/lib/language-context';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function CooperationPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    collaborationType: '',
    socialMedia: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо за ваш интерес! Мы свяжемся с вами в ближайшее время.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              {t('cooperation_title')}
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              {t('cooperation_intro')}
            </p>
          </div>

          {/* Cooperation Types */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Wholesale */}
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold">
                {t('wholesale_title')}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {t('wholesale_text')}
              </p>
            </div>

            {/* Franchise */}
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold">
                {t('franchise_title')}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {t('franchise_text')}
              </p>
            </div>

            {/* Collaborations */}
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-2xl font-bold">
                {t('collaboration_title')}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {t('collaboration_text')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">{t('contact_form')}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t('full_name')}
                  </label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange('fullName', e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t('phone')}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t('email')}
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t('company')}
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange('company', e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t('collaboration_type')}
                  </label>
                  <Select
                    value={formData.collaborationType}
                    onValueChange={(value) =>
                      handleInputChange('collaborationType', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип сотрудничества" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wholesale">Опт</SelectItem>
                      <SelectItem value="franchise">Франшиза</SelectItem>
                      <SelectItem value="collaboration">
                        Коллаборация
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t('social_media')}
                  </label>
                  <Input
                    value={formData.socialMedia}
                    onChange={(e) =>
                      handleInputChange('socialMedia', e.target.value)
                    }
                    placeholder="@username или ссылка"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    {t('message')}
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    rows={4}
                    placeholder="Расскажите подробнее о ваших планах..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  {t('submit')}
                </Button>
              </form>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">
                {t('contact_details')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span>+7 (771) 141 08 48</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span>inoyahelp@gmail.com</span>
                </div>
              </div>

              {/* Photo Gallery Animation */}
              <div className="mt-12">
                <h4 className="mb-6 text-xl font-semibold">Наши работы</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className="aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      <img
                        src={`/placeholder.svg?height=300&width=300&text=Photo+${i + 1}`}
                        alt={`Gallery ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
