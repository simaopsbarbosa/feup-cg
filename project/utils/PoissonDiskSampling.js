export class PoissonDiskSampling {
  constructor(radius, minDistance, _maxAttemps = 30) {
    this.radius = radius;
    this.minDistance = minDistance;
    this.maxAttempts = _maxAttemps;
    this.cellSize = minDistance / Math.sqrt(2);
    this.cols = Math.ceil((radius * 2) / this.cellSize);
    this.rows = Math.ceil((radius * 2) / this.cellSize);
    this.grid = new Array(this.cols * this.rows).fill(null);
    this.points = this.generate();
  }
  generate() {
    const points = [];
    const active = [];

    const firstPoint = [
      Math.random() * this.radius * 2 - this.radius,
      Math.random() * this.radius * 2 - this.radius,
    ];
    this.addToGrid(firstPoint);
    points.push(firstPoint);
    active.push(firstPoint);
    while (active.length > 0) {
      const idx = Math.floor(Math.random() * active.length);
      const point = active[idx];
      let found = false;
      for (let i = 0; i < this.maxAttempts; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = this.minDistance + Math.random() * this.minDistance;

        const newPoint = [
          point[0] + distance * Math.cos(angle),
          point[1] + distance * Math.sin(angle),
        ];

        if (this.isValid(newPoint)) {
          this.addToGrid(newPoint);
          points.push(newPoint);
          active.push(newPoint);
          found = true;
          break;
        }
      }
      if (!found) {
        active.splice(idx, 1);
      }
    }
    return points;
  }
  isValid(p) {
    const distFromCenter = p[0] ** 2 + p[1] ** 2;
    if (distFromCenter >= this.radius ** 2) return false;
    
    const barnMinX = -12;
    const barnMaxX =  12;
    const barnMinZ = -12;
    const barnMaxZ =  12;

    if (
      p[0] >= barnMinX &&
      p[0] <= barnMaxX &&
      p[1] >= barnMinZ &&
      p[1] <= barnMaxZ
    ) {
      return false;
    }

    const col = Math.floor((p[0] + this.radius) / this.cellSize);
    const row = Math.floor((p[1] + this.radius) / this.cellSize);
    const searchRadius = 2;
    for (let x = col - searchRadius; x <= col + searchRadius; x++) {
      for (let y = row - searchRadius; y <= row + searchRadius; y++) {
        if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) continue;

        const gridPoint = this.grid[x + y * this.cols];
        if (gridPoint) {
          const dx = p[0] - gridPoint[0];
          const dy = p[1] - gridPoint[1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.minDistance) return false;
        }
      }
    }
    return true;
  }
  addToGrid(p) {
    const col = Math.floor((p[0] + this.radius) / this.cellSize);
    const row = Math.floor((p[1] + this.radius) / this.cellSize);
    this.grid[col + row * this.cols] = p;
  }
}
