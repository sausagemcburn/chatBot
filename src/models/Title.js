class Title {
    constructor(l, sp, x, y) {
        this.letters = [];
        let temp_ltr = '';
        for (let i = 0; i < l.length; i++) {
            temp_ltr = new Letter(l.charAt(i));
            this.letters.push(temp_ltr);
        }
        this.char_spacing = sp;
        this.x0 = x;
        this.y0 = y;
        return;
    }
        
    drawSelf() {
        let x = this.x0;
        for (let i = 0; i < this.letters.length; i++) {
            this.letters[i].drawSelf(x, this.y0);
            x += this.char_spacing;
        }
        noFill();
        return;
    }
}