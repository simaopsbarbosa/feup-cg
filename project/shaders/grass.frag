precision mediump float;

varying vec2 vTextureCoord;

void main() {
    vec3 rootColor = vec3(0.04, 0.22, 0.04);
    vec3 tipColor  = vec3(0.38, 0.76, 0.16);

    float heightT = smoothstep(0.0, 1.0, vTextureCoord.y);
    vec3 finalColor = mix(rootColor, tipColor, heightT);

    gl_FragColor = vec4(finalColor, 1.0);
}
