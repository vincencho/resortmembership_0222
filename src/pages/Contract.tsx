import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Check, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface PaymentSchedule {
  id: string;
  type: string;
  amount: number;
  dueDate: string;
}

export default function Contract() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState('basic-info');
  const [contractType, setContractType] = useState('individual');
  const [membershipType, setMembershipType] = useState('named');
  const [shareType, setShareType] = useState('membership');
  const [shareRatio, setShareRatio] = useState('1/4');
  
  const [customerName, setCustomerName] = useState('');
  const [residentNumber, setResidentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentSchedules, setPaymentSchedules] = useState<PaymentSchedule[]>([
    { id: '1', type: '계약금', amount: 10000000, dueDate: '2024-03-20' },
  ]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [specialTerms, setSpecialTerms] = useState('');
  const [showSignatureDialog, setShowSignatureDialog] = useState(false);

  const formatResidentNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 6) return numbers;
    return `${numbers.slice(0, 6)}-${numbers.slice(6, 13)}`;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const addPaymentSchedule = () => {
    const newId = String(paymentSchedules.length + 1);
    setPaymentSchedules([
      ...paymentSchedules,
      { id: newId, type: '중도금', amount: 0, dueDate: '' },
    ]);
  };

  const removePaymentSchedule = (id: string) => {
    setPaymentSchedules(paymentSchedules.filter(schedule => schedule.id !== id));
  };

  const updatePaymentSchedule = (
    id: string,
    field: keyof PaymentSchedule,
    value: string | number
  ) => {
    setPaymentSchedules(
      paymentSchedules.map(schedule =>
        schedule.id === id ? { ...schedule, [field]: value } : schedule
      )
    );
  };

  const handleNextStep = () => {
    if (currentStep === 'basic-info') {
      if (!customerName.trim()) {
        toast({
          title: '이름 입력 필요',
          description: '이름을 입력해 주세요.',
          variant: 'destructive',
        });
        return;
      }
      if (residentNumber.length < 14) {
        toast({
          title: '주민등록번호 입력 필요',
          description: '올바른 주민등록번호를 입력해 주세요.',
          variant: 'destructive',
        });
        return;
      }
      if (phoneNumber.length < 12) {
        toast({
          title: '연락처 입력 필요',
          description: '올바른 연락처를 입력해 주세요.',
          variant: 'destructive',
        });
        return;
      }
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('terms');
    } else if (currentStep === 'terms') {
      if (!termsAccepted) {
        toast({
          title: '약관 동의 필요',
          description: '계약 진행을 위해 약관에 동의해 주세요.',
          variant: 'destructive',
        });
        return;
      }
      setCurrentStep('signature');
    } else if (currentStep === 'signature') {
      navigate('/contract/1');
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'payment':
        setCurrentStep('basic-info');
        break;
      case 'terms':
        setCurrentStep('payment');
        break;
      case 'signature':
        setCurrentStep('terms');
        break;
    }
  };

  const handleSignatureComplete = () => {
    setShowSignatureDialog(false);
    toast({
      title: '계약이 완료되었습니다',
      description: '계약서 PDF가 생성되어 이메일로 전송됩니다.',
    });
    navigate('/contract/1');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
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
          <h1 className="text-2xl font-bold">계약 진행</h1>
          <p className="text-muted-foreground">Premium Suite Membership</p>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between relative mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          {['basic-info', 'payment', 'terms', 'signature'].map((step, index) => (
            <div
              key={step}
              className={`relative flex flex-col items-center gap-2 ${
                currentStep === step
                  ? 'text-primary'
                  : index < ['basic-info', 'payment', 'terms', 'signature'].indexOf(currentStep)
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${
                    currentStep === step
                      ? 'bg-primary text-primary-foreground'
                      : index < ['basic-info', 'payment', 'terms', 'signature'].indexOf(currentStep)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
              >
                {index + 1}
              </div>
              <span className="text-sm font-medium">
                {
                  {
                    'basic-info': '기본 정보',
                    payment: '납부 정보',
                    terms: '계약 내용',
                    signature: '서명',
                  }[step]
                }
              </span>
            </div>
          ))}
        </div>

        <Tabs value={currentStep} className="w-full">
          <TabsContent value="basic-info">
            <Card>
              <CardHeader>
                <CardTitle>기본 정보 입력</CardTitle>
                <CardDescription>
                  계약 진행을 위한 기본 정보를 입력해 주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">고객 정보</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>이름</Label>
                      <Input
                        placeholder="이름을 입력하세요"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>주민등록번호</Label>
                      <Input
                        placeholder="주민등록번호를 입력하세요"
                        value={residentNumber}
                        onChange={(e) => setResidentNumber(formatResidentNumber(e.target.value))}
                        maxLength={14}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>연락처</Label>
                      <Input
                        placeholder="연락처를 입력하세요"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                        maxLength={13}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">계약 정보</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>계약 형태</Label>
                      <Select
                        value={contractType}
                        onValueChange={setContractType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="계약 형태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">개인</SelectItem>
                          <SelectItem value="corporate">법인</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>회원권 형태</Label>
                      <Select
                        value={membershipType}
                        onValueChange={setMembershipType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="회원권 형태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="named">기명</SelectItem>
                          <SelectItem value="unnamed">무기명</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>이용 형태</Label>
                      <Select
                        value={shareType}
                        onValueChange={setShareType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="이용 형태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="membership">회원제</SelectItem>
                          <SelectItem value="shared">공유제</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {shareType === 'shared' && (
                      <div className="space-y-2">
                        <Label>지분 선택</Label>
                        <Select
                          value={shareRatio}
                          onValueChange={setShareRatio}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="지분 비율 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1/12">1/12 지분</SelectItem>
                            <SelectItem value="1/6">1/6 지분</SelectItem>
                            <SelectItem value="1/4">1/4 지분</SelectItem>
                            <SelectItem value="1/2">1/2 지분</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>계약 금액</Label>
                      <div className="grid gap-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">정상가</Label>
                          <Input
                            type="text"
                            value="150,000,000원"
                            disabled
                            className="bg-muted"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">할인가</Label>
                          <Input
                            type="text"
                            value="135,000,000원"
                            disabled
                            className="bg-muted"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-muted-foreground">실 계약가</Label>
                          <Input
                            type="text"
                            value="135,000,000원"
                            disabled
                            className="bg-primary/5 border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>납부 정보 입력</CardTitle>
                <CardDescription>
                  계약금, 중도금, 잔금 등 납부 계획을 설정해 주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {paymentSchedules.map((schedule, index) => (
                  <div key={schedule.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">납부 회차 {index + 1}</h3>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePaymentSchedule(schedule.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>납부 종류</Label>
                        <Select
                          value={schedule.type}
                          onValueChange={(value) =>
                            updatePaymentSchedule(schedule.id, 'type', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="납부 종류 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="계약금">계약금</SelectItem>
                            <SelectItem value="중도금">중도금</SelectItem>
                            <SelectItem value="잔금">잔금</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>납부 금액</Label>
                        <Input
                          type="number"
                          value={schedule.amount}
                          onChange={(e) =>
                            updatePaymentSchedule(
                              schedule.id,
                              'amount',
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>납부 예정일</Label>
                        <Input
                          type="date"
                          value={schedule.dueDate}
                          onChange={(e) =>
                            updatePaymentSchedule(schedule.id, 'dueDate', e.target.value)
                          }
                        />
                      </div>
                    </div>
                    {index < paymentSchedules.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={addPaymentSchedule}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  납부 회차 추가
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle>계약 내용 확인</CardTitle>
                <CardDescription>
                  계약 내용을 확인하고 동의해 주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="h-64 overflow-auto p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-2">제1조 (목적)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      본 계약은 한화리조트(이하 "회사"라 함)가 제공하는 멤버십 서비스(이하 "서비스"라 함)의 이용과 관련하여 회사와 회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>
                    <h3 className="font-semibold mb-2">제2조 (용어의 정의)</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      본 계약에서 사용하는 용어의 정의는 다음과 같습니다.
                      1. "멤버십"이란 회사가 회원에게 제공하는 서비스를 이용할 수 있는 자격을 말합니다.
                      2. "회원"이란 본 계약에 따라 회사와 멤버십 이용계약을 체결한 자를 말합니다.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <Label htmlFor="terms">
                        위 계약 내용을 모두 확인하였으며 이에 동의합니다.
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>특약 사항</Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <PenLine className="h-4 w-4 mr-2" />
                          특약 작성
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>특약 사항 작성</DialogTitle>
                          <DialogDescription>
                            계약에 추가할 특약 사항을 작성해 주세요.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <textarea
                            className="w-full h-32 p-2 border rounded-md"
                            value={specialTerms}
                            onChange={(e) => setSpecialTerms(e.target.value)}
                            placeholder="특약 사항을 입력하세요..."
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                    {specialTerms && (
                      <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                        <h4 className="font-medium mb-2">작성된 특약 사항</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {specialTerms}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signature">
            <Card>
              <CardHeader>
                <CardTitle>전자 서명</CardTitle>
                <CardDescription>
                  계약 완료를 위해 전자 서명을 진행해 주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-6 border rounded-lg bg-muted/50 text-center">
                    <p className="text-muted-foreground mb-4">
                      계약 내용에 대한 전자 서명을 진행합니다.
                      서명 전 계약 내용을 다시 한 번 확인해 주세요.
                    </p>
                    <Button
                      onClick={() => setShowSignatureDialog(true)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <PenLine className="h-4 w-4 mr-2" />
                      서명하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-8">
          {currentStep !== 'basic-info' && (
            <Button
              variant="outline"
              onClick={handlePreviousStep}
            >
              이전 단계
            </Button>
          )}
          <Button
            className="ml-auto"
            onClick={handleNextStep}
          >
            {currentStep === 'signature' ? '완료' : '다음 단계'}
          </Button>
        </div>
      </div>

      <Dialog open={showSignatureDialog} onOpenChange={setShowSignatureDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>전자 서명</DialogTitle>
            <DialogDescription>
              아래 공간에 서명해 주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="h-64 border rounded-lg bg-white"></div>
            <Button
              className="w-full"
              onClick={handleSignatureComplete}
            >
              <Check className="h-4 w-4 mr-2" />
              서명 완료
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}