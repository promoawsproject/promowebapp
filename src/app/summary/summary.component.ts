import {
  Component,
  OnInit
} from '@angular/core';
import {
  SharedService
} from '../shared.service';
import {
  CommonService
} from '../common.service';
import {
  Angular2Csv
} from 'angular2-csv/Angular2-csv';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  director = '';
  producer = '';
  films = '';
  shootmedium = '';
  data_receipt_date;
  report_date;
  calculated_tat;
  observations = [];
  tableData = [];

  constructor(private sharedService: SharedService, private service: CommonService, private router: Router) {
    this.sharedService.applyFilter.subscribe(obj => {
      if (obj['type']) {
        this.getSummary(obj);
        this.getFirstByte(obj);
      }
    });
  }

  ngOnInit() {}

  getSummary(body) {
    body['type'] = 'summary';
    this.service.getData(body).then(respone => {
      console.log('response ', respone);
      const data = respone['data'];
      this.observations = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index].observation_ove;
        this.producer = data[index].producer;
        this.director = data[index].director;
        this.films = data[index].no_of_films;
        this.shootmedium = data[index].shoot_on;
        this.data_receipt_date = data[index].data_receipt_date;
        this.report_date = data[index].report_date;
        this.calculated_tat = this.getDateDiffirence(this.data_receipt_date, this.report_date);
        if (element) {
          const array = element.split('|');
          for (let i = 0; i < array.length; i++) {
            this.observations.push(array[i]);
          }
        }
      }
    }).catch(ex => {
      console.log('Exceptoin ', ex);
    });
  }

  getFirstByte(body) {

    body['type'] = 'first_bytes';
    this.service.getData(body).then(respone => {
      console.log('response ', respone);
      const data = respone['data'];
      this.tableData = data;

    }).catch(ex => {
      console.log('Exceptoin ', ex);
    });
  }

  getDateDiffirence(d1, d2) {
    const startTime = new Date(d1),
      endTime = new Date(d2),
      difference = endTime.getTime() - startTime.getTime(), // This will give difference in milliseconds
      resultInMinutes = Math.round(difference / 60000);
    return Math.round(resultInMinutes / 60) + ' hrs';
  }
  onClick(id, name) {
    localStorage.setItem('name', name);
    this.router.navigate(['/home/detail/' + id]);
  }

  exportCSV() {

    const headers = ['Cost Head', 'Star Outlay', 'Market Best Outlay', 'Efficiency Value', 'Efficiency %'];
    const options = {
      fieldSeparator: '\t',
      quoteStrings: '',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: headers,
      title: 'Report'
    };
    const dataObj = [];
    this.tableData.forEach(el => {
      dataObj.push({
        'cost_head': el.cost_head,
        'base_cost': el.base_cost,
        'benchmark_cost_min': el.benchmark_cost_min,
        'efficiency_value': el.efficiency_value,
        'efficiency_per': el.efficiency_per
      });
    });
    new Angular2Csv(dataObj, 'datasheet', options);

  }

}
