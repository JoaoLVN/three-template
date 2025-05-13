import { Canvas } from '@react-three/fiber';
import { createRoot } from 'react-dom/client';
import { Game } from './Game';
import { StrictMode } from 'react';
import { white } from './colors';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas shadows>
      <color attach="background" args={[white]}></color>
      <Game></Game>
    </Canvas>
  </StrictMode>
)
