export default class UserInfo {
  constructor({userName, userJob}) {
      this._userName = userName;
      this._userJob = userJob;
      this._nameInput = document.querySelector('.popup__input_type_name');
      this._descriptionInput = document.querySelector('.popup__input_type_description');
  }
  
  getUserInfo() {
    // this._nameInput.value = this._userName.textContent;
    // this._descriptionInput.value = this._userJob.textContent;
    this._userInfo = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    };
    return this._userInfo;
  }
  
  setUserInfo() {
    this._userName.textContent = this._nameInput.value;
    this._userJob.textContent = this._descriptionInput.value;
    // this._userName.textContent = this._nameInput.value;
    // this._userJob.textContent = this._descriptionInput.value;
  }
}