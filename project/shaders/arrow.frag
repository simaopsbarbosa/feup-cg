precision mediump float;

varying vec2 vTextureCoord;

void main() {
    float u = vTextureCoord.x;
    float v = vTextureCoord.y;
    
    bool inStem = (u >= 0.4 && u <= 0.6 && v >= 0.0 && v <= 0.6);
    
    float t = (1.0 - v) / 0.4;
    bool inHead = (v >= 0.6 && v <= 1.0 && u >= (0.5 - 0.3 * t) && u <= (0.5 + 0.3 * t));
    
    if (inStem || inHead) {
        gl_FragColor = vec4(1.0, 0.85, 0.0, 1.0);
    } else {
        discard;
    }
}
