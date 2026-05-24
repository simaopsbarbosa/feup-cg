#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec3 uLightDir;
uniform vec3 uBaseColor;
uniform float uWeaveScale;

float hash(vec2 p) {
   return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
   vec2 uv = vTexCoord * uWeaveScale;

   float row = floor(uv.y);
   float col = floor(uv.x);
   float wx = fract(uv.x);
   float wy = fract(uv.y);

   float wrap = smoothstep(0.0, 0.18, wx) * smoothstep(1.0, 0.82, wx);
   float weft = smoothstep(0.0, 0.18, wy) * smoothstep(1.0, 0.82, wy);
   float checker = mod(row + col, 2.0);
   float weave = mix(weft * 0.8 + wrap * 0.20, wrap * 0.8 + weft * 0.20, checker);

   float grain = hash(vec2(col, row)) * 0.05 - 0.025;

   vec3 color = (uBaseColor + vec3(grain)) * (0.85 + 0.15 * weave);

   vec3 n = normalize(vNormal);
   float diff = abs(dot(n, normalize(uLightDir)));

   float ambient = 0.65;
   
   float theta = vTexCoord.y * 4.0 * 6.2831853;
   float sagOcc = (1.0 - cos(theta)) * 0.5;
   ambient -= sagOcc * 0.15; 
   
   color *= (ambient + diff * 0.45);

   gl_FragColor = vec4(color, 1.0);
}