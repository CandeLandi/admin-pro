import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrl: './increaser.component.css',
})
export class IncreaserComponent implements OnInit{
  
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  @Input('valor')
  progress: number = 50;

  @Input() btnClass: string = 'btn-primary'

  @Output('valor')
  outValue: EventEmitter<number> = new EventEmitter();

  changedValue(value: number) {
    if ( this.progress >= 100 && value >= 0 ) {
      this.outValue.emit(100);
      return this.progress = 100;
    }

    if ( this.progress <= 0 && value < 0 ) {
      this.outValue.emit(0);
      return this.progress = 0;
    }
  
    this.progress = this.progress + value; 
    this.outValue.emit( this.progress );
    return this.progress;

/*       this.progress += value;
    return this.progress;  */
  }

  onChange( newValue: number ){
    
    if( newValue >= 100 ){
      this.progress = 100;
    } else if( newValue <= 0){
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.outValue.emit( this.progress )
  }
}
