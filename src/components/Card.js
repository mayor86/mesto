export class Card {
  constructor(data, cardSelector, handler) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._hahdleCardClick = handler.handleCardClick;
    this._handleRemoveButtonClick = handler.handleRemoveButtonClick;
    this._handleLikeButtonClick = handler.handleLikeButtonClick;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = handler.userId;
    this._id = data._id;
    this._isLiked = '0';
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
    this._cardLikesCount = this._element.querySelector('.elements__like-count');
    this._removeButton = this._element.querySelector('.elements__remove-item');

    this._setEventListeners();

    this._element.querySelector('.elements__title').textContent = this._name;
    this._cardImage.alt = `Фото: ${this._name}`;
    this._cardImage.src = this._link;
    this._cardLikesCount.textContent = this._likes.length;
    if (this._isMyLiked()) {
      this._setLike();
    }
    this._removeButtonRemove();

    return this._element;
  }

  _setEventListeners() {

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._setLikeHandler();
    });

    this._element.querySelector('.elements__remove-item').addEventListener('click', (evt) => {
      this._handleRemoveButtonClick(this._id, evt.target.parentElement);
    });

    this._cardImage.addEventListener('click', () => {
      this._hahdleCardClick(this._name, this._link);
    })
  }

  _setLikeHandler() {
    this._handleLikeButtonClick(this._id, this);
  }

  _removeCard() {
    this._element.remove();
  }

  _removeButtonRemove() {
    if (!this._isMyCard()) {
      this._removeButton.remove();
    }
  }

  _isMyCard() {
    return this._ownerId === this._userId;
  }

  isLikeCard() {
    return this._element.querySelector('.elements__like').classList.contains('popup__like_checked');
  }

  _isMyLiked() {
    return this._likes.find(like => like._id === this._userId);
  }

  _setLike() {
    this._element.querySelector('.elements__like').classList.add('popup__like_checked');
  }

  setLikeCount(likeCount) {
    this._cardLikesCount = this._element.querySelector('.elements__like-count');
    this._cardLikesCount.textContent = likeCount;
    this._element.querySelector('.elements__like').classList.toggle('popup__like_checked');
  }
}