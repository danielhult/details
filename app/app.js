import Intro from './animations/intro';

class App {
  constructor() {
    this._createIntro();
  }

  _createIntro() {
    this.intro = new Intro();
  }
}

new App();
