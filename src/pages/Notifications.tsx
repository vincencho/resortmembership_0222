import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center text-muted-foreground">
          Notifications (Coming Soon)
        </div>
      </div>
    </div>
  );
}