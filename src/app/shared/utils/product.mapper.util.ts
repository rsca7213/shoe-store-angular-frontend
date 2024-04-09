import { Injectable } from '@angular/core'
import { GetAllProductsResponseDto } from '../dto/products/responses/get-all-products-dto.interface'
import { Product } from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsMapper {
  public mapGetAllProductsResponseDtoToModel(response: GetAllProductsResponseDto): Product[] {
    return response.products.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      color: p.color,
      category: p.category,
      price: p.price,
      description: p.description,
      imageUrl: p.imageUrl
    }))
  }
}
