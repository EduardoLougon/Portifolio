import Lenis from "https://esm.sh/lenis";
import gsap from "https://esm.sh/gsap";
import ScrollTrigger from "https://esm.sh/gsap/ScrollTrigger";
import MorphSVGPlugin from "https://esm.sh/gsap/MorphSVGPlugin";

let cursosOffsetX = 7.5;
let cursosOffsetY = 7.5;

document.addEventListener("DOMContentLoaded", () => {

  /// Scroll
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

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


  /// Fade Text Animation

  const fadeText = document.querySelectorAll(".fadeText");

  fadeText.forEach((p) => {
    const paragraph = p.textContent;
    const segmenter1 = new Intl.Segmenter("it", { granularity: "grapheme" });
    const char = Array.from(segmenter1.segment(paragraph), (s) => s.segment);
    p.innerHTML = char
      .map((char) => `<span data-char="${char}">${char}</span>`)
      .join("");
  });

  gsap.fromTo(".fadeText span", {
    opacity: 0.1
  }, {
    duration: 2,
    opacity: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".fadeTextSection",
      start: "top 55%",   // Start when the top of the section is 80% down the viewport
      end: "center 55%",  // End when the center of the section reaches the center of the viewport
      scrub: 1,
    }
  });


  /// Projetos Slide Up Effect
  ScrollTrigger.create({
    trigger: ".fadeTextSection",
    start: "top top",
    pin: true,
    pinSpacing: false, // This allows the next section to slide over this one
  });


  /// Section H2 Animation

  gsap.fromTo("#projetos-h2", {
    opacity: 0,
  }, {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: "#projetos-h2",
      start: "top 90%",
      end: "bottom 50%",
      scrub: 1,
    }
  });

  /// Project Card Animation

  gsap.fromTo(".project-card", {
    opacity: 0,
    y: 100,
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".project-card",
      start: "top 90%",
      end: "bottom 50%",
      scrub: 1,
    }
  });

  /// Project Card Hover Animation

  const projectCard = document.querySelectorAll(".project-card");

  projectCard.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cursosOffsetX = 150;
      cursosOffsetY = 187.5 / 2;
      gsap.to(card.querySelector('.card-title h3'), {
        x: 10,
        color: "gray",
        duration: 0.2,
        ease: "power4.out"
      })
      gsap.to(card.querySelector('.card-job'), {
        x: -10,
        duration: 0.2,
        ease: "power4.out"
      })
      const cardImage = card.dataset.image;
      gsap.to('.cursor', {
        backgroundImage: `url("${cardImage}")`,
        backgroundSize: 'cover',
        width: '300px',
        height: '187.5px',
        backgroundPosition: 'center',
        borderRadius: '0',
        mixBlendMode: 'normal',
        duration: 0.2,
        ease: "power4.out"
      })
    })
    card.addEventListener("mouseleave", () => {
      cursosOffsetX = 7.5;
      cursosOffsetY = 7.5;
      gsap.to(card.querySelector('.card-title h3'), {
        x: 0,
        color: "var(--primary-bg)",
        duration: 0.2,
        ease: "power4.out"
      })
      gsap.to(card.querySelector('.card-job'), {
        x: 0,
        duration: 0.2,
        ease: "power4.out"
      })
      gsap.to('.cursor', {
        backgroundImage: 'none',
        backgroundSize: 'cover',
        width: '15px',
        height: '15px',
        backgroundPosition: 'center',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        duration: 0.2,
        ease: "power4.out"
      })
    })
  })


  /// Box Select + Competências H2 Animation

  const compH2 = document.querySelector('#competencias-h2');
  const compText = compH2.textContent;
  const compSegmenter = new Intl.Segmenter("pt", { granularity: "grapheme" });
  const compChars = Array.from(compSegmenter.segment(compText), (s) => s.segment);
  compH2.innerHTML = compChars
    .map((char) => `<span>${char}</span>`)
    .join("");

  let competenciasTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".competencias-header",
      start: "top 90%",
      toggleActions: "play none none reverse",
    }
  });

  // 1. Box morph opens
  competenciasTL.to('#closeBox', {
    morphSVG: '#openBox',
    duration: 1,
    ease: "power4.out",
  });

  // 2. Then typewriter reveals
  competenciasTL.fromTo('#competencias-h2 span', {
    opacity: 0,
  }, {
    opacity: 1,
    duration: 0.05,
    stagger: 0.04,
  });


  /// Competencias Grid

  document.getElementById("competencias-grid").onmousemove = e => {
    for (const card of document.getElementsByClassName("competencias-card")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }

  /// Competencias Cursor Animations

  const cursors = document.querySelectorAll(".competencias-cursor");

  // Cursor 1 (Dev — Card 1, large card spanning rows 1-4, cols 1-3)
  // Wanders along the right and bottom edges, dipping in briefly
  if (cursors[0]) {
    gsap.set(cursors[0], { x: 350, y: -30 });
    gsap.timeline({ repeat: -1, defaults: { ease: "none" } })
      .to(cursors[0], { x: 420, y: 80, duration: 5 })
      .to(cursors[0], { x: 300, y: 200, duration: 4.5 })
      .to(cursors[0], { x: 150, y: 250, duration: 4 })
      .to(cursors[0], { x: -40, y: 180, duration: 5 })
      .to(cursors[0], { x: -30, y: 50, duration: 4 })
      .to(cursors[0], { x: 100, y: -40, duration: 3.5 })
      .to(cursors[0], { x: 350, y: -30, duration: 4 });
  }

  // Cursor 2 (Designer — Card 2, rows 1-2, cols 4-5)
  // Quick, precise loops around the outside edges
  if (cursors[1]) {
    gsap.set(cursors[1], { x: -40, y: 30 });
    gsap.timeline({ repeat: -1, defaults: { ease: "none" } })
      .to(cursors[1], { x: 60, y: -25, duration: 2.5 })
      .to(cursors[1], { x: 180, y: -20, duration: 2 })
      .to(cursors[1], { x: 200, y: 60, duration: 2.5 })
      .to(cursors[1], { x: 150, y: 120, duration: 2 })
      .to(cursors[1], { x: 30, y: 110, duration: 2.5 })
      .to(cursors[1], { x: -40, y: 30, duration: 2.5 });
  }

  // Cursor 3 (Cliente — Card 4, rows 5-6, cols 3-5)
  // Slow, hesitant drift along the top and left edges
  if (cursors[2]) {
    gsap.set(cursors[2], { x: 50, y: -30 });
    gsap.timeline({ repeat: -1, defaults: { ease: "none" } })
      .to(cursors[2], { x: 200, y: -35, duration: 6 })
      .to(cursors[2], { x: 280, y: 30, duration: 5 })
      .to(cursors[2], { x: 250, y: 100, duration: 5.5 })
      .to(cursors[2], { x: 80, y: 110, duration: 6 })
      .to(cursors[2], { x: -30, y: 50, duration: 5 })
      .to(cursors[2], { x: 50, y: -30, duration: 5.5 });
  }

  // Cursor 4 (Eduardo — Card 5, row 5, cols 1-2)
  // Energetic bouncing around the perimeter
  if (cursors[3]) {
    gsap.set(cursors[3], { x: 120, y: -25 });
    gsap.timeline({ repeat: -1, defaults: { ease: "none" } })
      .to(cursors[3], { x: 180, y: 20, duration: 2.5 })
      .to(cursors[3], { x: 160, y: 70, duration: 2 })
      .to(cursors[3], { x: 40, y: 80, duration: 3 })
      .to(cursors[3], { x: -30, y: 30, duration: 2.5 })
      .to(cursors[3], { x: 20, y: -30, duration: 2 })
      .to(cursors[3], { x: 120, y: -25, duration: 2.5 });
  }

  /// Cursor Animation

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    gsap.to(".cursor", {
      x: clientX - cursosOffsetX,
      y: clientY - cursosOffsetY,
      duration: 1,
      delay: 0,
      ease: "power4.out"
    })

    // Subtly shift the hero image based on mouse position
    const xPos = (clientX / window.innerWidth - 0.5);
    const yPos = (clientY / window.innerHeight - 0.5);

    gsap.to("#hero-img", {
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
  }

  const heroh1 = document.querySelectorAll(".hero-h1");

  heroh1.forEach((hero) => {
    hero.addEventListener("mouseenter", () => {
      gsap.to(".cursor", {
        scale: 10,
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
