export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // формирование шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.elements__title').textContent = this._name;
    this._element.querySelector('.elements__photo').alt = `Фото: ${this._name}`;
    this._element.querySelector('.elements__photo').src = this._link;

    return this._element;
  }

  _setEventListeners() {

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._setLikeHandler();
    });

    this._element.querySelector('.elements__remove-item').addEventListener('click', () => {
      this._removeCard();
    });

    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._showPopup();
    });

  }

  _setLikeHandler() {
    this._element.querySelector('.elements__like').classList.toggle('popup__like_checked');
  }

  _removeCard() {
    this._element.remove();
  }

  _showPopup() {
    document.querySelector('.popup-image__title').textContent = this._element.querySelector('.elements__title').textContent;
    document.querySelector('.popup-image__image').src = this._element.querySelector('.elements__photo').src;
    document.querySelector('.popup-image__image').alt = this._element.querySelector('.elements__photo').alt;

    document.querySelector('.popup-image').classList.add('popup_opened');
  }
}