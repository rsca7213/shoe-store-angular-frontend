import { Directive, ElementRef, HostListener } from '@angular/core'

@Directive({
  selector: '[preventClose]'
})
export class PreventCloseDirective {
  public constructor(private el: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation()
  }
}
