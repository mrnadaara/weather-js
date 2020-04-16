import { DOMHelper } from '../../../helpers';
import Spinner from '../spinner';
import Error from '../error';

export default class Weather {
  static updateWeather(data) {
    const weather = document.getElementById('weather-row');
    const fahrenheit = document.getElementById('fahrenheit');
    const celsius = document.getElementById('celsius');
    const city = document.getElementById('weather-city');
    const degree = document.getElementById('degree');
    const spinner = document.getElementById('spinnerweather');
    const icon = document.getElementById('icon');
    spinner.parentNode.removeChild(spinner);
    icon.style.visibility = 'visible';
    degree.style.visibility = 'visible';
  }

  static showSpinner() {
    const error = document.getElementById('error');
    if (error) {
      error.parentNode.removeChild(error);
    }
    const spinner = new Spinner('weather').render();
    const degree = document.getElementById('degree');
    const icon = document.getElementById('icon');
    degree.parentNode.insertBefore(spinner, degree);

    icon.style.visibility = 'hidden';
    degree.style.visibility = 'hidden';
  }

  static showError(error) {
    const errorElement = new Error(error).render();
    const spinner = document.getElementById('spinnerweather');
    spinner.parentNode.insertBefore(errorElement, spinner);
    spinner.parentNode.removeChild(spinner);
  }

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
      'position-relative',
    ]);
    const degree = DOMHelper.createElement(
      'div',
      ['col-4'],
      [{ prop: 'id', value: 'degree' }],
    );
    const icon = DOMHelper.createElement(
      'div',
      ['col-4'],
      [{ prop: 'id', value: 'icon' }],
    );
    const spinner = new Spinner('weather').render();
    icon.innerText = 'icon';
    degree.innerText = 'degree';

    icon.style.visibility = 'hidden';
    degree.style.visibility = 'hidden';

    row.append(spinner, degree, icon);
    container.appendChild(row);

    return container;
  }
}
