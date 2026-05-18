attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uTerrainHeightMap;
uniform float uTerrainSize;   
uniform float uTerrainScale; 


uniform vec2 uTreePos; 

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;

    vec2 terrainUV = (uTreePos + vec2(uTerrainSize / 2.0)) / uTerrainSize;

    
    vec4 heightData = texture2D(uTerrainHeightMap, terrainUV);
    float groundHeight = heightData.r * uTerrainScale;

    vec3 modifiedPosition = aVertexPosition;
    modifiedPosition.y += groundHeight;

    gl_Position = uPMatrix * uMVMatrix * vec4(modifiedPosition, 1.0);
}