import { useState } from 'react';
import { useContractStore } from '@/lib/contractStore';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  PauseCircle,
  Send,
  FileText,
  User,
  Building2,
  Calendar,
  CreditCard,
  Share2,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data - Replace with API calls in production
const contractData = {
  id: '1',
  membershipId: 'M1234567',
  status: 'in_progress', // Changed from 'completed' to 'in_progress'
  productName: 'Premium Suite Membership',
  customer: {
    name: '김철수',
    phone: '010-1234-5678',
  },
  salesRep: {
    name: '이영희',
    phone: '010-9876-5432',
  },
  progress: {
    signatureCompleted: true,
    documentsSubmitted: true,
    documentsVerified: false,
    paymentCompleted: false,
  },
  attachments: [
    {
      id: '1',
      name: '신분증.jpg',
      type: 'id',
      url: '#',
      uploadedAt: '2024-03-19 14:30',
    },
    {
      id: '2',
      name: '가족관계증명서.pdf',
      type: 'document',
      url: '#',
      uploadedAt: '2024-03-19 14:31',
    },
  ],
  details: {
    type: 'individual',
    membershipType: 'named',
    shareType: 'membership',
    shareRatio: '1/4',
    roomType: 'Premium Suite',
  },
  payment: {
    total: 42000000,
    status: 'in_progress',
    schedule: [
      {
        id: '1',
        type: '계약금',
        method: '계좌이체',
        amount: 4000000,
        status: 'completed',
        completedAt: '2024-03-19 15:00',
      },
      {
        id: '2',
        type: '1차 중도금',
        method: '계좌이체',
        amount: 19000000,
        status: 'pending',
        dueDate: '2024-04-19',
      },
      {
        id: '3',
        type: '잔금',
        method: '계좌이체',
        amount: 19000000,
        status: 'pending',
        dueDate: '2024-05-19',
      },
    ],
  },
};

const statusColors = {
  not_started: 'bg-muted text-muted-foreground',
  in_progress: 'bg-primary text-primary-foreground',
  completed: 'bg-green-500 text-white',
  on_hold: 'bg-yellow-500 text-white',
};

const statusLabels = {
  not_started: '미진행',
  in_progress: '진행중',
  completed: '계약최종완료',
  on_hold: '보류',
};

