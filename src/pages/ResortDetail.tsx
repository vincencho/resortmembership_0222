import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Phone,
  Mail,
  Globe,
} from 'lucide-react';

const resorts = {
  1: {
    name: 'Phoenix Pyeongchang',
    location: 'Gangwon',
    image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=2070',
    description: '평창 피닉스파크는 스키와 골프를 모두 즐길 수 있는 사계절 종합 리조트입니다. 최고급 시설과 서비스로 고객님께 특별한 경험을 제공합니다.',
    address: '강원도 평창군 봉평면 태기로 174',
    phone: '033-1234-5678',
    email: 'phoenix@example.com',
    website: 'www.phoenix.com',
    amenities: [
      '스키장',
      '골프장',
      '수영장',
      '스파',
      '레스토랑',
      '피트니스 센터',
    ],
  },
  2: {
    name: 'Seorak Sorano',
    location: 'Gangwon',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
    description: '설악 소라노는 동해의 아름다운 전망과 함께하는 프리미엄 리조트입니다. 최신식 시설과 편안한 휴식을 제공합니다.',
    address: '강원도 속초시 대포항길 186',
    phone: '033-8765-4321',
    email: 'sorano@example.com',
    website: 'www.sorano.com',
    amenities: [
      '프라이빗 비치',
      '인피니티 풀',
      '스파',
      '요가 스튜디오',
      '씨푸드 레스토랑',
      '키즈클럽',
    ],
  },
};

export default function ResortDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const resort = resorts[Number(id)];

  if (!resort) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resort not found</h1>
          <Button onClick={() => navigate('/home')}>Go back home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-2xl font-bold">{resort.name}</h1>
          <p className="text-muted-foreground">{resort.location}</p>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={resort.image}
          alt={resort.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold mb-4">리조트 소개</h2>
          <p className="text-muted-foreground leading-relaxed">
            {resort.description}
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{resort.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>{resort.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>{resort.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <span>{resort.website}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">주요 시설</h3>
              <div className="grid grid-cols-2 gap-3">
                {resort.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Membership CTA */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  멤버십 프로그램
                </h3>
                <p className="text-muted-foreground">
                  특별한 혜택과 함께 리조트를 더욱 특별하게 즐기세요.
                </p>
              </div>
              <Button
                onClick={() => navigate('/products')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                멤버십 상품 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}