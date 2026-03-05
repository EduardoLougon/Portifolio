import Lenis from "https://esm.sh/lenis";
import gsap from "https://esm.sh/gsap";
import ScrollTrigger from "https://esm.sh/gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {

  /// Scroll
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);



  /// Nav H1 Animation

  const Link = document.querySelectorAll("a.nav-h1");

  Link.forEach((link) => {
    const text = link.textContent;
    const segmenter = new Intl.Segmenter("it", { granularity: "grapheme" });
    const chars = Array.from(segmenter.segment(text), (s) => s.segment);
    link.innerHTML = chars
      .map((char) => `<span data-char="${char}">${char}</span>`)
      .join("");
  });

  /// Hero Animation
  let tl = gsap.timeline();

  tl.fromTo(".navbar", {
    y: -100
  }, {
    duration: 1,
    y: 0,
    ease: "power3.inOut"
  }, "0");

  /// Hero H1 Animation

  tl.fromTo("#hero-h1-1", {
    x: -200,
    opacity: 0
  }, {
    x: 0,
    duration: 2,
    opacity: 2,
    ease: "power1.out"
  }, '0.5');

  tl.fromTo("#hero-h1-2", {
    x: 200,
    opacity: 0
  }, {
    x: 0,
    duration: 2,
    opacity: 2,
    ease: "power1.out",
  }, '0.5');

  /// Hero P Animation

  tl.fromTo("#hero-p", {
    opacity: 0
  }, {
    duration: 1,
    opacity: 1,
    stagger: 0.5,
  }, "1");


  /// Cursor Animation

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    gsap.to(".cursor", {
      x: clientX - 10,
      y: clientY - 10,
      duration: 1,
      delay: 0,
      ease: "power4.out"
    })

    // Subtly shift the hero image based on mouse position
    const xPos = (clientX / window.innerWidth - 0.5);
    const yPos = (clientY / window.innerHeight - 0.5);

    gsap.to("#hero-face", {
      x: xPos * 10,
      y: yPos * 10,
      rotationY: xPos,
      rotationX: -yPos,
      transformPerspective: 1000,
      transformOrigin: "center center",
      scale: 1.08,
      ease: "power3.out",
      duration: 1.5
    });

    gsap.to("#hero-eye", {
      x: xPos * 10,
      y: yPos * 10,
      rotationY: xPos,
      rotationX: -yPos,
      transformPerspective: 1000,
      transformOrigin: "center center",
      scale: 1.08,
      ease: "power3.out",
      duration: 1.5
    });

    gsap.to("#hero-iris", {
      x: xPos * 25,
      y: yPos * 20,
      rotationY: xPos,
      rotationX: -yPos,
      transformPerspective: 1000,
      transformOrigin: "center center",
      scale: 1.07,
      ease: "power3.out",
      duration: 2
    });
  }

  const heroh1 = document.querySelectorAll(".hero-h1");

  heroh1.forEach((hero) => {
    hero.addEventListener("mouseenter", () => {
      gsap.to(".cursor", {
        scale: 8,
        duration: 0.5,
        ease: "power4.out"
      })
    })
    hero.addEventListener("mouseleave", () => {
      gsap.to(".cursor", {
        scale: 1,
        duration: 0.5,
        ease: "power4.out"
      })
    })
  })

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  }
});
