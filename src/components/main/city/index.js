import { DOMHelper } from '../../../helpers';

export default class City {
  render() {
    const container = DOMHelper.createElement('div', [
      'container-fluid',
      'no-padding',
      'h-75',
      'w-100',
    ]);
    container.innerText = 'city';

    return container;
  }
}
