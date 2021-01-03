const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-el',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: '.popup__input-el_type_error',
  errorClass: 'popup__input-el-error_active'
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'true')
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, config);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
 

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config); // проверка элемента на валидность
      toggleButtonState(inputList, formElement.querySelector(config.submitButtonSelector), config); // доступность кнопки submit
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault(); // отменяем стандартное поведение
    });
    
    setEventListeners(formElement, config);
  });
};

enableValidation(config); // вызов enableValidation