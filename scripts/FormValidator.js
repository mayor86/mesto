export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _getForm() {
    const formElement = document.querySelector(this._formElement);

    return formElement;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })

    this._setEventListeners();

    return this._formElement;
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', 'true')
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled')
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
}