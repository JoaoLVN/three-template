import * as THREE from 'three';
import { useRef, useState } from 'react';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { blue, red } from '../colors';

export function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? red : blue} />
    </mesh>
  )
}
