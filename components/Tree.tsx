import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { log } from "console";


export function Tree({boundary, count}) {
    const model = useLoader(GLTFLoader, "./models/treeCollision.glb");
    const [trees, setTrees] = useState([]);
  

  model.scene.traverse((object) => {
    if(object.isMesh) {
      object.castShadow = true;
    }
  })

  const newPosition = (box, boundary) => {
    return (
      boundary / 2 - box / 2 - 
      (boundary - box) * (Math.round(Math.random() * 100) / 100)
    )
  }

  const updatePosition = (treeArray, boundary) => {
    treeArray.forEach((tree, index) => {
      tree.position.x = newPosition(tree.box, boundary);
      tree.position.z = newPosition(tree.box, boundary);
    })
    setTrees(treeArray);
  };

  useEffect(() => {
    const tempTrees = [];
    for(let i = 0; i < count; i++) {
      tempTrees.push({position: {x: 0, y: 0}, box: 1})
    }
    console.log(tempTrees);
    updatePosition(tempTrees, boundary);

  }, [boundary, count])

  return (
      <object3D scale={[0.5, 0.5, 0.5]}>
        {trees.map((tree, index) => (
          <object3D key={index} position={[tree.position.x, 0, tree.position.z]}>
            <mesh>
              <boxGeometry scale={[tree.box, tree.box, tree.box]} />
              <meshBasicMaterial color={"blue"}/>
            </mesh>
            <primitive object={model.scene.clone()}></primitive>  
          </object3D>
        ))}
        <primitive object={model.scene} />
      </object3D>
    )
  }

