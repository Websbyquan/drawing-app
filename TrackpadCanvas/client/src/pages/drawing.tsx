import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Paintbrush } from "lucide-react";
import DrawingCanvas from "@/components/DrawingCanvas";
import DrawingToolbar from "@/components/DrawingToolbar";
import ColorPicker from "@/components/ColorPicker";
import { useDrawing } from "@/hooks/useDrawing";

export default function Drawing() {
  const {
    canvasRef,
    drawingState,
    undoStack,
    redoStack,
    startDrawing,
    draw,
    stopDrawing,
    changeTool,
    changeColor,
    changeSize,
    clearCanvas,
    undo,
    redo,
    saveDrawing
  } = useDrawing();

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the canvas?')) {
      clearCanvas();
    }
  };

  const instructionCards = [
    {
      icon: "🖱️",
      title: "Click & Drag",
      description: "Hold down trackpad/mouse to draw"
    },
    {
      icon: "🎨",
      title: "Choose Colors",
      description: "Select from palette or custom"
    },
    {
      icon: "🎚️",
      title: "Adjust Size",
      description: "Use slider to change brush size"
    },
    {
      icon: "💾",
      title: "Save Work",
      description: "Export as PNG or JPG"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Paintbrush className="text-blue-500 w-6 h-6" />
            <h1 className="text-xl font-semibold text-gray-900">TrackPad Draw</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Optimized for MacBook trackpad</span>
            <Button
              onClick={saveDrawing}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main Drawing Area */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Canvas */}
          <DrawingCanvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {/* Toolbar */}
          <DrawingToolbar
            currentTool={drawingState.tool}
            currentColor={drawingState.color}
            currentSize={drawingState.size}
            onToolChange={changeTool}
            onColorChange={changeColor}
            onSizeChange={changeSize}
            onClear={handleClear}
            onUndo={undo}
            onRedo={redo}
            onOpenColorPicker={() => setIsColorPickerOpen(true)}
            canUndo={undoStack.length > 1}
            canRedo={redoStack.length > 0}
          />

          {/* Instructions */}
          <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Draw</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {instructionCards.map((card, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Color Picker Modal */}
      <ColorPicker
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        onColorSelect={changeColor}
        currentColor={drawingState.color}
      />
    </div>
  );
}
