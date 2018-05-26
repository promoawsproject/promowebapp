import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommonService
} from '../common.service';
import {
  Route,
  Router
} from '@angular/router';
import {
  SharedService
} from '../shared.service';


// declare let jQuery: any;
/// <reference path='graphs.d.ts'/>

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  observationsByCostHead = [];
  data: any;
  constructor(private service: CommonService, private route: Router, private sharedService: SharedService) {

  }

  ngOnInit() {
    const self = this;
    this.sharedService.applyFilter.subscribe(obj => {
      if (obj['type']) {
        this.getTotalCostDeviation(obj);
        // this.getCostDeviation(obj);
        this.getObservations(obj);
      }
    });
  }

  getTotalCostDeviation(obj) {

    obj['type'] = 'total_deviation';
    const self = this;
    this.service.getData(obj).then(response => {
      this.data = response['data'][0];
      showCostDeviationChart('container1', response['data'][0].pe_deviation, '');
      showCostDeviationChart('container2', response['data'][0].ae_deviation, '');
      console.log('Respone  ', response);
    }).then(ex => {
      console.log('Exception ', ex);
    });
  }

  getCostDeviation(obj: any) {
    obj['type'] = 'cost_deviation';
    const self = this;
    this.service.getData(obj).then(response => {

      const cost_head = [],
        client_cost = [],
        benchmark_cost = [],
        deviation = [];

      for (let i = 0; i < response['data'].length; i++) {
        cost_head.push(response['data'][i].cost_head);
        deviation.push([response['data'][i].deviation_min, response['data'][i].deviation_max]);
      }
      showCostRangeDeviationChart('container3', cost_head, deviation, self.onCostDeviationSelected.bind(self));
      console.log('Respone  ', response);
    }).then(ex => {
      console.log('Exception ', ex);
    });

  }

  onCostDeviationSelected(selectedvalue) {
    console.log('onCostDeviationSelected ', selectedvalue);
    localStorage.setItem('selectedvalue', selectedvalue);
    this.route.navigate(['home/lineitemefficiency']);
  }

  getObservations(body) {
    body['type'] = 'observation_summary';
    this.service.getData(body).then(respone => {
      console.log('response ', respone);
      const data = respone['data'];
      this.observationsByCostHead = [];

      for (let index = 0; index < data.length; index++) {
        const element = data[index].observation;
        const cost_head = data[index].cost_head;
        const observations = [];
        if (element) {
          const array = element.split('|');
          for (let i = 0; i < array.length; i++) {
            observations.push(array[i]);
          }
        }
        this.observationsByCostHead.push({
          title: cost_head,
          obser: observations
        });
      }
    }).catch(ex => {
      console.log('Exceptoin ', ex);
    });
  }

  onChartClick(type) {
    localStorage.setItem('selectedvalue', type);
    this.route.navigate(['home/lineitemefficiency']);
  }

}
