import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, MapPin, Timer, Users } from 'lucide-react';

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
  },
];

export default function ProductList() {
  const navigate = useNavigate();

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

      {/* Product List */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                          <p className="text-muted-foreground">{product.type}</p>
                        </div>
                        <p className="text-lg font-bold">{product.price}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
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
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        className="gap-2"
                      >
                        자세히 보기
                        <ArrowRight className="h-4 w-4" />
                      </Button>
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