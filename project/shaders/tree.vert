attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;


uniform sampler2D uTerrainHeightMap; // Replaces uSampler2

uniform float uTerrainSize;          
uniform float uTerrainScale;        
uniform vec2 uTreePos;               

varying vec2 vTextureCoord;

void main() {
   
    vTextureCoord = aTextureCoord;
    
    
    vec2 terrainUV = (uTreePos / uTerrainSize) + vec2(0.5);

    float rawHeightValue = texture2D(uTerrainHeightMap, terrainUV).r; 
    
    
    float worldGroundHeight = rawHeightValue * uTerrainScale; 
    
    vec3 modifiedPosition = aVertexPosition;
    modifiedPosition.y += worldGroundHeight;

    gl_Position = uPMatrix * uMVMatrix * vec4(modifiedPosition, 1.0);
}