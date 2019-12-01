class Wave {
    constructor(y0 = 0, direction = '+', c0 = false) {
        this.y = y0;
        this.dir = direction;
        if (!c0) {
            this.rgb_color = generateRandomColor();
        }
        else {
            this.rgb_color = c0;
        }
        return;
    }
    
    incrementWave(pps0) {
        if (this.dir == '+') {
            this.y += pps0;
        }
        else {
            this.y -= pps0;
        }
        return;
    }
    
    getDir() {
        return this.dir;
    }
}