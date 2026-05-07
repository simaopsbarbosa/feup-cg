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

// 2D random
float random(in vec2 st) {
   return fract(sin(dot(st.xy, u_random1)) * u_random2);
}

float noise(in vec2 st) {
   vec2 i = floor(st);
   vec2 f = fract(st);

   // Four corners in 2D of a tile
   float a = random(i);
   float b = random(i + vec2(1.0, 0.0));
   float c = random(i + vec2(0.0, 1.0));
   float d = random(i + vec2(1.0, 1.0));

   // Smooth Interpolation

   // Cubic Hermine Curve. Same as SmoothStep()
   vec2 u = f * f * (3.0 - 2.0 * f);
   return mix(a, b, u.x) +
            (c - a) * u.y * (1.0 -u.x) +
            (d - b) * u.x * u.y;
}

// Layered octaves for more natural hills
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
   vTextureCoord = aTextureCoord;

   // Sample noise using UV coords
   float h = fbm(aTextureCoord * 3.0);
   vHeight = h;

   // Displace along normal (0.1 can be changed)
   vec3 displaced = aVertexPosition + aVertexNormal * h * 0.1;

   gl_Position = uPMatrix * uMVMatrix * vec4(displaced, 1.0);
}