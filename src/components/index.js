import Header from './header';
import Main from './main';
import Footer from './footer';

export default class Components {
  constructor() {
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  render() {
    const container = document.getElementById('content');
    container.append(
      this.header.render(),
      this.main.render(),
      this.footer.render(),
    );
  }
}