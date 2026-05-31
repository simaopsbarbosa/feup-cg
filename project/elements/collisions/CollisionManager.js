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

  resolveCollisions(wagonx,wagonz,wagonRadius) {
    let correctedX = wagonx;
    let correctedZ = wagonz;
    for (let c of this.collidables) {
      let pos = c.getPosition();
      let hit;
      if (c.type === 'sphere'&& c.id.startsWith('tree_')||c.id==='barn') {
        hit = this._checkSphere(
          wagonx,
          wagonz,
          wagonRadius,
          pos.x,
          pos.z,
          c.radius
        );
      }

      if (hit) {
        let dx = correctedX - pos.x;
        let dz = correctedZ - pos.z;
        let dist = Math.sqrt(dx * dx + dz * dz);
        let minDist = wagonRadius + c.radius;

      if (dist < minDist) {
     
      if (dist === 0) {
        dx = 1;
        dz = 0;
        dist = 1;
      }

      let nx = dx / dist;
      let nz = dz / dist;

     
      let overlap = minDist - dist;

      correctedX += nx * overlap;
      correctedZ += nz * overlap;
        }
      }
    }
    return [correctedX, correctedZ];
    }
}
