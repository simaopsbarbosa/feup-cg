attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uTime;
uniform float uScale;

varying vec2 vTextureCoord;

void main() {
    vec4 viewPos = uMVMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    
    vec3 offset = aVertexPosition * uScale;
    
    float bounce = sin(uTime * 5.0) * 0.25;
    offset.y += bounce;
    
    viewPos.xyz += offset;
    
    gl_Position = uPMatrix * viewPos;
    vTextureCoord = aTextureCoord;
}
