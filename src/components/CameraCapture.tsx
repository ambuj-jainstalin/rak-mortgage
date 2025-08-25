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

  const calculateCropArea = () => {
    const video = videoRef.current;
    if (!video) return null;

    // Get the overlay element
    const overlay = video.parentElement?.querySelector('[data-crop-overlay]') as HTMLElement;
    if (!overlay) return null;

    // Get the container that holds both video and overlay
    const container = video.parentElement;
    if (!container) return null;

    const containerRect = container.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    // Calculate overlay position relative to container
    const relativeX = overlayRect.left - containerRect.left;
    const relativeY = overlayRect.top - containerRect.top;

    // Get the actual video dimensions
    const videoWidth = video.offsetWidth;
    const videoHeight = video.offsetHeight;

    // Calculate crop area as percentage of video dimensions
    let cropXPercent = relativeX / videoWidth;
    let cropYPercent = relativeY / videoHeight;
    let cropWidthPercent = overlayRect.width / videoWidth;
    let cropHeightPercent = overlayRect.height / videoHeight;

    // For face capture (oval), adjust the crop area to be more precise
    if (type === 'face') {
      // Add a larger margin to ensure we capture the full face
      const margin = 0.05; // 5% margin
      cropXPercent = Math.max(0, cropXPercent - margin);
      cropYPercent = Math.max(0, cropYPercent - margin);
      cropWidthPercent = Math.min(1, cropWidthPercent + (margin * 2));
      cropHeightPercent = Math.min(1, cropHeightPercent + (margin * 2));
    }

    // For ID capture, ensure crop area stays within visible video boundaries
    if (type === 'id') {
      // Manual width adjustment for wide camera angles (like on MacBook responsive mode)
      cropXPercent = cropXPercent + 0.35;
      const widthReduction = 0.7; // Reduce width by 15% to handle wide angles
      const heightMargin = 0.02; // Small margin for height
      
      // Adjust width separately - reduce it to handle wide camera angles
      cropWidthPercent = Math.max(0.1, cropWidthPercent - widthReduction); // Minimum 10% width
      
      // Adjust height separately - keep it exactly the same as border overlay
      // No height adjustment to maintain exact overlay height
      
      // Ensure crop area doesn't exceed video boundaries
      cropXPercent = Math.max(0, Math.min(cropXPercent, 1 - cropWidthPercent));
      cropYPercent = Math.max(0, Math.min(cropYPercent, 1 - cropHeightPercent));
      
      // Final bounds check
      cropWidthPercent = Math.min(cropWidthPercent, 1 - cropXPercent);
      cropHeightPercent = Math.min(cropHeightPercent, 1 - cropYPercent);
    }

    // Debug logging
    console.log('Container rect:', containerRect);
    console.log('Overlay rect:', overlayRect);
    console.log('Video dimensions:', { width: videoWidth, height: videoHeight });
    console.log('Crop percentages:', { 
      x: cropXPercent, 
      y: cropYPercent, 
      width: cropWidthPercent, 
      height: cropHeightPercent 
    });
    console.log('Capture type:', type);

    return {
      x: cropXPercent,
      y: cropYPercent,
      width: cropWidthPercent,
      height: cropHeightPercent
    };
  };

  const handleCapture = () => {
    const cropArea = calculateCropArea();
    const imageData = capturePhoto(cropArea);
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
              <div className="w-full h-full flex flex-col bg-black">
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
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
                            className="w-full h-56 sm:h-72 object-contain rounded-lg border-2 border-green-500"
                          />
                          <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-56 sm:h-72 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-sm sm:text-base">Not captured</span>
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
                            className="w-full h-56 sm:h-72 object-contain rounded-lg border-2 border-green-500"
                          />
                          <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-56 sm:h-72 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                          <span className="text-gray-400 text-sm sm:text-base">Not captured</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center space-x-2 sm:space-x-4 px-4">
                  <Button
                    onClick={handleRetake}
                    variant="outline"
                    size="sm"
                    className="bg-black/50 text-white border-white hover:bg-black/70 text-xs sm:text-sm"
                  >
                    <RotateCcw className="h-4 w-4 mr-1 sm:mr-2" />
                    Retake {currentSide === 'front' ? 'Front' : 'Back'}
                  </Button>
                  {capturedFront && !capturedBack && (
                    <Button
                      onClick={handleNextSide}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                    >
                      Capture Back Side
                    </Button>
                  )}
                  {capturedFront && capturedBack && (
                    <Button
                      onClick={handleConfirm}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                    >
                      <Check className="h-4 w-4 mr-1 sm:mr-2" />
                      Use Both Photos
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Single Image Preview */
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <div className="max-w-md max-h-96 p-4">
                  {type === 'face' ? (
                    <div className="w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[500px] rounded-full overflow-hidden shadow-lg">
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="w-full h-auto object-contain rounded-lg shadow-lg"
                    />
                  )}
                </div>
                <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center space-x-2 sm:space-x-4 px-4">
                  <Button
                    onClick={handleRetake}
                    variant="outline"
                    size="sm"
                    className="bg-black/50 text-white border-white hover:bg-black/70 text-xs sm:text-sm"
                  >
                    <RotateCcw className="h-4 w-4 mr-1 sm:mr-2" />
                    Retake
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-xs sm:text-sm"
                  >
                    <Check className="h-4 w-4 mr-1 sm:mr-2" />
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
              autoPlay
            />
            
            {/* Camera Overlay */}
            {type === 'id' && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div 
                  data-crop-overlay
                  className="border-2 border-white rounded-lg w-full max-w-md h-56 sm:h-72 opacity-50"
                >
                  <div className="w-full h-full border-2 border-dashed border-white rounded-lg"></div>
                </div>
                {captureMode === 'front-back' && (
                  <div className="absolute top-4 left-0 right-0 text-center px-4">
                    <div className="inline-flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-full">
                      <span className="text-white font-semibold text-sm sm:text-base">
                        Capture {currentSide === 'front' ? 'Front' : 'Back'} Side
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {type === 'face' && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div 
                  data-crop-overlay
                  className="border-4 border-white rounded-full w-96 h-[500px] sm:w-[352px] sm:h-[400px] md:w-[400px] md:h-[520px] opacity-50"
                >
                  <div className="w-full h-full border-2 border-dashed border-white rounded-full"></div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center items-center space-x-4 sm:space-x-8 px-4">
              {captureMode === 'front-back' && type === 'id' ? (
                /* Front-Back Mode Controls */
                <>
                  <Button
                    onClick={handlePreviousSide}
                    variant="outline"
                    size="sm"
                    className="bg-black/50 text-white border-white hover:bg-black/70 text-xs sm:text-sm"
                    disabled={currentSide === 'front'}
                  >
                    Front
                  </Button>
                  
                  <Button
                    onClick={handleCapture}
                    size="lg"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white hover:bg-gray-200 text-black"
                    disabled={!isStreaming}
                  >
                    <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  
                  <Button
                    onClick={handleNextSide}
                    variant="outline"
                    size="sm"
                    className="bg-black/50 text-white border-white hover:bg-black/70 text-xs sm:text-sm"
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
                    size="sm"
                    className="bg-black/50 text-white border-white hover:bg-black/70"
                  >
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  
                  <Button
                    onClick={handleCapture}
                    size="lg"
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white hover:bg-gray-200 text-black"
                    disabled={!isStreaming}
                  >
                    <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                  
                  <div className="w-8 sm:w-12" /> {/* Spacer for symmetry */}
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