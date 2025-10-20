let cnv;
let stars = [];
const numStars = 1000;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('p5-background');

  cnv.style('position', 'fixed');
  cnv.style('left', '0px');
  cnv.style('top', '0px');
  cnv.style('z-index', '-1');
  cnv.style('pointer-events', 'none');

  noStroke();
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < numStars; i++) {
    stars.push({
      xOff: random(1000),
      yOff: random(1000),
      baseX: random(width),
      baseY: random(height),
      size: random(2, 8),
      baseBright: random(60, 150),
      drift: random(0.001, 0.004)
    });
  }
}

function draw() {
  drawGradientBackground();

  // warm golden hue (around 40° on the HSB wheel)
  const starHue = 30; // adjust toward 35–45 for warmer/cooler gold

  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];

    const x =
      s.baseX + (noise(s.xOff + frameCount * s.drift) - 0.5) * width * 0.6;
    const y =
      s.baseY + (noise(s.yOff + frameCount * s.drift) - 0.5) * height * 0.6;

    // Distance from mouse to star
    const d = dist(mouseX, mouseY, x, y);

    // Glow intensity — closer to mouse = brighter
    const glow = constrain(map(d, 0, 250, 100, s.baseBright), s.baseBright, 100);

    // Subtle reactive motion (push away from mouse)
    const pushX = (x - mouseX) * 10 / (d + 1);
    const pushY = (y - mouseY) * 10 / (d + 1);

    fill(starHue, 80, glow, 90); // golden glow
    ellipse(x + pushX, y + pushY, s.size);
  }
}

function drawGradientBackground() {
  noFill();
  // soft fantasy violet gradient
  const topColor = color(275, 70, 30); // purple-violet
  const bottomColor = color(230, 50, 10); // deep indigo-blue

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(topColor, bottomColor, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
