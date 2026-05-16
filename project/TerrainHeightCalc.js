export class TerrainHeightCalc {
  constructor(u_random1, u_random2) {
    this.u_random1 = u_random1;
    this.u_random2 = u_random2;
  }
  fract(x) {
    return x - Math.floor(x);
  }
  dot(vec1, vec2) {
    return vec1[0] * vec2[0] + vec1[1] * vec2[1];
  }
  mix(x, y, a) {
    return x * (1 - a) + y * a;
  }
  random(st) {
    let d = this.dot(st, this.u_random1);
    return this.fract(Math.sin(d) * this.u_random2);
  }
  noise(st) {
    let i = [Math.floor(st[0]), Math.floor(st[1])];
    let f = [this.fract(st[0]), this.fract(st[1])];

    let a = this.random([i[0], i[1]]);
    let b = this.random([i[0] + 1, i[1]]);
    let c = this.random([i[0], i[1] + 1]);
    let d = this.random([i[0] + 1, i[1] + 1]);

    let ux = f[0] * f[0] * (3.0 - 2.0 * f[0]);
    let uy = f[1] * f[1] * (3.0 - 2.0 * f[1]);

    return this.mix(a, b, ux) + (c - a) * uy * (1.0 - ux) + (d - b) * ux * uy;
  }
  fbm(st) {
    let value = 0.0;
    let amplitude = 0.5;
    let frequency = 1.0;

    for (let i = 0; i < 5; i++) {
      value += amplitude * this.noise([st[0] * frequency, st[1] * frequency]);
      frequency *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }
  getGroundHeight(x, z, terrainSize) {
    let u = x / terrainSize + 0.5;
    let v = z / terrainSize + 0.5;
    u = Math.max(0, Math.min(1, u));
    v = Math.max(0, Math.min(1, v));
    
    // distance from center
    let du = u - 0.5;
    let dv = v - 0.5;
    let dist = Math.sqrt(du * du + dv * dv);
    
    // make ground flatter in the middle (dist < 0.1), mountainous at outskirts (dist > 0.35)
    let centerMask = Math.max(0, Math.min(1, (dist - 0.10) / 0.25));

    let h = this.fbm([u * 2.0, v * 2.0]);
    // sharpen the peaks
    h = Math.pow(h, 1.2);
    
    h *= centerMask;

    return h * 0.15 * terrainSize;
  }
}
