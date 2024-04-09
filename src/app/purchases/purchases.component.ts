import { Component, OnInit, ViewChild } from '@angular/core'
import { LoadingState } from '../shared/types/loading-state.types'
import { PurchasesMapper } from '../shared/utils/purchase.mapper.util'
import { PurchasesService } from '../shared/services/purchases.service'
import { Purchase } from '../shared/models/purchases.model'
import { ApiError } from '../shared/dto/api-error-dto.interface'
import { LoadingDialogComponent } from '../shared/components/loading-dialog/loading-dialog.component'
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component'
import { PaymentCardsService } from '../shared/services/payment-cards.service'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import { ViewPurchaseItemsDialogComponent } from '../shared/components/view-purchase-items-dialog/view-purchase-items-dialog.component'
import { APP_DIALOG_SIZES } from '../shared/constants/dialog-sizes.constant'

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent implements OnInit {
  public purchases: Purchase[]
  public tablePurchases: Purchase[]
  public displayedColumns: string[] = ['date', 'total', 'products', 'payment-info', 'actions']

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

    this.purchasesService.getAllPurchasesForCurrentUser().subscribe({
      next: purchases => {
        this.purchases = this.purchasesMapper.mapGetPurchasesForCurrentUserToModel(purchases)
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
}
