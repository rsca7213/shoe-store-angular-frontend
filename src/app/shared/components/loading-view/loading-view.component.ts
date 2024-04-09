import { Component, Input } from '@angular/core'
import { LoadingState } from '../../types/loading-state.types'
import { Router } from '@angular/router'
import { APP_PROPERTIES } from '../../../../properties'

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrl: './loading-view.component.scss'
})
export class LoadingViewComponent {
  @Input() public view: string
  @Input() public state: LoadingState

  public APP_PROPERTIES = APP_PROPERTIES

  public constructor(public readonly router: Router) {}

  public navigateToHome(): void {
    this.router.navigate(['/'])
  }

  public reload(): void {
    window.location.reload()
  }
}
