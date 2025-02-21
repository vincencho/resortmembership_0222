import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Upload,
  CheckCircle2,
  FileText,
  User,
  Building2,
  CreditCard,
  PenLine,
} from 'lucide-react';
import { useContractStore } from '@/lib/contractStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data - Replace with API calls in production
const contractData = {
  id: '1',
  membershipId: 'M1234567',
  status: 'in_progress', // Sync with ContractDetail status
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
    signatureCompleted: false,
    documentsSubmitted: false,
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
    nextPayment: {
      type: '계약금',
      amount: 4000000,
      dueDate: '2024-03-25',
    },
    bankInfo: {
      bank: '한화은행',
      account: '123-456-789012',
      holder: '한화리조트',
    },
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

export default function CustomerContractDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  // Replace local state with shared state
  const { status, progress, setStatus, setProgress } = useContractStore();

  const handleSignatureComplete = () => {
    setProgress({ signatureCompleted: true });
    toast({
      title: '서명이 완료되었습니다',
      description: '전자 서명이 성공적으로 처리되었습니다.',
    });
    setShowSignatureDialog(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProgress({ documentsSubmitted: true });
      toast({
        title: '파일이 업로드되었습니다',
        description: `${file.name} 파일이 성공적으로 업로드되었습니다.`,
      });
      setShowUploadDialog(false);
    }
  };

  const handlePaymentComplete = () => {
    setProgress({ paymentCompleted: true });
    // Check if all progress items are completed
    const allCompleted = Object.values({
      ...progress,
      paymentCompleted: true,
    }).every(value => value);
    
    if (allCompleted) {
      setStatus('completed');
    }
    setShowPaymentDialog(false);
    toast({
      title: '납부가 완료되었습니다',
      description: '납부가 성공적으로 처리되었습니다.',
    });
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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{contractData.productName} 계약서</h1>
              <p className="text-muted-foreground">Contract #{id}</p>
            </div>
            <Badge className={`${statusColors[status]} px-4 py-2 text-sm font-medium`}>
              {statusLabels[status]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Customer & Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                고객 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{contractData.customer.name}</p>
                <p className="text-muted-foreground">{contractData.customer.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                문의처
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">담당자: {contractData.salesRep.name}</p>
                <p className="text-muted-foreground">연락처: {contractData.salesRep.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">진행 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
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
                  <CheckCircle2 className="h-6 w-6" />
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
                  {progress.paymentCompleted ? '완료' : '대기중'}
                </p>
              </div>
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

        {/* Attachments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">첨부 파일</CardTitle>
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

        {/* Membership Button - Only shown when status is completed */}
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
          <Button
            size="lg"
            className="bg-primary"
            disabled={progress.signatureCompleted}
            onClick={() => setShowSignatureDialog(true)}
          >
            <PenLine className="h-4 w-4 mr-2" />
            날인하기
          </Button>
          <Button
            size="lg"
            className="bg-primary"
            disabled={progress.documentsSubmitted}
            onClick={() => setShowUploadDialog(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            파일첨부
          </Button>
          <Button
            size="lg"
            className="bg-primary"
            disabled={progress.paymentCompleted}
            onClick={() => setShowPaymentDialog(true)}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            납부하기
          </Button>
        </div>
      </div>

      {/* Signature Dialog */}
      <Dialog open={showSignatureDialog} onOpenChange={setShowSignatureDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>전자 서명</DialogTitle>
            <DialogDescription>
              계약서에 서명해 주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-64 border rounded-lg bg-muted/50" />
            <Button className="w-full" onClick={handleSignatureComplete}>
              서명 완료
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>파일 첨부</DialogTitle>
            <DialogDescription>
              필요한 서류를 첨부해 주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              className="w-full"
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              파일 선택
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>납부 정보</DialogTitle>
            <DialogDescription>
              아래 계좌로 납부해 주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-medium mb-2">다음 납부 정보</p>
              <div className="space-y-2 text-sm">
                <p>종류: {contractData.payment.nextPayment.type}</p>
                <p>금액: {new Intl.NumberFormat('ko-KR').format(contractData.payment.nextPayment.amount)}원</p>
                <p>납부기한: {contractData.payment.nextPayment.dueDate}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-medium mb-2">입금 계좌</p>
              <div className="space-y-2 text-sm">
                <p>은행: {contractData.payment.bankInfo.bank}</p>
                <p>계좌번호: {contractData.payment.bankInfo.account}</p>
                <p>예금주: {contractData.payment.bankInfo.holder}</p>
              </div>
            </div>
            <Button className="w-full" onClick={handlePaymentComplete}>
              납부 완료
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}