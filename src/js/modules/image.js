const imageWrapper = document.querySelector('.works');

const popup = document.createElement('div');
  popup.style.cssText = `
    display: none;
    justify-content: center;
    align-items: center;
  `;
popup.classList.add('popup');
popup.classList.add('big-img-anim');
const popupImg = document.createElement('img');
popupImg.style.cssText = `
  max-width: 60%;
  height: auto;
`;
popup.append(popupImg);
document.body.append(popup);
popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup')) {
    popup.style.display = 'none';
    document.body.classList.remove('open-modal');
  }
});

const showPopup = (src) => {
  popupImg.src = src;
  popup.style.display = 'flex';
  document.body.classList.add('open-modal');
};

imageWrapper.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('preview')) {
    showPopup(evt.target.parentNode.href);
  }
});

