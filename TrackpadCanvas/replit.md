# TrackPad Drawing App

## Overview

This is a simple web-based drawing application optimized for MacBook trackpad input. The app provides a clean, intuitive drawing canvas that allows users to draw by holding down their trackpad/mouse button and dragging. Built with vanilla HTML, CSS, and JavaScript for optimal performance and simplicity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology**: Vanilla HTML, CSS, and JavaScript
- **Canvas**: HTML5 Canvas API for drawing operations
- **Styling**: Custom CSS with modern design principles
- **Events**: Mouse and touch event handling for trackpad compatibility
- **No Framework**: Simple, lightweight implementation without dependencies

### Key Features

#### Drawing System
- **Canvas Drawing**: HTML5 Canvas with 2D context and smooth line rendering
- **Trackpad Optimized**: Responsive to MacBook trackpad input with proper event handling
- **Smooth Lines**: Quadratic curve interpolation for natural, smooth drawing experience
- **Drawing Tools**: Three tools available - Brush, Eraser, and Ruler
  - **Brush**: Freehand drawing with smooth curves, selected color and size
  - **Eraser**: Removes portions of drawing using destination-out composite operation
  - **Ruler**: Draws perfectly straight lines with live preview
- **Color Picker**: Native HTML color input for brush color selection
- **Background Color**: Separate color picker for canvas background with clear option
- **Tool Size**: Range slider for adjusting brush/eraser thickness (1-30px)
- **Touch Support**: Full touch event support for mobile devices and trackpads with optimized event handling

#### User Interface
- **Modern Design**: Glassmorphism interface with gradient backgrounds and blur effects
- **Responsive Layout**: Centered canvas with intuitive controls and smooth animations
- **Visual Feedback**: Real-time brush size display and hover effects
- **Enhanced Controls**: Tool buttons with active states and dropdown save menu
- **Clear Instructions**: Built-in usage guide for new users

#### Core Functions
- **Multi-Tool Drawing**: Three distinct drawing modes with tool switching
  - **Brush Mode**: Hold and drag to draw continuous freehand lines
  - **Eraser Mode**: Hold and drag to erase parts of the drawing
  - **Ruler Mode**: Hold and drag to draw perfect straight lines with live preview
- **Color Selection**: Click color picker to choose any color
- **Tool Sizing**: Drag slider to adjust brush/eraser thickness
- **Clear Canvas**: Button to clear entire drawing with confirmation
- **Multiple Export Formats**: Comprehensive file format support
  - **PNG**: Transparent background, perfect for web use
  - **JPG**: White background, smaller file size
  - **WebP**: Modern format with excellent compression
  - **SVG**: Vector format for scalability
  - **PDF-style**: A4 format with centered drawing
  - **High Resolution**: 2x scale PNG for printing

### Technical Implementation

#### Event Handling
- **Mouse Events**: mousedown, mousemove, mouseup, mouseout with optimized passive listeners
- **Touch Events**: touchstart, touchmove, touchend with preventDefault and passive optimization
- **Coordinate Mapping**: Cached canvas rectangle calculations for improved performance
- **Context Menu**: Disabled right-click context menu for clean experience
- **Performance**: requestAnimationFrame for smooth drawing and reduced input lag

#### Canvas Configuration
- **Size**: 1000x600 pixels for optimal drawing space
- **Styling**: Rounded corners, border, and white background
- **Line Settings**: Round line caps and joins for smooth strokes
- **Anti-aliasing**: Smooth drawing with proper pixel handling

#### File Operations
- **Multiple Format Support**: Canvas export to PNG, JPG, WebP, SVG, and PDF-style formats
- **High Resolution Export**: 2x scaling for print-quality output with background preservation
- **Background Handling**: Smart background color support across all formats
  - PNG: Preserves transparency or background color
  - JPG/WebP: Uses selected background color or white default
  - SVG: Includes background rectangle when needed
  - PDF: Centers artwork on background color or white
- **Timestamped Files**: Automatic filename with current timestamp
- **Download Trigger**: Programmatic link click for file save
- **SVG Generation**: Vector format with embedded canvas data and background
- **PDF-style Export**: A4 proportions with centered artwork and background

### User Experience

#### Trackpad Optimization
- **Pressure Sensitivity**: Responds to trackpad pressure for natural drawing
- **Smooth Lines**: Continuous line drawing without gaps or stutters
- **Precise Control**: Accurate coordinate mapping for detailed work
- **No Scrolling**: touch-action: none prevents page scrolling while drawing

#### Visual Design
- **Modern UI**: Clean, minimalist design with proper spacing
- **Color Scheme**: Subtle grays and whites with colorful accents
- **Typography**: System fonts for native macOS feel
- **Accessibility**: High contrast and clear visual hierarchy

The application provides a simple yet powerful drawing experience specifically optimized for MacBook trackpad users, with clean code and intuitive interface design.