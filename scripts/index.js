import {
  initialCards
} from './initial-cards.js';
import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';

const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-el',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: '.popup__input-el_type_error',
  errorClass: 'popup__input-el-error_active'
}

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const elements = document.querySelector('.elements');
const popupParentAddCard = document.querySelector('.popup-add-card');
const popupParentEditProfile = document.querySelector('.popup-edit-profile');
const popupParentImageNode = document.querySelector('.popup-image');
const popupImageCloseBtn = document.querySelector('.popup-image__close-button');
const popupEditProfileCloseBtn = document.querySelector('.popup-edit-profile__close-button');
const popupAddCardCloseBtn = document.querySelector('.popup-add-card__close-button');
const titleProfileNode = document.querySelector('.profile__title');
const subtitleProfileNode = document.querySelector('.profile__subtitle');
const popupNameNode = document.querySelector('.popup__input-el[name*=profile-name]');
const popupJobNode = document.querySelector('.popup__input-el[name*=profile-job]');
const popupPlaceNode = document.querySelector('.popup__input-el[name*=place-name]');
const popupLinkNode = document.querySelector('.popup__input-el[name*=link-image]');
const submitFormEditProfileNode = document.querySelector('.popup__container[name*=edit-profile-popup]');
const submitFormAddCardNode = document.querySelector('.popup__container[name*=add-card-popup]');
const popupImagePhoto = document.querySelector('.popup-image__image');

// функции
function showPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keyup', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keyup', closePopupEsc);
}

function closePopupOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function resetValidation(formElement) {
  const formValidatorElement = new FormValidator(config, formElement);
  formValidatorElement.resetValidation();
}

function createCard(card) {
  const newCard = new Card(card, '#element-item');

  return newCard.generateCard();
}

function addCard(card) {
  elements.prepend(card);
}

function showAddCardPopup() {
  const formElement = popupParentAddCard.querySelector('.popup__container');

  resetValidation(formElement);
  showPopup(popupParentAddCard);
}

function showEditProfilePopup() {
  const formElement = popupParentEditProfile.querySelector('.popup__container');

  resetValidation(formElement);
  popupNameNode.value = titleProfileNode.textContent;
  popupJobNode.value = subtitleProfileNode.textContent;
  showPopup(popupParentEditProfile);
}

function submitPopupEditProfileHandler(evt) {
  titleProfileNode.textContent = popupNameNode.value;
  subtitleProfileNode.textContent = popupJobNode.value;

  closePopup(popupParentEditProfile);
}

function submitPopupAddCardHandler(evt) {
  const card = {};
  card.name = popupPlaceNode.value;
  card.link = popupLinkNode.value;

  addCard(createCard(card));

  closePopup(popupParentAddCard);
}

function handleCardClick(card) {
  document.querySelector('.popup-image__title').textContent = card.querySelector('.elements__title').textContent;
  popupImagePhoto.src = card.querySelector('.elements__photo').src;
  popupImagePhoto.alt = card.querySelector('.elements__photo').alt;

  document.querySelector('.popup-image').classList.add('popup_opened');
}

// инициализация дефолтных карточек
initialCards.forEach(card => {
  const newCard = createCard(card);
  newCard.addEventListener('click', function () {
    handleCardClick(newCard);
  });

  addCard(newCard);
})

// валидация формы
const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach(formElement => {
  const formValidatorElement = new FormValidator(config, formElement);
  formValidatorElement.enableValidation();
})

// слушатели
editButton.addEventListener('click', showEditProfilePopup);
addButton.addEventListener('click', showAddCardPopup);
submitFormEditProfileNode.addEventListener('submit', submitPopupEditProfileHandler);
submitFormAddCardNode.addEventListener('submit', submitPopupAddCardHandler);

popupImageCloseBtn.addEventListener('click', function () {
  closePopup(popupParentImageNode);
});

popupEditProfileCloseBtn.addEventListener('click', function () {
  closePopup(popupParentEditProfile);
});

popupAddCardCloseBtn.addEventListener('click', function () {
  closePopup(popupParentAddCard);
});