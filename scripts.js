import Lenis from "https://esm.sh/lenis";
import gsap from "https://esm.sh/gsap";
import ScrollTrigger from "https://esm.sh/gsap/ScrollTrigger";
import MorphSVGPlugin from "https://esm.sh/gsap/MorphSVGPlugin";
import Draggable from "https://esm.sh/gsap/Draggable";
import DrawSVGPlugin from "https://esm.sh/gsap/DrawSVGPlugin";
import TextPlugin from "https://esm.sh/gsap/TextPlugin";

let cursosOffsetX = 7.5;
let cursosOffsetY = 7.5;

document.addEventListener("DOMContentLoaded", () => {

  /// Scroll
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, Draggable, DrawSVGPlugin, TextPlugin);

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
        // This is crucial for pinned elements. We prioritize pinning triggers or those starting at exactly "top top".
        let targetY = target;
        let triggers = ScrollTrigger.getAll();
        
        // Find the primary trigger for this target
        const primaryTrigger = triggers.find(t => t.trigger === target && (t.vars.pin === true || t.vars.start === "top top"));
        
        if (primaryTrigger) {
          targetY = primaryTrigger.start;
        }

        lenis.scrollTo(targetY, {
          duration: 1.5,
          offset: -80, // Offset for the fixed navbar (approx height + padding)
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

  /// Interactive Contact Dialogue

  const dialogueText = document.getElementById("dialogue-text");
  const choicesContainer = document.querySelector(".dialogue-choices");
  const choicesBtns = document.querySelectorAll(".dialogue-btn");
  const linksContainer = document.querySelector(".dialogue-links");
  const linkBtns = document.querySelectorAll(".contact-btn");

  let hasChosen = false;
  let isLockedDown = false;

  // Event listeners to only block downward scrolling
  const preventScrollDown = (e) => {
    if (!isLockedDown) return;
    if (e.type === 'wheel' && e.deltaY > 0) e.preventDefault();
    if (e.type === 'keydown' && ['ArrowDown', 'PageDown', ' '].includes(e.key)) e.preventDefault();
  };

  let touchStartY = 0;
  const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
  const preventTouchMoveDown = (e) => {
    if (!isLockedDown) return;
    if (touchStartY - e.touches[0].clientY > 0) e.preventDefault();
  };

  window.addEventListener('wheel', preventScrollDown, { passive: false });
  window.addEventListener('keydown', preventScrollDown, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: false });
  window.addEventListener('touchmove', preventTouchMoveDown, { passive: false });

  // Initial animation of the speech bubble
  gsap.fromTo(".speech-bubble", {
    opacity: 0,
    scale: 0.8,
    y: 50
  }, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#contato",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  // Pin the section and scrub the text
  let contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#contato",
      start: "top top",
      end: "+=250%",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        // Lock scroll DOWN if we reached the end of the text and haven't chosen yet
        if (self.progress >= 0.995 && !hasChosen) {
          isLockedDown = true;
          gsap.to(choicesBtns, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            overwrite: "auto"
          });
        }

        // Release scroll lock if the user scrolls up before choosing
        if (self.progress < 0.99 && isLockedDown) {
          isLockedDown = false;
        }

        // Hide choice buttons if user scrolls up before choosing
        if (self.progress < 0.985 && !hasChosen) {
          gsap.to(choicesBtns, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            overwrite: "auto"
          });
        }

        // Restart the "game" if the user scrolls back up after choosing
        if (self.progress < 0.90 && hasChosen) {
          hasChosen = false;
          choicesContainer.style.display = "flex";
          linksContainer.style.display = "none";

          // Reset visibility states for buttons
          gsap.set(choicesBtns, { opacity: 0, y: 20 });
          gsap.set(linkBtns, { opacity: 0, y: 20 });
          linkBtns.forEach(link => {
            link.style.display = "block";
            link.classList.remove("highlight-btn"); // Remove highlight if they go back
          });

          // Allow the scrub timeline to take back control of the text
          gsap.killTweensOf(dialogueText);
        }
      }
    }
  });

  const texts = [
    "Opa, que bom que você chegou até aqui!",
    "Gostou do que viu? Que tal construirmos algo incrível juntos?",
    "Me diz uma coisa... O que te traz por aqui hoje?"
  ];

  let str1 = { p: 100 };
  let str2_type = { p: 0 };
  let str2_erase = { p: 100 };
  let str3_type = { p: 0 };

  // Timeline for text changes
  contactTl.to(str1, {
    p: 0,
    duration: 0.5,
    ease: "none",
    onUpdate: () => { dialogueText.innerText = texts[0].substring(0, Math.round(texts[0].length * (str1.p / 100))); }
  }, "+=0.2")
    .to(str2_type, {
      p: 100,
      duration: 1,
      ease: "none",
      onUpdate: () => { dialogueText.innerText = texts[1].substring(0, Math.round(texts[1].length * (str2_type.p / 100))); }
    })
    .to(str2_erase, {
      p: 0,
      duration: 0.5,
      ease: "none",
      onUpdate: () => { dialogueText.innerText = texts[1].substring(0, Math.round(texts[1].length * (str2_erase.p / 100))); }
    }, "+=0.2")
    .to(str3_type, {
      p: 100,
      duration: 1,
      ease: "none",
      onUpdate: () => { dialogueText.innerText = texts[2].substring(0, Math.round(texts[2].length * (str3_type.p / 100))); }
    });

  // Handle choice clicks
  choicesBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      hasChosen = true;
      const choice = btn.getAttribute("data-choice");

      gsap.to(choicesBtns, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          choicesContainer.style.display = "none";
          linksContainer.style.display = "flex";

          let responseText = "";
          let wppMessage = "";

          if (choice === "A") {
            responseText = "Incrível! Vamos tirar essa ideia do papel. A forma mais rápida de falarmos sobre isso é pelo WhatsApp. Me chama lá!";
            wppMessage = "Olá Eduardo, vi seu portfólio e tenho um projeto em mente para conversarmos!";
          } else if (choice === "B") {
            responseText = "Fico lisonjeado! Estou sempre aberto a grandes desafios e equipes inovadoras. O LinkedIn é o melhor lugar para trocarmos uma ideia.";
            wppMessage = "Olá Eduardo, estava olhando seu portfólio e gostaria de conversar sobre uma oportunidade na minha equipe.";
          } else {
            responseText = "Muito obrigado! Fico feliz que tenha curtido. Sinta-se à vontade para se conectar comigo no LinkedIn para acompanharmos o trabalho um do outro!";
            wppMessage = "Fala Eduardo! Passando só para dizer que curti muito o seu portfólio. Parabéns!";
          }

          linkBtns.forEach(link => {
            // All buttons remain visible, just remove old highlights
            link.classList.remove("highlight-btn");

            // Apply highlight to the recommended button
            if (choice === "A" && link.classList.contains("whatsapp-btn")) link.classList.add("highlight-btn");
            if (choice === "B" && link.classList.contains("linkedin-btn")) link.classList.add("highlight-btn");
            if (choice === "C" && link.classList.contains("linkedin-btn")) link.classList.add("highlight-btn"); // Alternatively, maybe highlight nothing for just saying hi, but LinkedIn works as you mentioned it in text

            // Update WhatsApp href with custom message
            if (link.classList.contains("whatsapp-btn")) {
              link.href = `https://wa.me/5521986076148?text=${encodeURIComponent(wppMessage)}`;
            }
          });

          // Animate text to response (first erase right-to-left, then type)
          let responseTl = gsap.timeline();
          let currentText = dialogueText.innerText;
          let eraseObj = { p: 100 };

          responseTl.to(eraseObj, {
            p: 0,
            duration: 0.5,
            ease: "none",
            onUpdate: () => {
              dialogueText.innerText = currentText.substring(0, Math.round(currentText.length * (eraseObj.p / 100)));
            }
          })
            .to(dialogueText, {
              text: responseText,
              duration: 1.5,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(linkBtns, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.1,
                  ease: "back.out(1.5)",
                  onComplete: () => {
                    isLockedDown = false; // Release lock so they can scroll down
                  }
                });
              }
            });
        }
      });
    });
  });

  var emailBtn = document.getElementById("email-btn");
  emailBtn.addEventListener("click", () => {
    navigator.clipboard.writeText('dudulougon@gmail.com').then(() => {
      emailBtn.innerText = "E-mail copiado!";
      setTimeout(() => {
        emailBtn.innerText = "E-mail";
      }, 2000);
    });
  });


  /// Logo Remover

  const interval = setInterval(() => {
    const viewer = document.querySelector('spline-viewer');
    if (viewer && viewer.shadowRoot) {
      const logo = viewer.shadowRoot.querySelector('#logo');
      if (logo) {
        logo.style.display = 'none';
        logo.style.visibility = 'hidden';
        logo.style.opacity = '0';
        logo.style.pointerEvents = 'none';
        logo.style.zIndex = '-20';
        logo.style.position = 'absolute';
        clearInterval(interval);
      }
    }
  }, 500);

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
