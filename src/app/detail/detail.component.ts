import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  SharedService
} from '../shared.service';
import {
  CommonService
} from '../common.service';
import {
  SparklineDirective
} from '../sparkline.directive';

import {
  Angular2Csv
} from 'angular2-csv/Angular2-csv';

/// <reference path='sparkline.d.ts'/>
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tableData = [];
  graphData = [];
  lineItemData = [];
  title = '';
  constructor(private acivateRoute: ActivatedRoute, private sharedService: SharedService, private service: CommonService, private router: Router) {
    this.sharedService.applyFilter.subscribe(obj => {
      if (obj['type']) {
        this.getDetail(obj);
        
      }
    });
  }

  ngOnInit() {
    console.log('router ', this.acivateRoute.snapshot.params['id']);
  }

  getDetail(body) {
    this.title = localStorage.getItem('name');
    body['type'] = 'cost_head_detail';
    body['cost_head_id'] = this.acivateRoute.snapshot.params['id'];
    this.service.getData(body).then(respone => {
      console.log('response ', respone);
      const data = respone['data'];
      this.tableData = data;
      this.getGraphData(body);

    }).catch(ex => {
      console.log('Exceptoin ', ex);
    });
  }

  getGraphData(body) {
    body['type'] = 'spark_line';
    body['cost_head_id'] = this.acivateRoute.snapshot.params['id'];
    const mapped_line_item = [];
    
    this.service.getData(body).then(respone => {
      console.log('response ', respone);
      const data = respone['data'];
      this.graphData = data;
      
      this.tableData.forEach(ele => {
        this.graphData.forEach(element => {
          if (ele.line_item === element.line_item) {
            mapped_line_item.push(element.mapped_line_item);
          }
        });
      });
      for (let i = 0; i < this.tableData.length; i++) {
        let ele = this.tableData[i];
        for (let j = 0; j < this.graphData.length; j++) {
          let element = this.graphData[j];
          if (ele.line_item === element.line_item) {
            if (mapped_line_item.indexOf(element.mapped_line_item) !== -1) {
              mapped_line_item.push(element.mapped_line_item);
            }
          }
        }
      }

      for (let i = 0; i < mapped_line_item.length; i++) {
        const obj = {
          name: mapped_line_item[i],
          data:[]
        };
        this.graphData.forEach(element => {
          if (mapped_line_item[i] === element.mapped_line_item) {
            console.log(i +' --------- '+ element.mapped_line_item + '   ' + element.base_rate);
            obj['data'].push(element.base_rate);
          }
        });
        //console.log('daat  ',obj);
        this.lineItemData.push(obj);
      }
      console.log("length  " , this.lineItemData.length);
       setTimeout(function(){
         doChunk();
       }, 1000);

    }).catch(ex => {
      console.log('Exceptoin ', ex);
    });
  }

  onBack() {
    this.router.navigate(['home/summary']);
  }


  exportCSV() {


    const headers = ['LINE ITEM	', 'UNITS', 'NOS', 'BASIS', 'STAR RATE', 'STAR OUTLAY', 'MARKET BEST RATE', 'MARKET BEST OUTLAY', 'EFFICIENCY VALUE', 'Efficiency %', 'COMMENTS'];
    const options = {
      fieldSeparator: ',',
      quoteStrings: '',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: headers,
      title: 'Report'
    };
    const dataObj = [];
    this.tableData.forEach(item => {
      dataObj.push({
        'line_item': item.line_item,
        'units': item.units,
        'nos': item.nos,
        'basis': item.basis,
        'client_rate': item.client_rate,
        'client_cost': item.client_cost,
        'benchmark_rate_min': item.benchmark_rate_min,
        'benchmark_cost_min': item.benchmark_cost_min,
        'efficiency_value': item.efficiency_value,
        'efficiency_per': item.efficiency_per,
        'comments': item.comments
      });
    });
    new Angular2Csv(dataObj, 'LineItems', options);

  }

}
