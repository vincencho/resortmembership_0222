import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Crown,
  Calendar,
  Gift,
  Share2,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Mock data with multiple membership records
const membershipsData = {
  'M1234567': {
    id: 'M1234567',
    name: '김한화',
    type: 'Premium',
    startDate: '2024-03-20',
    endDate: '2034-03-19',
    status: 'active',
    benefits: [
      {
        id: 1,
        title: '전용 체크인/체크아웃',
        description: 'VIP 전용 카운터에서 신속한 체크인/체크아웃 서비스를 제공합니다.',
      },
      {
        id: 2,
        title: '프리미엄 라운지 이용',
        description: '24시간 운영되는 프리미엄 라운지에서 음료와 스낵을 무료로 이용하실 수 있습니다.',
      },
      {
        id: 3,
        title: '스파 무료 이용',
        description: '월 2회 스파 트리트먼트를 무료로 이용하실 수 있습니다.',
      },
      {
        id: 4,
        title: '발렛 파킹 서비스',
        description: '무료 발렛 파킹 서비스를 제공해 드립니다.',
      },
      {
        id: 5,
        title: '조식 무료 제공',
        description: '투숙 시 최대 4인까지 조식이 무료로 제공됩니다.',
      },
      {
        id: 6,
        title: '미니바 무료',
        description: '객실 내 미니바를 무료로 이용하실 수 있습니다.',
      },
    ],
  },
  '1': {
    id: '1',
    name: '이한화',
    type: 'Premium',
    startDate: '2024-03-21',
    endDate: '2034-03-20',
    status: 'active',
    benefits: [
      {
        id: 1,
        title: '전용 체크인/체크아웃',
        description: 'VIP 전용 카운터에서 신속한 체크인/체크아웃 서비스를 제공합니다.',
      },
      {
        id: 2,
        title: '프리미엄 라운지 이용',
        description: '24시간 운영되는 프리미엄 라운지에서 음료와 스낵을 무료로 이용하실 수 있습니다.',
      },
      {
        id: 3,
        title: '스파 무료 이용',
        description: '월 2회 스파 트리트먼트를 무료로 이용하실 수 있습니다.',
      },
      {
        id: 4,
        title: '발렛 파킹 서비스',
        description: '무료 발렛 파킹 서비스를 제공해 드립니다.',
      },
      {
        id: 5,
        title: '조식 무료 제공',
        description: '투숙 시 최대 4인까지 조식이 무료로 제공됩니다.',
      },
      {
        id: 6,
        title: '미니바 무료',
        description: '객실 내 미니바를 무료로 이용하실 수 있습니다.',
      },
    ],
  },
};

export default function Membership() {
  const navigate = useNavigate();
  const { membershipId } = useParams();
  const { toast } = useToast();
  const [showBenefits, setShowBenefits] = useState(false);

  // Find membership data based on ID
  const membershipData = membershipsData[membershipId || ''] || null;

  // Handle case when membership is not found
  if (!membershipData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Membership Not Found</h1>
          <p className="text-white/60">The requested membership could not be found.</p>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="text-white border-white/30 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    // In production, implement actual sharing functionality
    toast({
      title: '공유하기',
      description: '회원권 정보가 공유되었습니다.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="p-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Welcome Text */}
        <div className="text-center space-y-2 fade-in">
          <Crown className="h-12 w-12 mx-auto text-amber-400" />
          <h1 className="text-3xl font-bold mt-4">Welcome to Your Premium Membership</h1>
          <p className="text-white/60">Exclusive privileges await you</p>
        </div>

        {/* Membership Card */}
        <div className="relative mt-8 slide-up">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-400 rounded-2xl blur-xl opacity-20" />
          <Card className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 border border-amber-400/30">
            <CardContent className="p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
              
              <div className="relative space-y-6">
                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-amber-400 text-sm">Premium Member</p>
                    <h2 className="text-2xl font-bold mt-1">{membershipData.name}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm">Membership No.</p>
                    <p className="font-mono text-lg">{membershipData.id}</p>
                  </div>
                </div>

                {/* Membership Details */}
                <div className="grid grid-cols-2 gap-6 py-6">
                  <div>
                    <p className="text-white/60 text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Valid From
                    </p>
                    <p className="font-medium mt-1">{membershipData.startDate}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Valid Until
                    </p>
                    <p className="font-medium mt-1">{membershipData.endDate}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="pt-6 border-t border-white/10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/20 text-green-400">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 fade-in">
          {/* Benefits Dialog */}
          <Dialog open={showBenefits} onOpenChange={setShowBenefits}>
            <DialogTrigger asChild>
              <Button
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black"
                size="lg"
              >
                <Gift className="h-5 w-5 mr-2" />
                회원 혜택 보기
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-900 text-white border border-amber-400/30 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Premium Member Benefits</DialogTitle>
                <DialogDescription className="text-white/60">
                  프리미엄 멤버십 회원만을 위한 특별한 혜택을 확인하세요.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {membershipData.benefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <h3 className="font-medium flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-amber-400" />
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60 ml-6">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
            size="lg"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5 mr-2" />
            회원권 공유하기
          </Button>
        </div>
      </div>
    </div>
  );
}