import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Paintbrush, 
  Eraser, 
  Minus, 
  Circle, 
  Square, 
  Trash2, 
  Undo, 
  Redo,
  Palette
} from "lucide-react";
import { DrawingTool } from "@/hooks/useDrawing";

interface DrawingToolbarProps {
  currentTool: DrawingTool;
  currentColor: string;
  currentSize: number;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onOpenColorPicker: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const predefinedColors = [
  '#000000', // Black
  '#007AFF', // iOS Blue
  '#34C759', // iOS Green
  '#FF3B30', // iOS Red
  '#FF9500', // iOS Orange
  '#AF52DE', // iOS Purple
];

export default function DrawingToolbar({
  currentTool,
  currentColor,
  currentSize,
  onToolChange,
  onColorChange,
  onSizeChange,
  onClear,
  onUndo,
  onRedo,
  onOpenColorPicker,
  canUndo,
  canRedo
}: DrawingToolbarProps) {
  const tools = [
    { id: 'brush' as DrawingTool, icon: Paintbrush, label: 'Brush' },
    { id: 'eraser' as DrawingTool, icon: Eraser, label: 'Eraser' },
    { id: 'line' as DrawingTool, icon: Minus, label: 'Line' },
    { id: 'circle' as DrawingTool, icon: Circle, label: 'Circle' },
    { id: 'rectangle' as DrawingTool, icon: Square, label: 'Rectangle' },
  ];

  return (
    <div className="toolbar px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Drawing Tools */}
        <div className="flex items-center space-x-2">
          {tools.map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={currentTool === id ? "default" : "outline"}
              size="sm"
              className={`tool-button p-3 rounded-xl ${
                currentTool === id ? 'active bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onToolChange(id)}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </Button>
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-600">Size:</label>
          <Slider
            value={[currentSize]}
            onValueChange={([value]) => onSizeChange(value)}
            min={1}
            max={50}
            step={1}
            className="w-24"
          />
          <span className="text-sm text-gray-700 w-8">{currentSize}px</span>
        </div>

        {/* Color Palette */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 mr-2">Color:</span>
          {predefinedColors.map((color) => (
            <button
              key={color}
              className={`color-swatch ${currentColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
              title={color}
            />
          ))}
          <button
            className="color-swatch bg-gradient-to-r from-red-500 to-blue-500 flex items-center justify-center"
            onClick={onOpenColorPicker}
            title="Custom Color"
          >
            <Palette className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={onClear}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onUndo}
            disabled={!canUndo}
            className="bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50"
          >
            <Undo className="w-4 h-4 mr-2" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRedo}
            disabled={!canRedo}
            className="bg-gray-500 hover:bg-gray-600 text-white disabled:opacity-50"
          >
            <Redo className="w-4 h-4 mr-2" />
            Redo
          </Button>
        </div>
      </div>
    </div>
  );
}
