export class MyPlayer {
  constructor(scene, camera, height, terrainSize) {
    this.scene = scene;
    this.camera = camera;
    this.height = height;
    this.terrainSize = terrainSize;
    this.eyeHeight = 1.5;
    this.speed = 0.2
  }

  update(key) {
    if (!key) return;
    let forward = [
      this.camera.target[0] - this.camera.position[0],
      0,
      this.camera.target[2] - this.camera.position[2],
    ];

    let length = Math.sqrt(forward[0] ** 2 + forward[2] ** 2);
    forward[0] /= length;
    forward[2] /= length;

    let right = [-forward[2], 0, forward[0]];

    if (key['KeyW']) this.move(forward, this.speed);
    if (key['KeyS']) this.move(forward, -this.speed);
    if (key['KeyA']) this.move(right, -this.speed);
    if (key['KeyD']) this.move(right, this.speed);
    if (key['Space']) this.moveUp(this.speed);
    if (key['ShiftLeft']) this.moveUp(-this.speed);

    this.applyGravity();
  }

  move(direction, speed) {
    this.camera.position[0] += direction[0] * speed;
    this.camera.position[2] += direction[2] * speed;
    this.camera.target[0] += direction[0] * speed;
    this.camera.target[2] += direction[2] * speed;
  }

  moveUp(speed) {
    this.camera.position[1] += speed;
    this.camera.target[1] += speed;
  }

  applyGravity() {
    let pos = this.camera.position;

    let groundY = this.height.getGroundHeight(pos[0], pos[2], this.terrainSize);

    let minHeight = groundY + this.eyeHeight;
    
    if (this.camera.position[1] < minHeight) {
      let diffY = minHeight - this.camera.position[1];
      this.camera.position[1] += diffY;
      this.camera.target[1] += diffY;
    }
  }
}
