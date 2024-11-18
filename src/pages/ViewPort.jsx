import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

function Model(props) {
  // const { scene } = useGLTF('public/rocks_at_north_head.glb');
  const { scene } = useGLTF('public/moss_covered_rock_pile.glb');
  return <primitive object={scene} {...props} />;
}

export default function ViewPort() {
  const [isLoading, setIsLoading] = useState(true);
  useGLTF.preload('/moss_covered_rock_pile.glb');
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


// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

// function Model(props) {
//   const { scene } = useGLTF('public/moss_covered_rock_pile.glb');
//   return <primitive object={scene} {...props} />;
// }

// export default function ViewPort() {
//   const [isLoading, setIsLoading] = useState(true);

//   // useGLTF automatically manages loading state internally
//   useGLTF.preload('/moss_covered_rock_pile.glb'); // Preload the model

//   // Handle the loading state change
//   const handleLoaded = () => {
//     setIsLoading(false);
//   };

//   return (
//     <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
// {isLoading && (
//   <div
//     style={{
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       fontSize: '24px',
//       color: '#000',
//       zIndex: 10,
//       background: 'rgba(255, 255, 255, 0.8)',
//       padding: '20px',
//       borderRadius: '5px',
//     }}
//   >
//     Please wait, model is loading...
//   </div>
// )}
//       <Canvas
//         dpr={[1, 2]}
//         shadows
//         camera={{ fov: 45 }}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           touchAction: 'none', // Disable default touch actions
//         }}
//       >
//         <color attach="background" args={['#fff']} />
//         <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
//           <Stage environment={'sunset'}>
//             <Model scale={0.01} onUpdate={handleLoaded} />
//           </Stage>
//         </PresentationControls>
//       </Canvas>
//     </div>
//   );
// }
