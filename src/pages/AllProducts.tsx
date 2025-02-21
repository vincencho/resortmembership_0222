import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowLeft, ArrowRight, Timer, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const products = [
  {
    id: 1,
    name: 'Premium Suite Membership',
    type: 'Luxury Room',
    price: '₩ 150,000,000',
    shareType: '1/4 지분',
    duration: '30년',
    capacity: '4인',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070',
    location: '평창',
  },
  {
    id: 2,
    name: 'Deluxe Pool Villa',
    type: 'Private Villa',
    price: '₩ 280,000,000',
    shareType: '1/2 지분',
    duration: '40년',
    capacity: '6인',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
    location: '제주',
  },
  {
    id: 3,
    name: 'Ocean View Suite',
    type: 'Premium Room',
    price: '₩ 120,000,000',
    shareType: '1/4 지분',
    duration: '25년',
    capacity: '3인',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2070',
    location: '속초',
  },
  {
    id: 4,
    name: 'Garden Suite',
    type: 'Family Room',
    price: '₩ 180,000,000',
    shareType: '1/3 지분',
    duration: '35년',
    capacity: '5인',
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2074',
    location: '거제',
  },
];

export default function AllProducts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredProducts = products.filter(
    (product) =>
      (selectedLocation === 'all' || product.location === selectedLocation) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <h1 className="text-2xl font-bold">멤버십 상품</h1>
          <p className="text-muted-foreground">Available Memberships</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              className="pl-10"
              placeholder="상품명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedLocation}
            onValueChange={setSelectedLocation}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="지역 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="평창">평창</SelectItem>
              <SelectItem value="제주">제주</SelectItem>
              <SelectItem value="속초">속초</SelectItem>
              <SelectItem value="거제">거제</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="w-full h-48 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      {product.location}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-muted-foreground">{product.type}</p>
                    <p className="font-bold">{product.price}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{product.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer className="h-4 w-4" />
                      <span>{product.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{product.shareType}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}