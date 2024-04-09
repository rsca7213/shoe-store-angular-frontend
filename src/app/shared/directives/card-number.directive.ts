import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appCardNumber]'
})
export class CardNumberDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value = event.target.value

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{4})/g, '$1 ').trim()
    value = value.slice(0, 19)

    this.el.nativeElement.value = value
  }
}
