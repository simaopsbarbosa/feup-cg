attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler; 

varying vec2 vTextureCoord;
varying float vHeight;

void main() {
    vTextureCoord = aTextureCoord;

    float h = texture2D(uSampler, aTextureCoord).r;
    vHeight = h;

   
    vec3 displaced = aVertexPosition + aVertexNormal * h * 0.05;

    gl_Position = uPMatrix * uMVMatrix * vec4(displaced, 1.0);
}