import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Box, Maximize2, X } from 'lucide-react';

export default function VRViewer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a simple starfield or abstract environment
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x0ea5e9, 
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    
    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      sphere.scale.setScalar(Math.random() * 0.5 + 0.1);
      scene.add(sphere);
      spheres.push(sphere);
    }

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      spheres.forEach((s, i) => {
        s.rotation.x += 0.01;
        s.rotation.y += 0.01;
        s.position.y += Math.sin(Date.now() * 0.001 + i) * 0.005;
      });
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-5xl aspect-video glass rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
      >
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-tighter">VR Synthesis</h2>
            <p className="text-sm text-foreground/50">Immersive destination preview engine.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 glass glass-hover rounded-2xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div ref={containerRef} className="w-full h-full" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <div className="px-6 py-3 glass rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">Live Rendering</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
