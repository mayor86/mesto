const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const elements = document.querySelector('.elements');
const popupParentAddCard = document.querySelector('.popup-add-card');
const popupParentEditProfile = document.querySelector('.popup-edit-profile');
const popupParentImageNode = document.querySelector('.popup-image');
const popupImageNode = document.querySelector('.popup-image__image');
const popupImageTitleNode = document.querySelector('.popup-image__title');
const popupImageCloseBtn = document.querySelector('.popup-image__close-button');
const popupCloseBtns = document.querySelectorAll('.popup__close-button');
const titleProfileNode = document.querySelector('.profile__title');
const subtitleProfileNode = document.querySelector('.profile__subtitle');
const popupNameNode = document.querySelector('.popup__input-el[name*=profile-name]');
const popupJobNode = document.querySelector('.popup__input-el[name*=profile-job]');
const popupPlaceNode = document.querySelector('.popup__input-el[name*=place-name]');
const popupLinkNode = document.querySelector('.popup__input-el[name*=link-image]');
const submitFormNodes = document.querySelectorAll('.popup__container');

initialCards.forEach(card => {
  addCard(createCard(card));
})

// функции
function createCard (card) {
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

function addCard (card) {
  elements.prepend(card);
}

function setLikeHandler(evt) {
  evt.target.classList.toggle('popup__like_checked');
}

function showPopup(evt) {
  window.clickedElId = evt.target.id;

  if (window.clickedElId === 'edit-profile-btn') {
    popupNameNode.value = titleProfileNode.textContent;
    popupJobNode.value = subtitleProfileNode.textContent;
    popupParentEditProfile.classList.add('popup_opened');
  } else if (window.clickedElId === 'add-card-btn') {
    popupPlaceNode.value = '';
    popupLinkNode.value = '';
    popupParentAddCard.classList.add('popup_opened');
  } else { // кликнули по изображению
    popupParentImageNode.classList.add('popup_opened');
  }
}

function showImagePopup(evt) {
  const currentImageNode = evt.target;
  popupImageTitleNode.textContent = currentImageNode.nextElementSibling.firstElementChild.textContent;
  popupImageNode.src = currentImageNode.src;
  popupImageNode.alt = currentImageNode.alt;

  showPopup(evt);
}

function removeCard(evt) {
  const currentElementItemNode = evt.target.parentElement;
  currentElementItemNode.remove();
}

function closePopup(evt) {
  const currentParentNode = evt.target.parentElement.parentElement;
  currentParentNode.classList.remove('popup_opened');
}

function submitPopupHandler(evt) {

  evt.preventDefault();

  if (window.clickedElId === 'edit-profile-btn') {
    titleProfileNode.textContent = popupNameNode.value;
    subtitleProfileNode.textContent = popupJobNode.value;

    popupParentEditProfile.classList.remove('popup_opened');
  }

  if (window.clickedElId === 'add-card-btn') {
    let newCard = {};
    newCard.name = popupPlaceNode.value;
    newCard.link = popupLinkNode.value;
    addCard(createCard(newCard));

    popupParentAddCard.classList.remove('popup_opened');
  }
}

// слушатели
editButton.addEventListener('click', showPopup);
addButton.addEventListener('click', showPopup);
popupImageCloseBtn.addEventListener('click', closePopup);
popupCloseBtns.forEach(btn => {
  btn.addEventListener('click', closePopup);
});

submitFormNodes.forEach(form => {
  form.addEventListener('submit', submitPopupHandler);
});
