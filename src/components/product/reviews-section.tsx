'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const { t } = useLanguage();
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="border-t pt-8">
        <h3 className="mb-4 text-xl font-bold">{t('customer_reviews')}</h3>

        {/* Rating Summary */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="font-medium">{averageRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-600">
            ({totalReviews} {t('reviews')})
          </span>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{review.author}</span>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-6 bg-transparent">
          {t('write_a_review')}
        </Button>
      </div>
    </div>
  );
}
