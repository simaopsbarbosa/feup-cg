attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
   
    gl_Position = vec4(aVertexPosition.xy, 0.0, 1.0);
}