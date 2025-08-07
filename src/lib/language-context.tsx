'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, unknown>) => string;
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
    of: 'of',
    showing_results: 'Showing results',
    color_black: 'Black',
    color_white: 'White',
    color_red: 'Red',
    color_blue: 'Blue',
    color_pink: 'Pink',
    color_gold: 'Gold',
    color_silver: 'Silver',
    sizing_help_title: 'Need help with sizing?',
    sizing_help_text: 'Our specialists will help you choose the perfect size.',
    cinching_corsets_title: 'Cinching Corsets (7-10 cm reduction)',
    light_corsets_title: 'Light Corsets (3-5 cm)',
    bust_cm: 'Bust (cm)',
    waist_cm: 'Waist (cm)',
    hips_cm: 'Hips (cm)',
    delivery_intro:
      'We offer convenient delivery and payment options for your comfort.',
    delivery: 'Delivery',
    delivery_standard: 'Standard Delivery',
    delivery_standard_time: '5-7 business days',
    delivery_standard_price: '2000 KZT',
    delivery_standard_desc: 'Courier delivery across Kazakhstan',
    delivery_express: 'Express Delivery',
    delivery_express_time: '2-3 business days',
    delivery_express_price: '4000 KZT',
    delivery_express_desc: 'Fast delivery to major cities',
    delivery_international: 'International Delivery',
    delivery_international_time: '10-14 business days',
    delivery_international_price: 'Calculated individually',
    delivery_international_desc: 'Delivery to CIS countries and abroad',
    delivery_free_title: 'Free Shipping',
    delivery_free_desc:
      'Free delivery across Kazakhstan for orders over 200,000 KZT!',
    payment_methods: 'Payment Methods',
    payment_cards: 'Bank Cards',
    payment_cards_desc:
      'Visa, MasterCard, Apple Pay, PayPal, American Express, Discover, Google Pay, Union Pay',
    delivery_info_title: 'Delivery Information',
    delivery_info_1: 'All orders are processed within 3-4 business days',
    delivery_info_2: 'You will receive a tracking number for order tracking',
    delivery_info_3: 'Delivery is carried out Monday to Friday',
    delivery_info_4:
      'If you are not at home, the courier will contact you to arrange time',
    payment_info_title: 'Payment Information',
    payment_info_1: 'All payments are secured with SSL encryption',
    payment_info_2: 'Payment is made at the time of order',
    payment_info_3: 'In some cases, prepayment for delivery may be required',
    payment_info_4: 'For bank transfers, contact us for details',
    questions_title: 'Have questions?',
    questions_text: 'Contact us for more information.',
    refund_intro:
      'We care about your purchases and offer a fair return policy.',
    refund_14_days: '14 days',
    refund_14_days_desc: 'to return the item from the date of receipt',
    refund_full: 'Full Refund',
    refund_full_desc: 'of the amount if conditions are met',
    refund_quality: 'Quality Guarantee',
    refund_quality_desc: '90 days warranty on all items',
    refund_process: 'Return Process',
    refund_step_1_title: 'Contact us',
    refund_step_1_desc: 'Write to us within 14 days from receiving the item',
    refund_step_2_title: 'Describe the reason',
    refund_step_2_desc: 'Specify the reason for return and attach a photo',
    refund_step_3_title: 'Get instructions',
    refund_step_3_desc: 'We will send you instructions for the return',
    refund_step_4_title: 'Send the item',
    refund_step_4_desc: 'Pack the item and send it to the provided address',
    refund_step_5_title: 'Get refund',
    refund_step_5_desc:
      'After checking the item, we will refund within 7-10 days',
    refund_what_can: 'What can be returned',
    refund_can_1: 'Item in original packaging',
    refund_can_2: 'Items without signs of wear',
    refund_can_3: 'Items with tags attached',
    refund_can_4: 'Return within 14 days',
    refund_can_5: 'Item did not fit in size',
    refund_what_cannot: 'What cannot be returned',
    refund_cannot_1: 'Custom-made items',
    refund_cannot_2: 'Items with signs of wear',
    refund_cannot_3: 'Items without original packaging',
    refund_cannot_4: 'Limited collections (as indicated)',
    refund_cannot_5: 'Return after 14 days',
    refund_notice: 'Important Information',
    refund_notice_1: 'The cost of return shipping is paid by the buyer',
    refund_notice_2: 'Refunds are made by the same payment method used',
    refund_notice_3: 'Refund time: 7-10 business days after receiving the item',
    refund_notice_4: 'In case of defective items, delivery cost is refunded',
    refund_help_title: 'Need help with returns?',
    refund_help_desc: 'Contact our support team for assistance.',
    faq_no_answer: 'Didn’t find the answer to your question?',
    faq_contact_support: 'Contact our support team, and we will help you.',
    contact_support: 'Contact Support',
    partnership: 'Partnership',
    faq_size_exchange:
      'If the size doesn’t fit, you can always exchange the item.',
    faq_a10_prefix: 'Go to the page',
    reply_24h: 'We will reply within 24 hours',
    working_hours_contact: 'Call during business hours',
    write_whatsapp: 'Message on WhatsApp',
    write_telegram: 'Message on Telegram',
    fast_messenger: 'Quick responses in messenger',
    convenient_messenger: 'Convenient chat in messenger',
    follow_and_ask: 'Follow for news and ask questions',
    start_chat: 'Start Chat',
    faq_redirect_text:
      'Perhaps your question is already answered in our FAQ section',
    go_to_faq: 'Go to FAQ',
    cooperation_form_success:
      'Thank you for your interest! We will contact you soon.',
    select_collaboration_type: 'Select collaboration type',
    wholesale: 'Wholesale',
    franchise: 'Franchise',
    collaboration: 'Collaboration',
    message_placeholder: 'Tell us more about your plans...',
    our_works: 'Our Works',
    gallery_photo: 'Gallery Photo',
    visit_studio: 'Visit our studio',
    bestsellers: 'Bestsellers',
    public_offer: 'Public Offer',
    privacy_policy: 'Privacy Policy',
    all_rights_reserved: 'All rights reserved.',
    added_to_cart: 'Added to Cart',
    load_more: 'Load More',
    'journal.heroTitle': 'INOYA JOURNAL',
    'journal.heroSubtitle':
      'Discover the world of high fashion, style and elegance. Get inspired by the latest trends and create unique looks.',
    'journal.failLoad': 'Failed to load articles',
    'journal.clearFilters': 'Clear filters',
    'journal.featuredBadge': 'Featured article',
    'journal.unknownAuthor': 'Unknown author',
    'journal.readArticle': 'Read article',
    'journal.noResults': 'No articles found for your query',
    'journal.loadMoreArticles': 'Load more articles',
    'journal.additionalImages': 'Additional images',
    'journal.imageAlt': 'image {index}',
    'journal.minutesRead': '{count} min read',
    'newsletter.title': "Don't miss new articles",
    'newsletter.subtitle':
      'Subscribe to our newsletter and be the first to learn about new trends, stylish looks and exclusive INOYA collections.',
    'newsletter.emailPlaceholder': 'Your email address',
    'newsletter.subscribe': 'Subscribe',
    'common.loading': 'Loading...',
    'journal.searchPlaceholder': 'Search articles by title or content',
    'girls.heroTitle': 'INOYA GIRLS',
    'girls.heroSubtitle': 'Our wonderful clients in INOYA outfits',
    'girls.searchPlaceholder': 'Search by name or description…',
    'girls.sort': 'Sort',
    'girls.sortPriority': 'By priority',
    'girls.sortNewest': 'Newest first',
    'girls.clearFilters': 'Clear filters',
    'girls.loadError': 'Failed to load data',
    'girls.likeSuccess': 'Like added',
    'girls.likeFailed': 'Failed to like',
    'girls.notFound': 'Post not found',
    'girls.noResults': 'Nothing found for your query',
    'girls.resetFilters': 'Reset all filters',
    'girls.loadMore': 'Load more',
    'girls.ctaTitle': 'Join the INOYA community',
    'girls.ctaText':
      'Every client inspires us. Together we create unique style and elegance.',
    'girls.ctaLink': 'Browse catalog',
    'girls.thumbnail': 'Thumbnail',
    'girls.aboutClient': 'About the client',

    'auth.pleaseLogin': 'Please log in to like posts',
    // New content for the form and initial policy
    how_to_return_exchange: 'How to process a return or exchange?',
    return_exchange_quality_intro:
      'Returns and exchanges of goods of inadequate quality, purchased in standard sizes, are possible within 14 days from the date of receipt of the order. For successful returns or exchanges, the original packaging of the goods, tags, and labels must be preserved. The product itself must show no signs of wear. Please, when trying on the product for the first time, wear it over underwear. We reserve the right to refuse a return or exchange of an item that shows signs of wear and does not meet the criteria listed above.',
    custom_items_no_return:
      'Items custom-made to individual parameters are not subject to return or exchange.',
    refund_of_funds: 'Refund of Funds',
    refund_process_details:
      "After the item for return or exchange is received, it will be inspected for compliance with the criteria within 1-3 business days. You will be additionally notified of the inspection results by email. If the return or exchange is accepted, the funds will be credited to your account within 7-10 business days, depending on your bank's transaction processing time.",
    inoya_slogan:
      'To arrange a return or exchange, please fill out the feedback form:',
    email_label: 'Email',
    phone_label: 'Phone Number',
    attach_photos_label: 'Attach photos (up to 5 photos)',
    submit_request: 'Submit Request',
    file_upload_placeholder: 'Choose files...',
    selected_files: 'Selected files:',
    // Detailed policy points (from user's long text)
    policy_general_provisions: 'General Provisions',
    policy_1_1:
      'Exchange of goods of proper quality is possible if its commercial appearance (packaging, seals, labels, etc.), consumer properties are preserved, and there is a document confirming the fact of purchase of the goods (receipt, electronic document, order form, confirmation of money transfer).',
    policy_1_2:
      'In case of exchange of goods of proper quality, delivery costs from the Seller to the Buyer are paid by the Buyer. The cost of delivery of the returned goods to the Seller is not compensated to the Buyer.',
    policy_1_3:
      'For the return or exchange of defective goods for an analogous one, the Buyer is obliged to inform us about the problem by any convenient means of communication.',
    policy_1_4:
      "Refunds for returned goods are made within 10 business days from the date of their receipt at the Seller's warehouse, in accordance with the legislation of the Republic of Kazakhstan (Article 21 of the Law of the Republic of Kazakhstan 'On Consumer Protection').",
    policy_1_5:
      "Refunds are made to the Buyer's bank account if the order was paid online, or to the account whose details are specified in the online Return Application form if payment was made upon receipt of the goods.",
    policy_1_6:
      "If an analogous product is not available for sale at the time of the Buyer's request, the Buyer has the right to refuse to execute this Agreement and demand a refund of the amount paid for the goods. The Seller is obliged to return the money within 10 business days from the date of return of the goods.",
    policy_1_7:
      "The Buyer has the right to demand a full refund of the order amount, including delivery, if the order has not been transferred to the delivery service and is still in the store's warehouse https://inoyamodern.com.",
    policy_1_8:
      "Changes to the Buyer's personal data or order composition are made free of charge if the paid order has not yet left the store's warehouse and has not been transferred to the delivery service. Otherwise, delivery costs are not compensated.",
    policy_return_quality_goods: '2. Return of Goods of Proper Quality',
    policy_2_1:
      "The Client has the right to request a return of goods presented in the Seller's catalog at any time before receiving it. Within 14 calendar days from the date of receipt of the goods (excluding the day of receipt), the Client can exchange goods of proper quality, provided the following conditions are met:",
    policy_2_1_bullet_1:
      'Preservation of the commercial appearance of the goods (packaging, seals, labels, etc.);',
    policy_2_1_bullet_2: 'The goods have not been used (no signs of use);',
    policy_2_1_bullet_3:
      'Preservation of the consumer properties of the goods;',
    policy_2_1_bullet_4:
      'Availability of purchase confirmation (receipt, order form, invoice) if the goods were purchased elsewhere than the official online store https://inoyamodern.com.',
    policy_2_2:
      "When exchanging goods of proper quality, delivery of the goods from the Client to the Seller is at the Client's expense.",
    policy_2_3:
      'To make an exchange or return of goods, the Client must fill out the online form available on the website https://inoyamodern.com.',
    policy_2_4:
      "After filling out the form, the Client must wait for the claim to be reviewed, which takes no more than 2 business days. As a result of the review, the Client will be informed via SMS and e-mail, where detailed instructions for the Client's further actions will also be sent in case of a positive decision on the appeal.",
    policy_2_5:
      'After receiving notification of the claim review, the Client must send the goods back to the Seller within 7 business days, using one of the following methods:',
    policy_2_5_bullet_1:
      'International mail (return address will be provided upon return processing);',
    policy_2_5_bullet_2:
      'Kazakhstan Post (return address will be provided upon return processing);',
    policy_2_5_bullet_3:
      'SDEK transport company (return address will be provided upon return processing);',
    policy_2_5_bullet_4:
      "In person at the Seller's address (exact address in Almaty will be provided upon return processing).",
    policy_2_6:
      'Some items from the assortment may not be subject to return if they are provided in proper condition.',
    policy_2_6_items:
      'Such items include: underwear, cosmetic products, personal use items, and items belonging to the corset category. However, the Seller reserves the right to individually consider each situation but is not obliged to return items of this category.',
    policy_exchange_defective_goods: '3. Exchange of Defective Goods',
    policy_3_1:
      'The period for exchanging defective goods is 90 calendar days from the date of receipt of the goods, excluding the day of receipt. This is the warranty period declared by the manufacturer.',
    policy_3_2: 'Warranty cases do not include:',
    policy_3_2_bullet_1:
      'Mechanical damage that objectively could not have occurred under normal conditions of use, such as cuts, tears, damage from external objects;',
    policy_3_2_bullet_2: 'Stains, scuffs, signs of product use;',
    policy_3_2_bullet_3:
      'Seam divergence caused by improper use of the product;',
    policy_3_2_bullet_4: 'Mechanical damage not related to product use.',
    policy_3_2_guarantee_cases: 'Warranty cases include:',
    policy_3_2_guarantee_bullet_1: 'Absence of hooks or fasteners;',
    policy_3_2_guarantee_bullet_2: 'Breakage of stiffening ribs;',
    policy_3_2_guarantee_bullet_3:
      'Material tearing if the stiffening ribs came out of their slots;',
    policy_3_2_guarantee_bullet_4:
      'Fabric defect used in product manufacturing;',
    policy_3_2_guarantee_bullet_5:
      'Involuntary damage, tears, seam divergence during normal use.',
    policy_3_3:
      'To return or exchange defective goods, the Client must fill out the online form available at https://inoyamodern.com/vozvrat-obmen.',
    policy_3_4:
      'After filling out the form, the Client must wait for the claim to be reviewed. The review period is no more than 2 business days. After reviewing the application, the Client will be notified via SMS or e-mail, where detailed instructions for further actions will be provided if the appeal receives a positive decision.',
    policy_3_5:
      'After receiving notification of the claim review, the Client must send the goods back to the Seller within 7 business days. This can be done via:',
    policy_3_5_bullet_1: 'Kazakhstan Post (specify return address),',
    policy_3_5_bullet_2: 'International mail (specify return address),',
    policy_3_5_bullet_3: 'SDEK transport company (specify return address),',
    policy_3_5_bullet_4:
      "In person at the Seller's address in Almaty (specify exact address).",
    policy_3_5_delivery_cost:
      "When returning defective goods, delivery is at the Seller's expense.",
    policy_3_6:
      'The Client has the right to conduct an independent examination of the goods to identify manufacturing defects if the Seller disagrees with the cause of the defect.',
    policy_3_7:
      "The Seller also has the right to conduct an independent examination of the goods to identify signs of use and manufacturing defects. If the Seller's fault in the manufacturing defect is confirmed, the cost of the examination will be compensated to the Buyer.",
    policy_3_8: 'Partial Replacement Policy',
    policy_3_8_desc:
      'If the item consists of several parts or a set, and only one element is damaged, partial return or exchange of only the damaged element is possible.',
    policy_3_9: 'Terms of Return and Exchange in Case of Packaging Damage',
    policy_3_9_desc:
      'Upon receipt of the goods, the Client is obliged to check the goods and packaging for damage. In case of detection of damage to the packaging or goods, the Client undertakes to immediately inform the Seller.',
    policy_grounds_for_refusal: '4. Grounds for Refusal to Accept a Claim',
    policy_4_1:
      'The store https://inoyamodern.com does not consider and does not accept claims regarding goods that show signs of use, including (but not limited to) dirt, traces of biological origin, mechanical damage, deformation, violation of the integrity of the goods, absence or damage to labels, tags, stickers on the packaging, as well as non-compliance with the declared product volume (in the case of cosmetics - signs of use).',
    policy_4_2:
      "In case of detection of the above signs of use, the client's application (claim) will not be satisfied, and funds will not be returned.",
    policy_4_3:
      'Goods purchased on promotion are subject to return only if a defect or defect caused by the manufacturer is found.',
    policy_4_4: 'Custom-made goods',
    policy_4_4_desc:
      'If the goods were manufactured according to individually defined characteristics (for example, by customer order, with unique sizes, color, or other personalized elements), the client is not entitled to refuse such goods, even if they meet all declared qualities.',
    policy_4_5: 'Responsibility for Return of Goods',
    policy_4_5_desc:
      'Until the goods are received by the Seller, responsibility for the safety of the goods during return lies with the Client. In case of damage to the goods during the return process, the Client bears responsibility for the damage.',
    policy_agreement_confirmation:
      'By placing an order through the website https://inoyamodern.com, you confirm your voluntary agreement with these Return and Exchange Rules set forth above.',
    // New Delivery and Payment content
    delivery_and_payment_title: 'Delivery and Payment',
    delivery_methods_title: 'Delivery Methods',
    delivery_method_courier: 'Courier service (RIKA, CDEK, Kazpost, etc.)',
    delivery_method_international_mail: 'International mail',
    delivery_method_express: 'Express delivery (upon request)',
    delivery_cost_time_title: 'Delivery Cost and Time',
    delivery_cost_auto_calc:
      'Delivery cost is calculated automatically during checkout, depending on your location.',
    delivery_time_varies:
      'Delivery time may vary depending on the region and selected delivery method.',
    delivery_free_kz: 'Free delivery in Kazakhstan — for orders from 100,000₸',
    delivery_free_international:
      'Free delivery to other countries — for orders from $600. For smaller amounts — $50.',
    delivery_terms_title: 'Delivery Terms',
    delivery_terms_order_processing:
      'Order processing: 1 to 3 business days after full payment.',
    delivery_terms_holidays:
      'Terms depend on the chosen delivery service and may increase during holidays.',
    how_to_receive_order_title: 'How to receive an order?',
    how_to_receive_post:
      'Post office: pick up at the collection point by your postal code.',
    how_to_receive_courier:
      'Courier delivery: the courier will contact you in advance to confirm the time.',
    cancellation_return_title: 'Cancellation and Return',
    cancellation_return_shipping_cost:
      'If the order has already been transferred to the transport company, the buyer pays for transportation costs.',
    cancellation_return_policy_link:
      "Returns are possible within 14 days from the date of receipt (see 'Return and Exchange' section for return conditions).",
    payment_methods_main_title: 'Payment Methods',
    payment_methods_intro: 'We accept the following payment methods:',
    payment_e_wallets: 'Electronic wallets: PayPal, Google Pay, Apple Pay',
    payment_for_russia:
      'For clients from Russia: Payment via Sberbank, Alfa-Bank, VTB, Tinkoff, etc. (details can be obtained by writing to WhatsApp or Telegram).',
    support_contacts_title: 'Support Contacts',
    support_email: 'Email:',
    support_phone: 'Phone: +7 771 141 08 48',
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
    of: 'из',
    showing_results: 'Показаны результаты',
    color_black: 'Чёрный',
    color_white: 'Белый',
    color_red: 'Красный',
    color_blue: 'Синий',
    color_pink: 'Розовый',
    color_gold: 'Золотой',
    color_silver: 'Серебряный',
    sizing_help_title: 'Нужна помощь с размером?',
    sizing_help_text: 'Наши специалисты помогут вам выбрать идеальный размер.',
    cinching_corsets_title: 'Утягивающие корсеты (7-10 см утяжки)',
    light_corsets_title: 'Корсеты с легкой утяжкой (3-5 см)',
    bust_cm: 'Грудь (см)',
    waist_cm: 'Талия (см)',
    hips_cm: 'Бедра (см)',
    delivery_intro:
      'Мы предлагаем удобные способы доставки и оплаты для вашего комфорта.',
    delivery: 'Доставка',
    delivery_standard: 'Стандартная доставка',
    delivery_standard_time: '5-7 рабочих дней',
    delivery_standard_price: '2000 тг',
    delivery_standard_desc: 'Доставка курьерской службой по Казахстану',
    delivery_express: 'Экспресс доставка',
    delivery_express_time: '2-3 рабочих дня',
    delivery_express_price: '4000 тг',
    delivery_express_desc: 'Быстрая доставка в крупные города',
    delivery_international: 'Международная доставка',
    delivery_international_time: '10-14 рабочих дней',
    delivery_international_price: 'Рассчитывается индивидуально',
    delivery_international_desc: 'Доставка в страны СНГ и дальнее зарубежье',
    delivery_free_title: 'Бесплатная доставка',
    delivery_free_desc:
      'При заказе от 200 000 тг доставка по Казахстану бесплатная!',
    payment_methods: 'Способы оплаты',
    payment_cards: 'Банковские карты',
    payment_cards_desc:
      'Visa, MasterCard, Apple Pay, PayPal, American Express, Discover, Google Pay, Union Pay',
    delivery_info_title: 'Информация о доставке',
    delivery_info_1: 'Все заказы обрабатываются в течение 3-4 рабочих дней',
    delivery_info_2: 'Вы получите трек-номер для отслеживания заказа',
    delivery_info_3: 'Доставка осуществляется с понедельника по пятницу',
    delivery_info_4:
      'При отсутствии дома курьер свяжется с вами для согласования времени',
    payment_info_title: 'Информация об оплате',
    payment_info_1: 'Все платежи защищены SSL-шифрованием',
    payment_info_2: 'Оплата производится в момент оформления заказа',
    payment_info_3:
      'В некоторых случаях может потребоваться предоплата доставки',
    payment_info_4:
      'Для банковского перевода свяжитесь с нами для получения реквизитов',
    questions_title: 'Остались вопросы?',
    questions_text: 'Свяжитесь с нами для получения дополнительной информации.',
    refund_intro:
      'Мы заботимся о ваших покупках и предлагаем справедливую политику возврата.',
    refund_14_days: '14 дней',
    refund_14_days_desc: 'на возврат товара с момента получения',
    refund_full: 'Полный возврат',
    refund_full_desc: 'средств при соблюдении условий',
    refund_quality: 'Гарантия качества',
    refund_quality_desc: '90 дней гарантии на все изделия',
    refund_process: 'Процесс возврата',
    refund_step_1_title: 'Свяжитесь с нами',
    refund_step_1_desc:
      'Напишите нам в течение 14 дней с момента получения товара',
    refund_step_2_title: 'Опишите причину возврата',
    refund_step_2_desc: 'Укажите причину возврата и приложите фото товара',
    refund_step_3_title: 'Получите инструкции',
    refund_step_3_desc: 'Мы вышлем вам инструкции по возврату товара',
    refund_step_4_title: 'Отправьте товар',
    refund_step_4_desc: 'Упакуйте товар и отправьте по указанному адресу',
    refund_step_5_title: 'Получите возврат',
    refund_step_5_desc:
      'После проверки товара мы вернем деньги в течение 7-10 дней',
    refund_what_can: 'Что можно вернуть',
    refund_can_1: 'Товар в оригинальной упаковке',
    refund_can_2: 'Изделия без следов носки',
    refund_can_3: 'Товар с сохраненными бирками',
    refund_can_4: 'Возврат в течение 14 дней',
    refund_can_5: 'Товар не подошел по размеру',
    refund_what_cannot: 'Что нельзя вернуть',
    refund_cannot_1: 'Товары индивидуального пошива',
    refund_cannot_2: 'Изделия со следами носки',
    refund_cannot_3: 'Товар без оригинальной упаковки',
    refund_cannot_4: 'Лимитированные коллекции (указано в описании)',
    refund_cannot_5: 'Возврат после 14 дней',
    refund_notice: 'Важная информация',
    refund_notice_1: 'Стоимость обратной доставки оплачивается покупателем',
    refund_notice_2:
      'Возврат средств осуществляется тем же способом, которым была произведена оплата',
    refund_notice_3:
      'Срок возврата средств: 7-10 рабочих дней после получения товара',
    refund_notice_4:
      'При возврате товара ненадлежащего качества стоимость доставки компенсируется',
    refund_help_title: 'Нужна помощь с возвратом?',
    refund_help_desc:
      'Свяжитесь с нашей службой поддержки для получения помощи.',
    faq_no_answer: 'Не нашли ответ на свой вопрос?',
    faq_contact_support:
      'Обратитесь в нашу службу поддержки, и мы поможем вам.',
    contact_support: 'Связаться с поддержкой',
    partnership: 'Сотрудничество',
    faq_size_exchange:
      'Если размер не подошел, вы всегда можете обменять товар.',
    faq_a10_prefix: 'Перейдите на страницу',
    reply_24h: 'Ответим в течение 24 часов',
    working_hours_contact: 'Звоните в рабочее время',
    write_whatsapp: 'Написать в WhatsApp',
    write_telegram: 'Написать в Telegram',
    fast_messenger: 'Быстрые ответы в мессенджере',
    convenient_messenger: 'Удобное общение в мессенджере',
    follow_and_ask: 'Следите за новостями и задавайте вопросы',
    start_chat: 'Начать чат',
    faq_redirect_text:
      'Возможно, ответ на ваш вопрос уже есть в нашем разделе FAQ',
    go_to_faq: 'Перейти к FAQ',
    cooperation_form_success:
      'Спасибо за ваш интерес! Мы свяжемся с вами в ближайшее время.',
    select_collaboration_type: 'Выберите тип сотрудничества',
    wholesale: 'Опт',
    franchise: 'Франшиза',
    collaboration: 'Коллаборация',
    message_placeholder: 'Расскажите подробнее о ваших планах...',
    our_works: 'Наши работы',
    gallery_photo: 'Фото из галереи',
    visit_studio: 'Посетите нашу студию',
    bestsellers: 'Хиты продаж',
    public_offer: 'Публичная оферта',
    privacy_policy: 'Политика конфиденциальности',
    all_rights_reserved: 'Все права защищены.',
    added_to_cart: 'Добавлено в корзину',
    load_more: 'Загрузить еще',
    'journal.heroTitle': 'INOYA JOURNAL',
    'journal.heroSubtitle':
      'Откройте для себя мир высокой моды, стиля и элегантности. Вдохновляйтесь последними трендами и создавайте неповторимые образы.',
    'journal.failLoad': 'Не удалось загрузить статьи',
    'journal.clearFilters': 'Очистить фильтры',
    'journal.featuredBadge': 'Избранная статья',
    'journal.unknownAuthor': 'Неизвестный автор',
    'journal.readArticle': 'Читать статью',
    'journal.noResults': 'По вашему запросу статей не найдено',
    'journal.loadMoreArticles': 'Загрузить еще статьи',
    'journal.additionalImages': 'Дополнительные изображения',
    'journal.imageAlt': 'изображение {index}',
    'journal.minutesRead': '{count} мин чтения',
    'journal.searchPlaceholder': 'Поиск статей по ключевым словам',

    /** ----------- newsletter section ----------- */
    'newsletter.title': 'Не пропустите новые статьи',
    'newsletter.subtitle':
      'Подписывайтесь на нашу рассылку и первыми узнавайте о новых трендах, стильных образах и эксклюзивных коллекциях INOYA.',
    'newsletter.emailPlaceholder': 'Ваш email адрес',
    'newsletter.subscribe': 'Подписаться',

    /** ----------- generic/common ----------- */
    'common.loading': 'Загрузка...',
    'girls.heroTitle': 'INOYA GIRLS',
    'girls.heroSubtitle': 'Наши прекрасные клиентки в нарядах INOYA',
    'girls.searchPlaceholder': 'Поиск по имени или описанию…',
    'girls.sort': 'Сортировка',
    'girls.sortPriority': 'По приоритету',
    'girls.sortNewest': 'Сначала новые',
    'girls.clearFilters': 'Очистить фильтры',
    'girls.loadError': 'Ошибка при загрузке данных',
    'girls.likeSuccess': 'Лайк успешно поставлен',
    'girls.likeFailed': 'Не удалось поставить лайк',
    'girls.notFound': 'Пост не найден',
    'girls.noResults': 'По вашему запросу ничего не найдено',
    'girls.resetFilters': 'Сбросить все фильтры',
    'girls.loadMore': 'Загрузить ещё',
    'girls.ctaTitle': 'Присоединяйтесь к сообществу INOYA',
    'girls.ctaText':
      'Каждая наша клиентка — источник вдохновения. Вместе мы создаём неповторимый стиль и элегантность.',
    'girls.ctaLink': 'Посмотреть каталог',
    'girls.thumbnail': 'Миниатюра',
    'girls.aboutClient': 'О клиентке',

    'auth.pleaseLogin': 'Пожалуйста, войдите в систему, чтобы ставить лайки',
    // New content for the form and initial policy
    how_to_return_exchange: 'Как оформить возврат или обмен?',
    return_exchange_quality_intro:
      'Возврат и обмен товара ненадлежащего качества, купленного в стандартных размерах, возможен в течение 14 дней с момента получения заказа. Для успешных возврата или обмена первоначальная упаковка товара, бирки и ярлыки должны быть сохранены. На самом товаре должны отсутствовать следы носки. Пожалуйста, при первой примерке товара надевайте его поверх нижнего белья. Мы оставляем за собой право отказать в возврате или обмене изделия, которое содержит признаки носки и не соответствует перечисленным выше критериям.',
    custom_items_no_return:
      'Изделия, сшитые по индивидуальных параметрам, возврату и обмену не подлежат.',
    refund_of_funds: 'Возврат средств',
    refund_process_details:
      'После того, как товар для возврата или обмена будет получен, в течение 1-3 рабочих дней он будет проверен на соответствие критериям. О результатах проверки вы будете уведомлены дополнительно по электронной почте. Если возврат или обмен принят, денежные средства поступят на счет в течение 7-10 рабочих дней в зависимости от процесса обработки операций вашим банком.',
    inoya_slogan:
      'Для оформления возврата или обмена заполните форму обратной связи:',
    email_label: 'Почта',
    phone_label: 'Номер телефона',
    attach_photos_label: 'Прикрепить фотографии (до 5 шт.)',
    submit_request: 'Отправить запрос',
    file_upload_placeholder: 'Выберите файлы...',
    selected_files: 'Выбранные файлы:',

    // Detailed policy points (from user's long text)
    policy_general_provisions: 'Общие положения',
    policy_1_1:
      'Обмен товара надлежащего качества возможен, если сохранены его товарный вид (упаковка, пломбы, ярлыки и т.д.), потребительские свойства, а также имеется документ, подтверждающий факт покупки товара (чек, электронный документ, бланк заказа, подтверждение перевода денежных средств).',
    policy_1_2:
      'В случае обмена товара надлежащего качества, расходы на доставку товара от Продавца до Покупателя оплачиваются Покупателем. Стоимость доставки возвращаемого товара Продавцу Покупателю не компенсируется.',
    policy_1_3:
      'Для возврата или обмена бракованного товара на аналогичный, Покупатель обязан сообщить нам о проблеме любым удобным способом связи.',
    policy_1_4:
      'Возврат денежных средств за возвращенный товар производится в течение 10 рабочих дней с момента его поступления на склад Продавца, в соответствии с законодательством РК (ст. 21 Закона РК «О защите прав потребителей»).',
    policy_1_5:
      'Возврат денежных средств осуществляется на расчетный счет Покупателя, если заказ был оплачен онлайн, или на счёт, реквизиты которого указаны в онлайн форме Заявления на возврат, если оплата была произведена при получении товара.',
    policy_1_6:
      'Если аналогичный товар отсутствует в продаже на момент обращения Покупателя, Покупатель вправе отказаться от исполнения настоящего Соглашения и потребовать возврата уплаченной суммы за товар. Продавец обязан вернуть деньги в течение 10 рабочих дней с момента возврата товара.',
    policy_1_7:
      'Покупатель вправе потребовать возврат полной суммы заказа, включая доставку, если заказ не был передан в службу доставки и еще находится на складе магазина https://inoyamodern.com.',
    policy_1_8:
      'Изменения персональных данных Покупателя или состава заказа производятся бесплатно, если оплаченный заказ еще не покинул склад магазина и не был передан в службу доставки. В противном случае затраты на доставку не компенсируются.',
    policy_return_quality_goods: '2. Возврат товара надлежащего качества',
    policy_2_1:
      'Клиент вправе запросить возврат товара, представленного в каталоге Продавца, в любое время до его получения. В течение 14 календарных дней с момента получения товара (не считая дня получения) Клиент может осуществить обмен товара надлежащего качества при соблюдении следующих условий:',
    policy_2_1_bullet_1:
      'Сохранение товарного вида товара (упаковка, пломбы, ярлыки и т.д.);',
    policy_2_1_bullet_2:
      'Товар не был в употреблении (отсутствуют следы использования);',
    policy_2_1_bullet_3: 'Сохранение потребительских свойств товара;',
    policy_2_1_bullet_4:
      'Наличие подтверждения покупки (чек, бланк заказа, накладная) в случае, если товар был приобретен в других местах реализации, кроме официального интернет-магазина https://inoyamodern.com.',
    policy_2_2:
      'При обмене товара надлежащего качества доставка товара от Клиента к Продавцу осуществляется за счет Клиента.',
    policy_2_3:
      'Для осуществления обмена или возврата товара Клиенту необходимо заполнить онлайн форму, доступную на сайте https://inoyamodern.com.',
    policy_2_4:
      'После заполнения формы Клиент должен дождаться рассмотрения претензии, срок которой составляет не более 2 рабочих дней. В результате рассмотрения заявки Клиент будет проинформирован через SMS и e-mail, куда также будет направлена подробная инструкция по дальнейшим действиям Клиента в случае положительного решения по обращению.',
    policy_2_5:
      'После получения уведомления о рассмотрении претензии, в течение 7 рабочих дней Клиенту необходимо отправить товар обратно Продавцу, воспользовавшись одним из следующих способов:',
    policy_2_5_bullet_1:
      'Международная почта (адрес для возврата будет предоставлен при оформлении возврата);',
    policy_2_5_bullet_2:
      'Почта Казахстана (адрес для возврата будет предоставлен при оформлении возврата);',
    policy_2_5_bullet_3:
      'Транспортная компания СДЭК (адрес для возврата будет предоставлен при оформлении возврата);',
    policy_2_5_bullet_4:
      'Лично по адресу Продавца (точный адрес в Алматы будет предоставлен при оформлении возврата).',
    policy_2_6:
      'Некоторые товары из ассортимента могут не подлежать возврату, если они предоставлены в надлежащем состоянии.',
    policy_2_6_items:
      'К таким товарам относятся: нижнее белье, косметические средства, товары для личного использования и товары, относящиеся к категории корсетных изделий. При этом Продавец оставляет за собой право индивидуально рассматривать каждую ситуацию, но не обязан осуществлять возврат товаров данной категории.',
    policy_exchange_defective_goods: '3. Обмен товара ненадлежащего качества',
    policy_3_1:
      'Срок обмена бракованного товара составляет 90 календарных дней с даты получения товара, не считая дня получения. Это срок гарантии, заявленный производителем.',
    policy_3_2: 'К гарантийным случаям не относятся:',
    policy_3_2_bullet_1:
      'Механические повреждения, которые объективно не могли возникнуть при обычных условиях использования, такие как порезы, разрывы, повреждения от воздействия сторонних предметов;',
    policy_3_2_bullet_2: 'Пятна, потертости, следы использования товара;',
    policy_3_2_bullet_3:
      'Расхождение швов, вызванное неправильным использованием товара;',
    policy_3_2_bullet_4:
      'Механические повреждения, не связанные с использованием товара.',
    policy_3_2_guarantee_cases: 'К гарантийным случаям относятся:',
    policy_3_2_guarantee_bullet_1: 'Отсутствие крючков или застежек;',
    policy_3_2_guarantee_bullet_2: 'Поломка ребер жесткости;',
    policy_3_2_guarantee_bullet_3:
      'Разрыв материала в случае, если ребра жесткости вылезли из пазов;',
    policy_3_2_guarantee_bullet_4:
      'Брак ткани, используемой при производстве товара;',
    policy_3_2_guarantee_bullet_5:
      'Непроизвольные повреждения, разрывы, расхождение швов в процессе обычного использования.',
    policy_3_3:
      'Для возврата или обмена товара ненадлежащего качества Клиенту необходимо заполнить онлайн форму, доступную по адресу https://inoyamodern.com/vozvrat-obmen.',
    policy_3_4:
      'После заполнения формы Клиент должен дождаться рассмотрения претензии. Срок рассмотрения — не более 2 рабочих дней. После рассмотрения заявки Клиент будет уведомлен по SMS или e-mail, где будет указана подробная инструкция по дальнейшим действиям, если обращение получит положительное решение.',
    policy_3_5:
      'После получения уведомления о рассмотрении претензии Клиенту необходимо отправить товар обратно Продавцу в течение 7 рабочих дней. Это можно сделать через:',
    policy_3_5_bullet_1: 'Почту Казахстана (указать адрес для возврата),',
    policy_3_5_bullet_2: 'Международную почту (указать адрес для возврата),',
    policy_3_5_bullet_3:
      'Транспортную компанию СДЭК (указать адрес для возврата),',
    policy_3_5_bullet_4:
      'Лично по адресу Продавца в Алматы (указать точный адрес).',
    policy_3_5_delivery_cost:
      'При возврате товара ненадлежащего качества доставка осуществляется за счет Продавца.',
    policy_3_6:
      'Клиент имеет право на проведение независимой экспертизы товара для выявления производственного брака, если Продавец не согласен с причиной возникновения дефекта.',
    policy_3_7:
      'Продавец также имеет право провести независимую экспертизу товара для выявления следов использования и производственного брака. В случае, если виновность Продавца в производственном браке будет подтверждена, стоимость проведения экспертизы будет компенсирована Покупателю.',
    policy_3_8: 'Политика по частичной замене',
    policy_3_8_desc:
      'Если товар состоит из нескольких частей или комплекта, и поврежден только один элемент, возможно частичное возвращение или обмен только поврежденного элемента.',
    policy_3_9: 'Условия возврата и обмена в случае повреждения упаковки',
    policy_3_9_desc:
      'При получении товара Клиент обязан проверить товар и упаковку на наличие повреждений. В случае обнаружения повреждений упаковки или товара, Клиент обязуется немедленно сообщить об этом Продавцу.',
    policy_grounds_for_refusal: '4. Основания для отказа в приеме претензии',
    policy_4_1:
      'Магазин https://inoyamodern.com не рассматривает и не принимает претензии в отношении товара, который имеет следы использования, включая (но не ограничиваясь) грязь, следы биологического происхождения, механические повреждения, деформацию, нарушение целостности товара, отсутствие или повреждение ярлыков, бирок, стикеров на упаковке, а также несоответствие заявленному объему продукта (в случае с косметикой — следы использования).',
    policy_4_2:
      'В случае обнаружения вышеперечисленных следов использования, заявление (претензия) клиента не будет удовлетворено, а денежные средства не возвращаются.',
    policy_4_3:
      'Товар, приобретенный по акции, подлежит возврату только в случае выявления дефекта или брака, возникшего по вине производителя.',
    policy_4_4: 'Товары, изготовленные по индивидуальному заказу',
    policy_4_4_desc:
      'Если товар был изготовлен по индивидуально-определенным характеристикам (например, по заказу клиента, с уникальными размерами, цветом или другими персонализированными элементами), клиент не вправе отказаться от такого товара, даже если он соответствует всем заявленным качествам.',
    policy_4_5: 'Ответственность за возврат товара',
    policy_4_5_desc:
      'До момента получения товара Продавцом, ответственность за сохранность товара при возврате лежит на Клиенте. В случае повреждения товара в процессе возврата, ответственность за повреждения несет Клиент.',
    policy_agreement_confirmation:
      'Оформляя заказ через сайт https://inoyamodern.com, вы подтверждаете свое добровольное согласие с данными Правилами возврата и обмена товара, изложенными выше.',

    // New Delivery and Payment content
    delivery_and_payment_title: 'Доставка и Оплата',
    delivery_methods_title: 'Способы доставки',
    delivery_method_courier: 'Курьерская служба (RIKA, CDEK, Kazpost и т.д.)',
    delivery_method_international_mail: 'Международная почта',
    delivery_method_express: 'Экспресс доставка (по запросу)',
    delivery_cost_time_title: 'Стоимость и время доставки',
    delivery_cost_auto_calc:
      'Стоимость доставки рассчитывается автоматически в процессе оформления заказа, в зависимости от вашего местоположения.',
    delivery_time_varies:
      'Время доставки может варьироваться в зависимости от региона и выбранного способа доставки.',
    delivery_free_kz:
      'Бесплатная доставка по Казахстану — для заказов от 100 000₸',
    delivery_free_international:
      'Бесплатная доставка в другие страны — для заказов от 600$. Для меньших сумм — 50$.',
    delivery_terms_title: 'Сроки доставки',
    delivery_terms_order_processing:
      'Формирование заказа: от 1 до 3 рабочих дней после полной оплаты.',
    delivery_terms_holidays:
      'Сроки зависят от выбранной службы доставки и могут увеличиться в праздничные дни.',
    how_to_receive_order_title: 'Как получить заказ?',
    how_to_receive_post:
      'Почта: получение в пункте выдачи по вашему почтовому индексу.',
    how_to_receive_courier:
      'Курьерская доставка: курьер свяжется с вами заранее для уточнения времени.',
    cancellation_return_title: 'Отмена и возврат',
    cancellation_return_shipping_cost:
      'Если заказ уже передан в транспортную компанию, покупатель оплачивает транспортные расходы.',
    cancellation_return_policy_link:
      'Возврат товара возможен в течение 14 дней с момента получения (условия для возврата смотрите в разделе «Возврат и обмен»).',
    payment_methods_main_title: 'Способы оплаты', // Renamed to avoid conflict with existing payment_methods
    payment_methods_intro: 'Мы принимаем следующие способы оплаты:',
    payment_e_wallets: 'Электронные кошельки: PayPal, Google Pay, Apple Pay',
    payment_for_russia:
      'Для клиентов из России: Оплата через Сбербанк, Альфа-Банк, ВТБ, Тинькофф и т.д. (реквизиты можно получить, написав в WhatsApp или Telegram).',
    support_contacts_title: 'Контакты службы поддержки',
    support_email: 'Email:',
    support_phone: 'Телефон: +7 771 141 08 48',
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

  const t = (key: string, params?: Record<string, unknown>): string => {
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
