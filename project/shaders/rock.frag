#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
varying float height;
varying float dist;

void main() {
	if(dist>100.0){
		discard;
	}
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 colorHeight=vec4(color.rgb*min(height+0.7,1.0),color.a);
	gl_FragColor = colorHeight;
}