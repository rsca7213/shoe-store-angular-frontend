export interface GetAllPaymentCardsForUserDto {
  cards: {
    id: number
    number: string
    cardholder: string
    expiration: string
  }[]
}
