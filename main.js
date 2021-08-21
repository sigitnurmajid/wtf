import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Texture
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/static/textures/NormalMap.png')

// console.log(normalTexture)
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.65,100,100)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Light 2
 */
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(1.9,-3,-3)
pointLight2.intensity = 1.1
scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position , 'x').min(-3).max(3).step(0.1)
light2.add(pointLight2.position , 'y').min(-3).max(3).step(0.1)
light2.add(pointLight2.position , 'z').min(-3).max(3).step(0.1)
light2.add(pointLight2 , 'intensity').min(-3).max(10).step(0.1)

/**
 * Light 3
 */
 const pointLight3 = new THREE.PointLight(0x2e2396, 2)
 pointLight3.position.set(-7.5,11.5,-11.9)
 pointLight3.intensity = 4.2
 scene.add(pointLight3)
 
 const light3 = gui.addFolder('Light 3')
 light3.add(pointLight3.position , 'x').min(-20).max(20).step(0.1)
 light3.add(pointLight3.position , 'y').min(-20).max(20).step(0.1)
 light3.add(pointLight3.position , 'z').min(-20).max(20).step(0.1)
 light3.add(pointLight3 , 'intensity').min(-3).max(10).step(0.1)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    targetX = mouseX * .001
    targetY = mouseY * .001

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += .8 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()