import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Camera, RotateCcw, Check } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageData: string) => void;
  title: string;
  type: 'id' | 'face';
}

const CameraCapture = ({ isOpen, onClose, onCapture, title, type }: CameraCaptureProps) => {
  const { videoRef, canvasRef, isStreaming, error, startCamera, stopCamera, capturePhoto, switchCamera } = useCamera();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  const handleCapture = () => {
    const imageData = capturePhoto();
    if (imageData) {
      setCapturedImage(imageData);
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
          <h2 className="text-white font-semibold">{title}</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full flex items-center justify-center">
        {error ? (
          <div className="text-center text-white p-8">
            <p className="mb-4">{error}</p>
            <Button onClick={startCamera} variant="outline" className="text-white border-white">
              Try Again
            </Button>
          </div>
        ) : capturedImage ? (
          /* Captured Image Preview */
          <div className="relative w-full h-full">
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
              <Button
                onClick={handleRetake}
                variant="outline"
                size="lg"
                className="bg-black/50 text-white border-white hover:bg-black/70"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Retake
              </Button>
              <Button
                onClick={handleConfirm}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Check className="h-5 w-5 mr-2" />
                Use Photo
              </Button>
            </div>
          </div>
        ) : (
          /* Live Camera Feed */
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            
            {/* Camera Overlay */}
            {type === 'id' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-2 border-white rounded-lg w-80 h-48 opacity-50">
                  <div className="w-full h-full border-2 border-dashed border-white rounded-lg"></div>
                </div>
              </div>
            )}
            
            {type === 'face' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border-4 border-white rounded-full w-64 h-64 opacity-50">
                  <div className="w-full h-full border-2 border-dashed border-white rounded-full"></div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-8">
              <Button
                onClick={switchCamera}
                variant="outline"
                size="lg"
                className="bg-black/50 text-white border-white hover:bg-black/70"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              
              <Button
                onClick={handleCapture}
                size="lg"
                className="w-16 h-16 rounded-full bg-white hover:bg-gray-200 text-black"
                disabled={!isStreaming}
              >
                <Camera className="h-6 w-6" />
              </Button>
              
              <div className="w-12" /> {/* Spacer for symmetry */}
            </div>
          </>
        )}
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;