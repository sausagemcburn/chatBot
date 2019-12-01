class Timer {
    
    constructor(t0 = 420, x0 = 0, y0 = 0, a0 = 0) {
        this.time = t0;
        this.x = x0;
        this.y = y0;
        this.a = a0;
        this.phase = 'fadeIn';
        return;
    }
    
    place() {
        this.x = int(random(width));
        this.y = int(random(height));
        return;
    }
    
    tick() {
        this.time -= 1;
        return;
    }
    
    drawSelf(x0, y0) {
        let minutes = str(int(this.time / 60));
        let seconds = str(int(this.time % 60));
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        
        let timeString = minutes + ':' + seconds;
        
        text(timeString, x0, y0);
        
        return;
    }

}