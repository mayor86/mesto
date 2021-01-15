export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(config.inputSelector);
    this._submitButtonSelector = this._formElement.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })

    this._setEventListeners();

    return this._formElement;
  }

  resetValidation() {
    this._formElement.reset();
    
    const inputList = Array.from(this._inputList);
    inputList.forEach(inputElement => {
      inputElement.classList.remove(this._inputErrorClass);
      inputElement.nextElementSibling.classList.remove(this._errorClass);
      inputElement.nextElementSibling.textContent = '';
    })

    this._toggleButtonState(inputList);
  }

  _setEventListeners() {
    const inputList = Array.from(this._inputList);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }

  _isValid(inputElement) {
    //   const inputElement
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButtonSelector.setAttribute('disabled', 'true')
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButtonSelector.removeAttribute('disabled')
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    }
  }
}