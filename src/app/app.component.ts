import { Component, HostListener, ViewChild } from '@angular/core'
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MatSidenav) public sidenav: MatSidenav

  public sidenavProperties = {
    opened: false,
    mode: 'side' as MatDrawerMode
  }

  public constructor() {}

  public ngOnInit(): void {
    this.toggleSidenavMode(window.innerWidth)
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.toggleSidenavMode(window.innerWidth)
  }

  public toggleSidenav(): void {
    this.sidenav.toggle()
  }

  public closeSidenav(): void {
    this.sidenav.close()
  }

  private toggleSidenavMode(width: number): void {
    this.sidenavProperties.mode = width > 768 ? 'side' : 'over'
  }
}
