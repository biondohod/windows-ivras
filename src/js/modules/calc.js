import { checkNumInputs } from "./utils";
import { calcEnd } from './modal';
checkNumInputs('#width');
checkNumInputs('#height');

const modalState = {
  form: 0,
  type: 'tree'
};

const windowForm = document.querySelectorAll('.balcon_icons_img'),
      windowWidth = document.querySelectorAll('#width'),
      windowHeight = document.querySelectorAll('#height'),
      windowType = document.querySelectorAll('#view_type'),
      windowProfile = document.querySelectorAll('.checkbox');

const getCalcFormData = (event, elements, valueName) => {
  elements.forEach((element, index) => {
    element.addEventListener(event, () => {
      switch(element.nodeName) {
        case 'SPAN':
          modalState[valueName] = index;
          break;
        case 'INPUT':
          if (element.getAttribute('type') === 'checkbox') {
            if (index === 0) {
              modalState[valueName] = 'cold';
              elements[1].checked = false;
            } else {
              modalState[valueName] = 'warm';
              elements[0].checked = false;
            }
          } else {
            modalState[valueName] = element.value;
          }
          break;
        case 'SELECT':
          modalState[valueName] = element.value;
          break;
      }
    });
  });
};

getCalcFormData('click', windowForm, 'form');
getCalcFormData('input', windowHeight, 'height');
getCalcFormData('input', windowWidth, 'width');
getCalcFormData('change', windowType, 'type');
getCalcFormData('change', windowProfile, 'profile');

const resetCalcForm = () => {
  calcEnd.closeModal();
  windowHeight.forEach(input => input.value = '');
  windowWidth.forEach(input => input.value = '');
  windowType.forEach(select => select[0].selected = true);
};

export {modalState, resetCalcForm};
