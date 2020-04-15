import { DOMHelper } from '../../../helpers';

export default class Weather {
  render() {
    const container = DOMHelper.createElement('div', [
      'container-fluid',
      'no-padding',
      'no-gutter',
      'weather',
      'rounded-bottom',
      'rounded-right',
      'rounded-left',
      'h-25',
    ]);
    const row = DOMHelper.createElement('div', [
      'row',
      'no-gutters',
      'justify-content-center',
      'h-100',
    ]);
    const degree = DOMHelper.createElement('div', ['col-4']);
    const icon = DOMHelper.createElement('div', ['col-4']);
    icon.innerText = 'icon';
    degree.innerText = 'degree';

    row.append(degree, icon);
    container.appendChild(row);

    return container;
  }
}
