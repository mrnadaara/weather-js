import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app.css';
import Components from './components';
import { Splash, Weather } from './helpers';


// const renderComponents = () => {
//   const container = document.getElementById('content');
//   container.innerText = 'Welcome';
// };

// renderComponents();

const content = new Components();
content.render();

Splash.getImage('new york');
Weather.getWeather(833);