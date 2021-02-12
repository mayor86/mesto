import Popup from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this._submitFormHandler = () => {
      submitFormHandler(this._getInputValues());
      this.close();
    }
    this._submitFormHandlerBinding = this._submitFormHandler.bind(this);
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll('.popup__input-el');
    const inputValues = {};
    inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    super.close();
    this._form.reset();
    this._form.removeEventListener('submit', this._submitFormHandlerBinding);
  }
  setEventListeners() {
    super.setEventListeners();

    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt);
    });

    this._form.addEventListener('submit', this._submitFormHandlerBinding);
  }
}