import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export default class Intro {
  constructor() {
    this.state = null;
    this.centerImage = document.querySelector('.intro__center-image img');
    this.centerImageWrapper = document.querySelector('.intro__center-image');
    this.imagesWrapper = document.querySelector('.intro__images');
    this.images = [...this.imagesWrapper.querySelectorAll('img')];
    this.titleLines = 'h1 [data-animation="text-reveal"] > *';
    this.navLines = '.header [data-animation="text-reveal"] > *';
    this.textLine = '.intro__line';

    this._getFinalState();
    this._setInitialState();
    this._fadeUpImages();
  }

  _getFinalState() {
    gsap.set([this.images, this.centerImageWrapper], {
      xPercent: -50,
      yPercent: -50,
    });

    this.state = Flip.getState([this.centerImageWrapper, this.images]);
  }

  _setInitialState() {
    this.centerImageWrapper.classList.add('initial');
    this.imagesWrapper.classList.add('initial');

    gsap.set(this.images, {
      xPercent: 0,
      yPercent: 0,
      y: 80,
    });

    gsap.set(this.centerImageWrapper, {
      y: 80,
      scale: 0.15,
    });

    gsap.set(this.centerImage, {
      scale: 1.5,
    });

    gsap.set(this.textLine, {
      scaleX: 0,
      opacity: 1,
    });
  }

  _fadeUpImages() {
    return gsap.to([this.images, this.centerImageWrapper], {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.inOut',
      stagger: 0.1,
      onComplete: () => this._moveImagesToCenter(),
    });
  }

  _moveImagesToCenter() {
    Flip.to(this.state, {
      duration: 2,
      ease: 'expo.inOut',
      stagger: 0.15,
      onComplete: () => this._scaleCenterImage(),
    });
  }

  _scaleCenterImage() {
    const tl = gsap.timeline({
      onComplete: () => this._revealContent(),
    });

    //prettier-ignore
    tl.to(this.centerImageWrapper, {
      scale: 1,
      duration: 2,
      ease: 'expo.inOut',
    }).to(this.centerImage, {
      scale: 1,
      duration: 2,
      ease: 'expo.inOut',
    },0);

    return tl;
  }

  _revealContent() {
    const tl = gsap.timeline({
      defaults: {
        y: 0,
        duration: 2,
        ease: 'expo.out',
      },
    });

    //prettier-ignore
    tl.to(this.titleLines, {
      stagger: 0.2,
    })
      .to(this.navLines, {
        stagger: 0.3,
      },0)
      .to(this.textLine, {
        scaleX: 1,
        transformOrigin: 'left center',
      },0);

    return tl;
  }
}
