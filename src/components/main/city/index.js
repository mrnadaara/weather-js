import ImagesLoaded from 'imagesloaded';
import { DOMHelper } from '../../../helpers';
import BGImage from './bgImage';
import Spinner from './spinner';
import Search from './search';

export default class City {
  static updateImage(url) {
    const image = document.getElementById('landscape-image');
    const spinner = new Spinner().render();
    image.parentNode.insertBefore(spinner, image);
    image.src = url;
    image.style.visibility = 'hidden';
    const loadedImg = ImagesLoaded(image);
    loadedImg.on('done', () => {
      image.style.visibility = 'visible';
      image.parentNode.removeChild(spinner);
    });
  }

  renderContent() {
    const container = DOMHelper.createElement(
      'div',
      ['container-fluid', 'no-padding', 'h-100', 'w-100'],
      [{ prop: 'id', value: 'landscape-content' }],
    );
    const suggestions = DOMHelper.createElement(
      'div',
      ['no-padding', 'w-50', 'pl-5', 'text-white', 'rounded'],
      [{ prop: 'id', value: 'suggestions' }],
    );
    const form = new Search().render();
    container.appendChild(form);
    container.appendChild(suggestions);

    return container;
  }

  render() {
    const container = DOMHelper.createElement(
      'div',
      [
        'container-fluid',
        'no-padding',
        'h-75',
        'w-100',
        'bg-white',
        'rounded-top',
        'rounded-right',
        'rounded-left',
      ],
      [{ prop: 'id', value: 'city' }],
    );

    const bgImage = new BGImage().render();
    bgImage.appendChild(this.renderContent());
    container.appendChild(bgImage);

    return container;
  }
}
