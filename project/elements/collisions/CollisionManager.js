export class CollisionManager {
  constructor() {
    this.collidables = [];
  }

  register(id, object, getPosition, radius, onEnter, onExit, type = 'sphere') {
    this.collidables.push({
      id,
      object,
      getPosition,
      radius,
      onEnter,
      onExit,
      type,
      isColliding: false,
    });
  }

  _checkSphere(cx, cz, cRadius, tx, tz, tRadius) {
    let dx = cx - tx;
    let dz = cz - tz;
    let dist = Math.sqrt(dx * dx + dz * dz);
    return dist < cRadius + tRadius;
  }

  _checkRing(cx, cz, cRadius, tx, tz, outerRadius, innerRatio = 0.9) {
    let dx = cx - tx;
    let dz = cz - tz;
    let dist = Math.sqrt(dx * dx + dz * dz);
    let innerR = outerRadius * innerRatio;
    let hitOuter = dist - cRadius < outerRadius;
    let inHole = dist + cRadius < innerR;
    return hitOuter && !inHole;
  }

  update(wagonX, wagonZ, wagonRadius) {
    for (let c of this.collidables) {
      let pos = c.getPosition();
      let hit;

      if (c.type === 'ring') {
        hit = this._checkRing(
          wagonX,
          wagonZ,
          wagonRadius,
          pos.x,
          pos.z,
          c.radius
        );
      } else {
        hit = this._checkSphere(
          wagonX,
          wagonZ,
          wagonRadius,
          pos.x,
          pos.z,
          c.radius
        );
      }

      if (hit && !c.isColliding) {
        c.isColliding = true;
        if (c.onEnter) c.onEnter(c.object);
      } else if (!hit && c.isColliding) {
        c.isColliding = false;
        if (c.onExit) c.onExit(c.object);
      }
    }
  }
}
