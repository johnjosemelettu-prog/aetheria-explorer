
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const PrivacyScrubber = () => {
  const [image, setImage] = useState<string | null>(null);
  const [scrubbedData, setScrubbedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setScrubbedData(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrubImage = async () => {
    if (!image) return;

    setLoading(true);
    try {
      // This is a mock. In a real app, we'd send the image data.
      const imageName = "uploaded_image.jpg";
      const result = await AI.analyzeImageForSensitiveInfo(imageName);
      setScrubbedData(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleRemoveInfo = () => {
    // In a real app, this would use the coordinates from scrubbedData
    // to blur or remove parts of the image.
    alert("Sensitive information has been 'removed'. This is a mock-up.");
    setScrubbedData(null); // Reset for another scrub
  };


  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">Privacy Scrubber</h1>
      <p className="text-center text-gray-400 mb-8">Analyze your travel photos and remove sensitive information before sharing.</p>
      
      <div className="max-w-2xl mx-auto">
        {!image ? (
          <div className="flex items-center justify-center w-full">
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m12 10l-4-4m0 0l-4 4m4-4v12"></path></svg>
                <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, or GIF</p>
              </div>
              <input id="file-upload" type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </label>
          </div>
        ) : (
          <div className="text-center">
            <div className="relative inline-block">
                <img src={image} alt="Uploaded" className="max-w-full max-h-[60vh] rounded-lg shadow-lg" />
                {scrubbedData?.sensitive_areas && scrubbedData.sensitive_areas.map((area: any, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute border-4 border-red-500 rounded-md"
                        style={{
                            top: `${area.y_min * 100}%`,
                            left: `${area.x_min * 100}%`,
                            width: `${(area.x_max - area.x_min) * 100}%`,
                            height: `${(area.y_max - area.y_min) * 100}%`,
                        }}
                    >
                        <Badge variant="destructive" className="absolute -top-3 -right-3">{area.label}</Badge>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-6">
              {!scrubbedData ? (
                <Button onClick={scrubImage} disabled={loading} size="lg">
                  {loading ? 'Analyzing...' : 'Analyze for Sensitive Info'}
                </Button>
              ) : (
                <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3">Analysis Complete</h3>
                    <p className="text-gray-400 mb-4">{scrubbedData.summary}</p>
                    <div className="flex gap-4 justify-center">
                        <Button onClick={handleRemoveInfo} size="lg">Remove Information</Button>
                        <Button onClick={() => { setImage(null); setScrubbedData(null); }} variant="outline" size="lg">Upload Another</Button>
                    </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyScrubber;
