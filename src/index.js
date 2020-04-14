// import FlexSearch from 'flexsearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css';
import Components from './components';
import City from './components/main/city';
import { Splash, Weather } from './helpers';
// import CityList from './assets/city.list.json';

// const index = new FlexSearch({
//   encode: 'icase',
//   tokenize: 'full',
//   cache: true,
//   doc: {
//     id: 'id',
//     field: 'name',
//   },
// });

// index.add(CityList);

// index.search('moga', {
//   field: 'name',
// }, (result) => {
//   console.log(result);
// });

const content = new Components();
content.render();

Splash.getImage('paris').then(({ results }) => {
  if (results.length !== 0) {
    City.updateImage(`${results[0].urls.full}#${new Date().getTime()}`);
  }
});
// Weather.getWeather(833);