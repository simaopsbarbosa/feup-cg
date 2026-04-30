import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyHalfSphere } from "./halfsphere.js";
import { MyPlane } from "./MyPlane.js";
import { MyCloud } from "./MyCloud.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        this.setUpdatePeriod(16);

        // populate cloud textures array
        this.cloudTextures = [];
        for (let i = 1; i <= 20; i++) {
            this.cloudTextures.push(new CGFtexture(this, `images/clouds/${i}.png`));
        }

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 20);

        // Shaders
        this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        //-------Objects connected to MyInterface
        this.displayAxis = true;
        this.textureFiltering = false;
        this.scaleFactor = 5;
        this.selectedTexture = -1;
        this.wrapS = 0;
        this.wrapT = 0;

        this.clouds = [];
        let numberOfClouds = 50;
        for (let i = 0; i < numberOfClouds; i++) {
            let cloud = new MyCloud(this, this.cloudTextures);

            // randomize inital clouds
            cloud.x = -50 + Math.random() * 100;
            this.clouds.push(cloud);
        }

        this.lastTime = 0;

        this.sunDirection = [-1.0, 0.7, 0.3];

        this.halfSphere = new CGFtexture(this, 'images/sky.png');
        this.textures = [this.texture1, this.texture2, this.texture3];
        this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];

        this.textureIds = { 'Board': 0, 'Floor': 1, 'Window': 2 };
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };

        this.sphere = new MyHalfSphere(this, 80, 100, this.halfSphere);
        this.sphere.appearance.setEmission(1.0, 1.0, 1.0, 1.0);


    }

    initLights() {
        // Don't change this because of the default material for the sky
        this.lights[0].setAmbient(0.1, 0.1, 0.1, 1.0);
        // Can stay like this but test new values for a better effect
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(0.8, 0.8, 0.7, 1.0);
        this.lights[0].enable();
    }

    updateLights() {
        // Directional light
        this.lights[0].setPosition(this.sunDirection[0], this.sunDirection[1], this.sunDirection[2], 0.0);
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    update(t) {
        if (this.lastTime == 0) this.lastTime = t;
        let deltaTime = t - this.lastTime;
        this.lastTime = t;

        let timeScale = 0.005;

        for (let i = 0; i < this.clouds.length; i++) {
            this.clouds[i].update(deltaTime * timeScale);
        }
    }

    display() {

        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.updateLights();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        // Sphere
        this.sphere.display();

        // Clouds
        this.gl.disable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.depthMask(false);

        for (let i = 0; i < this.clouds.length; i++) {
            if (this.clouds[i].isReady()) {
                this.clouds[i].display();
            }
        }

        this.gl.depthMask(true);
        this.gl.disable(this.gl.BLEND);
        this.gl.enable(this.gl.CULL_FACE);

        this.popMatrix();

        // Plane
        this.pushMatrix();
        this.scale(30, 30, 30);
        this.rotate(-Math.PI / 2, 1, 0, 0);

        this.setActiveShader(this.terrainShader);
        this.plane.display();
        this.setActiveShader(this.defaultShader);

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}