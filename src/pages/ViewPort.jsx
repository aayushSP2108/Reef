import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

function Model({ brightness }) {
  // const { scene } = useGLTF('./moss_covered_rock_pile.glb');
  const { scene } = useGLTF('./moss_covered_rock_pile.glb');

  
  // Apply brightness to the scene using toneMappingExposure
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.emissiveIntensity = brightness;
    }
  });

  return <primitive object={scene} />;
}

export default function ViewPort() {
  const [isLoading, setIsLoading] = useState(true);
  const [brightness, setBrightness] = useState(1); // Initial brightness value

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left: Canvas */}
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{
          flex: 1,
          height: `${window.innerHeight - 134}px`,
          touchAction: 'none',
        }}
      >
        <color attach="background" args={['#fff']} />
        <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
          <Stage environment={'sunset'}>
            <Model scale={0.01} brightness={brightness} onUpdate={handleLoaded} />
          </Stage>
        </PresentationControls>
      </Canvas>

      {/* Right: Sidebar Panel */}
      <div
        style={{
          width: '300px',
          backgroundColor: '#f4f4f4',
          padding: '20px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        <h2>Model Render</h2>
        {/* Brightness Control */}
        <div style={{ marginTop: '20px' }}>
          <h4>Adjust Brightness</h4>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={brightness}
            onChange={(e) => setBrightness(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <p>Brightness: {brightness}</p>

          {/* Contrast Control */}
        <div style={{ marginTop: '20px' }}>
          <h4>Adjust Contrast</h4>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            // value={contrast}
            // onChange={(e) => setContrast(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <p>Contrast: </p>
          {/* {contrast} */}
        </div>
        </div>
      </div>
    </div>
  );
}
