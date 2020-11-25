const editButton = document.querySelector('.profile__edit-button');
const titleProfileNode = document.querySelector('.profile__title');
const subtitleProfileNode = document.querySelector('.profile__subtitle');
const submitFormNode = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close-button');

// слушатели
editButton.addEventListener('click', showPopup);
submitFormNode.addEventListener('submit', setProfileData);
closeButton.addEventListener('click', () => document.querySelector('.popup').classList.remove('popup_opened'));

// функции
function showPopup () {
  document.querySelector('.popup__name').value = titleProfileNode.textContent;
  document.querySelector('.popup__job').value = subtitleProfileNode.textContent;

  document.querySelector('.popup').classList.add('popup_opened');
}

function setProfileData (evt) {

  evt.preventDefault();

  titleProfileNode.textContent = document.querySelector('.popup__name').value;
  subtitleProfileNode.textContent = document.querySelector('.popup__job').value;

  document.querySelector('.popup').classList.remove('popup_opened');
}