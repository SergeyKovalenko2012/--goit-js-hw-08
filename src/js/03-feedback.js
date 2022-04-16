import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.email;
const message = form.message;

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', function(evt) {
  if (email.value === '') {
    alert('Всі поля мають бути заповнені!');
    return;
  }
  if (message.value === '') {
    alert('Всі поля мають бути заповнені!');
    return;
  }
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
});
message.addEventListener('input', throttle(onTextereaInput, 500));
popularMessage();

function onTextereaInput(evt) {
  const data = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function popularMessage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    console.log(savedMessage);
    const data = JSON.parse(savedMessage);
    email.value = data.email;
    message.value = data.message;
  }
}
