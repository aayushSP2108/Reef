import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

function Model(props) {
  const { scene } = useGLTF('public/rocks_at_north_head.glb');
  return <primitive object={scene} {...props} />;
}

export default function ViewPort() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div
        style={{ 
          minHeight: `${window.innerHeight - 134}px`,
            color: '#000',
            zIndex: 10,
            borderRadius: '5px',
          }}
          className=' flex items-center justify-center'
        >
          Please wait, model is loading...
        </div>
      )}
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',  // Full viewport width
          height: '100vh', // Full viewport height
          touchAction: 'none',  // Add this line to disable default touch actions
        }}
      >
        <color attach="background" args={['#fff']} />
        <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
          <Stage environment={'sunset'}>
            <Model scale={0.01} onUpdate={handleLoaded} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </>
  );
}