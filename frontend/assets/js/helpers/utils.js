export const blockForm = (form) => {
  const formSubmit = form.querySelector('#form-submit')
  const wrappers = [...form.querySelectorAll('.input-wrapper')]

  formSubmit.disabled = true

  wrappers.forEach((item) => {
    const input = item.querySelector('.input-wrapper__input')
    item.classList.add('input-wrapper--disabled')
    input.disabled = true
  })
}

export const unBlockForm = (form) => {
  const formSubmit = form.querySelector('#form-submit')
  const wrappers = [...form.querySelectorAll('.input-wrapper')]

  formSubmit.disabled = false

  wrappers.forEach((item) => {
    const input = item.querySelector('.input-wrapper__input')
    item.classList.remove('input-wrapper--disabled')
    input.disabled = false
  })
}
