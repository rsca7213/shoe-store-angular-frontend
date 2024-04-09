import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { GetAllProductsResponseDto } from '../dto/products/responses/get-all-products-dto.interface'
import { Observable } from 'rxjs'
import { APP_PROPERTIES } from '../../../properties'
import { GetProductResponseDto } from '../dto/products/responses/get-product-dto.interface'
import { UpdateProductRequestDto } from '../dto/products/requests/update-product-dto.interface'
import { CreateProductRequestDto } from '../dto/products/requests/create-product-dto.interface'
import { products } from './mock-data'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private mockProducts = products

  public constructor(private readonly httpClient: HttpClient) {}

  public getAllProducts(): Observable<GetAllProductsResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ products: this.mockProducts })
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetAllProductsResponseDto>(`${APP_PROPERTIES.api}/products`)
  }

  public getProductById(id: number): Observable<GetProductResponseDto> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.mockProducts.find(product => product.id === id))
        observer.complete()
      }, 1000)
    })

    return this.httpClient.get<GetProductResponseDto>(`${APP_PROPERTIES.api}/products/${id}`)
  }

  public updateProduct(request: UpdateProductRequestDto, id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        const productIndex = this.mockProducts.findIndex(product => product.id === id)
        this.mockProducts[productIndex] = { ...this.mockProducts[productIndex], ...request }
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.put<void>(`${APP_PROPERTIES.api}/products/${id}`, request)
  }

  public deleteProduct(id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.mockProducts = this.mockProducts.filter(product => product.id !== id)
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.delete<void>(`${APP_PROPERTIES.api}/products/${id}`)
  }

  public createProduct(request: CreateProductRequestDto): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.mockProducts.push({ id: this.mockProducts.length + 1, ...request })
        observer.next()
        observer.complete()
      }, 1000)
    })

    return this.httpClient.post<void>(`${APP_PROPERTIES.api}/products`, request)
  }
}
