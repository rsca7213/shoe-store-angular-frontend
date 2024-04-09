import { Component } from '@angular/core'
import { ProductsService } from '../shared/services/products.service'
import { Product } from '../shared/models/product.model'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { ProductsMapper } from '../shared/utils/product.mapper.util'
import { LoadingState } from '../shared/types/loading-state.types'
import { CartService } from '../shared/services/cart.service'
import { MatDialog } from '@angular/material/dialog'
import { ProductDetailsDialogComponent } from './components/product-details-dialog/product-details-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  public products: Product[]
  public filteredProducts: Product[]
  public categories: string[]
  public brands: string[]

  public filters = {
    search: '',
    categories: [] as string[],
    brands: [] as string[]
  }

  public viewState: LoadingState = 'loading'
  public addedToCartProductIndicator: number

  public constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
    private readonly productMapper: ProductsMapper,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getProducts()
  }

  public getProducts(): void {
    this.viewState = 'loading'
    this.productsService.getAllProducts().subscribe({
      next: data => {
        this.products = this.productMapper.mapGetAllProductsResponseDtoToModel(data)
        this.filteredProducts = data.products
        this.categories = Array.from(new Set(data.products.map(product => product.category)))
        this.brands = Array.from(new Set(data.products.map(product => product.brand)))
        this.viewState = 'ready'
      },
      error: (err: ApiError) => {
        this.viewState = 'error'
      }
    })
  }

  public onCategoriesSelected(categories: string[]): void {
    this.filters.categories = categories
    this.applyFilters()
  }

  public onBrandsSelected(brands: string[]): void {
    this.filters.brands = brands
    this.applyFilters()
  }

  public applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const search =
        product.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        !this.filters.search
      const category = this.filters.categories.length
        ? this.filters.categories.includes(product.category)
        : true
      const brand = this.filters.brands.length ? this.filters.brands.includes(product.brand) : true

      return search && category && brand
    })
  }

  public addToCart(product: Product): void {
    this.cartService.addProduct(product)
    this.addedToCartProductIndicator = product.id

    setTimeout(() => {
      this.addedToCartProductIndicator = 0
    }, 500)
  }

  public viewProduct(product: Product): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: product
    })
  }
}
