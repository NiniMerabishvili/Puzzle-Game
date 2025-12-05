import type { PuzzlePiece } from '../types/puzzle';

export const imageSlicer = async (
  imageSrc: string,
  gridSize: number = 3
): Promise<PuzzlePiece[]> => {
  if (gridSize <= 0 || !Number.isInteger(gridSize)) {
    throw new Error('Grid size must be a positive integer');
  }

  const image = await loadImage(imageSrc);

  const squareSize = Math.min(image.width, image.height);
  
  const cropX = (image.width - squareSize) / 2;
  const cropY = (image.height - squareSize) / 2;

  const tileSize = squareSize / gridSize;

  const pieces: PuzzlePiece[] = [];
  const totalPieces = gridSize * gridSize;

  for (let id = 0; id < totalPieces; id++) {
    const row = Math.floor(id / gridSize);
    const col = id % gridSize;

    const sx = cropX + (col * tileSize);
    const sy = cropY + (row * tileSize);

    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(tileSize);
    canvas.height = Math.ceil(tileSize);
    const ctx = canvas.getContext('2d', { 
      willReadFrequently: false,
      alpha: true 
    });

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      sx, sy, tileSize, tileSize,
      0, 0, canvas.width, canvas.height
    );

    const imageUrl = canvas.toDataURL('image/png', 1.0);

    pieces.push({
      id,
      imageUrl,
      currentPos: id,  
      correctPos: id, 
    });
  }

  return pieces;
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    
    image.crossOrigin = 'anonymous';
    
    image.onload = () => {
      resolve(image);
    };
    
    image.onerror = (error) => {
      reject(new Error(`Failed to load image: ${src}. ${error}`));
    };
    
    image.src = src;
  });
};
