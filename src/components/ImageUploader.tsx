
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <input
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <Button asChild>
          <span><Camera className="mr-2 h-4 w-4" /> Select Image</span>
        </Button>
      </label>
      {selectedImage && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedImage.name}
        </p>
      )}
    </div>
  );
}
