import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { QuickMenu } from '@/components/quick-menu';

const resorts = [
  {
    id: 1,
    name: 'Phoenix Pyeongchang',
    location: 'Gangwon',
    image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=2070',
  },
  {
    id: 2,
    name: 'Seorak Sorano',
    location: 'Gangwon',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
  },
  {
    id: 3,
    name: 'Jeju Pinnacle',
    location: 'Jeju',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780',
  },
  {
    id: 4,
    name: 'Geoje Marina',
    location: 'Gyeongsang',
    image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1974',
  },
  {
    id: 5,
    name: 'Yangpyeong Valley',
    location: 'Gyeonggi',
    image: 'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0',
  },
  {
    id: 6,
    name: 'Baegam Lake',
    location: 'Gyeonggi',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResorts = resorts.filter(resort =>
    resort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resort.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4">
          <QuickMenu />
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              className="pl-10 h-12 text-lg"
              placeholder="Search resorts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredResorts.map((resort) => (
            <Card
              key={resort.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/resort/${resort.id}`)}
            >
              <CardContent className="p-0">
                <div className="relative h-48">
                  <img
                    src={resort.image}
                    alt={resort.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{resort.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      {resort.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => navigate('/map')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            size="lg"
          >
            <MapPin className="h-5 w-5" />
            View Map
          </Button>
        </div>
      </div>
    </div>
  );
}