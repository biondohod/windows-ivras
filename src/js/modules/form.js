import { postData } from "./api";
import { checkNumInputs } from "./utils";
import { modalState, resetCalcForm } from "./calc";

const forms = document.querySelectorAll('form');

checkNumInputs('input[name="user_phone"]');

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

const postForm = (evt, form, state) =>{
  evt.preventDefault();
    createMessage(messages.loading, form);
    const formData = new FormData(form);
    if (form.getAttribute('data-calc') === 'end') {
      for (let key in state) {
        formData.append(key, state[key]);
      }
    }
    const jsonObj = JSON.stringify(Object.fromEntries(formData.entries()));
    postData('http://localhost:3000/requests', jsonObj)
      .then((data) => {
        if (!data.ok) {
          postData.reject();
        }
        removeMessage(form);
        createMessage(messages.success, form, 5);
        form.reset();
      })
      .then(() => {
        if (form.getAttribute('data-calc') === 'end') {
          resetCalcForm();
        }
      })
      .catch(()=> {
        removeMessage(form);
        createMessage(messages.failure, form, 5);
      });
};

forms.forEach((form) => {
  form.addEventListener('submit', (evt) => postForm(evt, form, modalState));
});

