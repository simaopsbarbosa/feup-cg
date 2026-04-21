import { CGFobject } from '../lib/CGF.js';
/**
 * MyTHalfSphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
    constructor(scene,radius,stacks) {
        super(scene);
        this.stacks=stacks;
        this.radius=radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        const radsPerUnit = Math.PI / this.stacks;
        let latitude = -Math.PI / 2;
        var sliceVertCount = this.stacks*2;
        //this goes by stack and completes the entire band
        for (var i = 0; i <= this.stacks; i++) {
                let longitude = 0;
                for (let j = 0; j <= sliceVertCount; j++) {
                    let x=this.radius*Math.cos(latitude)*Math.cos(longitude);
                    let y=this.radius*Math.sin(latitude);
                    let z = this.radius * Math.cos(latitude)*Math.sin(longitude)
                    this.vertices.push(x,y, z);
                    this.normals.push(x , y, z);
                    longitude += radsPerUnit;

                }
            latitude += radsPerUnit;    
        }
        
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < sliceVertCount; j++) {
                let first = i * (sliceVertCount + 1) + j;
                let second = first + sliceVertCount + 1;
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
                this.indices.push(first+1, second, first );
                this.indices.push(first + 1, second + 1,second );
            }
        }

        
        this.primitiveType = this.scene.gl.TRIANGLES;
        
      

        this.initGLBuffers();
        
       
    }
}

