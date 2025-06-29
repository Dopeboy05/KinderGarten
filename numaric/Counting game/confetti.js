function launchConfetti() {
    const confetti = window.confetti || (window.confetti = createConfetti());
    confetti();
  }
  
  function createConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const confettiPieces = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0
    }));
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach((p, i) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(p.x + p.tilt, p.y);
        ctx.lineTo(p.x + p.tilt + p.r, p.y + p.r);
        ctx.lineTo(p.x + p.tilt - p.r, p.y + p.r);
        ctx.closePath();
        ctx.fill();
  
        p.y += p.d * 0.5;
        p.tiltAngle += 0.1;
        p.tilt = Math.sin(p.tiltAngle) * 10;
  
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
  
      requestAnimationFrame(draw);
    }
  
    draw();
    return () => {};
  }
  