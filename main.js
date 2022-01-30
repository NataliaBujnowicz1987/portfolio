document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("#portfolio").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("#portfolio").style.visibility = "visible";


    // cursor animation
    let mouseCursor = document.querySelector('.cursor');
    let navLinks = document.querySelectorAll('.nav-links li');

    const cursor = function (e) {
      mouseCursor.style.top = e.pageY + 'px';
      mouseCursor.style.left = e.pageX + 'px';
    }

    navLinks.forEach(link => {
      link.addEventListener('mouseover', () => {
        mouseCursor.classList.add('link-grow');

      })
      link.addEventListener('mouseleave', () => {
        mouseCursor.classList.remove('link-grow');

      })
    })

    window.addEventListener('mousemove', cursor);


    // button animation
    const animateButton = function (e) {
      e.preventDefault;
      //reset animation
      e.target.classList.remove('animate');

      e.target.classList.add('animate');
      setTimeout(function () {
        e.target.classList.remove('animate');
      }, 700);
    };

    const bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('mouseover', animateButton, false);
    }

    // GSAP ANMATIONS
    let tl = gsap.timeline();
    gsap.registerPlugin(ScrollTrigger);

    // background animation
    tl.from('#portfolio', { duration: 3, opacity: 0, ease: "slow(0.7, 0.7, false)" })
    // header animation
    gsap.from('.header', { duration: 3, delay: 1, opacity: 0, y: "random(-400, 400)", ease: "back.out(1.7)", stagger: 1 })

    // girl flower animatiomn
    const flower = document.getElementById('flower');
    tl.staggerFromTo(flower.children, 1.1,
      { scale: 0.1, opacity: 0 },
      { scale: 1, opacity: 1 },
      .3
    )

    // about section animation  
    gsap.from('.about-header', {
      scrollTrigger: {
        trigger: '.about-header',
        start: 'top center',
        toggleAction: 'start none restart none',
      },
      opacity: 0,
      duration: 2,
      scale: 0.3
    });
    // paragraphs animation 
    gsap.from('.p', {
      scrollTrigger: {
        trigger: '.about-header',
      },
      opacity: 0, top: 300, duration: 2, stagger: 0.5
    })


    // scroll animation - desktop only
    const sections = document.querySelectorAll(".scrollSection");
    function goToSection(section, anim) {
      gsap.to(window, {
        scrollTo: { y: section, autoKill: false },
        duration: 0.8
      });

      if (anim) {
        anim.restart();
      }
    }
    if (window.innerWidth > 1000) {
      sections.forEach(section => {
        const intoAnim = gsap.timeline({ paused: true })
          .from(section.querySelector(".portfolio-box"), { xPercent: 50, duration: 1 })

        ScrollTrigger.create({
          trigger: section,
          onEnter: () => goToSection(section, intoAnim),
        });

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          onEnterBack: () => goToSection(section),
        });
      });
    }
  }
};



