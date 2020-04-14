import { DOMHelper } from '../../../helpers';

export default class Spinner {
  render() {
    const container = DOMHelper.createElement(
      'div',
      [
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'h-100',
      ],
      [{ prop: 'id', value: 'spinner' }],
    );

    const innerContainer = DOMHelper.createElement(
      'div',
      ['spinner-border'],
      [{ prop: 'role', value: 'status' }],
    );

    const span = DOMHelper.createElement('span', ['sr-only']);

    innerContainer.appendChild(span);
    container.appendChild(innerContainer);

    return container;
  }
}