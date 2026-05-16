precision mediump float;

varying vec2 vTextureCoord;
varying float vHeight;

uniform sampler2D uSamplerGrass;
uniform sampler2D uSamplerRock;
uniform sampler2D uSamplerPath;
uniform sampler2D uSamplerDirt;

uniform vec2 u_random1;
uniform float u_random2;

// 2D random
float random(in vec2 st) {
    return fract(sin(dot(st.xy, u_random1)) * u_random2);
}

float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // four corners of a 2d tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    // fract() to force repeat
    vec4 grassColor = texture2D(uSamplerGrass, fract(vTextureCoord * 10.0));
    vec4 rockColor = texture2D(uSamplerRock, fract(vTextureCoord * 10.0));
    vec4 pathColor = texture2D(uSamplerPath, fract(vTextureCoord * 10.0));
    vec4 dirtColor = texture2D(uSamplerDirt, fract(vTextureCoord * 10.0));

    // dirt patches on grass
    float dirtNoise = noise(vTextureCoord * 20.0);
    vec4 grassWithDirt = mix(grassColor, dirtColor, smoothstep(0.7, 0.9, dirtNoise));

    // pathway
    float pathWarp = noise(vTextureCoord * 5.0) * 0.1;
    float distFromCenter = abs(vTextureCoord.x - 0.5 + pathWarp);
    float pathMask = 1.0 - smoothstep(0.03, 0.04, distFromCenter); // 1 on path, 0 otherwise

    // grass/dirt mix everywhere except on path
    vec4 terrainBase = mix(grassWithDirt, pathColor, pathMask);

    // mountain on high terrain (vHeight > 0.2)
    float heightMask = smoothstep(0.2, 0.5, vHeight);
    
    vec4 finalColor = mix(terrainBase, rockColor, heightMask);

    gl_FragColor = finalColor;
}
