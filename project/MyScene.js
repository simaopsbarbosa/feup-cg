import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyHalfSphere } from "./halfsphere.js";
import { MyPlane } from "./MyPlane.js";

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

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 20);

        //-------Objects connected to MyInterface
        this.displayAxis = true;
        this.textureFiltering = false;
        this.scaleFactor = 5;
        this.selectedTexture = -1;
        this.wrapS = 0;
        this.wrapT = 0;

        this.halfSphere = new CGFtexture(this, 'images/nature.jpg');
        this.textures = [this.texture1, this.texture2, this.texture3];
        this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];

        this.textureIds = { 'Board': 0, 'Floor': 1, 'Window': 2 };
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };

        this.sphere = new MyHalfSphere(this, 80, 100, this.halfSphere);


    }

    initLights() {
        // The scene appears darker because of the ambient light, but when sky texture applied it will look better
        // TODO: Change later according to the position of the sun
        this.lights[0].setPosition(-0.5, 1.0, -0.3, 0.0);
        // Don't change this because of the default material for the sky
        this.lights[0].setAmbient(0.1, 0.1, 0.1, 1.0);
        // Can stay like this but test new values for a better effect
        this.lights[0].setDiffuse(1.0, 0.9, 0.8, 1.0);
        this.lights[0].setSpecular(0.8, 0.8, 0.7, 1.0);
        this.lights[0].enable();
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

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        // ---- BEGIN Primitive drawing section

        this.sphere.display();

        // ---- END Primitive drawing section
    }
}