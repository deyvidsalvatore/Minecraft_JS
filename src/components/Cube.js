import { useBox } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import * as textures from "../images/textures"


export const Cube = ({position, texture}) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }));

    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);

    const activeTexture = textures[texture + 'Texture']
    return (
        <mesh 
        onClick={(e) => {
            e.stopPropagation();
            //https://mammothmemory.net/images/user/base/Maths/Geometry/Internal%20Angles%20of%20Polygons/a-square-made-from-two-triangles.cd83ad7.jpg
            const clickedFace = Math.floor(e.faceIndex / 2);
            const {x, y, z} = ref.current.position;

            if(e.altKey){
                removeCube(x, y, z);
                return
            }

            if (clickedFace === 0){
                addCube(x + 1, y, z);
                return;
            }
            else if (clickedFace === 1){
                addCube(x - 1, y, z);
                return;
            }
            else if (clickedFace === 2){
                addCube(x , y + 1, z);
                return;
            }
            else if (clickedFace === 3){
                addCube(x , y - 1, z);
                return;
            }
            else if (clickedFace === 4){
                addCube(x , y, z + 1);
                return;
            }
            else if (clickedFace === 5){
                addCube(x-1 , y, z - 1);
                return;
            }
        }}
        ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial map={activeTexture} attach="material"/>
        </mesh>
    );
};