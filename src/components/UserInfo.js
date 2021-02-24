export class UserInfo {
  constructor({
    nameSelector,
    titleSelector
  }) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      title: this._title.textContent
    };
  }

  setUserInfo({
    name,
    title
  }) {
    this._name.textContent = name;
    this._title.textContent = title;
  }

  setId(userId) {
    this._userId = userId;
  }

  getId() {
    return this._userId;
  }
}