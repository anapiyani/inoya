'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    catalog: 'Catalog',
    newArrivals: 'New Arrivals',
    all: 'All',
    dress: 'Dresses',
    corsets: 'Corsets',
    skirts: 'Skirts',
    tops_blouses: 'Tops & Blouses',
    sleeves: 'Sleeves',
    outerwear: 'Outerwear',
    wedding_dresses: 'Wedding Dresses',
    lookbook_sets: 'Lookbook/Sets',
    accessories: 'Accessories',
    shoes: 'Shoes',
    sale: 'Sale',
    sizing_guide: 'Sizing Guide',
    tailoring_to_measure: 'Tailoring to Measure',
    gift_certificates: 'Gift Certificates',
    inoyas_journal: 'INOYÁ Journal',
    inoyas_girls: "INOYÁ'S Girls",
    delivery_and_payment: 'Delivery and Payment',
    refund_policy: 'Refund Policy',
    support_center: 'Support Center',
    Show_new_arrivals: 'Show New Arrivals',
    cooperation: 'Cooperation',
    goodsCatalog: 'Goods Catalog',
    go_to_the_catalog: 'Browse Catalog',
    loadMore: 'Load More',
    faq: 'FAQ',
    adress_of_the_company:
      'Adress: Kazakhstan, Almaty, Al-Farabi Avenue, 47/79, № 2, 9th floor, office 39.',
    look_at_lookbook:
      'Look through our lookbook, where you will find curated outfits and collections that help you create a unique and stylish look',
    about_us: 'About Us',
    go_to_the_lookbook: 'Browse Lookbook',
    'language.en': 'EN',
    'language.ru': 'RU',
    cart: 'Cart',
    empty_cart: 'Your cart is empty',
    one_item: 'item',
    multiple_items: 'items',
    in_cart: 'in cart',
    cart_empty: 'Your cart is empty',
    cart_empty_description: 'Add items to your cart to see them here.',
    go_to_shopping: 'Go to Shopping',
    go_to_home: 'Go to Home',
    items_in_cart: 'Items in Cart',
    clear_cart: 'Clear Cart',
    continue_shopping: 'Continue Shopping',
    recommended_products: 'Recommended Products',
    order_summary: 'Order Summary',
    discount: 'Discount',
    shipping: 'Shipping',
    free_shipping: 'Free Shipping',
    total: 'Total',
    checkout: 'Checkout',
    free_shipping_notice: 'Add items worth {amount} to get free shipping',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    sortByName: 'By Name',
    sortByPriceLow: 'Price: Low to High',
    sortByPriceHigh: 'Price: High to Low',
    no_products_found: 'No products found',
    no_products_found_description:
      'Try changing the filters or search query to find products.',
    to: 'To',
    size: 'Size',
    price: 'Price',
    category: 'Category',
    color: 'Color',
    newItems: 'New Items',
    clearFilters: 'Clear Filters',
    out_of_stock: 'Out of Stock',
    addToCart: 'Add to Cart',
    buy_now: 'Buy Now',
    returns_14_days: 'Returns within 14 days',
    quality_guarantee: 'Quality Guarantee',
    similar_products: 'Similar Products',
    wishlist: 'Wishlist',
    empty_wishlist: 'You have no items in your wishlist',
    in_wishlist: 'in wishlist',
    add_to_wishlist:
      'Add items to your wishlist by clicking the heart icon, so you don’t lose track of your favorite items.',
    add_all_to_cart: 'Add All to Cart',
    clear_wishlist: 'Clear Wishlist',
    please_select_size: 'Please select a size',
    quantity: 'Quantity',
    customer_reviews: 'Customer Reviews',
    reviews: 'Reviews',
    write_a_review: 'Write a Review',
    // Cooperation page
    cooperation_title: 'Collaboration with Inoyá',
    cooperation_intro:
      'We are open to various forms of collaboration and invite you to become part of the Inoyá brand:',
    wholesale_title: 'Wholesale Supplies',
    wholesale_text:
      'For boutiques and retail chains, we offer exclusive collections featuring our unique designer pieces. We specialize in producing durable and reliable corsets, skirts, dresses, and other garments made from high-quality fabrics. To receive our product catalog and learn more about our wholesale terms, please fill out the form below, and we will contact you for further discussion.',
    franchise_title: 'Franchise',
    franchise_text:
      'The Inoyá brand offers the opportunity to open a store under a well-known and trusted name. We provide full support at every stage, including training and marketing materials. Partnering with us means a stable business model with growth and expansion potential. For detailed information about our franchise opportunities, please contact us.',
    collaboration_title: 'Collaborations for Shoots & Projects',
    collaboration_text:
      'We are happy to collaborate with creative individuals, photographers, and stylists. If you want to create unique content or showcase our products in a new light, we are open to discussing joint projects and collaborations. Fill out the form below to discuss collaboration terms.',
    contact_form: 'Contact Form:',
    full_name: 'Full Name:',
    phone: 'Phone:',
    email: 'Email:',
    company: 'Company (if any):',
    collaboration_type:
      'Type of Collaboration: Wholesale / Franchise / Collaboration',
    social_media: 'Social Media:',
    message: 'Message:',
    contact_details: 'Contact Details:',
    submit: 'Submit',

    // FAQ page
    faq_title: 'Frequently Asked Questions',
    faq_q1: 'Can I try on the dresses?',
    faq_a1:
      'Yes, you can try on our items at our studio located in Almaty. You can find the address on the "About Us" page.',
    faq_q2: 'How long will it take to ship my order?',
    faq_a2:
      'All orders are processed based on stock availability, so please allow 3-4 days for order shipment. You will receive an email notification as soon as your order is dispatched.',
    faq_q3: 'Do you offer worldwide shipping?',
    faq_a3:
      'Yes, we provide international shipping. The shipping cost is automatically calculated based on your location at checkout. Delivery time depends on the region and the selected shipping method. We offer various shipping options for your convenience, including express delivery. You can find detailed shipping and payment conditions',
    faq_q4: 'I need help choosing the right size.',
    faq_a4:
      "Please refer to our size guide to learn about measurements and bust shapes. If you're still unsure, send us a message via WhatsApp or Telegram with your measurements (waist, upper and lower bust, and hips in cm). A detailed guide is available",
    faq_q5: 'I have a non-standard size, what should I do?',
    faq_a5:
      "Don't worry, we tailor clothing based on your individual measurements. Contact us via WhatsApp or Telegram, and we will assist you.",
    faq_q6: 'Do you sew according to my sketch?',
    faq_a6:
      'We create our own designs, and you can make changes to the details, color, or style. We also accept custom orders. This is a long and complex process, so the price starts at $400, and the exact cost is calculated individually.',
    faq_q7: 'Will the item be back in stock?',
    faq_a7:
      'All our items are produced in-house, and we can make a product upon request if it is temporarily out of stock. However, some items from limited collections are produced in small quantities or as one-of-a-kind pieces (this is specified in the product description). These items will not be available for resale after they sell out.',
    faq_q8: 'How can I track my order?',
    faq_a8:
      'Once your order is placed, you will receive an email notification with a tracking number and a link to track your order.',
    faq_q9: 'What payment methods are available?',
    faq_a9:
      'We accept payments via Visa, MasterCard, American Express, UnionPay, Discover, as well as PayPal, Google Pay, and Apple Pay. For customers from Russia, payments via Sberbank, Alfa-Bank, VTB, and Tinkoff to our Russian account are available. To receive payment details, contact us via WhatsApp or Telegram. In some cases, an advance payment for shipping may be required when confirming the order, which the manager will inform you about in advance.',
    faq_q10: 'I want to become a partner, how can I contact you?',
    faq_a10:
      'Go to the "Partnership" page, where you will find all the necessary information.',
    faq_q11: 'Are the products original? Is there a warranty?',
    faq_a11:
      'We are a clothing manufacturer and guarantee the quality of our products for 90 days. All our products are made at our own production facility in Almaty, including custom tailoring services. Tens of thousands of girls and women already trust us, so you can be confident in the high quality of our materials and the precision of our stitching. You can find information about warranties',
    faq_q12: 'How to care for corsets?',
    faq_a12:
      "Hand wash: Use cold water and mild detergents for delicate fabrics. Avoid machine spinning to prevent damage to the fabric structure and the corset's framework. After washing, carefully dry on a flat surface in the shade, avoiding direct sunlight.",
    faq_q13: 'How to care for skirts made from delicate chiffon fabrics?',
    faq_a13:
      'Hand wash or machine wash on a delicate cycle (using a laundry bag). Use detergents designed for delicate fabrics, and avoid bleach. Wash in water temperature up to 30°C to avoid damaging the fabric. After washing, gently press the fabric without wringing it. Air dry, and avoid using a dryer. Iron on a low temperature or through a cloth to prevent damaging the delicate material.',
    faq_q14: "I can't make the payment?",
    faq_a14:
      "If you're experiencing difficulties with payment, please contact our customer support team. We will help you find a solution. You can find our contact details",
    faq_q15: "Can't determine your size?",
    faq_a15:
      "Contact our specialists for consultation. They will help you choose the right models and determine the perfect size. If the size doesn't fit, you can always exchange the item.",
    here: 'here',

    // About Us page
    about_title: 'About Us',
    about_subtitle: 'Born from a Dream: Exclusive Handcrafted Designs',
    about_intro:
      'Born from a childhood dream, Inoyá offers you the opportunity to wear something truly special. Each piece is handcrafted with love and attention to detail, providing a unique and exclusive experience in every outfit.',
    about_brand:
      'Inoyá is a brand founded in 2022, blending elegance, vintage-inspired layering, and classic modern style. We create corsets, skirts, sets, and other wardrobe pieces that emphasize individuality and femininity.',
    about_values: 'At the core of our brand are five key values:',
    value_i: 'Individuality',
    value_i_text:
      'We believe that everyone is unique, and our corsets, skirts, and dresses enhance this uniqueness, helping you express your true essence.',
    value_n: 'Novelty and Naturalness',
    value_n_text:
      'We combine bold ideas with the finest natural fabrics to create pieces that are not only beautiful but also provide comfort in everyday life.',
    value_o: 'Originality',
    value_o_text:
      'Each of our designs is a small work of art, merging tradition with modern fashion trends to create a timeless style.',
    value_y: 'Youthfulness and Vibrance',
    value_y_text:
      'Our collections are full of freshness and energy, perfect for those who want to stand out and captivate with their unique personality.',
    value_a: 'Authenticity',
    value_a_text:
      'Every Inoyá piece is handcrafted, preserving the traditions of craftsmanship and meticulous attention to detail. We take pride in our products, which embody authenticity and exclusivity.',
    studio_location:
      'You can try on our pieces at our studio located in Kazakhstan, Almaty, Al-Farabi Avenue, 47/79, № 2, floor 9, office 39',
    our_contacts: 'Our contacts:',

    // Sizing Guide
    sizing_guide_title: 'Sizing Guide',
    sizing_intro:
      "At Inoya, we strive to make you feel confident and comfortable in every piece you wear. To ensure a perfect fit, we have created a detailed size chart. Please refer to the chart below to choose your ideal size. If you have any questions or need additional assistance, don't hesitate to contact us.",
    sizing_charts:
      'We have prepared two charts: one for waist-cinching corsets (with a reduction of 7-10 cm) and another for corsets, dresses, and skirts with light shaping (3-5 cm), based on real body measurements.',
    sizing_custom:
      "If you don't see your size in the chart or have non-standard proportions (e.g., bust – size M, waist – XS), choose the closest size and leave your exact measurements in the comments. We will select the most suitable size for you or offer custom tailoring.",
    sizing_beatrice:
      'For Beatrice corsets (with side lacing), do not expect significant waist reduction. In this case, choose a size that provides a light fit, as indicated in the chart.',
    cinching_corsets:
      'Waist-cinching overbust and underbust corsets: Sharm, Marissa, Carbonella, Bridget, Isabella, and other models.',
    light_corsets:
      'Corsets with light shaping: Dramatic, Chloe, Beatrice, Olivia, Madness, Chiffon Corset, Corset Silk with Sleeves, and other models.',

    // Support Center
    support_title: 'Support Center',
    support_intro:
      'If you have any questions or need assistance, we are always ready to help. Below are the ways to contact our support team:',
    how_to_contact: 'How to contact us:',
    online_chat:
      'Online Chat: Available on our website (click the chat icon in the bottom right corner)',
    working_hours: 'Working Hours:',
    working_time: '10:00 AM - 8:00 PM',
    frequently_asked: 'Frequently Asked Questions',
  },
  ru: {
    'nav.home': 'Главная',
    catalog: 'Каталог',
    go_to_the_catalog: 'Перейти в каталог',
    newArrivals: 'Новинки',
    loadMore: 'Загрузить еще',
    goodsCatalog: 'Каталог товаров',
    all: 'Все',
    dress: 'Платья',
    corsets: 'Корсеты',
    Show_new_arrivals: 'Показать новинки',
    skirts: 'Юбки',
    tops_blouses: 'Топы и блузы',
    sleeves: 'Рукава',
    outerwear: 'Верхняя одежда',
    wedding_dresses: 'Свадебные платья',
    lookbook_sets: 'Лукбук/Сеты',
    accessories: 'Аксессуары',
    shoes: 'Обувь',
    sale: 'Распродажа',
    sizing_guide: 'Размерная сетка',
    tailoring_to_measure: 'Пошив на заказ',
    gift_certificates: 'Подарочные сертификаты',
    inoyas_journal: 'Журнал INOYÁ',
    inoyas_girls: 'Девочки INOYÁ',
    delivery_and_payment: 'Доставка и оплата',
    refund_policy: 'Политика возврата',
    support_center: 'Центр поддержки',
    cooperation: 'Сотрудничество',
    faq: 'Часто задаваемые вопросы',
    adress_of_the_company:
      'Казахстан, г. Алматы, проспект Аль-Фараби, 47/79, № 2, 9-й этаж, офис 39.',
    look_at_lookbook:
      'Просмотрите наш lookbook, где вы вы найдете подобранные образы и коллекции, которые помогут вам создать уникальный и модный образ',
    about_us: 'О нас',
    go_to_the_lookbook: 'Перейти на страницу lookbook',
    'language.en': 'EN',
    'language.ru': 'RU',
    cart: 'Корзина',
    empty_cart: 'Ваша корзина пуста',
    one_item: 'товар',
    multiple_items: 'товаров',
    in_cart: 'в корзине',
    cart_empty: 'Ваша корзина пуста',
    cart_empty_description:
      'Добавьте товары в корзину, чтобы увидеть их здесь.',
    go_to_shopping: 'Перейти к покупкам',
    go_to_home: 'Перейти на главную',
    items_in_cart: 'Товары в корзине',
    clear_cart: 'Очистить корзину',
    continue_shopping: 'Продолжить покупки',
    recommended_products: 'Рекомендуемые товары',
    order_summary: 'Сводка заказа',
    discount: 'Скидка',
    shipping: 'Доставка',
    free_shipping: 'Бесплатная доставка',
    total: 'Итого',
    checkout: 'Оформить заказ',
    free_shipping_notice:
      'Добавьте товаров на сумму {amount}, чтобы получить бесплатную доставку',
    search: 'Поиск',
    filter: 'Фильтр',
    sort: 'Сортировка',
    sortByName: 'По названию',
    sortByPriceLow: 'Цена: от низкой к высокой',
    sortByPriceHigh: 'Цена: от высокой к низкой',
    no_products_found: 'Товары не найдены',
    no_products_found_description:
      'Попробуйте изменить фильтры или поисковый запрос, чтобы найти товары.',
    to: 'До',
    size: 'Размер',
    price: 'Цена',
    category: 'Категория',
    color: 'Цвет',
    newItems: 'Новинки',
    clearFilters: 'Очистить фильтры',
    out_of_stock: 'Нет в наличии',
    addToCart: 'Добавить в корзину',
    buy_now: 'Купить сейчас',
    returns_14_days: 'Возврат в течение 14 дней',
    quality_guarantee: 'Гарантия качества',
    similar_products: 'Похожие товары',
    wishlist: 'Список желаемого',
    empty_wishlist: 'В вашем списке желаемого нет товаров',
    in_wishlist: 'в списке желаемого',
    add_to_wishlist:
      'Добавьте товары в свой список желаемого, нажав на значок сердца, чтобы не потерять из виду свои любимые товары.',
    add_all_to_cart: 'Добавить все в корзину',
    clear_wishlist: 'Очистить список желаемого',
    please_select_size: 'Пожалуйста, выберите размер',
    quantity: 'Количество',
    customer_reviews: 'Отзывы клиентов',
    reviews: 'Отзывы',
    write_a_review: 'Написать отзыв',
    // Cooperation page
    cooperation_title: 'Сотрудничество с Inoyá',
    cooperation_intro:
      'Мы открыты для различных форм сотрудничества и приглашаем вас стать частью бренда Inoyá:',
    wholesale_title: 'Оптовые поставки',
    wholesale_text:
      'Для бутиков и розничных сетей мы предлагаем эксклюзивные коллекции, включающие наши уникальные дизайнерские модели. Мы специализируемся на производстве долгосрочных и надежных корсетов, юбок, платьев и других изделий из высококачественных тканей. Чтобы получить каталог наших изделий и ознакомиться с условиями оптовых поставок, пожалуйста, заполните форму ниже, и мы свяжемся с вами для дальнейшего обсуждения.',
    franchise_title: 'Франшиза',
    franchise_text:
      'Бренд Inoyá предлагает возможность открыть магазин под известным и надежным именем. Мы предоставляем всю необходимую поддержку на каждом этапе, включая обучение и маркетинговые материалы. Сотрудничество с нами — это стабильная бизнес-модель с перспективами роста и расширения. Для получения подробной информации о франшизе, пожалуйста, свяжитесь с нами.',
    collaboration_title: 'Коллаборации для съемок и проектов',
    collaboration_text:
      'Мы рады сотрудничать с креативными личностями, фотографами, стилистами. Если вы хотите создать уникальный контент или представить нашу продукцию в новом свете, мы открыты к обсуждению совместных проектов и коллабораций. Заполните форму ниже, чтобы обсудить условия сотрудничества.',
    contact_form: 'Форма для связи:',
    full_name: 'ФИО:',
    phone: 'Телефон:',
    email: 'Email:',
    company: 'Компания (если есть):',
    collaboration_type: 'Тип сотрудничества: Опт / Франшиза / Коллаборация',
    social_media: 'Социальные сети:',
    message: 'Сообщение:',
    contact_details: 'Контактные данные:',
    submit: 'Отправить',

    // FAQ page
    faq_title: 'Часто задаваемые вопросы',
    faq_q1: 'Я могу примерить платья?',
    faq_a1:
      'Да, вы можете примерить наши изделия в нашей студии, расположенной в городе Алматы. Адрес можно найти на странице "О нас".',
    faq_q2: 'Сколько времени займет отправка моего заказа?',
    faq_a2:
      'Все заказы обрабатываются в зависимости от наличия товара на складе, поэтому, пожалуйста, ожидайте до 3-4 дней на отправку вашего заказа. Вы получите уведомление по электронной почте, как только заказ будет отправлен.',
    faq_q3: 'Вы осуществляете доставку по всему миру?',
    faq_a3:
      'Да, мы осуществляем международную доставку. Стоимость доставки рассчитывается автоматически в зависимости от вашего местоположения в момент оформления заказа. Время доставки зависит от региона и выбранного способа доставки. Мы предлагаем различные варианты доставки для вашего удобства, включая экспресс-доставку. Подробные условия доставки и оплаты можно найти',
    faq_q4: 'Мне нужна помощь с выбором размера?',
    faq_a4:
      'Пожалуйста, ознакомьтесь с нашим руководством по размерам, чтобы узнать о размерах и формах бюста. Если вы все еще не уверены, отправьте нам сообщение через WhatsApp или Telegram, указав ваши параметры (талия, нижняя и верхняя часть груди, бедра в см). Подробная инструкция доступна',
    faq_q5: 'У меня нестандартный размер, как быть?',
    faq_a5:
      'Не переживайте, мы сшиваем одежду по вашим индивидуальным меркам. Напишите нам в WhatsApp или Telegram, и мы поможем вам.',
    faq_q6: 'Шьете ли вы по моему эскизу?',
    faq_a6:
      'Мы разрабатываем собственные модели, и вы можете внести изменения в детали, цвет или фасон. Также мы принимаем индивидуальные заказы. Это долгий и сложный процесс, поэтому стоимость начинается от 400$, и точная цена рассчитывается индивидуально.',
    faq_q7: 'Будет ли товар снова в наличии?',
    faq_a7:
      'Все наши изделия изготавливаются на собственном производстве, и мы можем сшить товар по запросу, если он временно отсутствует на складе. Однако некоторые товары из лимитированных коллекций выпускаются в ограниченном количестве или в единственном экземпляре (это указано в описании товара). Такие товары не будут доступны для повторной продажи после распродажи.',
    faq_q8: 'Как я могу отследить заказ?',
    faq_a8:
      'После оформления заказа вам на электронную почту будет отправлено уведомление с трек-номером и ссылкой для отслеживания.',
    faq_q9: 'Какие способы оплаты доступны?',
    faq_a9:
      'Мы принимаем оплату картами Visa, MasterCard, American Express, UnionPay, Discover, а также через PayPal, Google Pay и Apple Pay. Для клиентов из России доступны платежи через Сбербанк, Альфа-Банк, ВТБ, Тинькофф на наш российский счет. Для получения реквизитов напишите нам в WhatsApp или Telegram. В некоторых случаях при подтверждении заказа может потребоваться предоплата доставки, об этом менеджер сообщит заранее.',
    faq_q10: 'Хочу стать партнером, как связаться?',
    faq_a10:
      'Перейдите на страницу "Сотрудничество", где вы найдете всю необходимую информацию.',
    faq_q11: 'Оригинальны ли товары? Есть ли гарантия?',
    faq_a11:
      'Мы — производитель одежды, гарантируем качество наших изделий в течение 90 дней. Вся продукция создаётся на нашем собственном производстве в Алматы, включая услуги индивидуального пошива. Нам уже доверяют десятки тысяч девушек и женщин, поэтому можешь быть уверена в высоком качестве материалов и аккуратности швов. Про гарантии можешь найти',
    faq_q12: 'Как ухаживать за корсетами?',
    faq_a12:
      'Ручная стирка: Используйте холодную воду и мягкие моющие средства для деликатных тканей. Избегайте отжима в стиральной машине, чтобы не повредить структуру ткани и каркас корсета. После стирки аккуратно высушите на горизонтальной поверхности в тени, избегая прямого солнечного света.',
    faq_q13: 'Как ухаживать за юбками из тонких шифоновы�� тканей?',
    faq_a13:
      'Стирка вручную или в стиральной машине на деликатном режиме (с используемым мешком для стирки). Используйте моющие средства для деликатных тканей, избегайте отбеливателей. Придерживайтесь низкой температуры воды (до 30°C) для стирки, чтобы не повредить ткань. После стирки аккуратно отожмите ткань, но не выкручивайте. Высушите на воздухе, не используя сушилку. Гладьте на низкой температуре или через ткань, чтобы избежать повреждения деликатного материала.',
    faq_q14: 'У меня не получается оплатить?',
    faq_a14:
      'Если у вас возникли трудности с оплатой, свяжитесь с нашей службой поддержки. Мы поможем вам найти решение. Контактные данные можно найти',
    faq_q15: 'Я не могу определить свой размер?',
    faq_a15:
      'Свяжитесь с нашими специалистами для консультации. Они помогут вам выбрать подходящие модели и точно определить размер. Если размер не подошел, вы всегда можете обменять товар.',
    here: 'здесь',

    // About Us page
    about_title: 'О нас',
    about_subtitle: 'Родившаяся из детской мечты',
    about_intro:
      'Родившаяся из детской мечты, Inoyá предлагает вам возможность носить что-то по-настоящему особенное. Каждое изделие выполнено вручную с любовью и вниманием к деталям, даря вам уникальный и эксклюзивный опыт в каждом наряде.',
    about_brand:
      'Inoyá — бренд, основанный в 2022 году, который сочетает элегантность, многослойность в стиле винтаж и классический современный стиль. Мы создаем корсеты, юбки, комплекты и другие элементы гардероба, подчеркивающие индивидуальность и женственность.',
    about_values: 'В основе бренда — пять ключевых ценностей:',
    value_i: 'Индивидуальность',
    value_i_text:
      'Мы верим, что каждый человек уникален, и наши корсеты, юбки и платья подчеркивают эту неповторимость, раскрывая вашу истинную сущность.',
    value_n: 'Новаторство и Натуральность',
    value_n_text:
      'Мы сочетаем смелые идеи и лучшие натуральные ткани, чтобы создать изделия, которые не только красивы, но и дарят вам комфорт в каждодневной жизни.',
    value_o: 'Оригинальность',
    value_o_text:
      'Каждое наше изделие — это маленькое произведение искусства, в котором мы соединяем традиции с новыми модными течениями, создавая стиль, который будет радовать вас долгие годы.',
    value_y: 'Яркость и Молодежность',
    value_y_text:
      'Наши коллекции полны свежести и жизненной энергии, они идеальны для тех, кто стремится выделяться и привлекать взгляды своей яркой индивидуальностью.',
    value_a: 'Аутентичность',
    value_a_text:
      'Каждое изделие Inoyá — это ручная работа, в которой сохраняются традиции мастерства и внимание к каждой детали. Мы гордимся своей продукцией, которая олицетворяет подлинность и исключительность.',
    studio_location:
      'Вы можете примерить наши изделия в студии, расположенной в Казахстане, г. Алматы, проспект Аль-Фараби, 47/79, № 2, 9-й этаж, офис 39.',
    our_contacts: 'Наши контакты:',

    // Sizing Guide
    sizing_guide_title: 'Размерная сетка',
    sizing_intro:
      'В Inoya мы стремимся, чтобы вы чувствовали себя уверенно и комфортно в каждой вещи, которую носите. Для того чтобы гарантировать идеальную посадку, мы разработали подробную таблицу размеров. Пожалуйста, обратитесь к таблице ниже, чтобы выбрать ваш идеальный размер. Если у вас возникнут вопросы или потребуется дополнительная помощь, не стесняйтесь обращаться к нам.',
    sizing_charts:
      'Мы подготовили две таблицы: одна для утягивающих корсетов (с утяжкой 7-10 см), другая — для корсетов, платьев и юбок с легкой утяжкой (3-5 см), основанных на реальных параметрах.',
    sizing_custom:
      'Если вы не нашли свой размер в таблице и у вас нестандартные пропорции (например, грудь — размер M, а талия — XS), выберите размер, который вам наиболее близок, а в комментариях укажите свои точные параметры. Мы подберем для вас подходящий размер или предложим индивидуальное изготовление.',
    sizing_beatrice:
      'Для корсетов Beatrice (с завязками по бокам) не стоит рассчитывать на большую утяжку. В этом случае выберите размер, который соответствует легкому облеганию, как указано в таблице.',
    cinching_corsets:
      'Утягивающие нагрудные и подгрудные корсеты: Sharm, Marissa, Carbonella, Bridget, Isabella и другие модели.',
    light_corsets:
      'Корсеты с легкой утяжкой: Dramatic, Chloe, Beatrice, Olivia, Madness, Chiffon corset, Corset Silk with sleeves и другие модели.',

    // Support Center
    support_title: 'Центр поддержки',
    support_intro:
      'Если у вас возникли вопросы или вам нужна помощь, мы всегда готовы помочь. Ниже представлены способы связаться с нашей службой поддержки:',
    how_to_contact: 'Как с нами связаться:',
    online_chat:
      'Чат онлайн: Доступен на нашем сайте (кликните на иконку чата в правом нижнем углу)',
    working_hours: 'Часы работы:',
    working_time: 'с 10:00 до 20:00',
    frequently_asked: 'Часто задаваемые вопросы',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'ru';
    }
    return 'ru';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, params?: Record<string, any>): string => {
    let translation =
      translations[language][key as keyof typeof translations.en] || key;

    if (params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(`{${param}}`, String(params[param]));
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
