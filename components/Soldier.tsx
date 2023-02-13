import { useAnimations, useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


const Soldier = () => {

    const model = useGLTF("./models/newSoldier.glb")

    const {actions} = useAnimations(model.animations, model.scene);

    useEffect(() => {
      // actions?.bounce?.play();
    })

    // model.scene.traverse((object) => {
    //     if(object.isMesh) {
    //       object.castShadow = true;
    //     }
    //   })

      return <primitive object={model.scene} position={[1, 0, 1]}/>

}

export default Soldier;