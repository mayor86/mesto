export class UserInfo {
  constructor({
    nameSelector,
    titleSelector,
    avatarSelector
  }) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      title: this._title.textContent
    };
  }

  setUserInfo({
    name,
    about,
    avatar,
    _id
  }) {
    this._name.textContent = name;
    this._title.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }

  setId(userId) {
    this._userId = userId;
  }

  getId() {
    return this._userId;
  }
}