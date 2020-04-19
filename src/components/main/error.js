import { DOMHelper } from '../../helpers';

export default class Error {
  constructor(error) {
    this.error = error;
  }

  render() {
    const container = DOMHelper.createElement(
      'div',
      [
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'flex-column',
        'h-100',
      ],
      [{ prop: 'id', value: 'error' }],
    );

    const i = DOMHelper.createElement('i', [
      'fas',
      'fa-exclamation-triangle',
      'text-danger',
      'text-center',
      'error',
    ]);

    const p = DOMHelper.createElement('p', [
      'text-danger',
      'text-center',
      'error',
    ]);

    p.textContent = this.error;

    container.append(i, p);

    return container;
  }
}