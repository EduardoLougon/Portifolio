import Lenis from "https://esm.sh/lenis";
import gsap from "https://esm.sh/gsap";
import ScrollTrigger from "https://esm.sh/gsap/ScrollTrigger";
import ScrollToPlugin from "https://esm.sh/gsap/ScrollToPlugin";
import MorphSVGPlugin from "https://esm.sh/gsap/MorphSVGPlugin";
import Draggable from "https://esm.sh/gsap/Draggable";
import DrawSVGPlugin from "https://esm.sh/gsap/DrawSVGPlugin";

let cursosOffsetX = 7.5;
let cursosOffsetY = 7.5;

document.addEventListener("DOMContentLoaded", () => {

  /// Scroll
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, Draggable, ScrollToPlugin, DrawSVGPlugin);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        // If the target has a ScrollTrigger attached, get its calculated start position
        // This is crucial for pinned elements, as Lenis doesn't know about GSAP's pin-spacers
        let targetY = target;
        let triggers = ScrollTrigger.getAll();
        for (let i = 0; i < triggers.length; i++) {
          if (triggers[i].trigger === target) {
            targetY = triggers[i].start;
            break;
          }
        }

        lenis.scrollTo(targetY, {
          duration: 1.5,
          offset: 0,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });

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

  /// Draggable Post It

  Draggable.create('.postit', {
    bounds: '.competencias-area',
  })

  Draggable.create('.tech', {
    bounds: '.competencias-area',
  })

  /// Competencias Cursor Animations

  // DevCursor — wanders around the top-left / center area
  gsap.timeline({ repeat: -1, yoyo: true, delay: 0 })
    .to('#devCursor', { x: 100, y: -30, duration: 4, ease: "none" })
    .to('#devCursor', { x: 50, y: -70, duration: 3, ease: "none" })
    .to('#devCursor', { x: 160, y: 20, duration: 3.5, ease: "none" })
    .to('#devCursor', { x: 20, y: -10, duration: 2.5, ease: "none" });

  // ClienteCursor — wanders around the top-right area
  gsap.timeline({ repeat: -1, yoyo: true, delay: 2 })
    .to('#clienteCursor', { x: 100, y: -30, duration: 4, ease: "none" })
    .to('#clienteCursor', { x: 50, y: -70, duration: 3, ease: "none" })
    .to('#clienteCursor', { x: 160, y: 20, duration: 3.5, ease: "none" })
    .to('#clienteCursor', { x: 20, y: -10, duration: 2.5, ease: "none" });

  // EduardoCursor — wanders around the bottom-left area
  gsap.timeline({ repeat: -1, yoyo: true, delay: 4.5 })
    .to('#eduardoCursor', { x: 100, y: -30, duration: 4, ease: "none" })
    .to('#eduardoCursor', { x: 50, y: -70, duration: 3, ease: "none" })
    .to('#eduardoCursor', { x: 160, y: 20, duration: 3.5, ease: "none" })
    .to('#eduardoCursor', { x: 20, y: -10, duration: 2.5, ease: "none" });


  /// Diagonal Wipe — DrawSVG painted effect over competencias

  gsap.set('#wipePath', { drawSVG: '0%' });
  const headers = document.querySelectorAll('.sobre-mim-header')

  let wipeTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#competencias',
      start: 'bottom bottom',
      end: '+=400%',
      scrub: 1.5,
      pin: true,
    }
  });

  wipeTl.to('#wipePath', {
    drawSVG: '100%',
    duration: 1.5,
    ease: "power1.inOut"
  })
    .to(headers[0], { x: `${100 - self.progress * 100}%` })
    .to(headers[1], { x: `${-100 + self.progress * 100}%` })
    .to(headers[2], { x: `${100 - self.progress * 100}%` })

    .to(headers[0], { y: '100%' })
    .to(headers[2], { y: '-100%' }, '<')


  /// Sobre Mim — Horizontal Scroll

  let sobreWrapper = document.querySelector('.sobre-wrapper');
  let sobrePanels = gsap.utils.toArray('.sobre-panel');

  if (sobreWrapper && sobrePanels.length > 1) {
    gsap.to(sobreWrapper, {
      x: () => -(sobreWrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: '.sobre-mim',
        start: 'top top',
        end: () => '+=' + (sobreWrapper.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      }
    });
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
