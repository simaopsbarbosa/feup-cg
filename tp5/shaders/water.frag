#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

varying float height;

void main() {
   vec4 color = texture2D(uSampler, vTextureCoord);

   vec4 colorHeight = color;
	colorHeight.r = color.r * (1.0-height);
	colorHeight.g = color.g * (1.0-height);
	colorHeight.b = color.b * (1.0-height);

   gl_FragColor = colorHeight;
}