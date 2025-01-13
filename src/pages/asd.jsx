import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei';

const positions = [...Array(800)].map(() => ({
  position: [40 - Math.random() * 80, 40 - Math.random() * 80, 40 - Math.random() * 80],
  rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
}))


function Model({ ...props, brightness }) {
  // const { scene } = useGLTF('./moss_covered_rock_pile.glb');
   const levels = useGLTF(['./public/bust-1-d.glb', './public//bust-2-d.glb', './public//bust-3-d.glb', './public//bust-4-d.glb'])
  // Apply brightness to the scene using toneMappingExposure
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.emissiveIntensity = brightness;
    }
  });

  // return <primitive object={scene} />;
  return (
      <Detailed distances={[0, 15, 25, 35, 100]} {...props}>
        {/* All we need to do is dump them into the Detailed component and define some distances
            Since we use a JSX mesh to represent each bust the geometry is being re-used w/o cloning */}
        {levels.map(({ nodes, materials }, index) => (
          // receiveShadow castShadow
          <mesh key={index} geometry={nodes.Mesh_0001.geometry} material={materials.default} material-envMapIntensity={0.25} />
        ))}
        <group />
      </Detailed>
    )
}

export default function ViewPort() {
  const [isLoading, setIsLoading] = useState(true);
  const [brightness, setBrightness] = useState(1); // Initial brightness value

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div style={{ height: 'full', display: 'flex' }}>
      {/* Left: Canvas */}
      <Suspense fallback={<span>loading...</span>}>
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
        <OrbitControls />
          <Stage environment={'sunset'}>
          {positions.map((props, i) => (
          <Model key={i} {...props}  scale={0.01} brightness={brightness} onUpdate={handleLoaded}/>
        ))}
          </Stage>
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
      </Suspense>      
    </div>
  );
}
