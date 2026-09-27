import Lenis from "https://esm.sh/lenis";
import gsap from "https://esm.sh/gsap";
import ScrollTrigger from "https://esm.sh/gsap/ScrollTrigger";
import MorphSVGPlugin from "https://esm.sh/gsap/MorphSVGPlugin";
import Draggable from "https://esm.sh/gsap/Draggable";
import DrawSVGPlugin from "https://esm.sh/gsap/DrawSVGPlugin";
import TextPlugin from "https://esm.sh/gsap/TextPlugin";
import { projectsData } from "./projects-data.js";

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
      if (targetId === '#' || targetId === '#case-study') return;

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
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = card.dataset.project;
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  })

  /// Project Case Study Modal Logic
  const projectModal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalContainer = document.querySelector(".modal-container");
  const modalDialog = document.querySelector(".modal-dialog");

  const projectOrder = ["olympiads", "pethero", "corretar", "poucher"];

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const currentIndex = projectOrder.indexOf(projectId);
    const nextIndex = (currentIndex + 1) % projectOrder.length;
    const nextProject = projectsData[projectOrder[nextIndex]];

    const techHtml = project.techStack
      ? project.techStack
        .map(
          (t) => `
            <div class="modal-tech-badge">
              <img src="${t.logo}" alt="${t.name}">
              <div>
                <strong>${t.name}</strong>
                <span>${t.role}</span>
              </div>
            </div>
          `
        )
        .join("")
      : "";

    const gallery = project.gallery && project.gallery.length ? project.gallery : [project.heroImage];
    const isCarousel = gallery.length > 1;

    const visualHtml = isCarousel
      ? `
        <div class="modal-carousel" data-current="0" data-lenis-prevent>
          <div class="modal-carousel-track" style="transform: translateX(0%);">
            ${gallery
        .map(
          (img, idx) => `
              <div class="modal-carousel-slide">
                <img src="${img}" alt="${project.title} Preview ${idx + 1}" class="modal-carousel-img">
              </div>
            `
        )
        .join("")}
          </div>
          <button class="modal-carousel-btn prev" aria-label="Previous slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="modal-carousel-btn next" aria-label="Next slide">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <div class="modal-carousel-dots">
            ${gallery
        .map(
          (_, idx) => `
              <button class="modal-carousel-dot ${idx === 0 ? "active" : ""}" data-slide="${idx}" aria-label="Slide ${idx + 1}"></button>
            `
        )
        .join("")}
          </div>
          <div class="modal-carousel-counter">
            <span class="carousel-current">1</span> / <span>${gallery.length}</span>
          </div>
        </div>
      `
      : `
        <div class="modal-hero-visual">
          <img src="${project.heroImage}" alt="${project.title} Preview" class="modal-hero-img">
        </div>
      `;

    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-meta-top">
          <span class="modal-badge">${project.number} / CASE STUDY</span>
          <span class="modal-category">${project.category}</span>
        </div>
        <h1 class="modal-title">${project.title}</h1>
        <p class="modal-tagline">${project.tagline}</p>

        <div class="modal-meta-pills">
          <div class="modal-pill">
            <span class="modal-pill-label">Role</span>
            <span class="modal-pill-value">${project.role}</span>
          </div>
          <div class="modal-pill">
            <span class="modal-pill-label">Timeline</span>
            <span class="modal-pill-value">${project.period}</span>
          </div>
          ${project.liveUrl && project.liveUrl !== "#" ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="modal-live-btn">
              <span>Visit Live Site</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : `
            <div class="modal-pill modal-pill-status">
              <span class="modal-pill-label">Status</span>
              <span class="modal-pill-value">In Development</span>
            </div>
          `}
        </div>
      </div>

      ${visualHtml}

      <div class="modal-body">
        <div class="modal-section modal-grid-two">
          <div class="modal-block">
            <h3 class="modal-section-title">Introduction</h3>
            <p>${project.company}</p>
          </div>
          <div class="modal-block">
            <h3 class="modal-section-title">My Work</h3>
            <p>${project.myWork}</p>
          </div>
        </div>

        <div class="modal-section">
          <h3 class="modal-section-title">Technologies</h3>
          <div class="modal-tech-grid">
            ${techHtml}
          </div>
        </div>

        <div class="modal-footer-nav">
          ${project.liveUrl && project.liveUrl !== "#" ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="modal-live-btn-footer">
              <span>Launch Live Project</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : `
            <div class="modal-status-badge-footer">
              <span class="status-pulse-dot"></span>
              <span>Currently in Development</span>
            </div>
          `}
          <button class="modal-next-btn" data-next="${nextProject.id}">
            <span>Next Project (${nextProject.title})</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Reset scroll of modal dialog
    if (modalDialog) {
      modalDialog.scrollTop = 0;
      modalDialog.setAttribute("tabindex", "-1");
      setTimeout(() => modalDialog.focus({ preventScroll: true }), 50);
    }

    // Reset cursor to normal circle so hover image doesn't get stuck
    cursosOffsetX = 7.5;
    cursosOffsetY = 7.5;
    gsap.to('.cursor', {
      backgroundImage: 'none',
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      mixBlendMode: 'difference',
      duration: 0.2,
      ease: "power4.out"
    });

    // Pause Lenis smooth scroll and lock body
    lenis.stop();
    document.body.style.overflow = "hidden";

    // Show modal
    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
  }

  function closeProjectModal() {
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    // Resume Lenis smooth scroll and unlock body
    lenis.start();
    document.body.style.overflow = "";
  }

  // Prevent scroll events in modal from bubbling to window / Lenis
  if (modalDialog) {
    modalDialog.addEventListener("wheel", (e) => {
      e.stopPropagation();
    }, { passive: true });

    modalDialog.addEventListener("touchmove", (e) => {
      e.stopPropagation();
    }, { passive: true });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeProjectModal);
  if (modalContainer) {
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeProjectModal();
    }
  });

  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      // Next Project cycling
      const nextBtn = e.target.closest(".modal-next-btn");
      if (nextBtn) {
        const nextId = nextBtn.getAttribute("data-next");
        if (nextId) openProjectModal(nextId);
        return;
      }

      // Carousel Controls
      const carousel = e.target.closest(".modal-carousel");
      if (!carousel) return;

      const track = carousel.querySelector(".modal-carousel-track");
      const slides = carousel.querySelectorAll(".modal-carousel-slide");
      const dots = carousel.querySelectorAll(".modal-carousel-dot");
      const counterCurrent = carousel.querySelector(".carousel-current");
      if (!track || !slides.length) return;

      let current = parseInt(carousel.dataset.current || "0", 10);
      const total = slides.length;

      const prevSlideBtn = e.target.closest(".modal-carousel-btn.prev");
      const nextSlideBtn = e.target.closest(".modal-carousel-btn.next");
      const dotBtn = e.target.closest(".modal-carousel-dot");

      if (prevSlideBtn) {
        current = (current - 1 + total) % total;
      } else if (nextSlideBtn) {
        current = (current + 1) % total;
      } else if (dotBtn) {
        current = parseInt(dotBtn.dataset.slide, 10);
      } else {
        return;
      }

      carousel.dataset.current = current;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, idx) => {
        d.classList.toggle("active", idx === current);
      });
      if (counterCurrent) {
        counterCurrent.textContent = current + 1;
      }
    });

    // Touch swipe support for the carousel
    let touchStartX = 0;
    let touchEndX = 0;

    modalContent.addEventListener("touchstart", (e) => {
      const carousel = e.target.closest(".modal-carousel");
      if (!carousel) return;
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modalContent.addEventListener("touchend", (e) => {
      const carousel = e.target.closest(".modal-carousel");
      if (!carousel) return;
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        const nextSlideBtn = carousel.querySelector(".modal-carousel-btn.next");
        const prevSlideBtn = carousel.querySelector(".modal-carousel-btn.prev");
        if (diff < 0 && nextSlideBtn) nextSlideBtn.click();
        else if (diff > 0 && prevSlideBtn) prevSlideBtn.click();
      }
    }, { passive: true });
  }


  /// Box Select + Competências H2 Animation

  const compH2 = document.querySelector('#competencias-h2');
  const compText = compH2.textContent;
  const compSegmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
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

  // DesignerCursor — wanders around the top-right area
  gsap.timeline({ repeat: -1, yoyo: true, delay: 2 })
    .to('#designerCursor', { x: 100, y: -30, duration: 4, ease: "none" })
    .to('#designerCursor', { x: 50, y: -70, duration: 3, ease: "none" })
    .to('#designerCursor', { x: 160, y: 20, duration: 3.5, ease: "none" })
    .to('#designerCursor', { x: 20, y: -10, duration: 2.5, ease: "none" });

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
    "Hey there, glad you made it this far!",
    "Liked what you saw? How about we build something incredible together?",
    "Tell me something... What brings you here today?"
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
            responseText = "Awesome! Let's bring that idea to life. The fastest way to talk is via WhatsApp. Drop me a line!";
            wppMessage = "Hi Eduardo, I saw your portfolio and have a project in mind to discuss!";
          } else if (choice === "B") {
            responseText = "I'm honored! I'm always open to exciting challenges and innovative teams. LinkedIn is the best place to connect.";
            wppMessage = "Hi Eduardo, I was checking out your portfolio and would like to chat about an opportunity on my team.";
          } else {
            responseText = "Thank you so much! Really glad you liked it. Feel free to connect with me on LinkedIn so we can follow each other's work!";
            wppMessage = "Hey Eduardo! Just dropping by to say I really enjoyed your portfolio. Great work!";
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
    navigator.clipboard.writeText('elougonsampaiolopes@ucsd.edu').then(() => {
      emailBtn.innerText = "Email copied!";
      setTimeout(() => {
        emailBtn.innerText = "Email";
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
