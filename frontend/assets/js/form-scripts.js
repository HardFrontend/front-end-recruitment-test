import {setErrorStatus, errorText} from './helpers/error-message'
import {blockForm, unBlockForm} from './helpers/utils'
import {API} from './helpers/api'

class FormValidator {
  constructor (form, fields) {
    this.form = form
    this.fields = fields
    const END_POINT = 'https://jsonplaceholder.typicode.com/'
    this.api = new API({endPoint: END_POINT})
  }

  initialize () {
    this.validateOnEntry()
    this.validateOnSubmit()
  }

  validateOnSubmit () {
    let self = this
    const wait = (duration) => new Promise(
      (resolve) => setTimeout (resolve, duration)
    )

    this.form.addEventListener('submit', event => {
      event.preventDefault()

      blockForm(this.form)

      const entry = new FormData(this.form).entries()

      wait(2000)
        .then(() =>
          this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`)
            self.validateFields(input)
          })
        )
        .then(() => this.api.sendForm({data: entry}))
        .then(() => {
          unBlockForm(this.form)
          errorText('Success!','success-send', this.form)
        })
        .catch(
          (err) => {
            unBlockForm(this.form)
            errorText(`Error happened on server, please try again later! (${err})`,'error', this.form)
          })
    })
  }

  validateOnEntry () {
    let self = this
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)

      input.addEventListener ('input', () => {
        self.validateFields(input)
      })
    })
  }

  validateFields (field) {
    switch (field.name) {
      case 'postalcode':
        const postalcodeSymbols = /^[0-9]+$/
        if (postalcodeSymbols.test(field.value) && field.value.length === 5) {
          setErrorStatus (field, null, 'success', this.form)
        } else {
          setErrorStatus (field, 'Please enter valid Postal Code with numbers only', 'error', this.form)
        }
        break

      case 'phone':
        const phoneSymbols = /^[0-9]+$/
        if (phoneSymbols.test(field.value) && field.value.length === 9) {
          setErrorStatus (field, null, 'success', this.form)
        } else {
          setErrorStatus (field, 'Please enter valid phone', 'error', this.form)
        }
        break

      case 'creditcard':
        const creditCardSymbols = /^[0-9]+$/
        if (creditCardSymbols.test(field.value) && field.value.length === 16) {
          setErrorStatus (field, null, 'success', this.form)
        } else {
          setErrorStatus (field, 'Please enter valid credit card with only numbers', 'error', this.form)
        }
        break

      case 'cvv':
        const cvvSymbols = /^[0-9]+$/
        if (cvvSymbols.test(field.value) && field.value.length === 3) {
          setErrorStatus (field, null, 'success', this.form)
        } else {
          setErrorStatus (field, 'Please enter valid security code with only numbers', 'error', this.form)
        }
        break

      case 'expiration-date':
        const dateSymbols = /(0[1-9]|10|11|12)\/[2-9]{2}|\./
        if (dateSymbols.test(field.value) && field.value.length === 5) {
          setErrorStatus (field, null, 'success', this.form)
        } else {
          setErrorStatus (field, 'Please enter valid date with format MM/YY', 'error', this.form)
        }
        break

      case 'email':
        const emailSymbols = /\S+@\S+\.\S+/
        if (!field.value.trim() === '' || emailSymbols.test(field.value)) {
          setErrorStatus (field, null, 'success', this.form)
        } else {
          setErrorStatus (field, 'Please enter valid email address', 'error', this.form)
        }
        break

      default:
        const textSymbols = /^[a-zA-Z]+$/
        if (field.value.trim() === '' || field.value.length < 2 || !textSymbols.test(field.value)){
          setErrorStatus (field, 'This field cannot be blank and must have only alphabetic characters',
            'error', this.form)
        } else {
          setErrorStatus(field, null, 'success', this.form)
        }
    }
  }
}

const form = document.querySelector('.form')
form.addEventListener('submit', event => {
  console.log('123')
})
const fields = ['name','lname', 'email', 'postalcode', 'phone', 'creditcard', 'cvv', 'expiration-date']
const validator = new FormValidator(form, fields)
validator.initialize()
