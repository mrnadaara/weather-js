import { DOMHelper } from '../../../helpers';

export default class Search {
  renderButton() {
    const container = DOMHelper.createElement('div', ['col', 'd-flex', 'align-items-center']);
    const button = DOMHelper.createElement(
      'button',
      ['btn', 'btn-transparent', 'btn-lg'],
      [{ prop: 'type', value: 'submit' }],
    );
    const i = DOMHelper.createElement('i', ['fas', 'fa-chevron-right', 'text-white']);
    button.appendChild(i);
    container.appendChild(button);
    return container;
  }

  renderEmail() {
    const container = DOMHelper.createElement('div', ['col']);
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
      ],
    );
    container.appendChild(input);
    return container;
  }

  render() {
    const formElement = DOMHelper.createElement(
      'form',
      ['w-75', 'p-5'],
    );
    const formRow = DOMHelper.createElement('div', ['form-row']);
    formRow.append(this.renderEmail(), this.renderButton());
    formElement.appendChild(formRow);
    return formElement;
  }
}