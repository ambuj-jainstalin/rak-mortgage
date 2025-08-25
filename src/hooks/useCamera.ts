import { useState, useRef, useCallback } from 'react';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isStreaming: boolean;
  error: string | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: (cropArea?: CropArea) => string | null;
  switchCamera: () => Promise<void>;
}

export const useCamera = (): UseCameraReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      
      // Check if camera is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err: any) {
      console.error('Error accessing camera:', err);
      setError(err.message || 'Failed to access camera');
      setIsStreaming(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  const capturePhoto = useCallback((cropArea?: CropArea): string | null => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return null;

    // Get video dimensions
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const videoAspectRatio = videoWidth / videoHeight;

    // Get display dimensions
    const displayWidth = video.offsetWidth;
    const displayHeight = video.offsetHeight;
    const displayAspectRatio = displayWidth / displayHeight;

    // Calculate scaling factors
    let scaleX = videoWidth / displayWidth;
    let scaleY = videoHeight / displayHeight;

    // Handle different aspect ratios
    if (videoAspectRatio > displayAspectRatio) {
      // Video is wider than display
      const scaledVideoWidth = displayHeight * videoAspectRatio;
      const offsetX = (scaledVideoWidth - displayWidth) / 2;
      scaleX = videoWidth / scaledVideoWidth;
      scaleY = videoHeight / displayHeight;
    } else {
      // Video is taller than display
      const scaledVideoHeight = displayWidth / videoAspectRatio;
      const offsetY = (scaledVideoHeight - displayHeight) / 2;
      scaleX = videoWidth / displayWidth;
      scaleY = videoHeight / scaledVideoHeight;
    }

    if (cropArea) {
      // Create a new canvas for the cropped image
      const cropCanvas = document.createElement('canvas');
      const cropContext = cropCanvas.getContext('2d');
      
      if (!cropContext) return null;

      // Calculate crop coordinates in video space using percentages
      const cropX = Math.floor(cropArea.x * videoWidth);
      const cropY = Math.floor(cropArea.y * videoHeight);
      const cropWidth = Math.floor(cropArea.width * videoWidth);
      const cropHeight = Math.floor(cropArea.height * videoHeight);

      // Ensure we don't exceed video boundaries
      if (cropX >= videoWidth || cropY >= videoHeight || cropWidth <= 0 || cropHeight <= 0) {
        console.log('Invalid crop area:', { cropX, cropY, cropWidth, cropHeight, videoWidth, videoHeight });
        return null;
      }

      // Set crop canvas dimensions
      cropCanvas.width = cropWidth;
      cropCanvas.height = cropHeight;

      // Draw the cropped portion
      cropContext.drawImage(
        video,
        cropX, cropY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
      );

      console.log('Crop successful:', { cropX, cropY, cropWidth, cropHeight });
      return cropCanvas.toDataURL('image/jpeg', 0.8);
    } else {
      // Original full image capture
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.8);
    }
  }, [isStreaming]);

  const switchCamera = useCallback(async () => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    // Small delay to ensure camera is fully stopped
    setTimeout(() => {
      startCamera();
    }, 500);
  }, [startCamera, stopCamera]);

  return {
    videoRef,
    canvasRef,
    isStreaming,
    error,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera
  };
};