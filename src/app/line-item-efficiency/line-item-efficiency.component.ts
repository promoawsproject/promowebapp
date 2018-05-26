import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  MatTableDataSource,
  MatSort
} from '@angular/material';
import {
  CommonService
} from '../common.service';
import {
  Router
} from '@angular/router';
import {
  SharedService
} from '../shared.service';
import {
  Angular2Csv
} from 'angular2-csv/Angular2-csv';


@Component({
  selector: 'app-line-item-efficiency',
  templateUrl: './line-item-efficiency.component.html',
  styleUrls: ['./line-item-efficiency.component.css']
})
export class LineItemEfficiencyComponent implements OnInit {

  dataObj;
  headers = ['Cost Head', 'Line_Item',
    'Units',
    'Nos',
    'Type',
    'Client_Rate',
    'Client_Cost',
    'Benchmark_Rate',
    'Benchmark_Cost',
    'Efficiency_Value',
    'Efficiency_Per',
    'Observation'
  ];
  selectedLineItem = '';
  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: CommonService, private router: Router, private sharedService: SharedService) {}
  showProgress = false;
  selectedEfficincy = 'Passive_Efficiencies';

  ngOnInit() {
    this.showProgress = false;
    this.sharedService.applyFilter.subscribe(obj => {
      if (obj['type']) {
        this.getLineItemEfficiencyData(obj);

      }
    });
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.showProgress = false;

  }

  getLineItemEfficiencyData(body) {

    body['type'] = 'line_item_efficiency';
    body['param1'] = localStorage.getItem('selectedvalue');
    this.selectedEfficincy = localStorage.getItem('selectedvalue');
    this.selectedLineItem = body['param1'];
    this.showProgress = true;
    this.service.getData(body).then(response => {
      this.showProgress = false;
      console.log('getLineItemEfficiencyData ', response);
      this.dataObj = response['data'];
      // this.dataSource.sort = this.sort;
    }).catch(ex => {
      this.showProgress = false;
      console.log('getLineItemEfficiencyData ', ex);
    });
  }

  onBack() {
    this.router.navigate(['home/dashboard']);
  }

  exportCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: this.headers
    };

    if (this.selectedEfficincy === 'Aggressive_Efficiencies') {
      for (let index = 0; index < this.dataObj.length; index++) {
        const element = this.dataObj[index];
        delete element['benchmark_rate_min'];
        delete element['benchmark_cost_min'];
        delete element['efficiency_value_min'];
        delete element['efficiency_per_min'];
      }

    } else {
      for (let index = 0; index < this.dataObj.length; index++) {
        const element = this.dataObj[index];
        delete element['benchmark_rate_max'];
        delete element['benchmark_cost_max'];
        delete element['efficiency_value_max'];
        delete element['efficiency_per_max'];
      }

    }

    new Angular2Csv(this.dataObj, this.selectedEfficincy, options);

  }

}
export interface Element {
  Line_Item: 'Constructions full Art';
  Units: 1;
  Nos: 1;
  Type: 'per day';
  Client_Rate: 675000;
  Client_Cost: 675000;
  Benchmark_Rate: 675000;
  Benchmark_Cost: 675000;
  Efficiency_Value: 0;
  Efficiency_Per: 0;
}
