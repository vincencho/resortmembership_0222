import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  FileEdit,
  ClipboardList,
  Bell,
  Send,
  ChevronRight,
  FileSignature,
  CreditCard,
  BellRing,
  FileText,
  Users,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from '@/hooks/use-toast';

export function QuickMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleUnderConstruction = () => {
    toast({
      title: "준비중",
      description: "해당 기능은 현재 개발 중입니다.",
      duration: 3000,
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-lg font-bold">Quick Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Accordion type="single" collapsible className="space-y-2">
            {/* Product Search */}
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
              onClick={() => handleNavigation('/products/all')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">상품검색</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* New Contract */}
            <div
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted cursor-pointer"
              onClick={() => handleNavigation('/products/all')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <FileEdit className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">계약하기</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* Contract Management */}
            <AccordionItem value="contract-management" className="border rounded-lg">
              <AccordionTrigger className="px-2 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">계약관리</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2">
                <div className="space-y-1">
                  <div
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => handleNavigation('/contracts?status=progress')}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>진행중</span>
                  </div>
                  <div
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => handleNavigation('/contracts?status=completed')}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>완료</span>
                  </div>
                  <div
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => handleNavigation('/contracts?status=hold')}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>보류</span>
                  </div>
                  <div
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                    onClick={() => handleNavigation('/contracts?status=not-started')}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>미진행</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Customer Notifications */}
            <AccordionItem value="customer-notifications" className="border rounded-lg">
              <AccordionTrigger className="px-2 hover:no-underline" onClick={handleUnderConstruction}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">고객안내발송</span>
                </div>
              </AccordionTrigger>
            </AccordionItem>

            {/* Alerts */}
            <AccordionItem value="alerts" className="border rounded-lg">
              <AccordionTrigger className="px-2 hover:no-underline" onClick={handleUnderConstruction}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">알림</span>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}