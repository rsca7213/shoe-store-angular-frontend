import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularMaterialModule } from '../angular-material.module'
import { NavbarComponent } from './components/navbar/navbar.component'
import { PreventCloseDirective } from './directives/prevent-close.directive'
import { MenuSelectionFilterComponent } from './components/menu-selection-filter/menu-selection-filter.component'
import { RouterModule } from '@angular/router'
import { CardNumberDirective } from './directives/card-number.directive'
import { CardExpirationDirective } from './directives/mm-yyyy.directive'
import { CardCvvDirective } from './directives/card-cvv.directive'
import { LoadingViewComponent } from './components/loading-view/loading-view.component'
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component'
import { LoadingDialogContentComponent } from './components/loading-dialog/content/loading-dialog-content.component'
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component'
import { ErrorDialogContentComponent } from './components/error-dialog/content/error-dialog-content.component'
import { CurrencyFormatterDirective } from './directives/currency-formatter.directive'
import { PhoneNumberFormatterDirective } from './directives/phone-number.directive'
import { MaskedCardNumberPipe } from './pipes/masked-card-number.pipe'
import { UserRolePipe } from './pipes/user-role.pipe'
import { ViewPurchaseItemsDialogComponent } from './components/view-purchase-items-dialog/view-purchase-items-dialog.component'
import { CountPurchasedProductsPipe } from './pipes/count-products.pipe'

@NgModule({
  declarations: [
    NavbarComponent,
    PreventCloseDirective,
    MenuSelectionFilterComponent,
    CardNumberDirective,
    CardExpirationDirective,
    CardCvvDirective,
    CurrencyFormatterDirective,
    LoadingViewComponent,
    LoadingDialogComponent,
    LoadingDialogContentComponent,
    ErrorDialogComponent,
    ErrorDialogContentComponent,
    PhoneNumberFormatterDirective,
    MaskedCardNumberPipe,
    UserRolePipe,
    ViewPurchaseItemsDialogComponent,
    CountPurchasedProductsPipe
  ],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
  exports: [
    NavbarComponent,
    PreventCloseDirective,
    MenuSelectionFilterComponent,
    CardNumberDirective,
    CardExpirationDirective,
    CardCvvDirective,
    CurrencyFormatterDirective,
    LoadingViewComponent,
    LoadingDialogComponent,
    LoadingDialogContentComponent,
    ErrorDialogComponent,
    ErrorDialogContentComponent,
    PhoneNumberFormatterDirective,
    MaskedCardNumberPipe,
    UserRolePipe,
    ViewPurchaseItemsDialogComponent,
    CountPurchasedProductsPipe
  ]
})
export class SharedModule {}
