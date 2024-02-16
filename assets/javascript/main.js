// Create a GSAP timeline
let tl = gsap.timeline();

// Animation for ".line h1" elements
tl.from(".line h1", {
  y: 150,
  stagger: 0.25,
  duration: 0.6,
  delay: 0.5,
});

// Animation for "#line-timer" and ".line h2" elements
tl.from("#line-timer", {
  opacity: 0,
  onStart: () => {
    // Function to start a timer
    let loaderTimer = document.querySelector("#line-timer h5");

    let timer = 0;

    // Set up an interval to update the timer value every 35 milliseconds
    const intervalId = setInterval(() => {
      timer++;
      loaderTimer.textContent = timer;

      // Clear the interval when the timer reaches 100
      if (timer === 100) clearInterval(intervalId);
    }, 35);
  },
});

tl.to(".line h2", {
  animationName: "fontchange",
  opacity: 1,
});

// Animation to fade out "#loader" element
tl.to("#loader", {
  opacity: 0,
  duration: 0.4,
  delay: 3.7,
});

// Animation to bring in "#page1" element with delay, y offset, and opacity
tl.from("#page1", {
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
