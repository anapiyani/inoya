'use client';

import { Header } from '@/components/layout/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth-context';
import { useCurrency } from '@/lib/currency-context';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Mail,
  MapPin,
  Package,
  Phone,
  Save,
  Truck,
  User,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// API Base URL
const API_BASE_URL = 'https://inoya-back-production.up.railway.app/api';

// Types for user data
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  photo: string;
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'cash' | 'card';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderNumber: string;
  notes?: string;
  deliveredAt?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  success: boolean;
  data: Order[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalOrders: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const statusLabels: Record<string, string> = {
  pending: 'Ожидает подтверждения',
  confirmed: 'Подтверждён',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-orange-100 text-orange-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentStatusLabels: Record<string, string> = {
  pending: 'Ожидает оплаты',
  paid: 'Оплачен',
  failed: 'Ошибка оплаты',
  refunded: 'Возвращён',
};

const paymentMethodLabels: Record<string, string> = {
  cash: 'Наличные при получении',
  card: 'Банковская карта',
};

export default function UserProfilePage() {
  const { user: authUser, isAuthenticated, isLoading: authLoading } = useAuth();
  const { formatPrice } = useCurrency();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalOrders: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnForm, setReturnForm] = useState({
    reason: '',
    description: '',
    photos: [] as File[],
  });
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Edit form state
  const [editForm, setEditForm] = useState<UserProfile | null>(null);

  // Fetch user profile from authenticated user
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      if (authUser) {
        const userProfile: UserProfile = {
          _id: authUser._id,
          name: authUser.name,
          email: authUser.email,
          phone: authUser.phone,
          createdAt: authUser.createdAt,
          updatedAt: authUser.updatedAt,
        };
        setUser(userProfile);
        setEditForm(userProfile);
      }
    } catch (error) {
      console.error('Error setting user profile:', error);
      toast.error('Не удалось загрузить профиль');
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders from API
  const fetchOrders = async (page = 1, append = false) => {
    if (!isAuthenticated) return;
    try {
      if (page === 1) setLoadingOrders(true);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Не удалось получить токен авторизации');
        return;
      }
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      console.log('Fetching orders with params:', params.toString());
      const response = await fetch(
        `${API_BASE_URL}/orders/my-orders?${params}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Срок действия сессии истёк. Пожалуйста, войдите снова.');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();
      console.log('Orders response:', data);
      if (data.success) {
        const filteredOrders =
          statusFilter === 'all'
            ? data.data
            : data.data.filter((order) => order.orderStatus === statusFilter);
        if (append) {
          setOrders((prev) => [...prev, ...filteredOrders]);
        } else {
          setOrders(filteredOrders);
        }
        setPagination(data.pagination);
      } else {
        toast.error('Не удалось загрузить заказы');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Ошибка при загрузке заказов');
    } finally {
      setLoadingOrders(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Не удалось получить токен авторизации');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Срок действия сессии истёк. Пожалуйста, войдите снова.');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Заказ успешно отменён');
        fetchOrders(1, false);
        setSelectedOrder(null);
        setIsOrderModalOpen(false);
      } else {
        toast.error(data.message || 'Не удалось отменить заказ');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Ошибка при отмене заказа');
    }
  };

  // Update user profile
  const handleSaveProfile = async () => {
    if (!editForm || !isAuthenticated) return;
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Не удалось получить токен авторизации');
        return;
      }
      // API call to update user profile
      const response = await fetch(`${API_BASE_URL}/users/${editForm._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      if (data.success) {
        setUser(editForm);
        setIsEditing(false);
        toast.success('Профиль успешно обновлён');
      } else {
        toast.error(data.message || 'Не удалось обновить профиль');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Не удалось обновить профиль');
    }
  };

  const handleReturnSubmit = async () => {
    if (!selectedOrder) return;
    if (!returnForm.reason || !returnForm.description) {
      toast.error('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    if (returnForm.photos.length === 0) {
      toast.error('Пожалуйста, загрузите хотя бы одно фото.');
      return;
    }
    if (returnForm.photos.length > 10) {
      toast.error('Вы можете загрузить не более 10 фотографий.');
      return;
    }
    const totalPhotosSize = returnForm.photos.reduce(
      (acc, file) => acc + file.size,
      0
    );
    if (totalPhotosSize > 5 * 1024 * 1024) {
      // 5MB
      toast.error('Общий размер фотографий не должен превышать 5 МБ.');
      return;
    }

    setIsSubmittingReturn(true);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error('Не удалось получить токен авторизации');
      setIsSubmittingReturn(false);
      return;
    }

    const formData = new FormData();
    formData.append('orderId', selectedOrder._id);
    formData.append('reason', returnForm.reason);
    formData.append('description', returnForm.description);
    returnForm.photos.forEach((file) => {
      formData.append('photos', file);
    });

    try {
      const response = await fetch(`${API_BASE_URL}/returns`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' is automatically set by browser when using FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Запрос на возврат успешно создан!');
        closeReturnModal();
        closeOrderModal();
        fetchOrders(1, false); // Refresh orders
      } else {
        toast.error(data.message || 'Не удалось создать запрос на возврат.');
      }
    } catch (error: any) {
      console.error('Error submitting return request:', error);
      toast.error(error.message || 'Ошибка при создании запроса на возврат.');
    } finally {
      setIsSubmittingReturn(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setReturnForm((prev) => ({ ...prev, photos: filesArray }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
      fetchOrders(1, false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders(1, false);
    }
  }, [statusFilter]);

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const openReturnModal = () => {
    setIsOrderModalOpen(false); // Close order details modal
    setIsReturnModalOpen(true);
    setReturnForm({ reason: '', description: '', photos: [] }); // Reset form
  };

  const closeReturnModal = () => {
    setIsReturnModalOpen(false);
    setReturnForm({ reason: '', description: '', photos: [] });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Show loading state while authenticating
  if (authLoading) {
    return (
      <div className="bg-background min-h-screen">
        <Header />
        <div className="container mx-auto mt-24 px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
              <p>Загрузка...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="bg-background min-h-screen">
        <Header />
        <div className="container mx-auto mt-24 px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <User className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h2 className="mb-2 text-xl font-semibold">Войдите в аккаунт</h2>
              <p className="text-muted-foreground">
                Для просмотра профиля необходимо войти в систему
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      {/* Page Header */}
      <header className="bg-background mt-24 border-b px-4 py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">МОЙ ПРОФИЛЬ</h1>
              <p className="text-muted-foreground mt-1">
                Управляйте своей учётной записью и заказами
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Личная информация
                </CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="mr-1 h-4 w-4" />
                    Изменить
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm(user);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="mr-1 h-4 w-4" />
                      Сохранить
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <>
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editForm?.name || ''}
                          onChange={(e) =>
                            setEditForm((prev) =>
                              prev ? { ...prev, name: e.target.value } : null
                            )
                          }
                        />
                      ) : (
                        <p className="text-sm font-medium">{user?.name}</p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editForm?.email || ''}
                          onChange={(e) =>
                            setEditForm((prev) =>
                              prev ? { ...prev, email: e.target.value } : null
                            )
                          }
                        />
                      ) : (
                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4" />
                          {user?.email}
                        </p>
                      )}
                    </div>
                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editForm?.phone || ''}
                          onChange={(e) =>
                            setEditForm((prev) =>
                              prev ? { ...prev, phone: e.target.value } : null
                            )
                          }
                        />
                      ) : (
                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          {user?.phone}
                        </p>
                      )}
                    </div>
                    <Separator />
                    {/* Registration Date */}
                    <div className="text-muted-foreground text-xs">
                      <p>Регистрация: {user && formatDate(user.createdAt)}</p>
                      <p>Обновлено: {user && formatDate(user.updatedAt)}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Orders Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Мои заказы ({pagination.totalOrders})
                  </CardTitle>
                  {/* Filters */}
                  <div className="flex gap-2">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="pending">Ожидает</SelectItem>
                        <SelectItem value="confirmed">Подтверждён</SelectItem>
                        <SelectItem value="processing">В обработке</SelectItem>
                        <SelectItem value="shipped">Отправлен</SelectItem>
                        <SelectItem value="delivered">Доставлен</SelectItem>
                        <SelectItem value="cancelled">Отменён</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loadingOrders ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="mb-2 flex items-start justify-between">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                          <Skeleton className="mb-2 h-3 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-8 text-center">
                    <Package className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                    <p className="text-muted-foreground">
                      У вас пока нет заказов
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {orders.map((order, index) => (
                        <motion.div
                          key={order._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card
                            className="cursor-pointer transition-shadow hover:shadow-md"
                            onClick={() => openOrderModal(order)}
                          >
                            <CardContent className="p-4">
                              <div className="mb-2 flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">
                                    #{order.orderNumber}
                                  </h3>
                                  <p className="text-muted-foreground text-sm">
                                    {formatDate(order.createdAt)}
                                  </p>
                                </div>
                                <Badge
                                  className={`${
                                    statusColors[order.orderStatus]
                                  } flex items-center gap-1`}
                                >
                                  {getStatusIcon(order.orderStatus)}
                                  {statusLabels[order.orderStatus]}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground text-sm">
                                    {order.orderItems.length} товар(ов)
                                  </span>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">
                                    {formatPrice(order.totalPrice)}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {paymentStatusLabels[order.paymentStatus]}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!pagination.hasPrevPage}
                          onClick={() => {
                            if (pagination.hasPrevPage) {
                              setCurrentPage(pagination.currentPage - 1);
                              fetchOrders(pagination.currentPage - 1);
                            }
                          }}
                        >
                          Предыдущая
                        </Button>
                        <span className="text-muted-foreground text-sm">
                          Страница {pagination.currentPage} из{' '}
                          {pagination.totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!pagination.hasNextPage}
                          onClick={() => {
                            if (pagination.hasNextPage) {
                              setCurrentPage(pagination.currentPage + 1);
                              fetchOrders(pagination.currentPage + 1);
                            }
                          }}
                        >
                          Следующая
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* Order Details Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-h-[90vh] w-full p-0">
          {selectedOrder && (
            <div className="flex h-full w-full flex-col">
              <DialogHeader className="border-b p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-bold">
                      Заказ #{selectedOrder.orderNumber}
                    </DialogTitle>
                    <p className="text-muted-foreground mt-1">
                      Оформлен {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      statusColors[selectedOrder.orderStatus]
                    } flex items-center gap-1`}
                  >
                    {getStatusIcon(selectedOrder.orderStatus)}
                    {statusLabels[selectedOrder.orderStatus]}
                  </Badge>
                </div>
              </DialogHeader>
              <div className="max-h-[calc(100vh-30 0px)] flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">
                      Товары в заказе
                    </h3>
                    <div className="space-y-4">
                      {selectedOrder.orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 rounded-lg border p-4"
                        >
                          <img
                            src={item.photo || '/placeholder.svg'}
                            alt={item.name}
                            className="h-16 w-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="text-muted-foreground space-y-1 text-sm">
                              <p>Размер: {item.size}</p>
                              <p>Цвет: {item.color}</p>
                              <p>Количество: {item.quantity}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  {/* Order Summary */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                    <div>
                      <h3 className="mb-4 text-lg font-semibold">
                        Адрес доставки
                      </h3>
                      <div className="text-muted-foreground text-sm">
                        <p className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                          <span>
                            {selectedOrder.shippingAddress.fullName}
                            <br />
                            {selectedOrder.shippingAddress.address}
                            <br />
                            {selectedOrder.shippingAddress.city},{' '}
                            {selectedOrder.shippingAddress.postalCode}
                            <br />
                            {selectedOrder.shippingAddress.country}
                            <br />
                            Тел: {selectedOrder.shippingAddress.phone}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  {/* Order Total */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Итого:</span>
                      <span className="text-xl font-bold">
                        {formatPrice(selectedOrder.totalPrice)}
                      </span>
                    </div>
                  </div>
                  {/* Notes */}
                  {selectedOrder.notes && (
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Примечания</h3>
                      <p className="text-muted-foreground bg-muted/50 rounded-lg p-3 text-sm">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {selectedOrder.orderStatus === 'pending' && (
                      <Button
                        onClick={() => cancelOrder(selectedOrder._id)}
                        variant="destructive"
                        size="sm"
                      >
                        Отменить заказ
                      </Button>
                    )}
                    {selectedOrder.orderStatus === 'delivered' && (
                      <Button onClick={openReturnModal} size="sm">
                        Вернуть/Обменять
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Return Request Modal */}
      <Dialog open={isReturnModalOpen} onOpenChange={setIsReturnModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Запрос на возврат/обмен</DialogTitle>
            <DialogDescription>
              Пожалуйста, заполните форму для создания запроса на возврат или
              обмен.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Причина возврата/обмена</Label>
              <Select
                value={returnForm.reason}
                onValueChange={(value) =>
                  setReturnForm((prev) => ({ ...prev, reason: value }))
                }
              >
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Выберите причину" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Не подошел размер">
                    Не подошел размер
                  </SelectItem>
                  <SelectItem value="Брак">Брак</SelectItem>
                  <SelectItem value="Передумал">Передумал</SelectItem>
                  <SelectItem value="Другое">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">
                Подробное описание (минимум 10 символов)
              </Label>
              <Textarea
                id="description"
                placeholder="Опишите проблему или причину возврата"
                value={returnForm.description}
                onChange={(e) =>
                  setReturnForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photos">
                Фотографии (до 10, макс. 5МБ каждая)
              </Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {returnForm.photos.length > 0 && (
                <div className="text-muted-foreground text-sm">
                  Выбрано файлов: {returnForm.photos.length}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeReturnModal}>
              Отмена
            </Button>
            <Button onClick={handleReturnSubmit} disabled={isSubmittingReturn}>
              {isSubmittingReturn ? 'Отправка...' : 'Отправить запрос'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
