class Letter {
    constructor(ltr) {
        this.character = ltr;
        this.rgb_color = 0;
        this.changeColor();
        return;
    }
    
    changeColor() {
        this.rgb_color = color(random(25,255),random(25,255),random(25,255))
        return;
    }
    
    drawSelf(x, y) {
        fill(this.rgb_color);
        text(this.character, x, y);
        return;
    }
}