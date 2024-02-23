const loader = () => {
  let tl = gsap.timeline();

  // Animation for ".line h1" elements
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  //Animation for "#line-timer" and ".line h2 elements
  tl.from("#line-timer", {
    opacity: 0,
    onStart: () => {
      let loaderTimer = document.querySelector("#line-timer h5");

      let timer = 0;

      const intervalId = setInterval(() => {
        timer++;
        loaderTimer.textContent = timer;

        if (timer === 100) clearInterval(intervalId);
      }, 35);
    },
  });

  // fontchange Animation
  tl.to(".line h2", {
    animationName: "fontchange",
    opacity: 1,
  });

  // Animation to fade out "#loader" element
  tl.to("#loader", {
    opacity: 0,
    duration: 0.4,
    delay: 0, // 3.7
  });

  // Animation to bring in "#navbar" element with delay, y offset, and opacity
  tl.from("#navbar", {
    delay: 0.2,
    y: 1200,
    opacity: 0,
    duration: 0.5,
    ease: Power4,
  });

  // Hide the "#loader" element by setting its display to "none"
  tl.to("#loader", {
    display: "none",
  });

  tl.from("nav", {
    opacity: 0,
  });

  tl.from("#hero1 h1, #hero2 h1, #hero3 h2, #hero3 h3, #hero4 h1", {
    y: 160,
    stagger: 0.2,
  });
};

const cursor = () => {
  document.addEventListener("mousemove", (dets) => {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y,
    });
  });
  Shery.makeMagnet("#nav-part2 h4");
  Shery.makeMagnet("nav svg");
};

loader();
cursor();
