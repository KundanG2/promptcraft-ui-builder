import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterPanelProps {
  widths: string[];
  rimDiameters: string[];
  speedRatings: string[];
  selectedWidth: string;
  selectedRim: string;
  selectedSpeed: string;
  onWidthChange: (value: string) => void;
  onRimChange: (value: string) => void;
  onSpeedChange: (value: string) => void;
  onClear: () => void;
}

const FilterPanel = ({
  widths,
  rimDiameters,
  speedRatings,
  selectedWidth,
  selectedRim,
  selectedSpeed,
  onWidthChange,
  onRimChange,
  onSpeedChange,
  onClear,
}: FilterPanelProps) => {
  const hasFilters = selectedWidth || selectedRim || selectedSpeed;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select value={selectedWidth} onValueChange={onWidthChange}>
        <SelectTrigger className="w-[160px] border-2">
          <SelectValue placeholder="Width (mm)" />
        </SelectTrigger>
        <SelectContent>
          {widths.map((width) => (
            <SelectItem key={width} value={width}>
              {width} mm
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedRim} onValueChange={onRimChange}>
        <SelectTrigger className="w-[160px] border-2">
          <SelectValue placeholder="Rim Diameter" />
        </SelectTrigger>
        <SelectContent>
          {rimDiameters.map((rim) => (
            <SelectItem key={rim} value={rim}>
              {rim}"
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedSpeed} onValueChange={onSpeedChange}>
        <SelectTrigger className="w-[160px] border-2">
          <SelectValue placeholder="Speed Rating" />
        </SelectTrigger>
        <SelectContent>
          {speedRatings.map((rating) => (
            <SelectItem key={rating} value={rating}>
              {rating}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="outline" onClick={onClear} className="border-2">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterPanel;