export default function ContractDetail() {
  const navigate = useNavigate();
  const { contractId } = useParams();
  const { toast } = useToast();
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  
  // Replace local state with shared state
  const { status, progress, setStatus, setProgress } = useContractStore();

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as any);
    setShowStatusDialog(false);
    toast({
      title: '상태가 변경되었습니다',
      description: `계약 상태가 "${statusLabels[newStatus]}"(으)로 변경되었습니다.`,
    });
  };

  const handleProgressChange = (key: keyof typeof progress) => {
    setProgress({ [key]: !progress[key] });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: '파일이 업로드되었습니다',
        description: `${file.name} 파일이 성공적으로 업로드되었습니다.`,
      });
    }
  };

  const handlePaymentMessage = (type: 'thanks' | 'request', paymentId: string) => {
    toast({
      title: type === 'thanks' ? '감사 메시지가 발송되었습니다' : '납부요청 메시지가 발송되었습니다',
      description: '메시지가 성공적으로 발송되었습니다.',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{contractData.productName} 계약서</h1>
              <p className="text-muted-foreground">Contract #{contractId}</p>
            </div>
            <Badge
              className={`${statusColors[status]} px-4 py-2 text-sm font-medium`}
            >
              {statusLabels[status]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Customer & Sales Rep Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                고객 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">{contractData.customer.name}</p>
                  <p className="text-muted-foreground">{contractData.customer.phone}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(`/contract/${contractId}/customer`)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  고객용 계약서 보기
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                담당자 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{contractData.salesRep.name}</p>
                <p className="text-muted-foreground">{contractData.salesRep.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status & Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">진행 상태</CardTitle>
              <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
                <DialogTrigger asChild>
                  <Button>진행상태 변경</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>진행상태 변경</DialogTitle>
                    <DialogDescription>
                      계약의 진행상태와 체크항목을 변경할 수 있습니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 pt-4">
                    <div className="space-y-4">
                      <label className="text-sm font-medium">상태 선택</label>
                      <Select
                        value={status}
                        onValueChange={handleStatusChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="상태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">미진행</SelectItem>
                          <SelectItem value="in_progress">진행중</SelectItem>
                          <SelectItem value="completed">계약최종완료</SelectItem>
                          <SelectItem value="on_hold">보류</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <label className="text-sm font-medium">체크 항목</label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="signature"
                            checked={progress.signatureCompleted}
                            onCheckedChange={() => handleProgressChange('signatureCompleted')}
                          />
                          <label htmlFor="signature">서명 완료</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="documents"
                            checked={progress.documentsSubmitted}
                            onCheckedChange={() => handleProgressChange('documentsSubmitted')}
                          />
                          <label htmlFor="documents">서류 제출 완료</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="verification"
                            checked={progress.documentsVerified}
                            onCheckedChange={() => handleProgressChange('documentsVerified')}
                          />
                          <label htmlFor="verification">첨부서류 확인/이상없음</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="payment"
                            checked={progress.paymentCompleted}
                            onCheckedChange={() => handleProgressChange('paymentCompleted')}
                          />
                          <label htmlFor="payment">납부 최종 완료</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                <div className={`rounded-full p-2 ${progress.signatureCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">서명</p>
                <p className="text-xs text-muted-foreground">
                  {progress.signatureCompleted ? '완료' : '대기중'}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                <div className={`rounded-full p-2 ${progress.documentsSubmitted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <FileText className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">서류 제출</p>
                <p className="text-xs text-muted-foreground">
                  {progress.documentsSubmitted ? '완료' : '대기중'}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                <div className={`rounded-full p-2 ${progress.documentsVerified ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <AlertCircle className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">서류 확인</p>
                <p className="text-xs text-muted-foreground">
                  {progress.documentsVerified ? '완료' : '대기중'}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                <div className={`rounded-full p-2 ${progress.paymentCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <CreditCard className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">납부</p>
                <p className="text-xs text-muted-foreground">
                  {progress.paymentCompleted ? '완료' : '진행중'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">첨부 파일</CardTitle>
              <div>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  파일 첨부
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contractData.attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        업로드: {file.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contract Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">계약 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">계약 형태</p>
                  <p className="font-medium">
                    {contractData.details.type === 'individual' ? '개인' : '법인'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">회원권 형태</p>
                  <p className="font-medium">
                    {contractData.details.membershipType === 'named' ? '기명' : '무기명'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">이용 형태</p>
                  <p className="font-medium">
                    {contractData.details.shareType === 'membership' ? '회원제' : '공유제'}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">객실 타입</p>
                  <p className="font-medium">{contractData.details.roomType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">지분</p>
                  <p className="font-medium">{contractData.details.shareRatio}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">납부 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div>
                  <p className="text-sm text-muted-foreground">총 계약금액</p>
                  <p className="text-2xl font-bold">
                    {new Intl.NumberFormat('ko-KR').format(contractData.payment.total)}원
                  </p>
                </div>
                <Badge variant="outline" className="text-primary border-primary">
                  {contractData.payment.status === 'completed' ? '납부 완료' : '납부 진행중'}
                </Badge>
              </div>

              <div className="space-y-4">
                {contractData.payment.schedule.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 rounded-lg border space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{payment.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.method} · {new Intl.NumberFormat('ko-KR').format(payment.amount)}원
                        </p>
                      </div>
                      <Badge
                        variant={payment.status === 'completed' ? 'default' : 'outline'}
                        className={payment.status === 'completed' ? 'bg-green-500' : ''}
                      >
                        {payment.status === 'completed' ? '납부 완료' : '미납'}
                      </Badge>
                    </div>
                    {payment.status === 'completed' ? (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          납부일시: {payment.completedAt}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePaymentMessage('thanks', payment.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          감사 메시지 발송
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          납부예정일: {payment.dueDate}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePaymentMessage('request', payment.id)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          납부요청 메시지 발송
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contract Download Button */}
        <Button
          className="w-full"
          size="lg"
          variant="outline"
          onClick={() => window.open('#', '_blank')}
        >
          <Download className="h-4 w-4 mr-2" />
          계약서 다운로드
        </Button>

        {/* Membership Button */}
        {status === 'completed' && (
          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate(`/membership/${contractData.membershipId}`)}
          >
            회원권 확인하기
          </Button>
        )}
      </div>
    </div>
  );
}