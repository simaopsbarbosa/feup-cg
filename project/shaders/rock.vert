attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec3 uCameraPos;
// Bound to Texture Unit 2 via MyRock.js: this.terrainHeightMap.bind(2)
uniform sampler2D uSampler2; 

uniform vec3 u_rockWorldPos;  
uniform float u_rockRadius;   

varying vec2 vTextureCoord;
varying float height;
varying float dist;

void main() {
    vTextureCoord = aTextureCoord;
    
    //if you chnage the world scale come here and chnage the 60 to the correct world size
    vec2 terrainUV = (u_rockWorldPos.xz / 60.0) + 0.5;


    float rawHeightValue = texture2D(uSampler2, terrainUV).r; 
    
   //if you chnage the terrain vert displacment change 0.02 please
    float worldGroundHeight = rawHeightValue * 60.0*0.02; 
    
 
    height = rawHeightValue;


    dist = distance(u_rockWorldPos, uCameraPos);
    float lodWeight = 1.0 - smoothstep(10.0, 50.0, dist);

    vec3 localDeform = aVertexPosition + aVertexNormal * (rawHeightValue * u_rockRadius * 0.2) * lodWeight;

    
    localDeform.y += (worldGroundHeight );

    gl_Position = uPMatrix * uMVMatrix * vec4(localDeform, 1.0);
}