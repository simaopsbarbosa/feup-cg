precision highp float;

varying vec2 vTextureCoord;

uniform vec2 u_random1;
uniform float u_random2;

float random(in vec2 st) {
   return fract(sin(dot(st.xy, u_random1)) * u_random2);
}

float noise(in vec2 st) {
   vec2 i = floor(st);
   vec2 f = fract(st);
   vec2 u = f * f * (3.0 - 2.0 * f);
   float a = random(i);
   float b = random(i + vec2(1.0, 0.0));
   float c = random(i + vec2(0.0, 1.0));
   float d = random(i + vec2(1.0, 1.0));
   return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
   float value = 0.0;
   float amplitude = 0.5;
   float frequency = 1.0;
   for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
   }
   return value;
}

void main() {
  
    float h = fbm(vTextureCoord * 1.0);
  
    gl_FragColor = vec4(vec3(h), 1.0);
}


























