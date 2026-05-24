precision mediump float;

varying vec2 vTextureCoord;
varying float vDirtFactor;

void main() {
    vec3 healthyRoot = vec3(0.04, 0.22, 0.04);
    vec3 healthyTip  = vec3(0.38, 0.76, 0.16);

    vec3 deadRoot = vec3(0.35, 0.26, 0.12);
    vec3 deadTip  = vec3(0.68, 0.58, 0.28);

    vec3 rootColor = mix(healthyRoot, deadRoot, vDirtFactor);
    vec3 tipColor  = mix(healthyTip, deadTip, vDirtFactor);

    float heightT = smoothstep(0.0, 1.0, vTextureCoord.y);
    vec3 finalColor = mix(rootColor, tipColor, heightT);

    gl_FragColor = vec4(finalColor, 1.0);
}
