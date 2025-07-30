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
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/lib/language-context';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Search,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Types based on your API response
interface JournalPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  images: string[];
  author: {
    _id: string;
    name: string;
  };
  tags: string[];
  category: string;
  isPublished: boolean;
  slug: string;
  viewCount: number;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    posts: JournalPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    filters: {
      categories: string[];
    };
  };
}

export default function JournalPage() {
  const { t, language } = useLanguage();

  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Modal state
  const [selectedPost, setSelectedPost] = useState<JournalPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Fetch data from API
  const fetchPosts = async (page = 1, append = false) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(selectedCategory && { category: selectedCategory }),
        ...(featuredOnly && { featured: 'true' }),
        ...(selectedTags.length > 0 && { tags: selectedTags.join(',') }),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(
        `https://inoya-back-production.up.railway.app/api/journal?${params}`
      );
      const data: ApiResponse = await response.json();

      if (data.success) {
        if (append) {
          setPosts((prev) => [...prev, ...data.data.posts]);
        } else {
          setPosts(data.data.posts);
        }
        setPagination(data.data.pagination);
        setAvailableCategories(data.data.filters.categories);
      } else {
        toast.error(data.message || t('journal.failLoad'));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error(t('journal.failLoad'));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts(1, false);
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedTags, searchQuery, featuredOnly]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const loadMore = () => {
    if (pagination.page < pagination.pages) {
      fetchPosts(pagination.page + 1, true);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedCategory('');
    setFeaturedOnly(false);
  };

  const formatDate = (dateString: string) => {
    const locale = language === 'en' ? 'en-EN' : 'ru-RU';
    return new Date(dateString).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Modal functions
  const openPostModal = (post: JournalPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Get all unique tags from posts
  const availableTags = [...new Set(posts.flatMap((post) => post.tags))];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <Header />
      <section className="relative mt-14 bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-16">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-5xl font-bold tracking-tight">
              {t('journal.heroTitle')}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {t('journal.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b px-4 py-6">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="text"
                placeholder={t('journal.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tag Filter */}
          {availableTags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {selectedTags.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6"
                >
                  {t('journal.clearFilters')}
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          // Loading skeleton
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[16/10] w-full" />
                <CardContent className="p-6">
                  <Skeleton className="mb-3 h-6 w-3/4" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-4 h-4 w-2/3" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {posts.length > 0 && posts[0].featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <Card className="border-primary/20 overflow-hidden border-2">
                  <div className="grid gap-0 md:grid-cols-2">
                    <div className="relative aspect-[16/10] md:aspect-auto">
                      <img
                        src={
                          posts[0].images[0]
                            ? posts[0].images[0]
                            : '/placeholder.svg'
                        }
                        alt={posts[0].title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="bg-primary absolute top-4 left-4">
                        {t('journal.featuredBadge')}
                      </Badge>
                    </div>
                    <CardContent className="flex flex-col justify-center p-8">
                      <h2 className="mb-4 text-2xl leading-tight font-bold">
                        {posts[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {posts[0].excerpt}
                      </p>
                      <div className="text-muted-foreground mb-6 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {posts[0].author?.name ||
                              t('journal.unknownAuthor')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(posts[0].publishedAt)}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-fit"
                        onClick={() => openPostModal(posts[0])}
                      >
                        {t('journal.readArticle')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Posts Grid */}
            <AnimatePresence>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice(posts[0]?.featured ? 1 : 0).map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      className="group h-full cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
                      onClick={() => openPostModal(post)}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={
                            post.images[0] ? post.images[0] : '/placeholder.svg'
                          }
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                      </div>

                      <CardContent className="flex flex-col p-6">
                        <h3 className="group-hover:text-primary mb-3 text-lg leading-tight font-semibold transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow text-sm">
                          {post.excerpt}
                        </p>

                        <Separator className="mb-4" />

                        <div className="text-muted-foreground flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author?.name || t('journal.unknownAuthor')}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}

        {/* No Results */}
        {!loading && posts.length === 0 && (
          <div className="py-16 text-center">
            <BookOpen className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground mb-4">
              {t('journal.noResults')}
            </p>
            <Button variant="outline" onClick={clearFilters}>
              {t('journal.clearFilters')}
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {!loading && posts.length > 0 && pagination.page < pagination.pages && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={loadingMore}
              className="px-8"
            >
              {loadingMore
                ? t('common.loading')
                : t('journal.loadMoreArticles')}
            </Button>
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">{t('newsletter.title')}</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            {t('newsletter.subtitle')}
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder={t('newsletter.emailPlaceholder')}
              className="flex-1"
            />
            <Button>{t('newsletter.subscribe')}</Button>
          </div>
        </div>
      </section>

      {/* Post Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl p-0">
          {selectedPost && (
            <div className="flex h-full flex-col">
              {/* Modal Header */}
              <DialogHeader className="border-b p-6 pb-4">
                <DialogTitle className="pr-8 text-2xl leading-tight font-bold">
                  {selectedPost.title}
                </DialogTitle>

                {/* Post Meta */}
                <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {selectedPost.author?.name || t('journal.unknownAuthor')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedPost.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {t('journal.minutesRead', {
                      count: getReadingTime(selectedPost.content),
                    })}
                  </span>
                </div>
              </DialogHeader>

              {/* Modal Content */}
              <div className="max-h-[400px] flex-1 overflow-y-auto p-6 lg:max-h-[600px]">
                <div className="space-y-6">
                  {/* Featured Image */}
                  {selectedPost.images.length > 0 && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <img
                        src={selectedPost.images[0]}
                        alt={selectedPost.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Excerpt */}
                  {selectedPost.excerpt && (
                    <div className="text-muted-foreground border-primary border-l-4 pl-4 text-lg leading-relaxed font-medium">
                      {selectedPost.excerpt}
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose prose-gray max-w-none">
                    <div
                      className="text-base leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: selectedPost.content.replace(/\n/g, '<br />'),
                      }}
                    />
                  </div>

                  {/* Additional Images */}
                  {selectedPost.images.length > 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        {t('journal.additionalImages')}
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {selectedPost.images.slice(1).map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-video overflow-hidden rounded-lg"
                          >
                            <img
                              src={image}
                              alt={`${selectedPost.title} - ${t('journal.imageAlt', { index: index + 2 })}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
