import {
  Directive,
  Input,
  OnChanges
} from '@angular/core';
/*/// <reference path='detail/sparkline.d.ts'/>*/
@Directive({
  selector: '[appSparkline]'
})
export class SparklineDirective {
  @Input() dataSparkline: string;
  constructor() {}
  
 /* ngOnChanges() {
    // showTrends(this.dataSparkline);
  }*/
}
