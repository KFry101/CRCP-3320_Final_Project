let cnv;
let stars = [];
const numStars = 500;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('p5-background');

  // keep canvas behind page content
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
      baseBright: random(60, 90),
      drift: random(0.001, 0.004),
      twinkleSpeed: random(0.003, 0.008),
      twinkleOffset: random(TWO_PI)
    });
  }
}

function draw() {
  drawGradientBackground();

    const starHue = random(30, 35); // golden-orange hue
    //const starHue = random(100, 150); // blueish green hue

  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];

    const x = s.baseX + (noise(s.xOff + frameCount * s.drift) - 0.5) * width * 0.6;
    const y = s.baseY + (noise(s.yOff + frameCount * s.drift) - 0.5) * height * 0.6;

    const d = dist(mouseX, mouseY, x, y);

    const pullX = (mouseX - x) * 75 / (d + 1);
    const pullY = (mouseY - y) * 75 / (d + 1);
    
    const twinkle = s.baseBright + sin(frameCount * s.twinkleSpeed + i) * 20;
    const glowAlpha = map(d, 0, 250, 0.07, 0.02); // fade glow farther away

    noStroke();
    fill((starHue + 20), 80, 100, glowAlpha * 0.4); // golden glow
    ellipse(x + pullX, y + pullY, s.size * 6); // large, faint halo

    fill(starHue, 60, twinkle, 100);
    ellipse(x + pullX, y + pullY, s.size);
  }
}

function drawGradientBackground() {
  noFill();
  const topColor = color(275, 70, 30);   // violet
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
