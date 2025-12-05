interface ImagePreviewProps {
  imageUrl: string;
  isVisible: boolean;
}

export const ImagePreview = ({ imageUrl, isVisible }: ImagePreviewProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="relative w-full h-full flex items-center justify-center p-1">
        <div className="w-full max-w-2xl aspect-square relative">
          <img
            src={imageUrl}
            alt="Puzzle preview"
            className="w-full h-full object-cover shadow-2xl border-4 border-white"
          />
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 border-2 border-black font-black text-sm uppercase">
            Preview (1 seconds)
          </div>
        </div>
      </div>
    </div>
  );
};

