const openpopup = document.querySelector('.profile__edit');
const closepopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

let formelement = document.querySelector('.popup__content')
let nameinput = document.querySelector('.popup__input_name_pp');
let jobinput = document.querySelector('.popup__input_description_pp');
let buttonsave = document.querySelector('.popup__save');
let profilename = document.querySelector('.profile__info-name');
let profilejob = document.querySelector('.profile__info-description');

function openPopup() {
    popup.classList.add('popup_opened')
    nameinput.value = profilename.textContent;
    jobinput.value = profilejob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

openpopup.addEventListener('click', openPopup);
closepopup.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profilename.textContent = nameinput.value;
    profilejob.textContent = jobinput.value;
    closePopup(popup);
}

formelement.addEventListener('submit', formSubmitHandler);