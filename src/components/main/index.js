import { DOMHelper } from '../../helpers';
import City from './city';
import Weather from './weather';

export default class Main {
  constructor() {
    this.city = new City();
    this.weather = new Weather();
  }

  render() {
    const container = DOMHelper.createElement('main', [
      'container-fluid',
      'no-padding',
      'h-75',
      'w-50',
    ]);
    container.append(
      this.city.render(),
      this.weather.render(),
    );

    return container;
  }
}