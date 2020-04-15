import ImagesLoaded from 'imagesloaded';
import { DOMHelper } from '../../../helpers';
import DefaultImage from '../../../assets/images/moga.jpg';
import Spinner from './spinner';

export default class BGImage {
  constructor() {
    this.image = DefaultImage;
  }

  render() {
    const container = DOMHelper.createElement(
      'div',
      [
        'no-padding',
        'h-100',
        'w-100',
        'rounded-top',
        'rounded-right',
        'rounded-left',
      ],
      [{ prop: 'id', value: 'landscape-container' }],
    );

    const img = DOMHelper.createElement(
      'img',
      ['no-padding', 'h-100', 'w-100', 'rounded'],
      [
        { prop: 'src', value: this.image },
        { prop: 'id', value: 'landscape-image' },
      ],
    );

    const spinner = new Spinner().render();
    container.appendChild(spinner);

    img.style.visibility = 'hidden';

    const loadedImg = ImagesLoaded(img);
    loadedImg.on('done', () => {
      img.style.visibility = 'visible';
      img.parentNode.removeChild(spinner);
    });
    container.appendChild(img);

    return container;
  }
}