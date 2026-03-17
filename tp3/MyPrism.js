import { CGFobject } from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
            // populate vertices
            var angle1 = i * angleIncrement;
            var angle2 = (i + 1) * angleIncrement;

            for (var stack = 0; stack <= this.stacks; stack++) {
                var h = stack / this.stacks;
                this.vertices.push(Math.cos(angle1), Math.sin(angle1), h);
                this.vertices.push(Math.cos(angle2), Math.sin(angle2), h);
            }

            // populate indices (2 triangles per face)
            var verticesPerFace = 2 * (this.stacks + 1);
            var base = i * verticesPerFace;
            for (var k = 0; k < this.stacks; k++) {
                var j = base + k * 2;
                this.indices.push(j + 1, j + 2, j);
                this.indices.push(j + 1, j + 3, j + 2);
            }
            
            // populate normals
            var normalX = Math.cos(angle1 + angleIncrement / 2);
            var normalY = Math.sin(angle1 + angleIncrement / 2);
            for (var stack = 0; stack <= this.stacks; stack++) {
                this.normals.push(normalX, normalY,0);
                this.normals.push(normalX, normalY,0);
            }
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

