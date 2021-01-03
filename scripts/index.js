const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const elements = document.querySelector('.elements');
const popupParentAddCard = document.querySelector('.popup-add-card');
const popupParentEditProfile = document.querySelector('.popup-edit-profile');
const popupParentImageNode = document.querySelector('.popup-image');
const popupImageNode = document.querySelector('.popup-image__image');
const popupImageTitleNode = document.querySelector('.popup-image__title');
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

// функции
function showPopup(popup) {
  //Валидация кнопки при открытии попапа
  if (popup !== popupParentImageNode) {
    toggleButtonState(Array.from(popup.querySelectorAll('.popup__input-el')), popup.querySelector('.popup__submit-button'), config);
  }
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keyup', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keyup', closePopupEsc); // удаляем слушатель
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

function createCard(card) {
  const templateElementItem = document.querySelector('#element-item').content;
  const elementItem = templateElementItem.cloneNode(true);
  const elementTitle = elementItem.querySelector('.elements__title');
  const elementPhoto = elementItem.querySelector('.elements__photo');
  const elementLike = elementItem.querySelector('.elements__like');
  const elementTrash = elementItem.querySelector('.elements__remove-item');

  elementTitle.textContent = card.name;
  elementPhoto.alt = `Фото: ${card.name}`;
  elementPhoto.src = card.link;

  elementLike.addEventListener('click', setLikeHandler);
  elementTrash.addEventListener('click', removeCard);
  elementPhoto.addEventListener('click', showImagePopup);

  return elementItem;
}

function addCard(card) {
  elements.prepend(card);
}

function setLikeHandler(evt) {
  evt.target.classList.toggle('popup__like_checked');
}

function showImagePopup(evt) {
  const currentImageNode = evt.target;
  popupImageTitleNode.textContent = currentImageNode.nextElementSibling.firstElementChild.textContent;
  popupImageNode.src = currentImageNode.src;
  popupImageNode.alt = currentImageNode.alt;

  showPopup(popupParentImageNode);
}

function showAddCardPopup() {
  const formElement = popupParentAddCard.querySelector('.popup__container');

  formElement.reset(); // сброс значений
  hideInputError(formElement, popupPlaceNode, config);
  hideInputError(formElement, popupLinkNode, config);

  showPopup(popupParentAddCard);
}

function showEditProfilePopup() {
  const formElement = popupParentEditProfile.querySelector('.popup__container');

  popupNameNode.value = titleProfileNode.textContent;
  popupJobNode.value = subtitleProfileNode.textContent;

  hideInputError(formElement, popupNameNode, config);
  hideInputError(formElement, popupJobNode, config);

  showPopup(popupParentEditProfile);
}

function removeCard(evt) {
  const currentElementItemNode = evt.target.parentElement;
  currentElementItemNode.remove();
}

function submitPopupEditProfileHandler(evt) {
  titleProfileNode.textContent = popupNameNode.value;
  subtitleProfileNode.textContent = popupJobNode.value;

  closePopup(popupParentEditProfile);
}

function submitPopupAddCardHandler(evt) {
  const newCard = {};
  newCard.name = popupPlaceNode.value;
  newCard.link = popupLinkNode.value;

  addCard(createCard(newCard));
  closePopup(popupParentAddCard);
}

// инициализация дефолтных карточек
initialCards.forEach(card => {
  addCard(createCard(card));
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