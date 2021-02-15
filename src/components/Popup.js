export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscCloseBindings = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscCloseBindings);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscCloseBindings);
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (evt) => {
      this._handleClickOverlay(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOverlay(evt) {
    if (evt.currentTarget === evt.target) {
      this.close();
    }
  }
}