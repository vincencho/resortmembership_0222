import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftCircle,
  ArrowRightCircle,
  Calendar,
  Users,
  Bed,
  Timer,
  Share2,
} from 'lucide-react';

const product = {
  id: 1,
  name: 'Premium Suite Membership',
  type: 'Luxury Room',
  price: '₩ 150,000,000',
  shareType: '1/4 지분',
  duration: '30년',
  capacity: '4인',
  checkIn: '15:00',
  images: [
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070',
    'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2070',
    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2074',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
  ],
  description: '프리미엄 스위트 멤버십은 한화리조트의 최상급 객실 타입으로, 넓은 공간과 고급스러운 인테리어, 최신 시설을 자랑합니다. 회원님들께 특별한 휴식과 프라이빗한 경험을 제공합니다.',
  features: [
    '전용 체크인/체크아웃 서비스',
    '전용 라운지 이용',
    '스파 무료 이용 (월 2회)',
    '발렛 파킹 서비스',
    '조식 무료 제공',
    '미니바 무료',
  ],
  availableDates: [
    '성수기 (7/15-8/24)',
    '주말 및 공휴일',
    '비수기 평일',
  ],
};

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.type}</p>
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] bg-black">
        <img
          src={product.images[currentImageIndex]}
          alt={`Product image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-black/20"
            onClick={prevImage}
          >
            <ArrowLeftCircle className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-black/20"
            onClick={nextImage}
          >
            <ArrowRightCircle className="h-8 w-8" />
          </Button>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {product.images.length}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        {/* Key Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <Share2 className="h-6 w-6 text-primary" />
              <p className="text-sm font-medium">{product.shareType}</p>
              <p className="text-xs text-muted-foreground">지분형태</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <Calendar className="h-6 w-6 text-primary" />
              <p className="text-sm font-medium">{product.duration}</p>
              <p className="text-xs text-muted-foreground">계약기간</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <Users className="h-6 w-6 text-primary" />
              <p className="text-sm font-medium">{product.capacity}</p>
              <p className="text-xs text-muted-foreground">기준인원</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <Timer className="h-6 w-6 text-primary" />
              <p className="text-sm font-medium">{product.checkIn}</p>
              <p className="text-xs text-muted-foreground">체크인</p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-4">상품 설명</h2>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-semibold mb-4">회원 특전</h2>
          <ul className="space-y-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Available Dates */}
        <div>
          <h2 className="text-xl font-semibold mb-4">이용 가능 기간</h2>
          <div className="space-y-2">
            {product.availableDates.map((date, index) => (
              <div key={index} className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">멤버십 가격</p>
            <p className="text-2xl font-bold">{product.price}</p>
          </div>
          <Button
            onClick={() => navigate('/contract/new')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            계약 진행하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}