const editButton = document.querySelector('.profile__edit-button');
const titleProfileNode = document.querySelector('.profile__title');
const subtitleProfileNode = document.querySelector('.profile__subtitle');
const submitFormNode = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close-button');
const popupNode = document.querySelector('.popup');
const popupNameNode = document.querySelector('.popup__input-el[name*=profile-name]');
const popupJobNode = document.querySelector('.popup__input-el[name*=profile-job]');
const popupTitleNode = document.querySelector('.popup__title');
const addButton = document.querySelector('.profile__add-button');
const popupSubmitButton = document.querySelector('.popup__submit-button');
const likeNodes = document.querySelectorAll('.elements__like');
const trashNodes = document.querySelectorAll('.elements__remove-item');
const photoNodes = document.querySelectorAll('.elements__photo');
const popupCardNode = document.querySelector('.popup-card');
const popupCardTitleNode = document.querySelector('.popup-card__title');
const popupCardImageNode = document.querySelector('.popup-card__image');
const closeCardButton = document.querySelector('.popup-card__close-button');

// функции

function showPopup(evt) {
  window.elId = evt.target.id;

  if (window.elId === 'edit-profile-btn') {
    popupNameNode.value = titleProfileNode.textContent;
    popupJobNode.value = subtitleProfileNode.textContent;
    popupSubmitButton.innerText = 'Сохранить';
    popupTitleNode.innerHTML = 'Редактировать профиль';
  }

  if (window.elId === 'add-card-btn') {
    popupTitleNode.innerHTML = 'Новое место';
    popupSubmitButton.innerText = 'Создать';
    popupNameNode.placeholder = 'Название';
    popupJobNode.placeholder = 'Ссылка на картинку';
    popupNameNode.value = '';
    popupJobNode.value = '';
  }

  popupNode.classList.add('popup_opened');
}

function showCardPopup(evt) {
  const currentPhotoNode = evt.target;

  popupCardTitleNode.textContent = currentPhotoNode.nextElementSibling.firstElementChild.textContent;
  popupCardImageNode.src = currentPhotoNode.src;
  popupCardImageNode.alt = currentPhotoNode.alt;

  popupCardNode.classList.add('popup-card_opened');
}

function submitPopupHandler(evt) {

  evt.preventDefault();

  if (window.elId === 'edit-profile-btn') {
    titleProfileNode.textContent = popupNameNode.value;
    subtitleProfileNode.textContent = popupJobNode.value;
  }

  if (window.elId === 'add-card-btn') {
    addCard();
  }

  popupNode.classList.remove('popup_opened');
}


function closePopup() {
  popupNode.classList.remove('popup_opened');
}

function closeCardPopup() {
  popupCardNode.classList.remove('popup-card_opened');
}

function addCard() {
  const templateElementItem = document.querySelector('#element-item').content;
  const elementItem = templateElementItem.cloneNode(true);
  const elementTitle = elementItem.querySelector('.elements__title');
  const elementPhoto = elementItem.querySelector('.elements__photo');
  const elements = document.querySelector('.elements');
  const likeNode = elementItem.querySelector('.elements__like');
  const trashNode = elementItem.querySelector('.elements__remove-item');
  const photoNode = elementItem.querySelector('.elements__photo');

  elementTitle.textContent = popupNameNode.value;
  elementPhoto.alt = `Фото: ${popupNameNode.value}`;
  elementPhoto.src = popupJobNode.value;

  elements.prepend(elementItem);

  likeNode.addEventListener('click', setLikeHandler);
  trashNode.addEventListener('click', removeCard);
  photoNode.addEventListener('click', showCardPopup);
}

function setLikeHandler(evt) {
  evt.target.classList.toggle('popup__like_checked');
}

function removeCard(evt) {
  const currentElementItemNode = evt.target.parentElement;
  currentElementItemNode.remove();
}

// слушатели
editButton.addEventListener('click', showPopup);
addButton.addEventListener('click', showPopup);
submitFormNode.addEventListener('submit', submitPopupHandler);
closeButton.addEventListener('click', closePopup);
closeCardButton.addEventListener('click', closeCardPopup);

likeNodes.forEach(item => {
  item.addEventListener('click', setLikeHandler);
})

trashNodes.forEach(item => {
  item.addEventListener('click', removeCard);
})

photoNodes.forEach(item => {
  item.addEventListener('click', showCardPopup);
})