const Locomotive = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
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

  tl.from("#hero1,#inside-navbar", {
    opacity: 0,
  },"-=1.2");
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

Locomotive();
loader();
cursor();
