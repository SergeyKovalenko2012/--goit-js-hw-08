import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

initForm();

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const formData = new FormData(form);
  formData.forEach((value, name) => console.log(value, name));
  localStorage.removeItem(STORAGE_KEY);
  // form.reset();

  const formEl = evt.currentTarget.elements;
  const email = formEl.email.value;
  const message = formEl.message.value;
  if (!email || !message) {
    alert('Всі поля мають бути заповнені!');
    return;
  }

  evt.currentTarget.reset();
});

form.addEventListener('input', throttle(onTextereaInput, 500));

function onTextereaInput(evt) {
  let persistedFilter = localStorage.getItem(STORAGE_KEY);
  persistedFilter = persistedFilter ? JSON.parse(persistedFilter) : {};
  persistedFilter[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedFilter));
}

function initForm() {
  let persistedFilter = localStorage.getItem(STORAGE_KEY);
  if (persistedFilter) {
    persistedFilter = JSON.parse(persistedFilter);
    console.log(persistedFilter);
    Object.entries(persistedFilter).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
