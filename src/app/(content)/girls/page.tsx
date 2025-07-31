'use client';

import { Header } from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/lib/api';
import { useLanguage } from '@/lib/language-context';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Grid,
  Grid3X3,
  Instagram,
  MapPin,
  Search,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Types based on your API response
interface InoyaGirl {
  _id: string;
  name: string;
  description: string;
  images: string[];
  products: Product[];
  location: string;
  profession: string;
  featured: boolean;
  isActive: boolean;
  tags: string[];
  approvalStatus: string;
  submittedBy: string;
  approvedBy?: string;
  likeCount: number;
  likedBy: string[];
  priority: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    girls: InoyaGirl[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    filters: {
      tags: string[];
    };
  };
}

export default function InoyaGirlsPage() {
  const { t, language } = useLanguage();

  const [girls, setGirls] = useState<InoyaGirl[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Modal state
  const [selectedGirl, setSelectedGirl] = useState<InoyaGirl | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'priority' | 'newest'>('priority');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  /* ----------------------------- API helpers ----------------------------- */
  const fetchGirls = async (page = 1, append = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        ...(featuredOnly && { featured: 'true' }),
        ...(selectedTags.length > 0 && { tags: selectedTags.join(',') }),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(
        `https://inoya-back-production.up.railway.app/api/inoya-girls?${params}`
      );
      const data: ApiResponse = await response.json();

      if (data.success) {
        if (append) {
          setGirls((prev) => [...prev, ...data.data.girls]);
        } else {
          setGirls(data.data.girls);
        }
        setPagination(data.data.pagination);
        setAvailableTags(data.data.filters.tags);
      } else {
        toast.error(data.message || t('girls.loadError'));
      }
    } catch (error) {
      console.error('Error fetching girls:', error);
      toast.error(t('girls.loadError'));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLike = async (girlId: string) => {
    try {
      const response = await fetch(
        `https://inoya-back-production.up.railway.app/api/inoya-girls/${girlId}/like`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' } }
      );

      if (response.ok) {
        const data = await response.json();
        setGirls((prev) =>
          prev.map((girl) =>
            girl._id === girlId
              ? { ...girl, likeCount: data.data.likeCount }
              : girl
          )
        );
        if (selectedGirl && selectedGirl._id === girlId) {
          setSelectedGirl((g) =>
            g ? { ...g, likeCount: data.data.likeCount } : null
          );
        }
        toast.success(data.message || t('girls.likeSuccess'));
      } else if (response.status === 401) {
        toast.error(t('auth.pleaseLogin'));
      } else if (response.status === 404) {
        toast.error(t('girls.notFound'));
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error(t('girls.likeFailed'));
    }
  };

  /* ----------------------------- lifecycle ------------------------------ */
  useEffect(() => {
    fetchGirls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchGirls(1, false), 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, searchQuery, sortBy, featuredOnly]);

  /* ----------------------------- helpers ----------------------------- */
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const loadMore = () => {
    if (pagination.page < pagination.pages)
      fetchGirls(pagination.page + 1, true);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setFeaturedOnly(false);
    setSortBy('priority');
  };

  const openGirlModal = (girl: InoyaGirl) => {
    setSelectedGirl(girl);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeGirlModal = () => {
    setIsModalOpen(false);
    setSelectedGirl(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedGirl && selectedGirl.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === selectedGirl.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const previousImage = () => {
    if (selectedGirl && selectedGirl.images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedGirl.images.length - 1 : prev - 1
      );
    }
  };

  const formatDate = (dateString: string) => {
    const locale = language === 'en' ? 'en-US' : 'ru-RU';
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const tagLabel = (tag: string) => tag;

  /* ------------------------------------------------------------------- */
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <Header />
      <header className="bg-background mt-24 border-b px-4 py-6">
        <div className="container mx-auto">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-wider uppercase">
              {t('girls.heroTitle')}
            </h1>
            <p className="text-muted-foreground">{t('girls.heroSubtitle')}</p>
          </div>

          {/* Search + Controls */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="text"
                placeholder={t('girls.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Sort */}
              <Select
                value={sortBy}
                onValueChange={(v) =>
                  setSortBy(v as unknown as 'priority' | 'newest')
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('girls.sort')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">
                    {t('girls.sortPriority')}
                  </SelectItem>
                  <SelectItem value="newest">
                    {t('girls.sortNewest')}
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex rounded-lg border p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'masonry' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('masonry')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tag Filter */}
          {availableTags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tagLabel(tag)}
                </Badge>
              ))}
              {selectedTags.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6"
                >
                  {t('girls.clearFilters')}
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Gallery */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4'
            }`}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[3/4] w-full" />
                <CardContent className="p-4">
                  <Skeleton className="mb-2 h-4 w-3/4" />
                  <Skeleton className="mb-1 h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4'
              }`}
            >
              {girls.map((girl, index) => (
                <motion.div
                  key={girl._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={
                    viewMode === 'masonry' ? 'mb-6 break-inside-avoid' : ''
                  }
                >
                  <Card
                    className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                    onClick={() => openGirlModal(girl)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={girl.images[0] || '/placeholder.svg'}
                        alt={girl.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="text-foreground font-semibold">
                          {girl.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-3 line-clamp-3 text-sm">
                        {girl.description}
                      </p>

                      <div className="text-muted-foreground mb-3 space-y-1 text-xs">
                        {girl.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{girl.location}</span>
                          </div>
                        )}
                        {girl.profession && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span className="text-blue-500">
                              @{girl.profession}
                            </span>
                          </div>
                        )}
                      </div>

                      {girl.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
                          {girl.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tagLabel(tag)}
                            </Badge>
                          ))}
                          {girl.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{girl.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span>{formatDate(girl.createdAt)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {!loading && girls.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground mb-4">{t('girls.noResults')}</p>
            <Button variant="outline" onClick={clearFilters}>
              {t('girls.resetFilters')}
            </Button>
          </div>
        )}

        {!loading && girls.length > 0 && pagination.page < pagination.pages && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={loadingMore}
              className="px-8"
            >
              {loadingMore ? t('common.loading') : t('girls.loadMore')}
            </Button>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <section className="bg-muted/50 px-4 py-16">
        <div className="container mx-auto text-center">
          <h3 className="mb-4 text-2xl font-semibold">{t('girls.ctaTitle')}</h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            {t('girls.ctaText')}
          </p>
          <Link href="/catalog" className="text-primary underline">
            {t('girls.ctaLink')}
          </Link>
        </div>
      </section>

      {/* Girl Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl p-0">
          {selectedGirl && (
            <div className="flex h-full flex-col">
              <DialogHeader className="border-b p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                      {selectedGirl.name}
                    </DialogTitle>
                    <div className="text-muted-foreground mt-2 flex flex-wrap gap-4 text-sm">
                      {selectedGirl.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedGirl.location}
                        </span>
                      )}
                      {selectedGirl.profession && (
                        <a
                          href={`https://instagram.com/${selectedGirl.profession}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-500 hover:underline"
                        >
                          <Instagram className="h-4 w-4" />@
                          {selectedGirl.profession}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {selectedGirl.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedGirl.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tagLabel(tag)}
                      </Badge>
                    ))}
                  </div>
                )}
              </DialogHeader>

              <div className="max-h-[600px] flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {selectedGirl.images.length > 0 && (
                    <div className="space-y-4">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                        <img
                          src={
                            selectedGirl.images[currentImageIndex] ||
                            '/placeholder.svg'
                          }
                          alt={`${selectedGirl.name} - ${currentImageIndex + 1}`}
                          className="h-full w-full object-cover"
                        />
                        {selectedGirl.images.length > 1 && (
                          <>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white"
                              onClick={previousImage}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white"
                              onClick={nextImage}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                            <div className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                              {currentImageIndex + 1} /{' '}
                              {selectedGirl.images.length}
                            </div>
                          </>
                        )}
                      </div>

                      {selectedGirl.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {selectedGirl.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                                index === currentImageIndex
                                  ? 'border-primary'
                                  : 'border-transparent hover:border-gray-300'
                              }`}
                            >
                              <img
                                src={image}
                                alt={`${t('girls.thumbnail')} ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {t('girls.aboutClient')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedGirl.description}
                    </p>
                  </div>

                  <Separator />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
