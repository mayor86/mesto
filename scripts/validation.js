const validationObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-el',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-el_type_error',
  errorClass: 'popup__error_visible'
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'true')
    buttonElement.classList.add('popup__submit-button_disabled');
  } else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove('popup__submit-button_disabled');
  }
};  

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input-el_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-el-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input-el_type_error');
  errorElement.classList.remove('popup__input-el-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, errorMessage) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, errorMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach(formElement => {
  
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, inputElement.validationMessage);
        toggleButtonState(inputList, formElement.querySelector(obj.submitButtonSelector));
      })
    });
  })
};

enableValidation(validationObj);