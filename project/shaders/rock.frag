#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
varying float height;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 colorHeight=color;
	colorHeight.r=color.r*min(height+0.7,1.0);
	colorHeight.g=color.g*min(height+0.7,1.0);
	colorHeight.b=color.b*min(height+0.7,1.0);

	gl_FragColor = colorHeight;
}