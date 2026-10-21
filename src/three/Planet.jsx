import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { vert, planetFrag, atmoFrag } from './shaders'

export default function Planet({ position = [0, 0, 0], tilt = -0.18 }) {
  const body = useRef(), hover = useRef(0), target = useRef(0), pulse = useRef(0)
  const u = useMemo(() => ({ uT: { value: 0 }, uHover: { value: 0 }, uPulse: { value: 0 } }), [])
  const ua = useMemo(() => ({ uHover: u.uHover }), [u])
  useFrame((_, dt) => {
    hover.current = THREE.MathUtils.damp(hover.current, target.current, 5, dt)
    pulse.current = THREE.MathUtils.damp(pulse.current, 0, 2.5, dt)
    u.uT.value += dt; u.uHover.value = hover.current; u.uPulse.value = pulse.current
    body.current.rotation.y += dt * (0.08 + hover.current * 0.35 + pulse.current * 1.2)
  })
  return (
    <group position={position} rotation={[0.25, 0, tilt]}>
      <mesh ref={body} onPointerOver={() => (target.current = 1)} onPointerOut={() => (target.current = 0)} onClick={() => (pulse.current = 1)}>
        <sphereGeometry args={[1.6, 128, 128]} />
        <shaderMaterial vertexShader={vert} fragmentShader={planetFrag} uniforms={u} />
      </mesh>
      <mesh scale={1.14}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <shaderMaterial vertexShader={vert} fragmentShader={atmoFrag} uniforms={ua} side={THREE.BackSide} blending={THREE.AdditiveBlending} transparent depthWrite={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[2.3, 2.9, 160]} />
        <meshBasicMaterial color="#52E5F2" transparent opacity={0.16} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}