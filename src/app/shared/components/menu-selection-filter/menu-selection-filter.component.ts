import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-menu-selection-filter',
  templateUrl: './menu-selection-filter.component.html',
  styleUrl: './menu-selection-filter.component.scss'
})
export class MenuSelectionFilterComponent implements OnInit {
  @Input() public items: string[]
  @Input() public icon: string
  @Output() public selected = new EventEmitter<string[]>()

  public selection: {
    items: string
    selected: boolean
  }[] = []

  public constructor() {}

  public ngOnInit(): void {
    this.selection = this.items.map(items => ({ items, selected: true }))
  }

  public modifySelection(items: string): void {
    const index = this.selection.findIndex(s => s.items === items)
    this.selection[index].selected = !this.selection[index].selected

    this.selected.emit(this.selection.filter(s => s.selected).map(s => s.items))
  }
}
