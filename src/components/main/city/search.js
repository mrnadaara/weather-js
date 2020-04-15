import { DOMHelper } from '../../../helpers';

export default class Search {
  renderButton() {
    const container = DOMHelper.createElement('div', ['col', 'd-flex', 'align-items-center']);
    const button = DOMHelper.createElement(
      'button',
      ['btn', 'btn-transparent', 'btn-lg'],
      [{ prop: 'type', value: 'submit' }],
    );
    const i = DOMHelper.createElement('i', [
      'fas',
      'fa-chevron-right',
      'text-white',
      'go-icon',
    ]);
    button.appendChild(i);
    container.appendChild(button);
    return container;
  }

  renderEmail() {
    const container = DOMHelper.createElement('div', ['col', 'no-padding']);
    const input = DOMHelper.createElement(
      'input',
      [
        'form-control',
        'text-white',
        'border-bottom',
        'border-top-0',
        'border-left-0',
        'border-right-0',
      ],
      [
        { prop: 'type', value: 'text' },
        { prop: 'id', value: 'search' },
        { prop: 'placeholder', value: 'Search for a city' },
        { prop: 'autocomplete', value: 'off' },
      ],
    );
    const hiddenInput = DOMHelper.createElement('input', null, [
      { prop: 'type', value: 'hidden' },
      { prop: 'id', value: 'cityId' },
    ]);
    container.append(input, hiddenInput);
    return container;
  }

  render() {
    const formElement = DOMHelper.createElement(
      'form',
      ['w-100', 'p-5'],
      [
        { prop: 'autocomplete', value: 'off' },
        { prop: 'id', value: 'searchForm' },
      ],
    );
    const formRow = DOMHelper.createElement('div', ['form-row']);
    formRow.append(this.renderEmail(), this.renderButton());
    formElement.appendChild(formRow);
    return formElement;
  }
}