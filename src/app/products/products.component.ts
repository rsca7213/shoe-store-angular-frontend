import { Component, OnInit, ViewChild } from '@angular/core'
import { ProductsService } from '../shared/services/products.service'
import { Product } from '../shared/models/product.model'
import { LoadingState } from '../shared/types/loading-state.types'
import { ProductsMapper } from '../shared/utils/product.mapper.util'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { PageEvent } from '@angular/material/paginator'
import { MatDialog } from '@angular/material/dialog'
import { DeleteProductDialogComponent } from './components/delete-product-dialog/delete-product-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { finalize } from 'rxjs'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { CreateProductDialogComponent } from './components/create-product-dialog/create-product-dialog.component'
import { UpdateProductDialogComponent } from './components/update-product-dialog/update-product-dialog.component'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  public products: Product[]
  public tableProducts: Product[]
  public displayedColumns: string[] = ['name', 'brand', 'color', 'category', 'price', 'actions']

  public viewState: LoadingState = 'loading'
  public pageSize: number = 10
  public pageIndex: number = 0

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public constructor(
    private readonly productsService: ProductsService,
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
        this.renderProductPagination()
        this.viewState = 'ready'
      },
      error: (err: ApiError) => {
        this.viewState = 'error'
      }
    })
  }

  public addProduct(): void {
    const ref = this.dialog.open(CreateProductDialogComponent, {
      width: APP_DIALOG_SIZES.lg
    })

    ref.afterClosed().subscribe((product: Product) => {
      if (!product) return

      this.loadingDialog.open()
      this.productsService
        .createProduct(product)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.getProducts()
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al crear el producto', err.message)
          }
        })
    })
  }

  public editProduct(product: Product): void {
    const ref = this.dialog.open(UpdateProductDialogComponent, {
      width: APP_DIALOG_SIZES.lg,
      data: product
    })

    ref.afterClosed().subscribe((p: Product) => {
      if (!p) return

      this.loadingDialog.open()
      this.productsService
        .updateProduct(p, product.id)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            const index = this.products.findIndex(p => p.id === product.id)
            this.products[index] = p
            this.renderProductPagination()
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al actualizar el producto', err.message)
          }
        })
    })
  }

  public deleteProduct(product: Product): void {
    const ref = this.dialog.open(DeleteProductDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: product
    })

    ref.afterClosed().subscribe((product: Product) => {
      if (!product) return

      this.loadingDialog.open()
      this.productsService
        .deleteProduct(product.id)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== product.id)
            this.renderProductPagination()
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al eliminar el producto', err.message)
          }
        })
    })
  }

  public renderProductPagination(): void {
    const startIndex = this.pageIndex * this.pageSize
    const endIndex = startIndex + this.pageSize

    this.tableProducts = this.products.slice(startIndex, endIndex)
  }

  public selectPage(event: PageEvent): void {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
  }
}
