import { horse } from '../horse/horse.js';
import { MyWagon } from '../wagon/MyWagon.js';

export class MyPlayer {
  constructor(scene) {
    this.scene = scene;
    this.horse = new horse(this.scene);
    this.wagon = new MyWagon(this.scene);

    //Player Position
    this.position = [-5, 1.5, 0];

    //Player physics
    this.speed = 0;
    this.wheelAngle = 0;
    this.rollAngle = 0;
    this.rotationDelta = this.speed / 0.25;
    this.orientationAngle = 0;

    // Horse Animation Frames
    this.totalFrames = 11;

    //Vector
    this.directionVector = [0, 0, 0];

    //haybales collected
    this.hayBalesHeld = 0;
    this.maxHayBales = 2;
    this.nearbyBales = [];
    this.inBarnArea = false;
    this.maxHealth = 100;
    this.hayBaleHeal = 40;

    //player health points
    this.HP = 100;
  }
  move(direction) {
    switch (direction) {
      case 'W':
        this.speed = Math.min(this.speed + 0.1, 3);
        break;
      case 'S':
        this.speed = Math.max(this.speed - 0.1, 0);
        break;
      case 'A':
        this.wheelAngle = Math.min(
          Math.PI / 10,
          this.wheelAngle + Math.PI / 10
        );
        break;
      case 'D':
        this.wheelAngle = Math.max(
          -Math.PI / 10,
          this.wheelAngle - Math.PI / 10
        );
        break;
      case 'DS':
        this.speed = Math.max(this.speed - 0.05, 0);
        break;
      case 'P':
        this.addBale();
        break;
      case 'L':
        this.dropBales();
        break;
      default:
        this.wheelAngle = 0;
        break;
    }
  }
  addBale() {
    if (this.hayBalesHeld < this.maxHayBales && this.nearbyBales.length > 0) {
      let targetBale = this.nearbyBales[0];
      this.hayBalesHeld++;
      targetBale.collected = true;
      this.nearbyBales.shift();
      return true;
    }
    return false;
  }
  dropBales() {
    if (this.hayBalesHeld > 0 && this.inBarnArea) {
      this.HP = Math.min(
        this.maxHealth,
        this.HP + this.hayBaleHeal * this.hayBalesHeld
      );
      this.scene.hayBalesDropped += this.hayBalesHeld;

      this.hayBalesHeld = 0;
      return true;
    }
    return false;
  }

  resetBales() {
    this.hayBalesHeld = 0;
    this.nearbyBales = [];
    this.inBarnArea = false;
  }
  resetPlayer() {
    this.position = [-5, 1.5, 0];
    this.speed = 0;
    this.wheelAngle = 0;
    this.rollAngle = 0;
    this.orientationAngle = 0;
    this.directionVector = [0, 0, 0];
    this.HP = 100;
    this.resetBales();
  }

  update(deltaTime) {
    if (this.speed != 0) {
      this.orientationAngle += this.wheelAngle * this.speed * deltaTime;
      this.horse.currentFrame =
        (this.horse.currentFrame + 1) % this.totalFrames;
    }
    this.directionVector = [
      this.speed * Math.sin(this.orientationAngle),
      0,
      this.speed * Math.cos(this.orientationAngle),
    ];
    this.position[0] += this.directionVector[0] * deltaTime;
    this.position[1] += this.directionVector[1] * deltaTime;
    this.position[2] += this.directionVector[2] * deltaTime;
    this.rotationDelta = this.speed / 0.5;
    this.rollAngle += this.rotationDelta * deltaTime;
    this.HP = Math.max(0, this.HP - deltaTime);
  }

  display() {
    this.scene.pushMatrix();

    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.orientationAngle, 0, 1, 0);

    // Wagon
    this.scene.pushMatrix();
    this.scene.scale(3, 3, 3);
    this.wagon.display(this.wheelAngle, this.rollAngle);
    this.scene.popMatrix();

    //horse
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 4);
    this.scene.rotate(this.wheelAngle, 0, 1, 0);
    this.horse.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
