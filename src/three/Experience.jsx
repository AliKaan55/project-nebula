import { useRef, useMemo, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import Planet from './Planet'
import { SKILLS } from '../data/content'

// [camera position, look target] for each section, in flight order.
const WP = [
  [[-1.8, 0, 7], [-1.8, 0, 0]],
  [[-9, 3, -20], [0, 0, -42]],
  [[19, 1, -24], [19, 0, -34]],
  [[0, 0, -66], [0, 0, -92]],
  [[0, 0, -108], [0, 0, -140]],
  [[0, 0, -157], [0, -1, -166]],
]
const NARROW = { 0: [[0, -1.2, 9], [0, -1.2, 0]], 2: [[22, 2.5, -24], [22, -1, -34]] }

function Rig({ story, narrow }) {
  const tp = useMemo(() => new THREE.Vector3(), []), tl = useMemo(() => new THREE.Vector3(), [])
  const tmp = useMemo(() => new THREE.Vector3(), []), look = useRef(new THREE.Vector3(...WP[0][1]))
  useFrame((s, dt) => {
    const t = story.current, a = Math.floor(t), b = Math.min(a + 1, 5), f = t - a, e = f * f * (3 - 2 * f)
    const at = i => (narrow && NARROW[i]) || WP[i]
    tp.fromArray(at(a)[0]).lerp(tmp.fromArray(at(b)[0]), e)
    tl.fromArray(at(a)[1]).lerp(tmp.fromArray(at(b)[1]), e)
    tp.x += s.pointer.x * 0.6; tp.y += s.pointer.y * 0.4
    const k = 1 - Math.exp(-3 * dt)
    s.camera.position.lerp(tp, k); look.current.lerp(tl, k); s.camera.lookAt(look.current)
  })
  return null
}

function Galaxy() {
  const ref = useRef()
  const g = useMemo(() => {
    const n = 14000, p = new Float32Array(n * 3), c = new Float32Array(n * 3)
    const A = new THREE.Color('#52E5F2'), B = new THREE.Color('#7B5CFF'), t = new THREE.Color()
    for (let i = 0; i < n; i++) {
      const r = Math.random() ** 1.6 * 26, ang = r * 0.35 + (i % 3) * 2.094, s = (Math.random() - 0.5) * (0.4 + r * 0.08)
      p.set([Math.cos(ang) * r + s * 2, (Math.random() - 0.5) * (2 - r * 0.05) + s * 0.4, Math.sin(ang) * r + s * 2], i * 3)
      t.copy(A).lerp(B, r / 26); c.set([t.r, t.g, t.b], i * 3)
    }
    return { p, c }
  }, [])
  useFrame((_, dt) => (ref.current.rotation.y += dt * 0.02))
  return (
    <points ref={ref} position={[0, 0, -42]} rotation={[0.5, 0, 0.2]}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[g.p, 3]} /><bufferAttribute attach="attributes-color" args={[g.c, 3]} /></bufferGeometry>
      <pointsMaterial size={0.09} vertexColors transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

const NODES = [[0, 1.8, 0], [-2.6, -0.2, 0.6], [2.6, 0, -0.6], [1.3, -2.1, 1], [-1.6, 2.4, -1]]
const EDGES = [[0, 1], [0, 2], [1, 2], [2, 3], [0, 4], [4, 1], [1, 3]]

function Constellation({ skill, setSkill }) {
  const ref = useRef()
  useFrame((_, dt) => (ref.current.rotation.y += dt * 0.12))
  return (
    <group position={[22, 0, -34]}>
      <group ref={ref}>
        {EDGES.map(([a, b], i) => <Line key={i} points={[NODES[a], NODES[b]]} color="#52E5F2" transparent opacity={0.35} lineWidth={1} />)}
        {NODES.map((p, i) => (
          <mesh key={i} position={p} scale={skill === i ? 1.7 : 1} onPointerOver={() => setSkill(i)} onPointerOut={() => setSkill(null)}>
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshBasicMaterial color={skill === i ? '#52E5F2' : '#7B5CFF'} />
            <Html center distanceFactor={9} position={[0, 0.7, 0]} style={{ pointerEvents: 'none' }}><span className={skill === i ? 'tag on' : 'tag'}>{SKILLS[i].name}</span></Html>
          </mesh>
        ))}
      </group>
      {[3.4, 4.6, 5.8].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2.4 + i * 0.4, i * 0.6, 0]}><torusGeometry args={[r, 0.012, 8, 128]} /><meshBasicMaterial color="#52E5F2" transparent opacity={0.25} /></mesh>
      ))}
    </group>
  )
}

function Asteroids() {
  const ref = useRef()
  const m = useMemo(() => {
    const o = new THREE.Object3D(), a = []
    for (let i = 0; i < 380; i++) {
      const r = 4 + Math.random() * 16, th = Math.random() * 6.283
      o.position.set(Math.cos(th) * r, Math.sin(th) * r * 0.6, -66 - Math.random() * 50)
      o.rotation.set(Math.random() * 6, Math.random() * 6, 0); o.scale.setScalar(0.15 + Math.random() ** 3 * 1.4)
      o.updateMatrix(); a.push(o.matrix.clone())
    }
    return a
  }, [])
  useLayoutEffect(() => { m.forEach((x, i) => ref.current.setMatrixAt(i, x)); ref.current.instanceMatrix.needsUpdate = true }, [m])
  useFrame((_, dt) => (ref.current.rotation.z += dt * 0.02))
  return (
    <instancedMesh ref={ref} args={[null, null, m.length]}>
      <icosahedronGeometry args={[1, 0]} /><meshStandardMaterial color="#2a2f66" roughness={0.9} flatShading />
    </instancedMesh>
  )
}

function Tunnel() {
  return (
    <group position={[0, 0, -110]}>
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={i} position={[0, 0, -i * 3.4]}><torusGeometry args={[4, 0.03, 8, 64]} /><meshBasicMaterial color={i % 2 ? '#7B5CFF' : '#52E5F2'} /></mesh>
      ))}
      <gridHelper args={[60, 60, '#52E5F2', '#1a2a7a']} position={[0, -4, -27]} />
    </group>
  )
}

export default function Experience({ story, narrow, skill, setSkill }) {
  return (
    <Canvas className="scene" dpr={[1, 2]} camera={{ position: [-1.8, 0, 7], fov: 45 }}
      eventSource={document.getElementById('root')} eventPrefix="client" gl={{ powerPreference: 'high-performance' }}>
      <color attach="background" args={['#04061A']} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 4, -70]} intensity={400} color="#52E5F2" />
      <pointLight position={[8, -4, -95]} intensity={400} color="#7B5CFF" />
      <Stars radius={90} depth={80} count={4000} factor={4} fade speed={0.5} />
      <Sparkles count={260} scale={[40, 24, 180]} position={[0, 0, -80]} size={3} speed={0.3} color="#52E5F2" />
      <Planet />
      <Galaxy />
      <Constellation skill={skill} setSkill={setSkill} />
      <Asteroids />
      <Tunnel />
      <Planet position={[0, -1, -166]} tilt={0.2} />
      <Rig story={story} narrow={narrow} />
    </Canvas>
  )
}