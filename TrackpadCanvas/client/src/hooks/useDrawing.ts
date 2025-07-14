import { useRef, useCallback, useState, useEffect } from "react";

export type DrawingTool = 'brush' | 'eraser' | 'line' | 'circle' | 'rectangle';

interface DrawingState {
  tool: DrawingTool;
  color: string;
  size: number;
  isDrawing: boolean;
}

interface Point {
  x: number;
  y: number;
}

export function useDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>({
    tool: 'brush',
    color: '#000000',
    size: 5,
    isDrawing: false
  });
  
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const startPointRef = useRef<Point | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;

    // Configure context
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = drawingState.color;
    context.lineWidth = drawingState.size;

    contextRef.current = context;

    // Save initial state
    setTimeout(() => {
      setUndoStack([canvas.toDataURL()]);
    }, 100);
  }, [drawingState.color, drawingState.size]);

  const getCanvasPoint = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;
    if (!context) return;

    const point = getCanvasPoint(e);
    startPointRef.current = point;

    setDrawingState(prev => ({ ...prev, isDrawing: true }));

    if (drawingState.tool === 'brush' || drawingState.tool === 'eraser') {
      context.globalCompositeOperation = drawingState.tool === 'eraser' ? 'destination-out' : 'source-over';
      context.strokeStyle = drawingState.color;
      context.lineWidth = drawingState.size;
      context.beginPath();
      context.moveTo(point.x, point.y);
    }
  }, [drawingState.tool, drawingState.color, drawingState.size, getCanvasPoint]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawingState.isDrawing) return;

    const context = contextRef.current;
    if (!context) return;

    const point = getCanvasPoint(e);

    if (drawingState.tool === 'brush' || drawingState.tool === 'eraser') {
      context.lineTo(point.x, point.y);
      context.stroke();
    } else if (drawingState.tool === 'line' || drawingState.tool === 'circle' || drawingState.tool === 'rectangle') {
      // For shapes, we'll draw a preview
      drawShapePreview(point);
    }
  }, [drawingState.isDrawing, drawingState.tool, getCanvasPoint]);

  const drawShapePreview = useCallback((currentPoint: Point) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || !startPointRef.current) return;

    // Clear and redraw canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, 0, 0);

    // Draw preview shape
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = drawingState.color;
    context.lineWidth = drawingState.size;
    context.beginPath();

    const startPoint = startPointRef.current;

    switch (drawingState.tool) {
      case 'line':
        context.moveTo(startPoint.x, startPoint.y);
        context.lineTo(currentPoint.x, currentPoint.y);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(currentPoint.x - startPoint.x, 2) + Math.pow(currentPoint.y - startPoint.y, 2));
        context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
        break;
      case 'rectangle':
        const width = currentPoint.x - startPoint.x;
        const height = currentPoint.y - startPoint.y;
        context.rect(startPoint.x, startPoint.y, width, height);
        break;
    }

    context.stroke();
  }, [drawingState.color, drawingState.size, drawingState.tool]);

  const stopDrawing = useCallback(() => {
    if (!drawingState.isDrawing) return;

    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    setDrawingState(prev => ({ ...prev, isDrawing: false }));

    if (drawingState.tool === 'brush' || drawingState.tool === 'eraser') {
      context.beginPath();
    }

    // Save state for undo
    const imageData = canvas.toDataURL();
    setUndoStack(prev => [...prev, imageData]);
    setRedoStack([]);
    startPointRef.current = null;
  }, [drawingState.isDrawing, drawingState.tool]);

  const changeTool = useCallback((tool: DrawingTool) => {
    setDrawingState(prev => ({ ...prev, tool }));
  }, []);

  const changeColor = useCallback((color: string) => {
    setDrawingState(prev => ({ ...prev, color }));
  }, []);

  const changeSize = useCallback((size: number) => {
    setDrawingState(prev => ({ ...prev, size }));
  }, []);

  const clearCanvas = useCallback(() => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setUndoStack([]);
    setRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    if (undoStack.length <= 1) return;

    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    const currentState = undoStack[undoStack.length - 1];
    const previousState = undoStack[undoStack.length - 2];

    setRedoStack(prev => [...prev, currentState]);
    setUndoStack(prev => prev.slice(0, -1));

    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = previousState;
  }, [undoStack]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;

    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;

    const nextState = redoStack[redoStack.length - 1];

    setUndoStack(prev => [...prev, nextState]);
    setRedoStack(prev => prev.slice(0, -1));

    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = nextState;
  }, [redoStack]);

  const saveDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `drawing_${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  }, []);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  return {
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
  };
}
