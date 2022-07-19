const openModalLBtn = document.querySelector('.popup_engineer_btn');
const modalL = document.querySelector('.popup_engineer');
const closeModalLBtn = modalL.querySelector('.popup_close');

class Modal {
  constructor(modalSelector, closeBtnSelector, ...triggers) {
    this._modalClass = modalSelector.slice(1);
    this._modal = document.querySelector(modalSelector);
    this._modal.addEventListener('click', (evt) => this.closeModalLBySubstrate(evt));
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
  }

  closeModal() {
    this._modal.classList.remove('show');
    document.body.classList.remove('open-modal');
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

new Modal('.popup_engineer', '.popup_close', '.popup_engineer_btn');
new Modal('.popup', '.popup_close', '.phone_link').addTimer(60);
