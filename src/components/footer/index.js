import { DOMHelper } from '../../helpers';

export default class Footer {
  constructor() {
    this.links = [
      {
        title: 'Check out the code',
        link: 'https://github.com/mrnadaara/weather-js',
      },
      {
        title: 'LinkedIn',
        link: 'https://www.linkedin.com/in/sharmarke-ahmed/',
      },
    ];
  }

  renderNavItem({ title, link }) {
    const item = DOMHelper.createElement('li', ['nav-item']);
    const anchor = DOMHelper.createElement(
      'a',
      ['nav-link', 'text-white'],
      [
        { prop: 'href', value: link },
        { prop: 'target', value: '_blank' },
      ],
    );
    anchor.textContent = title;
    item.appendChild(anchor);

    return item;
  }

  renderNav() {
    const container = DOMHelper.createElement('ul', [
      'nav',
      'justify-content-center',
    ]);

    this.links.forEach((navItem) => {
      container.appendChild(this.renderNavItem(navItem));
    });

    return container;
  }

  render() {
    const container = DOMHelper.createElement('footer', ['container-fluid']);
    container.appendChild(this.renderNav());

    return container;
  }
}
