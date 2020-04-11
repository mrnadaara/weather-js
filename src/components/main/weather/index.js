import { DOMHelper } from '../../../helpers';

export default class Weather {
  render() {
    const container = DOMHelper.createElement('div', [
      'container-fluid',
      'no-padding',
      'h-25',
      'w-100',
      'no-gutter',
    ]);
    container.innerText = 'weather';

    return container;
  }
}
