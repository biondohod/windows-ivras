const calcScrollWidth = () => {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const scrollWidth = calcScrollWidth();


class Modal {
  constructor(modalSelector, closeBtnSelector, isCloseBySubstrate, ...triggers) {
    this._modalClass = modalSelector.slice(1);
    this._modal = document.querySelector(modalSelector);
    if (isCloseBySubstrate) {
      this._modal.addEventListener('click', (evt) => this.closeModalLBySubstrate(evt));
    }
    triggers.forEach((trigger) => {
      const elements = document.querySelectorAll(trigger);
      elements.forEach((element) => {
        element.addEventListener('click', (evt) => this.openModal(evt));
      });
    });
    this._modal.querySelector(closeBtnSelector).addEventListener('click', () => this.closeModal());
  }

  openModal(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this._modal.classList.add('show');
    document.body.classList.add('open-modal');
    document.body.style.marginRight = `${scrollWidth}px`;
  }

  closeModal() {
    this._modal.classList.remove('show');
    document.body.classList.remove('open-modal');
    document.body.style.marginRight = '0px';
  }

  closeModalLBySubstrate(evt) {
    if (evt.target.classList.contains(this._modalClass)) {
      this.closeModal();
    }
  }

  addTimer(seconds) {
    setTimeout(() => {
      this.openModal();
    }, seconds*1000);
  }

}

new Modal('.popup_engineer', '.popup_close', true, '.popup_engineer_btn');
new Modal('.popup', '.popup_close', true, '.phone_link').addTimer(60);

const calc = new Modal('.popup_calc', '.popup_calc_close', false, '.popup_calc_btn');
document.querySelector('.popup_calc_button').addEventListener('click', () => calc.closeModal());

const profile = new Modal('.popup_calc_profile', '.popup_calc_profile_close', false, '.popup_calc_button');
document.querySelector('.popup_calc_profile_button').addEventListener('click', () => profile.closeModal());

const calcEnd = new Modal('.popup_calc_end', '.popup_calc_end_close', false, '.popup_calc_profile_button');

export{calcEnd};
