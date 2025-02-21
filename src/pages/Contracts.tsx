import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  FileText,
  Clock,
  CheckCircle,
  PauseCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

// Mock data
const contracts = [
  {
    id: '1',
    customerName: '김철수',
    productName: 'Premium Suite Membership',
    status: 'progress',
    date: '2024-03-20',
    amount: '135,000,000',
  },
  {
    id: '2',
    customerName: '이영희',
    productName: 'Deluxe Pool Villa',
    status: 'completed',
    date: '2024-03-15',
    amount: '280,000,000',
  },
  {
    id: '3',
    customerName: '박지민',
    productName: 'Ocean View Suite',
    status: 'hold',
    date: '2024-03-10',
    amount: '120,000,000',
  },
  {
    id: '4',
    customerName: '정민수',
    productName: 'Garden Suite',
    status: 'not-started',
    date: '2024-03-05',
    amount: '180,000,000',
  },
];

const statusInfo = {
  progress: {
    label: '진행중',
    icon: Clock,
    color: 'bg-blue-500',
  },
  completed: {
    label: '완료',
    icon: CheckCircle,
    color: 'bg-green-500',
  },
  hold: {
    label: '보류',
    icon: PauseCircle,
    color: 'bg-yellow-500',
  },
  'not-started': {
    label: '미진행',
    icon: XCircle,
    color: 'bg-gray-500',
  },
};

export default function Contracts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContracts = contracts.filter(contract => 
    (currentStatus === 'all' || contract.status === currentStatus) &&
    (contract.customerName.includes(searchQuery) || 
     contract.productName.includes(searchQuery))
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
          <h1 className="text-2xl font-bold">계약 관리</h1>
          <p className="text-muted-foreground">Contract Management</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-9"
              placeholder="고객명 또는 상품명으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={currentStatus}
            onValueChange={(value) => navigate(`/contracts?status=${value}`)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="상태 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="progress">진행중</SelectItem>
              <SelectItem value="completed">완료</SelectItem>
              <SelectItem value="hold">보류</SelectItem>
              <SelectItem value="not-started">미진행</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contract List */}
        <div className="space-y-4">
          {filteredContracts.map((contract) => {
            const StatusIcon = statusInfo[contract.status].icon;
            return (
              <Card
                key={contract.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/contract/${contract.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{contract.customerName}</h3>
                        <Badge
                          className={`${statusInfo[contract.status].color} text-white`}
                        >
                          {statusInfo[contract.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contract.productName}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">계약금액</p>
                        <p className="font-medium">₩ {contract.amount}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}