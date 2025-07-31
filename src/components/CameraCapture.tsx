import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Camera, RotateCcw, Check } from 'lucide-react';
import { useCamera } from '@/hooks/useCamera';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageData: string | { front: string; back: string }) => void;
  title: string;
  type: 'id' | 'face';
  captureMode?: 'single' | 'front-back';
}

const CameraCapture = ({ isOpen, onClose, onCapture, title, type, captureMode = 'single' }: CameraCaptureProps) => {
  const { videoRef, canvasRef, isStreaming, error, startCamera, stopCamera, capturePhoto, switchCamera } = useCamera();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedFront, setCapturedFront] = useState<string | null>(null);
  const [capturedBack, setCapturedBack] = useState<string | null>(null);
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
      // Reset state when opening
      setCapturedImage(null);
      setCapturedFront(null);
      setCapturedBack(null);
      setCurrentSide('front');
      setShowPreview(false);
          } else {
        stopCamera();
        setCapturedImage(null);
        setCapturedFront(null);
        setCapturedBack(null);
        setShowPreview(false);
      }

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  const handleCapture = () => {
    const imageData = capturePhoto();
    if (imageData) {
              if (captureMode === 'front-back' && type === 'id') {
          // For front-back mode, store the image based on current side
          if (currentSide === 'front') {
            setCapturedFront(imageData);
            setShowPreview(true); // Show preview after front capture
          } else {
            setCapturedBack(imageData);
            setShowPreview(true); // Show preview after back capture
          }
        } else {
          // Single capture mode
          setCapturedImage(imageData);
        }
    }
  };

  const handleConfirm = () => {
    if (captureMode === 'front-back' && type === 'id') {
      // For front-back mode, return both images
      if (capturedFront && capturedBack) {
        onCapture({ front: capturedFront, back: capturedBack });
        onClose();
      }
    } else {
      // Single capture mode
      if (capturedImage) {
        onCapture(capturedImage);
        onClose();
      }
    }
  };

  const handleRetake = () => {
    if (captureMode === 'front-back' && type === 'id') {
      // Retake current side
      if (currentSide === 'front') {
        setCapturedFront(null);
      } else {
        setCapturedBack(null);
      }
      setShowPreview(false); // Return to camera view
      // Restart camera for retake
      setTimeout(() => {
        startCamera();
      }, 100);
    } else {
      setCapturedImage(null);
    }
  };

  const handleNextSide = () => {
    if (currentSide === 'front' && capturedFront) {
      setCurrentSide('back');
      setShowPreview(false); // Return to camera view for back side capture
      // Restart camera for back side capture
      setTimeout(() => {
        startCamera();
      }, 100);
    }
  };

  const handlePreviousSide = () => {
    if (currentSide === 'back') {
      setCurrentSide('front');
      // Restart camera for front side capture
      setTimeout(() => {
        startCamera();
      }, 100);
    }
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
        ) : (capturedImage || (captureMode === 'front-back' && showPreview)) ? (
          /* Captured Image Preview */
          <div className="relative w-full h-full">
            {captureMode === 'front-back' && type === 'id' ? (
              /* Front-Back Preview */
              <div className="w-full h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                    <div className="text-center">
                      <h3 className="text-white font-semibold mb-2 flex items-center justify-center">
                        Front Side
                        {capturedFront && (
                          <div className="ml-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </h3>
                      {capturedFront ? (
                        <div className="relative">
                          <img 
                            src={capturedFront} 
                            alt="Front" 
                            className="w-full h-48 object-cover rounded-lg border-2 border-green-500"
                          />
                          <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400">Not captured</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-semibold mb-2 flex items-center justify-center">
                        Back Side
                        {capturedBack && (
                          <div className="ml-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </h3>
                      {capturedBack ? (
                        <div className="relative">
                          <img 
                            src={capturedBack} 
                            alt="Back" 
                            className="w-full h-48 object-cover rounded-lg border-2 border-green-500"
                          />
                          <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400">Not captured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4">
                  <Button
                    onClick={handleRetake}
                    variant="outline"
                    size="lg"
                    className="bg-black/50 text-white border-white hover:bg-black/70"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Retake {currentSide === 'front' ? 'Front' : 'Back'}
                  </Button>
                  {capturedFront && !capturedBack && (
                    <Button
                      onClick={handleNextSide}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Capture Back Side
                    </Button>
                  )}
                  {capturedFront && capturedBack && (
                    <Button
                      onClick={handleConfirm}
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Use Both Photos
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Single Image Preview */
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
            )}
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
                <div className="border-2 border-white rounded-lg w-96 h-64 opacity-50">
                  <div className="w-full h-full border-2 border-dashed border-white rounded-lg"></div>
                </div>
                {captureMode === 'front-back' && (
                  <div className="absolute top-4 left-0 right-0 text-center">
                    <div className="inline-flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full">
                      <span className="text-white font-semibold">
                        Capture {currentSide === 'front' ? 'Front' : 'Back'} Side
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {type === 'face' && (
              <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-4 border-white rounded-full w-[400px] h-[550px] opacity-50">
                <div className="w-full h-full border-2 border-dashed border-white rounded-full"></div>
              </div>
            
            </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-8">
              {captureMode === 'front-back' && type === 'id' ? (
                /* Front-Back Mode Controls */
                <>
                  <Button
                    onClick={handlePreviousSide}
                    variant="outline"
                    size="lg"
                    className="bg-black/50 text-white border-white hover:bg-black/70"
                    disabled={currentSide === 'front'}
                  >
                    Front
                  </Button>
                  
                  <Button
                    onClick={handleCapture}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-white hover:bg-gray-200 text-black"
                    disabled={!isStreaming}
                  >
                    <Camera className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    onClick={handleNextSide}
                    variant="outline"
                    size="lg"
                    className="bg-black/50 text-white border-white hover:bg-black/70"
                    disabled={currentSide === 'back' || !capturedFront}
                  >
                    Back
                  </Button>
                </>
              ) : (
                /* Single Mode Controls */
                <>
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
                </>
              )}
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