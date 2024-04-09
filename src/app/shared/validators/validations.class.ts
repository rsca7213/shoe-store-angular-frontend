import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export class CustomValidators {
  static hasNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/\d/.test(value)) {
        return null
      } else {
        return { hasNumber: true }
      }
    }
  }

  static hasUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/[A-Z]/.test(value)) {
        return null
      } else {
        return { hasUppercase: true }
      }
    }
  }

  static hasLowercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/[a-z]/.test(value)) {
        return null
      } else {
        return { hasLowercase: true }
      }
    }
  }

  static hasSpecialCharacter(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return null
      } else {
        return { hasSpecialCharacter: true }
      }
    }
  }

  static onlyLettersAndSpaces(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (/^[a-zA-Z\s]*$/.test(value)) {
        return null
      } else {
        return { onlyLettersAndSpaces: true }
      }
    }
  }

  static phoneNumberWithAreaCode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value

      const areaCodeRegex = /^\(\+\d{1,4}\)/
      const phoneNumberRegex = /\d{7,11}/

      if (areaCodeRegex.test(value) && phoneNumberRegex.test(value)) {
        return null
      } else {
        return { phoneNumberWithAreaCode: true }
      }
    }
  }

  static cardNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value: string = control.value

      if (!value) return null

      value = value.replace(/\s/g, '')

      const isVisa = value[0] === '4'
      const isMastercard = value[0] === '5'
      const isAmex = value[0] === '3'

      const hasValidLength = value.length === 16

      if ((isVisa || isMastercard || isAmex) && hasValidLength) {
        return null
      } else {
        return { cardNumber: true }
      }
    }
  }

  static cardExpiration(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value

      // format should be MM/YYYY
      const regex = /^(0[1-9]|1[0-2])\/\d{4}$/
      const currentYear = new Date().getFullYear()
      const currentMonth = new Date().getMonth() + 1

      if (!regex.test(value)) return { cardExpiration: true }
      if (parseInt(value.split('/')[1]) < currentYear) return { cardAlreadyExpired: true }
      if (
        parseInt(value.split('/')[0]) < currentMonth &&
        parseInt(value.split('/')[1]) === currentYear
      ) {
        return { cardAlreadyExpired: true }
      }

      return null
    }
  }
}
