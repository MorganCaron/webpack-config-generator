import 'nootstrap-ui'
import 'js/App'
import loremIpsum from 'txt/loremIpsum.txt'

console.log(loremIpsum)

import {
	WebGLRenderer,
	PerspectiveCamera,
	Scene,
	ACESFilmicToneMapping,
	sRGBEncoding,
	PMREMGenerator,
	UnsignedByteType
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

class App {
	private container: HTMLElement
	private renderer: WebGLRenderer
	private camera: PerspectiveCamera
	private scene: Scene

	constructor(container: HTMLElement) {
		this.container = container
		this.renderer = new WebGLRenderer({
			alpha: false,
			antialias: true
		})
		this.renderer.toneMapping = ACESFilmicToneMapping
		this.renderer.toneMappingExposure = 1
		this.renderer.outputEncoding = sRGBEncoding
		this.container.appendChild(this.renderer.domElement)

		const pmremGenerator = new PMREMGenerator(this.renderer)
		pmremGenerator.compileEquirectangularShader()

		this.camera = new PerspectiveCamera(75, container.offsetWidth / container.offsetHeight)
		this.camera.position.set(-0.5, 0.7, 1.5)

		this.scene = new Scene()
		this.scene.add(this.camera)
		this.renderer.render(this.scene, this.camera)

		const controls = new OrbitControls(this.camera, this.renderer.domElement)
		controls.target.set(0, 0, -0.2)
		controls.update()

		new RGBELoader()
			.setDataType(UnsignedByteType)
			.setPath('static/textures/equirectangular/')
			.load('royal_esplanade_1k.hdr', (texture) => {
				const envMap = pmremGenerator.fromEquirectangular(texture).texture
				this.scene.background = envMap
				this.scene.environment = envMap

				texture.dispose()
				pmremGenerator.dispose()

				const loader = new GLTFLoader().setPath('static/models/gltf/DamagedHelmet/')
				loader.load('DamagedHelmet.gltf', (gltf) => {
					this.scene.add(gltf.scene)
				})
			})

		window.addEventListener('resize', this.onResize.bind(this));
		this.onResize()
		this.update()
	}

	private onResize() {
		this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
		this.camera.updateProjectionMatrix()
	}

	private update() {
		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame(this.update.bind(this))
	}
}

window.addEventListener('load', () => {
	const container = document.querySelector('#three') as HTMLElement
	new App(container)
}, false)
