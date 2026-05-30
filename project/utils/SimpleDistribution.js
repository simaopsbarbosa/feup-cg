export class simpleDistribution{
    constructor(radius,minDistance,amount,occupied) {
    this.radius = radius;
    this.occupied=occupied;
    this.minDistance=minDistance;
    this.points = this.generateBales(amount);
    }
    insideField(p) {
        return p[0] * p[0] + p[1] * p[1] <= this.radius * this.radius;
    }
    collidesWithOccupied(p){
         for (const ob of this.occupied) {
            const dx = p[0] - ob[0];
            const dz = p[1] - ob[1];
            if (Math.sqrt(dx * dx + dz * dz) < this.minDistance) {
            return true;
            }
        }

        return false;

    }
    collidesWithBales(p, bales) {
        for (const bale of bales) {
            const dx = p[0] - bale[0];
            const dz = p[1] - bale[1];

            if (Math.sqrt(dx * dx + dz * dz) < this.minDistance) {
            return true;
            }
        }

        return false;
    }
    insideBarn(p){
        const barnMinX = -12;
        const barnMaxX =  12;
        const barnMinZ = -12;
        const barnMaxZ =  12;

        return (
        p[0] >= barnMinX &&
        p[0] <= barnMaxX &&
        p[1] >= barnMinZ &&
        p[1] <= barnMaxZ
        ) ;
    }
    generateBales(count) {
        const bales = [];
        const maxAttempts = count * 100;

        let attempts = 0;

        while (bales.length < count && attempts < maxAttempts) {
            attempts++;
            const angle = Math.random() * Math.PI * 2;
            const r = Math.sqrt(Math.random()) * this.radius;

            const p = [
                r * Math.cos(angle),
                r * Math.sin(angle),
            ];

            if (
            !this.insideBarn(p) &&
            !this.collidesWithOccupied(p) &&
            !this.collidesWithBales(p, bales) && 
            this.insideField(p)
            ) {
            bales.push(p);
            }
        }

        return bales;
}
}