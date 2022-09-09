const openPopap = document.querySelector('.profile__edit');
const closePopap = document.querySelector('.popap__close');
const Popap = document.querySelector('.overlay');

let formElement = document.querySelector('.profile__edit')
let nameInput = document.querySelector('.popap__name');
let jobInput = document.querySelector('.popap__description');
let buttonSave = document.querySelector('.popap__save');
let Name = document.querySelector('.profile__info-name');
let Job = document.querySelector('.profile__info-description');

openPopap.addEventListener('click', () => {
    Popap.classList.add('opened');
})

closePopap.addEventListener('click', () => {
    Popap.classList.remove('opened');
})


function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value
    console.log(nameInput.value);
    console.log(jobInput.value);

    // Выберите элементы, куда должны быть вставлены значения полей
    let editName = nameInput.value;
    let editJob = jobInput.value;
    // Вставьте новые значения с помощью textContent
    editName.textContent = nameInput.value;
    editJob.textContent = jobInput.value;
}

buttonSave.addEventListener('click', function(evt) {
    evt.preventDefault();
    Name.textContent = nameInput.value;
    Job.textContent = jobInput.value;
    Popap.classList.remove('opened');
})


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
