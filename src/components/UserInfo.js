export class UserInfo {
  constructor({
    nameSelector,
    titleSelector
  }) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
    this._popupName = document.querySelector('.popup__input-el[name*=profile-name]');
    this._popupTitle = document.querySelector('.popup__input-el[name*=profile-job]');
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      title: this._title.textContent
    };
  }

  setUserInfo({name, title}) {
    this._name.textContent = name;
    this._title.textContent = title;
  }
}