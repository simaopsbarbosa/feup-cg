import {CGFtexture,CGFshader } from "../lib/CGF.js";
import { MyRock } from "./MyRocks.js";
import { PoissonDiskSampling } from "./Noise/PoissonDiskSampling.js";

export class ScatterManager{
    constructor(scene){
        //texture and shader for rocks 
        this.rockShader=new CGFshader(scene.gl, "shaders/rock.vert", "shaders/rock.frag");
        this.rockTexture = new CGFtexture(scene, "images/rock/rockTex.jpg");
        this.rockHeightMap = new CGFtexture(scene, "images/rock/rockmap.jpg");
        let rockpostion=new PoissonDiskSampling(80,10);
        this.rocks=[];    
        for (let i = 0; i < rockpostion.points.length ; i++) {
            let radius=Math.random()*0.05+0.05;
            let x = rockpostion.points[i][0];
            let z = rockpostion.points[i][1];
            this.rocks.push(new MyRock(scene,radius,5,x,z,this.rockShader,this.rockTexture,this.rockHeightMap));
        }

    }
    display(camera){
        let viewDistance = 800; 
        let threshold = viewDistance * viewDistance;
    
        for (let i = 0; i < this.rocks.length; i++) {
            let rock=this.rocks[i];
            let x= rock.x-camera[0];
            let z=rock.z-camera[2];
            let distsqr=x*x+z*z;
            if(distsqr<threshold){
                rock.display();
            }
        }
    }
}