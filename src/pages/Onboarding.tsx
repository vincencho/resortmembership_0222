import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/resort-video.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hanwha</h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hotel & Resort</h1>
          
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Luxury Membership
        </p>
        <Button
          onClick={() => navigate('/home')}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/50 gap-2"
          size="lg"
        >
          Tap to continue
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}