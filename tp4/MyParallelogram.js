import { CGFobject } from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,  // 0 - front
            2, 0, 0,  // 1 - front
            3, 1, 0,  // 2 - front
            1, 1, 0,  // 3 - front
            0, 0, 0,  // 4 - back
            2, 0, 0,  // 5 - back
            3, 1, 0,  // 6 - back
            1, 1, 0,  // 7 - back
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            // Front
            0,1,2,
            2,3,0,

            // Back
            6, 5, 4,
            4, 7, 6
        ];

        this.normals = [
            // Front
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            // Back
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ]

        this.texCoords = [
            0.25, 0.75,
            0.75, 0.75,
            1, 1,
            0.5, 1,
            0.25, 0.75,
            0.75, 0.75,
            1, 1,
            0.5, 1,
        ]

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

