import { useState } from 'react'
import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'
import { useStore } from '../hooks/useStore'

export const Cube = ({ position, texture }) => {
  const [isHovered, setisHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }))
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ])

  const activeTexture = textures[`${texture}Texture`]
  return (
    <mesh
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation()
        setisHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setisHovered(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        const clickedFace = Math.floor(e.faceIndex / 2)
        const { x, y, z } = ref.current.position
        if (e.altKey) {
          removeCube(x, y, z)
          return
        }
        if (clickedFace === 0) {
          addCube(x + 1, y, z)
          return
        }
        if (clickedFace === 1) {
          addCube(x - 1, y, z)
          return
        }
        if (clickedFace === 2) {
          addCube(x, y + 1, z)
          return
        }
        if (clickedFace === 3) {
          addCube(x, y - 1, z)
          return
        }
        if (clickedFace === 4) {
          addCube(x, y, z + 1)
          return
        }
        if (clickedFace === 5) {
          addCube(x, y, z - 1)
          return
        }
      }}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        color={isHovered ? 'grey' : 'white'}
        map={activeTexture}
        transparent={true}
        opacity={texture === 'glass' ? 0.6 : 1}
        attach='material'
      />
    </mesh>
  )
}
