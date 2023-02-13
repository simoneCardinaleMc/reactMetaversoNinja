import { Canvas, useLoader } from '@react-three/fiber'
import AnimatedBox from '@/components/AnimatedBox';
import { OrbitControls, PerspectiveCamera, Stats, TransformControls, useAnimations, useGLTF, useTexture } from '@react-three/drei';
import Lights from '@/components/Lights';
import Grounds from '@/components/Ground';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { log } from 'console';
import { Tree } from '@/components/Tree';
import Soldier from '@/components/Soldier';
import { useEffect, useRef } from 'react';
import { useInput } from '@/components/useInputs';
import MySoldier from '@/components/Player';



const TextureSpheres = () => {
  const texture1 = useTexture("./textures/japanese_stone_wall_diff_2k.png");
  const texture2 = useTexture("./textures/japanese_stone_wall_nor_gl_2k.png");
  const texture3 = useTexture("./textures/japanese_stone_wall_disp_2k.png");
  const texture4 = useTexture("./textures/japanese_stone_wall_rough_2k.png");

  return (
    <>
      <TransformControls>
        <mesh scale={[0.5, 0.5, 0.5]} position={[0, 1, 0]} castShadow>
          <sphereGeometry />
          <meshStandardMaterial map={texture1} normalMap={texture2} roughnessMap={texture4}/>
        </mesh>
      </TransformControls>
    </>
  )
}




export default function Home() {
  const testing = true;

  return (
    <div className='container'>
      <Canvas shadows>
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[3]} /> : null}
        {testing ? <gridHelper args={[10, 10]} /> : null}
        <OrbitControls />
        {/* <TextureSpheres /> */}
        <Tree boundary={50} count={20} />
        <Lights />
        <Grounds />
        <MySoldier/>
      </Canvas>
    </div>
  )
}
