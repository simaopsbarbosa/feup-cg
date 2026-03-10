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

            this.vertices.push(Math.cos(angle1), Math.sin(angle1), 0);
            this.vertices.push(Math.cos(angle1), Math.sin(angle1), 1);
            this.vertices.push(Math.cos(angle2), Math.sin(angle2), 0);
            this.vertices.push(Math.cos(angle2), Math.sin(angle2), 1);

            // populate indices (2 triangles per face)
            var base = i * 4;
            this.indices.push(base, base + 2, base + 1);
            this.indices.push(base + 2, base + 3, base + 1);

            // populate normals (4 per face)
            var angle1 = i * angleIncrement;
            var normalX = Math.cos(angle1 + angleIncrement / 2);
            var normalY = Math.sin(angle1 + angleIncrement / 2);

            this.normals.push(normalX, normalY, 0);
            this.normals.push(normalX, normalY, 0);
            this.normals.push(normalX, normalY, 0);
            this.normals.push(normalX, normalY, 0);
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

