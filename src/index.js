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
import { Splash, Weather, DOMHelper } from './helpers';
import CityList from './assets/city.list.json';

const index = new FlexSearch({
  encode: 'icase',
  tokenize: 'full',
  cache: true,
});

for (let i = 0; i < CityList.length; i++) {
  index.add(i, CityList[i].name);
}

const initializeAutocomplete = () => {
  const suggestions = document.getElementById('suggestions');
  const userinput = document.getElementById('search');
  const form = document.getElementById('searchForm');
  const cityId = document.getElementById('cityId');

  function showResults() {
    const { value } = this;
    const results = index.search(value, 5);
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

      entry.textContent = CityList[results[i]].name;
      entry.id = CityList[results[i]].id;
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

    const city = cityId.value === '' ? userinput.value : Number(cityId.value);
    const image = Splash.getImage(userinput.value);
    const weather = Weather.getWeather(city, cityId.value !== '');

    Promise.all([weather, image]).then(
      (results) => {
        // const weatherResult = results[0];
        const imageResult = results[1].results;
        if (imageResult.length !== 0) {
          City.updateImage(
            `${imageResult[0].urls.full}#${new Date().getTime()}`,
          );
        }
      },
      (err) => {
        // console.log(err);
      },
    );
  }

  userinput.addEventListener('input', showResults, true);
  suggestions.addEventListener('click', acceptSuggestion, true);
  form.addEventListener('submit', searchCity, true);
};

const content = new Components();
content.render();

if (document.readyState === 'complete') {
  initializeAutocomplete();
  // Weather.getWeather(53654, true).then((result) => {
  //   console.log(result);
  // });
} else {
  window.addEventListener('load', () => {
    initializeAutocomplete();
  });
}
