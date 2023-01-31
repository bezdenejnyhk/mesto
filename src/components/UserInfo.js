export default class UserInfo {
  constructor({userName, userJob, userAvatar}) {
      this._userName = document.querySelector(userName);
      this._userJob = document.querySelector(userJob);
      this._userAvatar = document.querySelector(userAvatar);
  }
  
  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._userAvatar.src
    };

    return userInfo;
  }
  
  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userJob.textContent = userData.about;
    this._userAvatar.src = userData.avatar;
  }
}