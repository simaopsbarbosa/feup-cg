import { CGFobject } from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var angleIncrement = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            var angle1 = i * angleIncrement;
            var angle2 = (i + 1) * angleIncrement;

        
            
            for (var stack = 0; stack <= this.stacks; stack++) {
                // populate vertices
                var h = stack / this.stacks;
                this.vertices.push(Math.cos(angle1), Math.sin(angle1), h);
                
                // populate normals
                this.normals.push(Math.cos(angle1),Math.sin(angle1),0);
                
            }
            
          
        }
        
        for (var i = 0; i < this.slices; i++) {
            // populate indices
            var verticesPerFace = this.stacks + 1;
            var base = i * verticesPerFace;
            var nextBase = ((i + 1) % this.slices) * verticesPerFace;
            for (var k = 0; k < this.stacks; k++) {
                var j = base + k;
                var jNext=nextBase+k;
                this.indices.push(jNext,j+1,j );
                this.indices.push(jNext,jNext + 1, j+1, );
            }
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

