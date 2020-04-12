// import FlexSearch from 'flexsearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css';
import Components from './components';
// import { Splash, Weather } from './helpers';
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

// Splash.getImage('new york');
// Weather.getWeather(833);