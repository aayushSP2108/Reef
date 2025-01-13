import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, OrbitControls, BakeShadows, Environment, Detailed } from '@react-three/drei';

// Create 800 objects with random position and rotation data
const positions = [...Array(800)].map(() => ({
  position: [40 - Math.random() * 80, 40 - Math.random() * 80, 40 - Math.random() * 80],
  rotation: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2],
}))






function Bust(props) {
  // This will load 4 GLTF in parallel using React Suspense
  const levels = useGLTF(['./assets/bust-1-d.glb', './assets/bust-2-d.glb', './assets/bust-3-d.glb', './assets/bust-4-d.glb'])
  // By the time we're here these GLTFs exist, they're loaded
  // There are 800 instances of this component, but the GLTF data is cached and will be re-used ootb
  return (
    <Detailed distances={[0, 15, 25, 35, 100]} {...props}>
      {/* All we need to do is dump them into the Detailed component and define some distances
          Since we use a JSX mesh to represent each bust the geometry is being re-used w/o cloning */}
      {levels.map(({ nodes, materials }, index) => (
        <mesh receiveShadow castShadow key={index} geometry={nodes.Mesh_0001.geometry} material={materials.default} material-envMapIntensity={0.25} />
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
    <Suspense fallback={<span>loading...</span>}>
      <Canvas
        // Quick shortcut for setting up shadow maps
        shadows
        // Only render on changes and movement
        frameloop="demand"
        camera={{ position: [0, 0, 40] }}
        style={{
          flex: 1,
          height: `${window.innerHeight - 134}px`,
          touchAction: 'none',
        }}
        >
        {/* Let's render 800 Bust components with the data above */}
        {positions.map((props, i) => (
          <Bust key={i} {...props} />
        ))}
        <OrbitControls zoomSpeed={0.075} />
        <pointLight position={[0, 0, 0]} intensity={0.5} />
        <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />
        <Environment preset="city" brightness={brightness} />
        <BakeShadows />
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
