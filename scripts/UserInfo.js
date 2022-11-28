export default class UserInfo {
    constructor({userName, userJob}) {
      this._userName = userName;
      this._userJob = userJob;
    }
  
    getUserInfo() {
      this._userInfo = {
        userName: this._userName.textContent,
        userJob: this._userJob.textContent
      };
      return this._userInfo;
    }
  
    setUserInfo(data) {
      this._userName.textContent = data.nameInput;
      this._userJob.textContent = data.descriptionInput;
    }
  }