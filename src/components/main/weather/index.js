import { DOMHelper } from '../../../helpers';

export default class Weather {
  render() {
    const container = DOMHelper.createElement('div', [
      'container-fluid',
      'no-padding',
      'no-gutter',
    ]);
    container.innerText = 'weather';

    return container;
  }
}
