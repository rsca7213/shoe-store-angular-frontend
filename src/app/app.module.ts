import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { AngularMaterialModule } from './angular-material.module'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AngularMaterialModule,
    SharedModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
