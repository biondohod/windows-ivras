const checkNumInputs = (selector) => {
  const inputs = document.querySelectorAll(selector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '');
      if (input.value.length > 11) {
        input.value = input.value.slice(0, 11);
      }
    });
  });
};

export {checkNumInputs};
