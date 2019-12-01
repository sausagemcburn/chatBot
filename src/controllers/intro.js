
// Resolution
let sizeX = 1920;
let sizeY = 1080;

// Wave stuff
// Wave amplitude
let amp = 55;
// Wave width
let ww = 7;
// Starting point for waves
let ytop = sizeY/2; // - 80
let ybot = sizeY/2; // + 80
// Container for waves
let waves = [];
// Pixels per second
let pps = 6;
// Beats per minute
let bpm = 120;
// Wave probability = 1/w_prob
let w_prob = 2;
// x noise offset
// noise scale
let nsX = 14;
let nsY = 8;
let noise_increment = 0.02;

let waveRes = 14;
let noiseScale = 0.04;


// Text stuff
// Text offsets
// let offsetY = -20;
// let offsetX = 0;
// Shadow offset
// let shadow = 4;


// Timer start time in seconds
let timer_time = 280;
let show_timer = false;

let show_SMB = true;



let noise_offset = 0;
// frames per beat (fps = 60)
let fpb = 3600 / bpm;
// frames per measure
let fpm = fpb * 4;

    
    
// Init title
let x_txt0 = sizeX/4 - 22;
let y_txt0 = sizeY/2 + 40;
let char_sp = 77;
let change_P = 0.09;

    
    
    
// def getCurrentFadeColor(i, n, c0, c):
//     ''' Gets the current fade color based on fade iteration and colors '''
//     r = c0.r
//     g = c0.g
//     b = c0.b
//     r -= i * (c0.r - c.r) / float(n) 
//     g -= i * (c0.g - c.g) / float(n)
//     b -= i * (c0.b - c.b) / float(n)
//     return Color(r, g, b)

// def generateRandomColor():
//     return color(random(255),random(255),random(255))
    
    
// def horizontalLinearFade(c0, c, y0, y):
//     num_shades = abs(int(y0 - y))
//     for i in range(0, num_shades):
//         cc = getCurrentFadeColor(i, num_shades, c0, c)
//         stroke(cc.r, cc.g, cc.b)
//         line(0, y0 + i, width, y0 + i)
//     return
    


// def drawUpperFade():
//     fade_color = Color(133, 193, 181)
//     bg_color = Color(171, 212, 204)
//     horizontalLinearFade(fade_color, bg_color, 0, height*0.2)
//     return

// def drawMiddleFade():
//     bg_color = Color(171, 212, 204)
//     fade_color = Color(255, 255, 255)
//     horizontalLinearFade(bg_color, fade_color, height * 0.3, height * 0.4)
//     noStroke()
//     fill(255)
//     rect(0, height * 0.4, width, height * 0.3)
//     horizontalLinearFade(fade_color, bg_color, height * 0.6, height * 0.7)
    
// def drawLowerFade():
//     fade_color = Color(133, 193, 181)
//     bg_color = Color(171, 212, 204)
//     horizontalLinearFade(bg_color, fade_color, height * 0.8, height)
//     return

// def drawBGFades():
//     drawUpperFade()
//     drawMiddleFade()
//     drawLowerFade()
//     return

// def drawSausageMcBorder():
//     fill(44)
//     # Border Radius
//     br = 2
//     # Draw border
//     for x in range(-1 * br, br):
//         for y in range(-1 * br, br):
//             text('SausageMcBurn', width/2 + x + offsetX, height/2 + y + offsetY)
//     return

// def drawSausageMcShadow():
//     # Draw SausageMcBurn text
//     fill(66)
//     tint(255, 66)
//     text('SausageMcBurn', width/2 + offsetX + shadow, height/2 + offsetY + shadow)
//     return


// def drawSMBText():
//     textAlign(CENTER, CENTER)
//     # drawSausageMcBorder()
//     drawSausageMcShadow()
//     fill(171, 212, 204)
//     text('SausageMcBurn', width/2, height/2-20)
//     return


function makeWaves() {
    let waveTop = new Wave(ytop, '-');
    let waveBot = new Wave(ybot, '+');
    waves.push(waveTop);
    waves.push(waveBot);
    return;
}
    
    
    
function drawWaves(offset) {
    // Get rid of dead waves
    // let dead_wave_idxs = [];
    let i = 0;
    while (i < waves.length) {
        if (waves[i].y > (height + amp) || waves[i].y < (-1 * amp)) {
            waves.splice(i, 1);
        }
        else {
            i += 1;
        }
    }
            
    // for idx in dead_wave_idxs:
    //     waves.pop(idx)

    // Draw waves
    let offsetY = (-1 * offset);
    for (i = 0; i < waves.length; i++) {
        fill(waves[i].rgb_color);
        for (let x = 0; x <= width; x += waveRes) {
            if (waves[i].getDir() == '-') {
                noiseVal = noise(map(x,0,width,0,nsX) + offset, map(waves[i].y,0,height,0,nsY) + offsetY);
            }
            else {
                noiseVal = noise(map(x,0,width,0,nsX) + offset, map(waves[i].y,0,height,0,nsY) + offset);
            }
            noiseVal = map(noiseVal, 0, 1, (amp * -1), amp);
            // print x, w.y, noiseVal
    
            ellipse(x, waves[i].y + noiseVal, ww, ww);
        }
        
        waves[i].incrementWave(pps);
    }

    return;
}
        
        
// def drawTimer():
//     if frameCount % 60 == 0:
//         timer.tick()
//     fill(99)
//     timer.drawSelf(width/2, height/2 + 200)
    
    




function preload() {
    myFont = loadFont('../src/resources/cqmono.otf');
}




function setup() {
    createCanvas(sizeX, sizeY);
    noStroke(); 

    // let timer = new Timer(timer_time);

    textFont(myFont);
    textSize(160);

    title = new Title('sausagemcburn', char_sp, x_txt0, y_txt0, change_P);  
}

    
function draw() {
    // Globals
    // global noise_offset

    
    // Background
    background(0);
    // drawBGFades()
    
    noStroke();
    
    //console.log(frameCount);

    // Calculate what number frames beats will fall on
    if (frameCount % fpb == 0) {
        // This frame falls on a beat
        // If it's the first beat of the measure, always generate a wave
        if (fpm % frameCount == fpb) {
            // It's the first beat, make waves
            makeWaves();
        }
        else {
            // It's not the first beat of the measure but 
            //  we will generate a wave 1/nth of the time anyway
            if (int(random(w_prob)) == 0) {
                makeWaves();
            }
        }
    }
    
    // Timer
    // if (show_timer) {
    //     drawTimer();
    // }
        
    // SausageMcBurn text
    if (show_SMB) {
        title.drawSelf();
    }
        
    noise_offset += noise_increment;
    drawWaves(noise_offset);
                
    
    
    
    // global ytop, ybot
    // noiseVal_top = noise(x * noiseScale, ytop * noiseScale)
    //     noiseVal_bot = noise(x * noiseScale, ybot * noiseScale)
    //     fill(255)
    //     ellipse(x, ytop - noiseVal_top * amp, ww, ww)
    //     ellipse(x, ybot + noiseVal_bot * amp, ww, ww)
        
}
        
