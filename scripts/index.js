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
const popupImagePhoto = popupParentImageNode.querySelector('.popup-image__image');
const popupImageTitle = popupParentImageNode.querySelector('.popup-image__title')

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

function handleCardClick(name, link) {
  popupImageTitle.textContent = name;
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;

  showPopup(popupParentImageNode);
}

function createCard(card) {
  const newCard = new Card(card, '#element-item', handleCardClick);
  
  return newCard.generateCard();
}

function addCard(card) {
  elements.prepend(card);
}

function showAddCardPopup() {
  addCardValidator.resetValidation();
  showPopup(popupParentAddCard);
}

function showEditProfilePopup() {
  profileValidator.resetValidation();

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

// инициализация дефолтных карточек
initialCards.forEach(card => {
  const newCard = createCard(card);

  addCard(newCard);
})

// валидация форм
const profileValidator = new FormValidator(config, submitFormEditProfileNode);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, submitFormAddCardNode);
addCardValidator.enableValidation();

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