import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, DoCheck, KeyValueDiffer, KeyValueDiffers, KeyValueChangeRecord, ɵConsole } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit , OnChanges, DoCheck {

  @Input() saludo: string;
  @Input() user: {name: string};

  differ: KeyValueDiffer<string, string>

  constructor( private _differs: KeyValueDiffers ) { }

  ngDoCheck(): void {
    if( this.user && this.differ ) {
      const cambios = this.differ.diff(this.user);
      if( cambios ) {
        cambios.forEachChangedItem(
          (record: KeyValueChangeRecord<string, string> ) => {
            console.log( ` Got cambios in property: ${record.key}, antes: ${record.previousValue}, despues: ${record.currentValue} ` )
          }
        )
      }
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log( JSON.stringify(changes, null, 2) )
  }

  ngOnInit(): void {
    this.differ = this._differs.find(this.user).create()
    console.log('NG ON INIT')
  }

}
