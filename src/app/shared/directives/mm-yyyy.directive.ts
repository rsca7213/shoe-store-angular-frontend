import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appCardExpiration]'
})
export class CardExpirationDirective {
  public constructor(private readonly el: ElementRef) {}

  @HostListener('input', ['$event'])
  public onInput(event: any): void {
    let value = event.target.value

    value = value.replace(/\D/g, '')

    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 6)}`
    }

    if (value.length === 1 && value !== '0' && value !== '1') {
      value = `0${value}`
    }

    if (value.length === 2) {
      const month = parseInt(value.slice(0, 2), 10)
      if (month > 12) {
        value = `12/${value.slice(3, 7)}`
      }
    }

    this.el.nativeElement.value = value
  }
}
