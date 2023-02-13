import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper } from "three";

type Props = {
    isTesting: boolean;
}

const AnimatedBox: React.FC<Props> = ({isTesting}) => {
    const meshRef = useRef<THREE.Mesh>(null);

      //@ts-ignore
   { isTesting ? useHelper(meshRef, BoxHelper, "blue") : null};

    useFrame(() => {
      //@ts-ignore
      meshRef.current.rotation.x += 0.1;
    })
    return(
      <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
    )
  }

  export default AnimatedBox;