const editButton = document.querySelector('.profile__edit-button');
const titleProfileNode = document.querySelector('.profile__title');
const subtitleProfileNode = document.querySelector('.profile__subtitle');
const submitFormNode = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close-button');
const popupNode = document.querySelector('.popup');
const popupNameNode = document.querySelector('.popup__input-el[name*=profile-name]');
const popupJobNode = document.querySelector('.popup__input-el[name*=profile-job]');

// функции
function showPopup() {
  popupNameNode.value = titleProfileNode.textContent;
  popupJobNode.value = subtitleProfileNode.textContent;

  popupNode.classList.add('popup_opened');
}

function setProfileData(evt) {

  evt.preventDefault();

  titleProfileNode.textContent = popupNameNode.value;
  subtitleProfileNode.textContent = popupJobNode.value;

  popupNode.classList.remove('popup_opened');
}

function closePopup() {
  popupNode.classList.remove('popup_opened');
}

// слушатели
editButton.addEventListener('click', showPopup);
submitFormNode.addEventListener('submit', setProfileData);
closeButton.addEventListener('click', closePopup);
