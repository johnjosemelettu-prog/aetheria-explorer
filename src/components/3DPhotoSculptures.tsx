
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Upload, Cube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// A placeholder for a 3D model component
const Model = ({ url }: { url: string }) => {
    // In a real implementation, you would use a library like `gltf-jsx` 
    // to convert a GLB/GLTF file into a React component.
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

const ThreeDPhotoSculptures = () => {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState<string[]>([]);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const files = Array.from(e.target.files);
        const newPhotos = files.map(file => URL.createObjectURL(file));
        setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleGenerateModel = async () => {
    if (photos.length < 5) { // Photogrammetry needs multiple photos
        alert(t('3DPhotoSculptures.minPhotosError'));
        return;
    }
    setLoading(true);
    try {
      const result = await AI.generate3DModel(photos);
      setModelUrl(result.modelUrl);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-800">{t('3DPhotoSculptures.title')}</h1>
        <p className="text-center text-blue-700 mb-8">{t('3DPhotoSculptures.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('3DPhotoSculptures.uploadTitle')}</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
              {photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-lg"/>
              ))}
              <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <label htmlFor="photo-upload-3d" className="cursor-pointer text-gray-400 hover:text-blue-600">
                      <Upload size={32} />
                      <input type="file" id="photo-upload-3d" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
              </div>
          </div>
          <Button onClick={handleGenerateModel} disabled={photos.length < 5 || loading} size="lg">
            <Cube className="mr-2 h-5 w-5" />
            {loading ? t('3DPhotoSculptures.generating') : t('3DPhotoSculptures.generate')}
          </Button>
        </div>

        {modelUrl && (
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('3DPhotoSculptures.resultTitle')}</h2>
            <div className="bg-gray-200 rounded-xl shadow-inner h-96 w-full">
                <Canvas>
                    <Suspense fallback={null}>
                        <Stage environment="city" intensity={0.6}>
                            <Model url={modelUrl} />
                        </Stage>
                        <OrbitControls autoRotate />
                    </Suspense>
                </Canvas>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ThreeDPhotoSculptures;
