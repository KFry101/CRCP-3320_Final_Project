let star;

function setup() {
    createCanvas(720, 720);
    star = new Star();
}

function draw() {
    background(0);
    stroke(255, 0, 0);
    noFill();
    ellipse(mouseX, mouseY, 50, 50);
    star.draw();
}

class Star {
    constructor(x, y, radius, color) {
        if (typeof x !== 'number') {
            this.x = random(width);
        } else {
            this.x = x;
        }
        if (typeof y !== 'number') {
            this.y = random(height);
        }else {
            this.y = y;
        }
        if (typeof radius !== 'number') {
            this.radius = random(10, 100);
        } else {
            this.radius = radius;
        }
        if (typeof color !== 'object') {
            this.color = getRandomColor();
        } else {
            this.color = color;
        }
       
    }

    getRandomColor(){
        let r = Math.floor(random(255));
        let g = Math.floor(random(255));
        let b = Math.floor(random(255));
        let a = Math.floor(random(75, 100));
        return color(r, g, b, a);
    }

    draw() {
        const points = 5;
        let theta = 0;

        fill(this.color);
        noStroke();
        beginShape();

        for (let i = 0; i < points * 2; i++) {
            let r = this.radius;

            if (i % 2 === 0) {
                r = r/2;
            }  

            let vx = this.x + (cos(theta) * r);
            let vy = this.y + (sin(theta) * r);
            vertex(vx, vy);

            theta += TWO_PI / (points*2);
        }

        endShape(CLOSE);
    }
}
