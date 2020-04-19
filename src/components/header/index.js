import { DOMHelper } from '../../helpers';

export default class Header {
  renderTitle() {
    const h1 = DOMHelper.createElement('h1', ['text-white']);
    h1.textContent = 'Cagarweyne Weather';

    return h1;
  }

  render() {
    const container = DOMHelper.createElement('header', [
      'container-fluid',
      'text-center',
    ]);
    container.appendChild(this.renderTitle());

    return container;
  }
}
