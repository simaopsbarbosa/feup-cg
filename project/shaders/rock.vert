attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec3 uCameraPos;
uniform sampler2D uSampler2; 


uniform vec3 u_rockWorldPos;  
uniform float u_rockRadius;   

varying vec2 vTextureCoord;
varying float height;
varying float dist;

void main() {
    vTextureCoord = aTextureCoord;
    
    
    float terrainSize = 80.0;
    float halfSize = terrainSize / 2.0;
    vec2 terrainUV = (u_rockWorldPos.xz + halfSize) / terrainSize;

    float groundHeight = texture2D(uSampler2, terrainUV).r * 0.05; 
    height = groundHeight;

    
    dist = distance(u_rockWorldPos, uCameraPos);
    float lodWeight = 1.0 - smoothstep(10.0, 50.0, dist);

    
    vec3 localDeform = aVertexPosition + aVertexNormal * (groundHeight * 0.1) * lodWeight;

    localDeform.y += (groundHeight + u_rockRadius);

    gl_Position = uPMatrix * uMVMatrix * vec4(localDeform, 1.0);
}