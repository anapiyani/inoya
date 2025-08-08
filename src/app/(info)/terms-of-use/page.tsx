'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/lib/language-context';
import { Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      {/* Page Header */}
      <header className="bg-background mt-24 border-b px-4 py-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-4xl font-bold tracking-wide">{t("privacy_policy").toUpperCase()}</h1>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {t("intro")}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {t("last_updated")}: {new Date().toLocaleDateString('ru-RU', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {/* Section 1: Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t("section_1")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t("personal_info")}:</h4>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• Имя и фамилия</li>
                  <li>• Адрес электронной почты</li>
                  <li>• Номер телефона</li>
                  <li>• Адрес доставки</li>
                  <li>• Платёжная информация</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">{t("technical_info")}:</h4>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• IP-адрес</li>
                  <li>• Тип браузера и операционной системы</li>
                  <li>• Данные о посещённых страницах</li>
                  <li>• Время и продолжительность сеанса</li>
                  <li>• Файлы cookie</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{t("order_info")}:</h4>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>• История покупок</li>
                  <li>• Предпочтения и интересы</li>
                  <li>• Отзывы и рейтинги</li>
                  <li>• Переписка с службой поддержки</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_2")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">{t("order_processing")}:</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Подтверждение и выполнение заказов</li>
                    <li>• Обработка платежей</li>
                    <li>• Организация доставки</li>
                    <li>• Предоставление информации о статусе заказа</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t("service_improvement")}:</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Персонализация контента и рекомендаций</li>
                    <li>• Анализ поведения пользователей</li>
                    <li>• Улучшение функциональности сайта</li>
                    <li>• Разработка новых продуктов и услуг</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">{t("communication")}:</h4>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Отправка уведомлений о заказах</li>
                    <li>• Информирование о новых товарах и акциях</li>
                    <li>• Ответы на запросы в службу поддержки</li>
                    <li>• Проведение опросов и исследований</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_3")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t("no_third_party_share")}
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">{t("service_providers")}:</h4>
                  <p className="text-muted-foreground text-sm">
                    Службы доставки, платёжные системы, хостинг-провайдеры и другие партнёры, 
                    необходимые для выполнения наших обязательств перед вами.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">{t("legal_requirements")}:</h4>
                  <p className="text-muted-foreground text-sm">
                    При наличии законных требований государственных органов или для защиты наших прав.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">{t("user_consent")}:</h4>
                  <p className="text-muted-foreground text-sm">
                    С вашего явного согласия на передачу данных определённым третьим лицам.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Data Security */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_4")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Мы применяем современные технические и организационные меры для защиты ваших данных:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">{t("technical_measures")}:</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• SSL-шифрование</li>
                    <li>• Защищённые серверы</li>
                    <li>• Регулярные обновления безопасности</li>
                    <li>• Мониторинг доступа</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{t("organizational_measures")}:</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Ограниченный доступ к данным</li>
                    <li>• Обучение сотрудников</li>
                    <li>• Регулярные аудиты безопасности</li>
                    <li>• Политики конфиденциальности</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: User Rights */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_5")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                В соответствии с законодательством о защите персональных данных, вы имеете следующие права:
              </p>
              
              <div className="grid gap-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">{t("right_access")}</h4>
                    <p className="text-muted-foreground text-sm">
                      Получение информации о том, какие данные мы о вас храним
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">{t("right_correction")}</h4>
                    <p className="text-muted-foreground text-sm">
                      Исправление неточных или неполных данных
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">{t("right_deletion")}</h4>
                    <p className="text-muted-foreground text-sm">
                      Удаление ваших персональных данных при определённых условиях
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">{t("right_limit")}</h4>
                    <p className="text-muted-foreground text-sm">
                      Ограничение способов использования ваших данных
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">{t("right_withdraw")}</h4>
                    <p className="text-muted-foreground text-sm">
                      Отзыв согласия на обработку данных в любое время
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6: Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_6")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {t("cookies_description")}
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">{t("cookies_required")}:</h4>
                  <p className="text-muted-foreground text-sm">
                    Обеспечивают базовую функциональность сайта (корзина, авторизация)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">{t("cookies_analytics")}:</h4>
                  <p className="text-muted-foreground text-sm">
                    Помогают понять, как посетители используют сайт
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">{t("cookies_marketing")}:</h4>
                  <p className="text-muted-foreground text-sm">
                    Используются для показа релевантной рекламы
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm">
                {t("cookies_control")}
              </p>
            </CardContent>
          </Card>

          {/* Section 7: Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_7")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Мы храним ваши персональные данные только в течение необходимого периода:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold">{t("account_data")}:</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      До удаления аккаунта или 3 года неактивности
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold">{t("order_history")}:</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      5 лет для налогового и бухгалтерского учёта
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-semibold">{t("marketing_data")}:</span>
                    <span className="text-muted-foreground text-sm ml-2">
                      До отзыва согласия или 2 года неактивности
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8: Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_8")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("children_protection")}
              </p>
            </CardContent>
          </Card>

          {/* Section 9: Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_9")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("policy_changes")}
              </p>
            </CardContent>
          </Card>

          {/* Section 10: Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_10")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t("contact_us")}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">privacy@example.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">+7 (XXX) XXX-XX-XX</span>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p>Юридический адрес:</p>
                    <p className="text-muted-foreground">
                      г. Москва, ул. Примерная, д. 1, офис 100<br />
                      Индекс: 123456
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 11: Return and Exchange */}
          <Card>
            <CardHeader>
              <CardTitle>{t("section_11")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground mb-4">
                {t("return_instructions")}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-sm">{t("return_step_1")}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-sm">{t("return_step_2")}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-sm">{t("return_step_3")}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <p className="text-sm">{t("return_step_4")}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    5
                  </div>
                  <p className="text-sm">{t("return_step_5")}</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                    6
                  </div>
                  <p className="text-sm">{t("return_step_6")}</p>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 mt-4">
                <p className="text-muted-foreground text-sm">
                  <strong>Примечание:</strong> {t("return_note")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />
          
          {/* Footer Note */}
          <div className="text-center py-6">
            <p className="text-muted-foreground text-sm">
              {t("footer_note")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
