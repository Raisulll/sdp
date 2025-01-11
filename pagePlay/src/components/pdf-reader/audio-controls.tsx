import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play } from "lucide-react";

interface AudioControlsProps {
  onClose: () => void;
  className?: string;
}

export function AudioControls({ onClose, className = "" }: AudioControlsProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 w-[300px] space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Now Playing</span>
        <span className="text-xs text-muted-foreground">2:30 / 5:45</span>
      </div>

      <Slider defaultValue={[40]} max={100} step={1} className="w-full" />

      <div className="flex items-center justify-center gap-2">
        {/* <Button variant="ghost" size="icon">
          <Rewind className="h-4 w-4" />
        </Button> */}
        <Button size="icon">
          <Play className="h-4 w-4" />
        </Button>
        {/* <Button variant="ghost" size="icon">
          <FastForward className="h-4 w-4" />
        </Button> */}
      </div>
    </div>
  );
}
