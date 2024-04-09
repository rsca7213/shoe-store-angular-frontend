import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'maskedCardNumber'
})
export class MaskedCardNumberPipe implements PipeTransform {
  public transform(value: string, limit?: number): string {
    limit = limit ? Number(limit) : 20
    const result = `**** **** **** ${value.slice(-4)}`
    return result.slice(-limit)
  }
}
