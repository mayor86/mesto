import '../pages/index.css';
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
import {
  Api
} from '../components/Api.js';
import {
  PopupWithConfirmation
} from '../components/PopupWithConfirmation.js';

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
const popupConfirmationSelector = '.popup-confirmation';
const popupAvatarSelector = '.popup-avatar'
const titleProfileSelector = '.profile__title';
const subTitleProfileSelector = '.profile__subtitle';
const avatarSelector = '.profile__avatar';
const popupNameNode = document.querySelector('.popup__input-el[name*=profile-name]');
const popupJobNode = document.querySelector('.popup__input-el[name*=profile-job]');
const submitFormEditProfileNode = document.querySelector('.popup__container[name*=edit-profile-popup]');
const submitFormAddCardNode = document.querySelector('.popup__container[name*=add-card-popup]');
const submitFormChangeAvatarNode = document.querySelector('.popup__container[name*=avatar-popup]');
const editProfileAvatarButton = document.querySelector('.profile__avatar-edit-button');

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleRemoveButtonClick(cardId, parentElement) {
  popupConfirm.open();
  popupConfirm.setSubmitAction(deleteCard);

  function deleteCard() {
    popupConfirm.setSubmitButtonCaption('Удаление...');
    api.deleteCard(cardId)
      .then((res) => {
        parentElement.remove();
        popupConfirm.close();
        popupConfirm.setSubmitButtonCaption('Да');
      });
  }
}

function handleLikeButtonClick(cardId, card) {
  if (!card.isLikeCard()) {
    api.setCardLike(cardId)
      .then((res) => {
        card.setLikeCount(res.likes.length);
      });
  } else {
    api.setCardDislike(cardId)
      .then((res) => {
        card.setLikeCount(res.likes.length);
      });
  }
}

function createCard(card) {
  const newCard = new Card(card, '#element-item', {
    handleCardClick: handleCardClick,
    userId: userInfo.getId(),
    handleRemoveButtonClick: handleRemoveButtonClick,
    handleLikeButtonClick: handleLikeButtonClick
  });
  return newCard.generateCard();
}

function showAddCardPopup() {
  addCardValidator.resetValidation();
  popupAddCard.open();
}

function showAvatarPopup() {
  popupAvatar.open();
}

function showEditProfilePopup() {
  profileValidator.resetValidation();

  const name = userInfo.getUserInfo().name;
  const title = userInfo.getUserInfo().title;
  popupNameNode.value = name;
  popupJobNode.value = title;

  popupEditProfile.open();
}

function submitPopupEditProfileHandler(data) {
  popupEditProfile.setSubmitButtonCaption('Загрузка...');

  api.sendUserInfo(data["profile-name"], data["profile-job"])
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.setSubmitButtonCaption('Сохранить');
    });
}

function submitPopupAddCardHandler(data) {
  popupAddCard.setSubmitButtonCaption('Создание...');

  api.sendNewCard(data["place-name"], data["link-image"])
    .then((res) => {
      newSection.addItem(createCard(res));

      popupAddCard.close();
      popupAddCard.setSubmitButtonCaption('Создать');
    });
}

function submitPopupAvatarHandler(data) {
  popupAvatar.setSubmitButtonCaption('Сохранение...');

  api.changeAvatar(data["link-avatar"])
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.setSubmitButtonCaption('Сохранить');
    })
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-20', '08a75713-14c9-471a-8b87-7718fd93bdd5');

const newSection = new Section({
  renderer: (item) => {
    newSection.addItem(createCard(item));
  }
}, elementsSelector);

const userInfo = new UserInfo({
  nameSelector: titleProfileSelector,
  titleSelector: subTitleProfileSelector,
  avatarSelector: avatarSelector
});

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, submitPopupAddCardHandler);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, submitPopupEditProfileHandler);
popupEditProfile.setEventListeners();

const popupConfirm = new PopupWithConfirmation(popupConfirmationSelector);
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm(popupAvatarSelector, submitPopupAvatarHandler);
popupAvatar.setEventListeners();

const profileValidator = new FormValidator(config, submitFormEditProfileNode);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, submitFormAddCardNode);
addCardValidator.enableValidation();

const changeAvatarValidator = new FormValidator(config, submitFormChangeAvatarNode);
changeAvatarValidator.enableValidation();

api.getInitialCards()
  .then((initialCards) => {
    newSection.setItems(initialCards.reverse());
    newSection.rendererItems();
  });

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
  })

editButton.addEventListener('click', showEditProfilePopup);
addButton.addEventListener('click', showAddCardPopup);
editProfileAvatarButton.addEventListener('click', showAvatarPopup);