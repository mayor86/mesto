import '../pages/index.css';
import {
  initialCards
} from './initial-cards.js';
import {
  Card
} from '../components/Card.js';
import {
  FormValidator
} from '../components/FormValidator.js';
import {
  Section
} from '../components/Section.js';
import {
  PopupWithImage
} from '../components/PopupWithImage.js';
import {
  PopupWithForm
} from '../components/PopupWithForm.js';
import {
  UserInfo
} from '../components/UserInfo.js';

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
const elementsSelector = '.elements';
const popupAddCardSelector = '.popup-add-card';
const popupEditProfileSelector = '.popup-edit-profile';
const popupImageSelector = '.popup-image';
const titleProfileSelector = '.profile__title';
const subTitleProfileSelector = '.profile__subtitle';
const popupNameNode = document.querySelector('.popup__input-el[name*=profile-name]');
const popupJobNode = document.querySelector('.popup__input-el[name*=profile-job]');
const submitFormEditProfileNode = document.querySelector('.popup__container[name*=edit-profile-popup]');
const submitFormAddCardNode = document.querySelector('.popup__container[name*=add-card-popup]');

function resetValidation(formElement) {
  const formValidatorElement = new FormValidator(config, formElement);
  formValidatorElement.resetValidation();
}

function handleCardClick(name, link) {
  const popupImage = new PopupWithImage(popupImageSelector, name, link);
  popupImage.open();
  popupImage.setEventListeners();
}

function createCard(card) {
  const newCard = new Card(card, '#element-item', handleCardClick);

  return newCard.generateCard();
}

function showAddCardPopup() {
  addCardValidator.resetValidation();
  popupAddCard.setEventListeners();
  popupAddCard.open();
}

function showEditProfilePopup() {
  profileValidator.resetValidation();

  const name = userInfo.getUserInfo().name;
  const title = userInfo.getUserInfo().title;
  popupNameNode.value = name;
  popupJobNode.value = title;

  popupEditProfile.setEventListeners();
  popupEditProfile.open();
}

function submitPopupEditProfileHandler(data) {
  userInfo.setUserInfo({
    name: data["profile-name"],
    title: data["profile-job"]
  });
}

function submitPopupAddCardHandler(data) {
  const card = {};
  card.name = data["place-name"];
  card.link = data["link-image"];

  newSection.addItem(createCard(card));

  popupAddCard.close();
}

const newSection = new Section({
  items: initialCards,
  renderer: (item) => {
    newSection.addItem(createCard(item));
  }
}, elementsSelector);

newSection.rendererItems();

const userInfo = new UserInfo({
  nameSelector: titleProfileSelector,
  titleSelector: subTitleProfileSelector
});

const popupAddCard = new PopupWithForm(popupAddCardSelector, submitPopupAddCardHandler);
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitPopupEditProfileHandler);

const profileValidator = new FormValidator(config, submitFormEditProfileNode);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, submitFormAddCardNode);
addCardValidator.enableValidation();

editButton.addEventListener('click', showEditProfilePopup);
addButton.addEventListener('click', showAddCardPopup);