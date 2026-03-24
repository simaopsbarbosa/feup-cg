import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
   constructor(scene) {
      super(scene);
      this.initBuffers();
   }

   initBuffers() {
      this.vertices = [
         // Defining vertices by faces

         // Right face
         0.5, -0.5, 0.5, // A right - 0
         0.5, -0.5, -0.5, // B right - 1
         0.5, 0.5, 0.5, // C right - 2
         0.5, 0.5, -0.5, // D right - 3

         // Left face
         -0.5, -0.5, -0.5, // E left - 4
         -0.5, -0.5, 0.5, // F left - 5
         -0.5, 0.5, -0.5, // G left - 6
         -0.5, 0.5, 0.5, // H left - 7

         // Front face
         0.5, -0.5, 0.5, // A front - 8
         0.5, 0.5, 0.5, // C front - 9
         -0.5, 0.5, 0.5, // H front - 10
         -0.5, -0.5, 0.5, // F front - 11

         // Back face
         -0.5, -0.5, -0.5, // E back - 12
         -0.5, 0.5, -0.5, // G back - 13
         0.5, 0.5, -0.5, // D back - 14
         0.5, -0.5, -0.5, // B back - 15

         // Top face
         0.5, 0.5, 0.5, // C top - 16 
         0.5, 0.5, -0.5, // D top - 17
         -0.5, 0.5, -0.5, // G top - 18
         -0.5, 0.5, 0.5, // H top - 19

         // Bottom face
         0.5, -0.5, 0.5, // A bottom - 20
         -0.5, -0.5, 0.5, // F bottom - 21
         -0.5, -0.5, -0.5, // E bottom - 22
         0.5, -0.5, -0.5, // B bottom - 23
      ];


      this.indices = [
         // Right face (x = 0.5)
         0, 1, 2,
         1, 3, 2,

         // Left face (x = -0.5)
         5, 7, 4,
         7, 6, 4,

         // Front face (z = 0.5)
         8, 9, 11,
         9, 10, 11,

         // Back face (z = -0.5)
         15, 12, 14,
         12, 13, 14,

         // Top face (y = 0.5)
         19, 16, 18,
         16, 17, 18,

         // Bottom face (y = -0.5)
         23, 20, 22,
         20, 21, 22
      ];

      this.normals = [
         // Right face
         1, 0, 0,
         1, 0, 0,
         1, 0, 0,
         1, 0, 0,

         // Left face
         -1, 0, 0,
         -1, 0, 0,
         -1, 0, 0,
         -1, 0, 0,

         // Front face
         0, 0, 1,
         0, 0, 1,
         0, 0, 1,
         0, 0, 1,

         // Back face
         0, 0, -1,
         0, 0, -1,
         0, 0, -1,
         0, 0, -1,

         // Top face
         0, 1, 0,
         0, 1, 0,
         0, 1, 0,
         0, 1, 0,

         // Bottom face
         0, -1, 0,
         0, -1, 0,
         0, -1, 0,
         0, -1, 0
      ]

      //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
   }

   updateBuffers(complexity) {
   }
}
