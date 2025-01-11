import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AudioControlsProps } from "@/types/blog";

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  isMuted,
  volume,
  progress,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onProgressChange,
}) => {
  return (
    <div className="p-4 bg-background border rounded-lg shadow-lg min-w-[300px]">
      <div className="flex items-center gap-4 mb-4">
        <Button size="sm" variant="ghost" onClick={onPlayPause}>
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <div className="flex-1">
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={onProgressChange}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost" onClick={onMuteToggle}>
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={onVolumeChange}
          className="w-32"
        />
      </div>
    </div>
  );
};
