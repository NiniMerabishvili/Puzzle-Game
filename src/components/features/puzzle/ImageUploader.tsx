import { useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '../../common/Button';

interface ImageUploaderProps {
  onFileSelect: (file: File) => Promise<void>;
  isLoading: boolean;
}

export const ImageUploader = ({
  onFileSelect,
  isLoading,
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await onFileSelect(file);
    } catch (error) {
      // Error handling is done in the hook
      console.error('File upload error:', error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-8 border-2 border-dashed border-blue-500 rounded-lg text-center mb-8 bg-gray-800/50">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload image file"
      />
      <Button
        variant="primary"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Upload Image'}
      </Button>
      {isLoading && (
        <p className="mt-4 text-gray-400">
          Slicing image into puzzle pieces...
        </p>
      )}
    </div>
  );
};

