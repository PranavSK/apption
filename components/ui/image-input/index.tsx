'use client';

import {
  type ChangeEventHandler,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ResetIcon, ZoomInIcon, ZoomOutIcon } from '@radix-ui/react-icons';
import Cropper, { type Area } from 'react-easy-crop';

import { Button } from '@/components/ui/button';
import { getCroppedImage } from '@/lib/utils';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.2;

function incrementZoom(zoom: number) {
  return Math.min(zoom + ZOOM_STEP, MAX_ZOOM);
}

function decrementZoom(zoom: number) {
  return Math.max(zoom - ZOOM_STEP, MIN_ZOOM);
}

export interface ImageInputRef {
  getCroppedImage: () => Promise<Blob | null>;
}
export interface ImageInputProps {
  aspect?: number;
  onChange?: (value: { image: File; croppedArea: Area }) => void;
}
export const ImageInput = forwardRef<ImageInputRef, ImageInputProps>(
  ({ aspect = 1, onChange }, ref) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState<Area | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        getCroppedImage() {
          return imageFile && croppedArea
            ? getCroppedImage(URL.createObjectURL(imageFile), croppedArea)
            : Promise.resolve(null);
        },
      }),
      [croppedArea, imageFile],
    );

    const onFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setImageFile(file);
      }
    };

    useEffect(() => {
      let isCancelled = false;
      if (imageFile) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (e) => {
          if (!e.target) return;
          const { result } = e.target;
          if (result && !isCancelled) {
            setImageDataUrl(result as string);
          }
        };

        return () => {
          isCancelled = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        };
      }
    }, [imageFile]);

    useEffect(() => {
      if (!onChange || !imageFile || !croppedArea) return;
      onChange({
        image: imageFile,
        croppedArea,
      });
    }, [croppedArea, imageFile, onChange]);

    return (
      <div className="flex w-full flex-col items-stretch justify-center gap-1.5 rounded-md border border-teal7 bg-teal2 p-3 text-sm text-sage12 shadow-sm shadow-teal9 transition-colors dark:border-dark-teal7 dark:bg-dark-teal2 dark:text-dark-sage12 dark:shadow-dark-teal9">
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg, image/jpg"
          className="hidden"
          ref={inputRef}
          onChange={onFileChange}
        />
        <div className="relative h-80">
          {imageDataUrl ? (
            <Cropper
              image={imageDataUrl}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedAreaPixel) => setCroppedArea(croppedAreaPixel)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">No image</div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-2 md:grid-cols-2 md:grid-rows-1">
          <Button type="button" onClick={() => inputRef.current?.showPicker()}>
            Choose
          </Button>
          <div className="flex justify-evenly gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setCrop({ x: 0, y: 0 });
                setZoom(MIN_ZOOM);
              }}
              disabled={!imageDataUrl}
            >
              <ResetIcon />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setZoom(decrementZoom)}
              disabled={!imageDataUrl}
            >
              <ZoomOutIcon />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setZoom(incrementZoom)}
              disabled={!imageDataUrl}
            >
              <ZoomInIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
ImageInput.displayName = 'ImageInput';
