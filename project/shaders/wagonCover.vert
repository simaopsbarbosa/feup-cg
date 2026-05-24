attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
   vTexCoord = aTextureCoord;
   
   float theta = aTextureCoord.y * 4.0 * 6.2831853; 
   float sag = (1.0 - cos(theta)) * 0.5;
   
   float dipAmount = 0.035; 
   vec3 displacedPos = aVertexPosition - aVertexNormal * sag * dipAmount;
   
   float dz = sin(theta) * dipAmount * 12.0; 
   vec3 newNormal = normalize(aVertexNormal + vec3(0.0, 0.0, dz));
   
   vNormal = normalize(uNMatrix * newNormal);
   vec4 pos = uMVMatrix * vec4(displacedPos, 1.0);
   vPosition = pos.xyz;
   gl_Position = uPMatrix * pos;
}