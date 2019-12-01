class Letter {
    constructor(ltr) {
        this.character = ltr;
        this.rgb_color = 0;
        this.changeColor();
        return;
    }
    
    changeColor() {
        this.rgb_color = generateRandomColor();
        return;
    }
    
    drawSelf(x, y) {
        fill(this.rgb_color);
        text(this.character, x, y);
        return;
    }
}