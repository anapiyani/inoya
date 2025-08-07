'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/language-context';
import { useState } from 'react';

export function RefundExchangeForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // Limit to 5 files
      const selectedFiles = Array.from(event.target.files).slice(0, 5);
      const dataTransfer = new DataTransfer();
      selectedFiles.forEach((file) => dataTransfer.items.add(file));
      setFiles(dataTransfer.files);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Phone:', phone);
    if (files) {
      Array.from(files).forEach((file) => console.log('File:', file.name));
    }
    // Here you would typically send this data to your backend
    alert('Запрос отправлен! (This is a demo, no actual submission)');
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {t('inoya_slogan')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t('email_label')}</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">{t('phone_label')}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (XXX) XXX-XX-XX"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="photos">{t('attach_photos_label')}</Label>
            <Input
              id="photos"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            {files && files.length > 0 && (
              <div className="mt-2 text-sm text-gray-500">
                {t('selected_files')}
                <ul className="list-inside list-disc">
                  {Array.from(files).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button type="submit" className="w-full">
            {t('submit_request')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
