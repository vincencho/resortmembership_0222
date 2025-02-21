import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowLeft, ArrowRight, Bold as Golf, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { locations, Location } from '@/lib/locations';

export default function MapView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = locations.filter(
    (location) =>
      (selectedRegion === 'all' || location.region === selectedRegion) &&
      (location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">사업장 찾기</h1>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-9"
                placeholder="사업장 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedRegion}
              onValueChange={setSelectedRegion}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="강원">강원도</SelectItem>
                <SelectItem value="경기">경기도</SelectItem>
                <SelectItem value="경상">경상도</SelectItem>
                <SelectItem value="제주">제주도</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-132px)]">
        {/* Map Area */}
        <div className="w-1/2 relative border-r">
          <div className="absolute inset-0 bg-neutral-100">
            {/* Temporary Map Image */}
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2069"
              alt="Map"
              className="w-full h-full object-cover opacity-50"
            />
            {/* Markers */}
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full 
                  ${selectedLocation?.id === location.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-foreground hover:bg-primary/10'}`}
                style={{
                  left: `${((location.longitude - 126) / 3) * 100}%`,
                  top: `${((38 - location.latitude) / 3) * 100}%`,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                {location.type === 'golf' ? (
                  <Golf className="h-5 w-5" />
                ) : (
                  <Building2 className="h-5 w-5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Location List */}
        <div className="w-1/2 overflow-auto">
          <div className="p-4 space-y-4">
            {filteredLocations.map((location) => (
              <Card
                key={location.id}
                className={`cursor-pointer transition-colors ${
                  selectedLocation?.id === location.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={location.image}
                        alt={location.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{location.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {location.address}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
                          {location.type === 'golf' ? (
                            <Golf className="h-4 w-4 text-primary" />
                          ) : (
                            <Building2 className="h-4 w-4 text-primary" />
                          )}
                          <span className="text-sm font-medium text-primary">
                            {location.type === 'golf' ? '골프장' : '리조트'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {location.description}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/resort/${location.id}`);
                        }}
                      >
                        자세히 보기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}