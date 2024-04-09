import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[appCardCvv]'
})
export class CardCvvDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value = event.target.value

    value = value.replace(/\D/g, '')
    value = value.slice(0, 3)

    this.el.nativeElement.value = value
  }
}
