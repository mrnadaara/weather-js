import { DOMHelper } from '../../../helpers';
import Spinner from '../spinner';
import Error from '../error';

export default class Weather {
  static convertKelvin(temp) {
    const c = Math.round(temp - 273.15);
    const f = Math.round(c * 1.8 + 32);

    return { f, c };
  }

  static updateWeather({name, main, weather}) {
    const { f, c } = this.convertKelvin(main.temp);
    const fahrenheit = document.getElementById('fahrenheit');
    const celsius = document.getElementById('celsius');
    const city = document.getElementById('city-name');
    const degree = document.getElementById('degree');
    const spinner = document.getElementById('spinnerweather');
    const icon = document.getElementById('icon');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherInfo = document.getElementById('weather-desc');

    city.textContent = name;
    fahrenheit.firstChild.textContent = `${f}°`;
    celsius.firstChild.textContent = `${c}°`;
    weatherInfo.textContent = weather[0].description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${
      weather[0].icon
    }@2x.png#${new Date().getTime()}`;

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

  renderDegree(type) {
    const container = DOMHelper.createElement(
      'div',
      ['h-100'],
      [{ prop: 'id', value: type }],
    );

    const degree = DOMHelper.createElement('h2');
    const typeElement = DOMHelper.createElement('h2');

    typeElement.textContent = type;
    container.append(degree, typeElement);

    return container;
  }

  renderDegreeContainer() {
    const container = DOMHelper.createElement(
      'div',
      [
        'col-4',
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-start',
      ],
      [{ prop: 'id', value: 'degree' }],
    );
    const cityName = DOMHelper.createElement(
      'h4',
      ['text-center', 'rounded', 'text-white', 'p-1'],
      [{ prop: 'id', value: 'city-name' }],
    );
    const innerContainer = DOMHelper.createElement('div', [
      'd-flex',
      'justify-content-between',
      'align-items-center',
      'w-100',
      'h-50',
    ]);
    const fahrenheit = this.renderDegree('fahrenheit');
    const celsius = this.renderDegree('celsius');

    container.style.visibility = 'hidden';
    innerContainer.append(fahrenheit, celsius);
    container.append(cityName, innerContainer);

    return container;
  }

  renderIconContainer() {
    const container = DOMHelper.createElement(
      'div',
      [
        'col-4',
        'd-flex',
        'flex-column',
        'justify-content-center',
        'align-items-end',
      ],
      [{ prop: 'id', value: 'icon' }],
    );

    const info = DOMHelper.createElement(
      'h4',
      ['text-center', 'rounded', 'text-white', 'p-1'],
      [{ prop: 'id', value: 'weather-desc' }],
    );

    const img = DOMHelper.createElement('img', null, [{ prop: 'id', value: 'weather-icon' }]);

    container.style.visibility = 'hidden';
    container.append(info, img);

    return container;
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
    const spinner = new Spinner('weather').render();

    row.append(spinner, this.renderDegreeContainer(), this.renderIconContainer());
    container.appendChild(row);

    return container;
  }
}
