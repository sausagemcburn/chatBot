class Title {
    constructor(l, sp, x, y, prob) {
        this.letters = [];
        let temp_ltr = '';
        for (let i = 0; i < l.length; i++) {
            temp_ltr = new Letter(l.charAt(i));
            this.letters.push(temp_ltr);
        }
        this.char_spacing = sp;
        this.x0 = x;
        this.y0 = y;
        this.change_P = prob;
        return;
    }
        
    drawSelf() {
        let x = this.x0;
        for (let i = 0; i < this.letters.length; i++) {
            this.letters[i].drawSelf(x, this.y0);
            x += this.char_spacing;
            if (random(1) <= this.change_P) {
                this.letters[i].changeColor();
            }
        }
        noFill();
        return;
    }
}