attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform vec3 uCameraPos;
uniform sampler2D uSampler2;

varying vec2 vTextureCoord;
varying float height;
varying float dist;

void main() {
	vTextureCoord = aTextureCoord;
	height = texture2D(uSampler2, vTextureCoord).r;
	dist = distance(aVertexPosition, uCameraPos);
	float lodWeight = 1.0 - smoothstep(10.0, 50.0, dist);
   	vec3 newPosition = aVertexPosition + aVertexNormal * height * 0.05*lodWeight;
	gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);
	
}

