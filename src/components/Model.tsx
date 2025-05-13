import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

export type ModelProps = ThreeElements['mesh'] & {
  /**
   * The URL of the GLTF model. You can get a model URL from a .glb asset like this:
   *
   * ```
   * import myModelUrl from './models/myModel.glb'
   * ```
   */
  modelUrl: string;

  /**
   * The size factor to apply to the displayed model. The model will be normalized and scaled to
   * fit within a cube of this size.
   *
   * If you ever need to increase or decrease the size of an existing model, you can simply adjust
   * this value instead of creating a brand new model asset.
   */
  size: number;

  // ...plus additional props from <mesh> including position, rotation, etc.
}

/**
 * Displays a GLTF model.
 */
export function Model({ modelUrl, size, castShadow, receiveShadow, ...rest }: ModelProps) {
  const { scene } = useGLTF(modelUrl);

  // Clone the scene for instancing. Important for multiple copies of the same model.
  const clonedScene = useMemo(() => {
    const model = scene.clone();

    // Ensure all meshes in the model cast and receive shadows by default
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = castShadow ?? true;
        child.receiveShadow = receiveShadow ?? true;
      }
    });

    // Normalize the original model size and scale to the desired size
    const box = new THREE.Box3().setFromObject(model);
    const originalSize = box.getSize(new THREE.Vector3());
    const maxLength = Math.max(originalSize.x, originalSize.y, originalSize.z);
    if (maxLength !== 0) {
      const denormalizedScale = size / maxLength;
      model.scale.setScalar(denormalizedScale);
    }

    return model;
  }, [scene]);

  return <primitive object={clonedScene} {...rest} />
}
