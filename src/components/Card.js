export class Card {
  constructor(data, cardSelector, hahdleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._hahdleCardClick = hahdleCardClick;
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
    this._cardImage = this._element.querySelector('.elements__photo');

    this._setEventListeners();

    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.alt = `Фото: ${this._name}`;
    this._cardImage.src = this._link;

    return this._element;
  }

  _setEventListeners() {

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._setLikeHandler();
    });

    this._element.querySelector('.elements__remove-item').addEventListener('click', () => {
      this._removeCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._hahdleCardClick(this._name, this._link);
    })

  }

  _setLikeHandler() {
    this._element.querySelector('.elements__like').classList.toggle('popup__like_checked');
  }

  _removeCard() {
    this._element.remove();
  }
}