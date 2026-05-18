attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSamplerHeightmap; 

varying vec2 vTextureCoord;
varying float vHeight;

void main() {
    vTextureCoord = aTextureCoord;

    
    float h = texture2D(uSamplerHeightmap, aTextureCoord).r;
    vHeight = h;

    //if you chnage the terrain vert displacment change it in the rock vert  please
    vec3 displaced = aVertexPosition + aVertexNormal * h * 0.02;

    gl_Position = uPMatrix * uMVMatrix * vec4(displaced, 1.0);
}