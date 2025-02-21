export interface Location {
  id: number;
  name: string;
  type: 'resort' | 'golf';
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  region: string;
}

export const locations: Location[] = [
  {
    id: 1,
    name: 'Phoenix Pyeongchang',
    type: 'resort',
    description: '평창 피닉스파크는 스키와 골프를 모두 즐길 수 있는 사계절 종합 리조트입니다.',
    address: '강원도 평창군 봉평면 태기로 174',
    latitude: 37.5825,
    longitude: 128.3228,
    image: 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=80&w=2070',
    region: '강원',
  },
  {
    id: 2,
    name: 'Seorak Sorano',
    type: 'resort',
    description: '설악 소라노는 동해의 아름다운 전망과 함께하는 프리미엄 리조트입니다.',
    address: '강원도 속초시 대포항길 186',
    latitude: 38.1719,
    longitude: 128.6009,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025',
    region: '강원',
  },
  {
    id: 3,
    name: 'Jeju Pinnacle',
    type: 'resort',
    description: '제주 피너클은 한라산과 서귀포 바다를 모두 조망할 수 있는 럭셔리 리조트입니다.',
    address: '제주특별자치도 서귀포시 중문관광로 72번길',
    latitude: 33.2496,
    longitude: 126.4082,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780',
    region: '제주',
  },
  {
    id: 4,
    name: 'Geoje Marina',
    type: 'resort',
    description: '거제 마리나는 남해의 절경과 요트 체험을 함께 즐길 수 있는 해양 리조트입니다.',
    address: '경상남도 거제시 장목면 마리나길 123',
    latitude: 34.8884,
    longitude: 128.7169,
    image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1974',
    region: '경상',
  },
  {
    id: 5,
    name: 'Yangpyeong Valley',
    type: 'golf',
    description: '양평 밸리는 수도권 최고의 자연 경관을 자랑하는 프리미엄 골프 리조트입니다.',
    address: '경기도 양평군 옥천면 골프장길 227',
    latitude: 37.4516,
    longitude: 127.5874,
    image: 'https://images.unsplash.com/photo-1601701119533-fde50c1c979c?q=80&w=2070',
    region: '경기',
  },
  {
    id: 6,
    name: 'Baegam Lake',
    type: 'golf',
    description: '백암 레이크는 자연 친화적 설계와 최고급 시설을 갖춘 골프 클럽입니다.',
    address: '경기도 용인시 처인구 백암면 고안로 223',
    latitude: 37.1597,
    longitude: 127.3784,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
    region: '경기',
  },
];