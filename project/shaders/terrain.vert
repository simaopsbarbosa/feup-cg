precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec2 u_random1;
uniform float u_random2;

varying vec2 vTextureCoord;
varying float vHeight;


float random(in vec2 st) {
    return fract(sin(dot(st.xy, u_random1)) * u_random2);
}

float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vTextureCoord = aTextureCoord;
    
   
    float baseNoise = noise(aTextureCoord * 3.0); 
    float centerNoise = noise(aTextureCoord * 25.0);
    float distFromCenter = distance(aTextureCoord, vec2(0.5, 0.5));

    float edgeTransition = smoothstep(0.30, 0.65, distFromCenter);
\
    float heightOffset = mix(centerNoise * 0.015, baseNoise * 0.6, edgeTransition);
    
    
    vHeight = heightOffset; 
   
    
    vec3 displaced = aVertexPosition + aVertexNormal * heightOffset;

    gl_Position = uPMatrix * uMVMatrix * vec4(displaced, 1.0);
}
