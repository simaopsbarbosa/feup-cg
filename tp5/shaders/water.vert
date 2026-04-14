attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;
uniform float timeFactor;

varying vec2 vTextureCoord;

varying float height;

void main() {
   vTextureCoord = aTextureCoord + vec2(timeFactor * 0.01, timeFactor * 0.01);

   height = texture2D(uSampler2, vTextureCoord).b;

   vec3 newPosition = aVertexPosition + aVertexNormal * height * 0.05;

   gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);
}