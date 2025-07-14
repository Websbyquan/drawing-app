import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  currentColor: string;
}

export default function ColorPicker({ isOpen, onClose, onColorSelect, currentColor }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [hexInput, setHexInput] = useState(currentColor);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setHexInput(color);
  };

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    if (hex.match(/^#[0-9A-F]{6}$/i)) {
      setSelectedColor(hex);
    }
  };

  const handleApply = () => {
    onColorSelect(selectedColor);
    onClose();
  };

  const handleCancel = () => {
    setSelectedColor(currentColor);
    setHexInput(currentColor);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Custom Color</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="colorInput" className="text-sm text-gray-600">
              Color Picker
            </Label>
            <input
              id="colorInput"
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-12 rounded-lg border-0 cursor-pointer mt-2"
            />
          </div>
          <div>
            <Label htmlFor="hexInput" className="text-sm text-gray-600">
              Hex Code
            </Label>
            <Input
              id="hexInput"
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              className="mt-2"
            />
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={handleApply}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Apply
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
