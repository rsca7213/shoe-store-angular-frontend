import { Component, OnInit, ViewChild } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'
import { PurchasesService } from '../shared/services/purchases.service'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { Purchase } from '../shared/models/purchases.model'
import { PurchasesMapper } from '../shared/utils/purchase.mapper.util'
import { PageEvent } from '@angular/material/paginator'
import { PaymentCardsService } from '../shared/services/payment-cards.service'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { DeletePurchaseDialogComponent } from './components/delete-purchase-dialog/delete-purchase-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'
import { finalize } from 'rxjs'
import { ViewPurchaseItemsDialogComponent } from '../shared/components/view-purchase-items-dialog/view-purchase-items-dialog.component'

@Component({
  selector: 'app-manage-purchases',
  templateUrl: './manage-purchases.component.html',
  styleUrl: './manage-purchases.component.scss'
})
export class ManagePurchasesComponent implements OnInit {
  public purchases: Purchase[]
  public tablePurchases: Purchase[]
  public displayedColumns: string[] = [
    'user',
    'date',
    'total',
    'products',
    'payment-info',
    'actions'
  ]

  public viewState: LoadingState = 'loading'

  public pageSize: number = 10
  public pageIndex: number = 0

  @ViewChild(LoadingDialogComponent) private loadingDialog: LoadingDialogComponent
  @ViewChild(ErrorDialogComponent) private errorDialog: ErrorDialogComponent

  public constructor(
    private readonly purchasesService: PurchasesService,
    private readonly purchasesMapper: PurchasesMapper,
    public readonly cardsService: PaymentCardsService,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getPurchases()
  }

  public getPurchases(): void {
    this.viewState = 'loading'

    this.purchasesService.getAllPurchases().subscribe({
      next: purchases => {
        this.purchases = this.purchasesMapper.mapGetAllPurchasesToModel(purchases)
        this.renderTable()
        this.viewState = 'ready'
      },
      error: (err: ApiError) => {
        this.viewState = 'error'
      }
    })
  }

  public renderTable(): void {
    const startIndex = this.pageIndex * this.pageSize
    const endIndex = startIndex + this.pageSize

    this.tablePurchases = this.purchases.slice(startIndex, endIndex)
  }

  public selectPage(event: PageEvent): void {
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
  }

  public viewProducts(purchase: Purchase): void {
    const ref = this.dialog.open(ViewPurchaseItemsDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: purchase
    })
  }

  public deletePurchase(purchase: Purchase): void {
    const ref = this.dialog.open(DeletePurchaseDialogComponent, {
      width: APP_DIALOG_SIZES.md,
      data: purchase
    })

    ref.afterClosed().subscribe((result: Purchase) => {
      if (!result) return

      this.loadingDialog.open()
      this.purchasesService
        .deletePurchase(purchase.id)
        .pipe(finalize(() => this.loadingDialog.close()))
        .subscribe({
          next: () => {
            this.purchases = this.purchases.filter(p => p.id !== purchase.id)
            this.renderTable()
          },
          error: err => {
            this.errorDialog.open('Ocurrio un error al eliminar la compra', err.message)
          }
        })
    })
  }
}
