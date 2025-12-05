import type { PuzzlePiece } from '../types/puzzle';

/**
 * Slices an image into a grid of smaller images (puzzle pieces)
 * @param imageSrc - The source URL of the image to slice
 * @param gridSize - The size of the grid (default: 3 for 3x3)
 * @returns Promise that resolves to an array of puzzle pieces
 */
export const imageSlicer = async (
  imageSrc: string,
  gridSize: number = 3
): Promise<PuzzlePiece[]> => {
  if (gridSize <= 0 || !Number.isInteger(gridSize)) {
    throw new Error('Grid size must be a positive integer');
  }

  const image = await loadImage(imageSrc);

  // Step 1: Crop image to square (center crop)
  // Use the smaller dimension to create a square
  const squareSize = Math.min(image.width, image.height);
  
  // Calculate crop coordinates for center crop
  const cropX = (image.width - squareSize) / 2;
  const cropY = (image.height - squareSize) / 2;

  // Step 2: Calculate tile dimensions for the square image
  const tileSize = squareSize / gridSize;

  const pieces: PuzzlePiece[] = [];
  const totalPieces = gridSize * gridSize;

  for (let id = 0; id < totalPieces; id++) {
    const row = Math.floor(id / gridSize);
    const col = id % gridSize;

    // Calculate source coordinates within the square crop
    // Add crop offset to get position in original image
    const sx = cropX + (col * tileSize);
    const sy = cropY + (row * tileSize);

    // Create canvas with integer dimensions to avoid sub-pixel rendering
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

    // Enable high-quality image rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw the cropped portion from the square region
    ctx.drawImage(
      image,
      sx, sy, tileSize, tileSize,  // Source rectangle (from cropped square region)
      0, 0, canvas.width, canvas.height  // Destination rectangle (to canvas)
    );

    // Use PNG format with no compression for maximum quality
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

/**
 * Helper function to load an image and return a Promise
 * @param src - The image source URL
 * @returns Promise that resolves to the loaded Image element
 */
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
