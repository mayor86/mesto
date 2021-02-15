import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._image = this._popup.querySelector('.popup-image__image');
    this._title = this._popup.querySelector('.popup-image__title');
  }

  open(cardName, cardLink) {
    this._title.textContent = cardName;
    this._image.src = cardLink;
    this._image.alt = cardName;

    super.open();
  }

}