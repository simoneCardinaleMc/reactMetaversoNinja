import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useInput } from "./useInputs";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();


const directionOffset = ({forward , backward, left, right }) => {
    var directionOffset = 0; // w

    if(forward) {
        if(left) {
            directionOffset = Math.PI / 4 // w+a
        } 
        else if(right) {
            directionOffset = -Math.PI / 4 //w+d
        }
    } else if (backward) {
        if(left) {
            directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
        } 
        else if(right) {
            directionOffset = -Math.PI / 4  - Math.PI / 2//s+d
        } else {
            directionOffset = Math.PI; // s
        }
    } else if (left) {
        directionOffset = Math.PI / 2 // a;
    } else if(right) {
        directionOffset = -Math.PI / 2 // d
    }
    
    return directionOffset;
}

const MySoldier = () => {
    const {forward, backward, left, right} = useInput();
    const model = useGLTF("./models/ninja.glb")
    
    
  
      const {actions} = useAnimations(model.animations, model.scene);
      
      const currentAction = useRef("");
      const controlRef = useRef<typeof OrbitControls>();
      const camera = useThree((state) => state.camera);

      const updateCameraTarget = (moveX, moveZ) =>{

        //move camera
        camera.position.x += moveX;
        camera.position.z += moveZ;

        //update camera target
        cameraTarget.x = model.scene.position.x;
        cameraTarget.y = model.scene.position.y + 2;
        cameraTarget.z = model.scene.position.z;

        if(controlRef.current) {
            controlRef.current.target = cameraTarget;
        }
      }
  
  
      useEffect(() => {
        
        let action = "";
  
        if(forward || backward || left || right) {
          action = "walking";
        } else {
          action = "idle"
        }
        
  
        if(currentAction.current != action) {
          const nextActionToPlay = actions[action];
          const current = actions[currentAction.current];
          current?.fadeOut(0.2);
          nextActionToPlay?.reset().fadeIn(0.2).play();
          currentAction.current = action;
        }
  
  
  
      }, [forward, backward, left, right])
  
      model.scene.traverse((object) => {
          if(object.isMesh) {
            object.castShadow = true;
          }
        }, [])

        useFrame((state, delta) => {
            if(currentAction.current === 'walking') {

                // calculate camera direction
               let angleYCameraDirection = Math.atan2(
                camera.position.x - model.scene.position.x,
                camera.position.z - model.scene.position.z
               );


               // diagonal movement
               let newDirectionOffset = directionOffset({
                forward,
                backward,
                left,
                right
               })

                // rotate avatar
               rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + newDirectionOffset);
               model.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

               // calculate direction
               camera.getWorldDirection(walkDirection);
               walkDirection.y = 0;
               walkDirection.normalize;
               walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);
            }

            //walk velocity
            const velocity = currentAction.current === 'walking' ? 3 : null;

            // move model & camera
            const moveX = walkDirection.x * velocity * delta;
            const moveZ = walkDirection.z * velocity * delta;
            model.scene.position.x += moveX;
            model.scene.position.z += moveZ;
            updateCameraTarget(moveZ, moveZ)
        })

        
  
        return (
            <>
                <OrbitControls ref={controlRef} />
                <primitive object={model.scene} position={[1, 0, 1]}/>
            </>
        )
        
  }

  export default MySoldier