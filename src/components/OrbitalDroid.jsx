import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Html } from '@react-three/drei'
import * as THREE from 'three'

// --- 3D SUB-COMPONENTS --- //

const Satellite = ({ radius, speed, offset, size, color = "#fff" }) => {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 0.5) * (radius * 0.1)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}

const OrbitRing = ({ radius, rotation }) => {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.003, 16, 100]} />
      <meshStandardMaterial color="#fff" transparent opacity={0.1} />
    </mesh>
  )
}

const DroidModel = ({ mouse }) => {
  const group = useRef()
  const body = useRef()

  // Manual lerp for stability
  const lerp = (a, b, t) => a + (b - a) * t

  useFrame((state) => {
    if (!mouse) return

    // Smoothly tilt body towards global mouse
    if (body.current) {
      body.current.rotation.y = lerp(body.current.rotation.y, mouse.x * 0.4, 0.1)
      body.current.rotation.x = lerp(body.current.rotation.x, -mouse.y * 0.3, 0.1)
    }

    // Subtle floating animation
    group.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime) * 0.05
  })

  return (
    <group ref={group} scale={2}>
      {/* Main Droid Body - Half Dome */}
      <group ref={body}>
        {/* Dome Body (Half-Sphere) */}
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.05}
            roughness={0.15}
            envMapIntensity={1}
          />
        </mesh>

        {/* Eyes (Vertical Ovals) */}
        <mesh position={[0.1, 0.15, 0.35]}>
          <capsuleGeometry args={[0.03, 0.1, 16, 16]} />
          <meshBasicMaterial color="#000" />
        </mesh>
        <mesh position={[-0.1, 0.15, 0.35]}>
          <capsuleGeometry args={[0.03, 0.1, 16, 16]} />
          <meshBasicMaterial color="#000" />
        </mesh>
      </group>

      {/* Orbital System */}
      <group rotation={[Math.PI / 10, 0, 0]} position={[0, 0.1, 0]}>
        <OrbitRing radius={0.8} rotation={[Math.PI / 2.1, 0, 0]} />
        <Satellite radius={0.8} speed={1.1} offset={0} size={0.03} />

        <OrbitRing radius={1.2} rotation={[Math.PI / 2.4, 0.2, 0]} />
        <Satellite radius={1.2} speed={-0.7} offset={Math.PI} size={0.04} />

        <OrbitRing radius={1.7} rotation={[Math.PI / 2, -0.2, 0]} />
        <Satellite radius={1.7} speed={0.4} offset={2} size={0.05} />
      </group>

      {/* Ground/Shadow/Glow Base */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.7, 32]} />
        <meshStandardMaterial color="#00f0ff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// --- MAIN COMPONENT --- //

const OrbitalDroid = ({ mouse }) => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 35 }}>
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#fff" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#00f0ff" />

        {/* Environment - Studio look */}
        <Environment preset="night" />

        <DroidModel mouse={mouse} />

        {/* Ground Shadows */}
        <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={12} blur={2.5} far={4} color="#000" />
      </Canvas>
    </div>
  )
}

export default OrbitalDroid
