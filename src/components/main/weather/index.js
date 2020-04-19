import { DOMHelper } from '../../../helpers';
import Spinner from '../spinner';
import Error from '../error';

export default class Weather {
  static convertKelvin(temp) {
    const c = Math.round(temp - 273.15);
    const f = Math.round(c * 1.8 + 32);

    return { f, c };
  }

  static toggleDegree(active, prev) {
    const degreeInfo = document.getElementById('degree-info');
    const button = document.getElementById(`${active}-toggle`);
    const prevButton = document.getElementById(`${prev}-toggle`);

    button.classList.remove('btn-secondary');
    button.classList.add('btn-primary');

    prevButton.classList.remove('btn-primary');
    prevButton.classList.add('btn-secondary');

    degreeInfo.firstChild.textContent = `${button.data}°`;
    degreeInfo.lastChild.textContent = active;
  }

  static updateWeather({ name, main, weather }) {
    const { f, c } = this.convertKelvin(main.temp);
    const degreeInfo = document.getElementById('degree-info');
    const fahrenheitToggle = document.getElementById('fahrenheit-toggle');
    const celsiusToggle = document.getElementById('celsius-toggle');
    const city = document.getElementById('city-name');
    const degree = document.getElementById('degree');
    const spinner = document.getElementById('spinnerweather');
    const icon = document.getElementById('icon');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherInfo = document.getElementById('weather-desc');

    city.textContent = name;
    degreeInfo.firstChild.textContent = `${c}°`;
    degreeInfo.lastChild.textContent = 'celsius';

    fahrenheitToggle.data = f.toString();
    celsiusToggle.data = c.toString();

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

  renderDegree() {
    const container = DOMHelper.createElement(
      'div',
      ['h-100'],
      [{ prop: 'id', value: 'degree-info' }],
    );

    const degree = DOMHelper.createElement('h2');
    const typeElement = DOMHelper.createElement('h2');
    container.append(degree, typeElement);

    return container;
  }

  renderToggleButton(active, type, symbol) {
    const button = DOMHelper.createElement(
      'button',
      ['btn'],
      [
        { prop: 'id', value: `${type}-toggle` },
        { prop: 'data', value: '0' },
      ],
    );

    if (active) {
      button.classList.add('btn-primary');
    } else {
      button.classList.add('btn-secondary');
    }

    button.textContent = symbol;

    return button;
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
    const toggleDegree = DOMHelper.createElement('div', [
      'd-flex',
      'justify-content-between',
    ]);
    const titleContainer = DOMHelper.createElement('div', [
      'd-flex',
      'justify-content-between',
      'w-100',
    ]);
    const innerContainer = DOMHelper.createElement('div', [
      'd-flex',
      'justify-content-start',
      'align-items-center',
      'w-100',
      'h-50',
    ]);
    const fahrenheitToggle = this.renderToggleButton(false, 'fahrenheit', 'F°');
    const celsiusToggle = this.renderToggleButton(true, 'celsius', 'C°');

    container.style.visibility = 'hidden';
    toggleDegree.append(celsiusToggle, fahrenheitToggle);
    titleContainer.append(cityName, toggleDegree);
    innerContainer.append(this.renderDegree());
    container.append(titleContainer, innerContainer);

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
