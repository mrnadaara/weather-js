import ImagesLoaded from 'imagesloaded';
import { DOMHelper } from '../../../helpers';
import BGImage from './bgImage';
import Spinner from './spinner';

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

  render() {
    const container = DOMHelper.createElement('div', [
      'container-fluid',
      'no-padding',
      'h-75',
      'w-100',
      'bg-white',
      'rounded',
    ], [{ prop: 'id', value: 'city' }]);
    const p = DOMHelper.createElement('p', ['heading']);
    const bgImage = new BGImage().render();

    p.textContent = 'HEEEEEEYYYYY';
    bgImage.appendChild(p);
    container.appendChild(bgImage);

    return container;
  }
}
