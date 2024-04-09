import { Directive, ElementRef, HostListener, Input } from '@angular/core'
import { NgControl } from '@angular/forms'
import { Country } from '../constants/countries.constant'

@Directive({
  selector: '[appPhoneNumber]'
})
export class PhoneNumberFormatterDirective {
  @Input() public country: Country

  public constructor(private el: ElementRef, private ngControl: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  public onInput(value: string) {
    const areaCode = this.country.areaCode
    value = value.replace(`(+${areaCode}) `, '')
    value = value.replace(`(+${areaCode})`, '')
    value = value.replace(/\D/g, '')
    value = value.slice(0, 11)
    let output = `(+${areaCode}) ${value}`

    this.el.nativeElement.value = output
    this.ngControl.control?.setValue(output)
  }
}
