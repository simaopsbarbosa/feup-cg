import { CGFobject,CGFshader,CGFtexture } from '../lib/CGF.js';
import { MySphere } from "./Mysphere.js";
/**
 * MyTHalfSphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRock extends CGFobject {
    constructor(scene,radius,stacks) {
        super(scene);
        this.shape=new MySphere(scene,radius,stacks);
        this.gl=scene.gl;
        this.radius=radius;
        this.shader=new CGFshader(this.gl, "shaders/rock.vert", "shaders/rock.frag");
        this.rockTexture = new CGFtexture(this.scene, "images/rock/rockTex.jpg");
        this.rockHeightMap = new CGFtexture(this.scene, "images/rock/rockmap.jpg");
        this.points=this.generateData();
        this.shader.setUniformsValues({ uSampler:0,uSampler2: 1 });
        this.initBuffers();
    }

    
    display() {
        this.scene.setActiveShader(this.shader);
        this.rockTexture.bind(0);   
        this.rockHeightMap.bind(1);
        this.scene.pushMatrix();
            for(let p=1; p<50;p+=2){
                this.scene.translate(this.points[p-1],this.radius,this.points[p]);
                this.shape.display();
            }
         this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }

    generateData() {
        let points=[];
        for (let i = 0; i < 50; i++) {
            let x = Math.random()* 160-80;
            let z = Math.random()*160-80;
            points.push(x,z);
        }
        console.log(points);
        return points;
    }
    
}

