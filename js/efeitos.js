// GLOW

document.addEventListener("mousemove", (e) => {

  document.body.style.setProperty("--x", e.clientX + "px");

  document.body.style.setProperty("--y", e.clientY + "px");

});

// PARTICLES

particlesJS("particles-js", {

  particles: {

    number: {

      value: 80
    },

    color: {

      value: "#ffffff"
    },

    shape: {

      type: "circle"
    },

    opacity: {

      value: 0.5
    },

    size: {

      value: 3
    },

    line_linked: {

      enable: true,

      distance: 150,

      color: "#3b82f6",

      opacity: 0.4,

      width: 1
    },

    move: {

      enable: true,

      speed: 2
    }

  },

  interactivity: {

    detect_on: "canvas",

    events: {

      onhover: {

        enable: true,

        mode: "grab"
      }

    }

  }

});