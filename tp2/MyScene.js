import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);
    //Objects connected to MyInterface
    this.displayAxis = true;

    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
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
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    // Blue triangle
    this.pushMatrix();
    this.rotate(-Math.PI / 2, 0, 0, 1);
    this.translate(-2, -2, 0);
    this.triangleBig.display();
    this.popMatrix();

    // Orange triangle
    this.pushMatrix();
    this.translate(0, 4, 0);
    this.rotate(Math.PI / 2, 0, 0, 1);
    this.triangleBig.display(this.setDiffuse(255, 165, 0));
    this.popMatrix();

    // Pink triangle
    this.pushMatrix();
    this.translate(-1, 1, 0);
    this.rotate(Math.PI / 2, 0, 0, 1);
    this.triangle.display(this.setDiffuse(255, 0, 255));
    this.popMatrix();

    // Yellow parallelogram
    this.pushMatrix();
    this.rotate(Math.PI, 0, 1, 0);
    this.translate(-1.4, -1.4, 0);
    this.rotate(Math.PI / 4, 0, 0, 1);
    this.parallelogram.display(this.setDiffuse(255, 255, 0));
    this.popMatrix();

    // Green diamond
    this.pushMatrix();
    let translateMatrix = [1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -1.3, -0.7, 0, 1];
    this.multMatrix(translateMatrix);
    // this.translate(-1.3, -0.70, 0);

    let rotateMatrix = [Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4), 0, 0,
    Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1];
    this.multMatrix(rotateMatrix);
    this.diamond.display(this.setDiffuse(0, 225, 0));
    this.popMatrix();

    // Purple triangle
    this.pushMatrix();
    this.translate(2.1, -0.7, 0);
    this.rotate(3 * Math.PI / 4, 0, 0, 1);
    this.triangleSmall.display(this.setDiffuse(128, 0, 128));
    this.popMatrix();

    // Red triangle
    this.pushMatrix();
    this.translate(2.8, -0.4, 0);
    this.rotate(Math.PI, 0, 0, 1);
    this.triangleSmall.display(this.setDiffuse(255, 0, 0));
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
