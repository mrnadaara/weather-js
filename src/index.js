import FlexSearch from 'flexsearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './assets/css/app.css';
import Components from './components';
import City from './components/main/city';
import WeatherComponent from './components/main/weather';
import { Splash, Weather, DOMHelper } from './helpers';
import CityList from './assets/city.list.json';

const index = new FlexSearch({
  encode: 'icase',
  tokenize: 'full',
  cache: true,
  doc: {
    id: 'id',
    field: 'name',
  },
});

index.add(CityList);

const initializeAutocomplete = () => {
  const suggestions = document.getElementById('suggestions');
  const userinput = document.getElementById('search');
  const form = document.getElementById('searchForm');
  const cityId = document.getElementById('cityId');

  function showResults() {
    const { value } = this;
    const results = index.search({
      limit: 5,
      query: value,
      field: 'name',
      suggest: true,
    });
    let entry = suggestions.childNodes;
    const childs = suggestions.childNodes;
    let i = 0;
    const len = results.length;

    for (; i < len; i++) {
      entry = childs[i];

      if (!entry) {
        entry = DOMHelper.createElement('div', ['rounded', 'pl-1']);
        suggestions.appendChild(entry);
      }

      entry.textContent = `${results[i].name}, ${results[i].country}`;
      entry.id = results[i].id;
    }

    while (childs.length > len) {
      suggestions.removeChild(childs[i]);
    }

    userinput.value = userinput.current = value;
  }

  function acceptSuggestion(event) {
    const { target } = event || window.event;

    userinput.value = userinput.value = target.textContent;
    cityId.value = target.id;

    while (suggestions.lastChild) {
      suggestions.removeChild(suggestions.lastChild);
    }

    return false;
  }

  function searchCity(e) {
    e.preventDefault();

    WeatherComponent.showSpinner();
    while (suggestions.lastChild) {
      suggestions.removeChild(suggestions.lastChild);
    }

    const city = cityId.value === '' ? userinput.value : Number(cityId.value);
    const imageSearch = cityId.value === '' ? userinput.value : userinput.value.match(/\w+/);
    const image = Splash.getImage(imageSearch);
    const weather = Weather.getWeather(city, cityId.value !== '');

    Promise.all([weather, image]).then(
      (results) => {
        const weatherResult = results[0];
        WeatherComponent.updateWeather(weatherResult);
        const imageResult = results[1].results;
        if (imageResult.length !== 0) {
          City.updateImage(
            `${imageResult[0].urls.full}#${new Date().getTime()}`,
          );
        }
      },
      (err) => {
        WeatherComponent.showError(err);
      },
    );

    cityId.value = '';
  }

  userinput.addEventListener('input', showResults, true);
  suggestions.addEventListener('click', acceptSuggestion, true);
  form.addEventListener('submit', searchCity, true);
};

const initializeToggle = () => {
  const fahrenheitToggle = document.getElementById('fahrenheit-toggle');
  const celsiusToggle = document.getElementById('celsius-toggle');

  fahrenheitToggle.addEventListener('click', () => WeatherComponent.toggleDegree('fahrenheit', 'celsius'));
  celsiusToggle.addEventListener('click', () => WeatherComponent.toggleDegree('celsius', 'fahrenheit'));
};

const content = new Components();
content.render();

if (document.readyState === 'complete') {
  initializeAutocomplete();
  initializeToggle();
  Weather.getWeather(53654, true).then((result) => {
    WeatherComponent.updateWeather(result);
  });
} else {
  window.addEventListener('load', () => {
    initializeAutocomplete();
    initializeToggle();
    Weather.getWeather(53654, true).then((result) => {
      WeatherComponent.updateWeather(result);
    });
  });
}
