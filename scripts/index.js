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

function showPopup(evt) {
  const popup = evt.target.popup;

  if (popup === popupParentEditProfile) {
    popupNameNode.value = titleProfileNode.textContent;
    popupJobNode.value = subtitleProfileNode.textContent;
  }

  if (popup === popupParentAddCard) {
    popupPlaceNode.value = '';
    popupLinkNode.value = '';
  }

  popup.classList.add('popup_opened');
}

function showImagePopup(evt) {
  const currentImageNode = evt.target;
  popupImageTitleNode.textContent = currentImageNode.nextElementSibling.firstElementChild.textContent;
  popupImageNode.src = currentImageNode.src;
  popupImageNode.alt = currentImageNode.alt;

  popupParentImageNode.classList.add('popup_opened');
}

function removeCard(evt) {
  const currentElementItemNode = evt.target.parentElement;
  currentElementItemNode.remove();
}

function closePopup(evt) {
  const popup = evt.target.popup;
  popup.classList.remove('popup_opened');
}

function submitPopupEditProfileHandler(evt) {
  evt.preventDefault();

  titleProfileNode.textContent = popupNameNode.value;
  subtitleProfileNode.textContent = popupJobNode.value;

  closePopup(evt);
}

function submitPopupAddCardHandler(evt) {
  evt.preventDefault();

  const newCard = {};
  newCard.name = popupPlaceNode.value;
  newCard.link = popupLinkNode.value;

  addCard(createCard(newCard));
  closePopup(evt);
}

// инициализация дефолтных карточек
initialCards.forEach(card => {
  addCard(createCard(card));
})

// слушатели
editButton.addEventListener('click', showPopup);
editButton.popup = popupParentEditProfile;

addButton.addEventListener('click', showPopup);
addButton.popup = popupParentAddCard;

popupImageCloseBtn.addEventListener('click', closePopup);
popupImageCloseBtn.popup = popupParentImageNode;

popupEditProfileCloseBtn.addEventListener('click', closePopup);
popupEditProfileCloseBtn.popup = popupParentEditProfile;

popupAddCardCloseBtn.addEventListener('click', closePopup);
popupAddCardCloseBtn.popup = popupParentAddCard;

submitFormEditProfileNode.addEventListener('submit', submitPopupEditProfileHandler);
submitFormEditProfileNode.popup = popupParentEditProfile;

submitFormAddCardNode.addEventListener('submit', submitPopupAddCardHandler);
submitFormAddCardNode.popup = popupParentAddCard;