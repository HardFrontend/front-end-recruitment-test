export const setErrorStatus = (field, message, status, form) => {
    const errorMessage =  form.querySelector('.error-text');
    const parentEl = field.parentElement;

    if(errorMessage) {
      if (status === "success") {
        field.classList.remove('input-error');
        parentEl.classList.remove('error');
        parentEl.classList.add('success');

        errorText("",'success', form);
      }

      if (status === "error") {
        parentEl.classList.remove('success');
        parentEl.classList.add('error');

        errorText(message,'error', form);
      }
    }
};

export const errorText = (message,status, form) => {
  const errorMessage =  form.querySelector('.error-text');

  if (status === "success") {
    if (errorMessage) {
      errorMessage.innerText = "";
      errorMessage.classList.add('hidden');
      errorMessage.classList.remove('success-send');
    }
  }

  if (status === "error") {
    errorMessage.innerText = message;
    errorMessage.classList.remove('hidden');
    errorMessage.classList.remove('success-send');
  }

  if (status === "success-send") {
      errorMessage.innerText = message;
      errorMessage.classList.remove('hidden');
      errorMessage.classList.add('success-send');
  }
}
