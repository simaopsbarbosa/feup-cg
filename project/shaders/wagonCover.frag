#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vPosition;

uniform sampler2D uSampler;
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

   vec3 cloth = texture2D(uSampler, vTexCoord).rgb;
   vec3 color = mix(cloth, cloth * uBaseColor, 0.35);
   color = color * (0.9 + 0.1 * weave) + vec3(grain);

   vec3 n = normalize(vNormal);
   float diff = max(dot(n, normalize(uLightDir)), 0.0);

   float ambient = 0.70;
   
   float theta = vTexCoord.y * 4.0 * 6.2831853;
   float sagOcc = (1.0 - cos(theta)) * 0.5;
   ambient -= sagOcc * 0.08; 
   
   color *= (ambient + diff * 0.35);
   color = mix(color, vec3(1.0), 0.04);

   gl_FragColor = vec4(color, 1.0);
}