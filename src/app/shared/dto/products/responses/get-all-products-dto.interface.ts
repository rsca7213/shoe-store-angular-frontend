export interface GetAllProductsResponseDto {
  products: {
    id: number
    name: string
    brand: string
    color: string
    category: string
    price: number
    description: string
    imageUrl: string
  }[]
}
