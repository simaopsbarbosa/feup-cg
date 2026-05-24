precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform vec2 u_random1;
uniform float u_random2;
uniform float u_time;

varying vec2 vTextureCoord;

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

    vec2 terrainUV = vec2((aVertexPosition.x + 80.0) / 160.0, (80.0 - aVertexPosition.z) / 160.0);

    // Sample the terrain displacement function at this position to snap the blade root to the exact terrain height
    float distFromCenter = distance(terrainUV, vec2(0.5, 0.5));
    float edgeTransition = smoothstep(0.30, 0.65, distFromCenter);
    
    float baseNoise = noise(terrainUV * 3.0); 
    float centerNoise = noise(terrainUV * 25.0);
    
    float heightOffset = mix(centerNoise * 0.015, baseNoise * 0.6, edgeTransition);
    float terrainHeight = heightOffset * 160.0;

    // Check distance to center path to find culling factor (0.0 on path, 1.0 off path) matching terrain.frag
    float pathWarp = noise(terrainUV * 5.0) * 0.1;
    float pathDist = abs(terrainUV.x - 0.5 + pathWarp);
    float pathExclusion = smoothstep(0.025, 0.045, pathDist);

    vec3 displacedPosition = aVertexPosition;

    // Displace by pre-packed shape offset
    displacedPosition += aVertexNormal * pathExclusion;
    displacedPosition.y += terrainHeight;

    float windWeight = aTextureCoord.y;

    // Combine multiple sine waves for a non-periodic natural breeze effect
    float breezeX = sin(u_time * 2.2 + aVertexPosition.x * 0.35 + aVertexPosition.z * 0.15) * 0.26;
    float breezeZ = cos(u_time * 1.6 + aVertexPosition.x * 0.20 + aVertexPosition.z * 0.30) * 0.18;
    float flutter = sin(u_time * 8.5 + aVertexPosition.x * 3.0) * 0.035;
    breezeX += flutter;

    displacedPosition.x += breezeX * windWeight * pathExclusion;
    displacedPosition.z += breezeZ * windWeight * pathExclusion;

    gl_Position = uPMatrix * uMVMatrix * vec4(displacedPosition, 1.0);
}
