import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._name = name;
    this._link = link;
    this._image = this._popup.querySelector('.popup-image__image');
    this._title = this._popup.querySelector('.popup-image__title');
  }

  open() {
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    super.open();
  }

}