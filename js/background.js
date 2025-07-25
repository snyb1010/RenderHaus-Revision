
    // Vanta Background
    let vantaEffect;
    function initVanta() {
      if (vantaEffect) vantaEffect.destroy();
      vantaEffect = VANTA.WAVES({
        el: "#background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0F0F1C, // dark background
        shininess: 30,
        waveHeight: 20,
        waveSpeed: 0.2,
        zoom: 1.0,
      });
    }
    initVanta();