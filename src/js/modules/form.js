import { postData } from "./api";

const forms = document.querySelectorAll('form');

const phoneInputs = document.querySelectorAll('input[name="user_phone"]');
phoneInputs.forEach((input) => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/, '');
    if (input.value.length > 11) {
      input.value = input.value.slice(0, 11);
    }
  });
});

const messages = {
  loading: {
    text: 'Отправка...',
    textColor: '#000',
    bg: 'yellow',
    disabled: true
  },
  success: {
    text: 'Успешно отправлено!',
    textColor: '#fff',
    bg: 'green',
    disabled: false
  },
  failure: {
    text: 'Что-то пошло не так',
    textColor: '#fff',
    bg: 'red',
    disabled: false
  }
};

const element = document.createElement('div');
const createMessage = ({text, textColor, bg, disabled}, form, seconds) => {
  element.style.cssText = `
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: ${bg};
    font-size: 30px;
    text-align: center;
    color: ${textColor};
  `;
  element.textContent = text;
  document.body.append(element);
  if (disabled) {
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
  }
  if (seconds) {
    setTimeout(() => {
      element.remove();
    }, seconds*1000);
  }
};

const removeMessage = (form) => {
  element.remove();
  const btn = form.querySelector('button');
  btn.disabled = false;
  btn.style = '';
};

forms.forEach((form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createMessage(messages.loading, form);
    const formData = new FormData(form);
    const jsonObj = JSON.stringify(Object.fromEntries(formData.entries()));
    postData('http://localhost:3000/requests', jsonObj)
      .then(() => {
        removeMessage(form);
        createMessage(messages.success, form, 5);
        form.reset();
      })
      .catch(()=> {
        removeMessage(form);
        createMessage(messages.failure, form, 5);
      });
  });
});
