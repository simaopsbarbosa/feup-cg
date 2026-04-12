attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;
uniform float heightScale;

varying vec2 vTextureCoord;

void main() {

   float height = texture2D(uSampler2, aTextureCoord).r;

   vec3 newPosition = aVertexPosition + aVertexNormal * height * heightScale;

   gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);

   vTextureCoord = aTextureCoord;
}