#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTextureCoord;
varying float vHeight;

uniform sampler2D uSampler;

void main() {
   vec3 deepGrass = vec3(0.15, 0.35, 0.10);
   vec3 grass = vec3(0.30, 0.55, 0.20);
   vec3 rock = vec3(0.50, 0.45, 0.40);

   vec3 color = mix(deepGrass, grass, smoothstep(0.0, 0.5, vHeight));
   color = mix(color, rock, smoothstep(0.5, 0.9, vHeight));

   gl_FragColor = vec4(color, 1.0);
}