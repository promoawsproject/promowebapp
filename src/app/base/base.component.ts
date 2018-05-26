import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import {
  SharedService
} from '../shared.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  hiddenCategory;
  disable;
  header = 'Summary Report';
  showFilters = true;
  showLoader = false;
  hideLeftMenu = false;
  constructor(private router: Router, private sharedService: SharedService) {

    this.sharedService.showLoader.subscribe((event: boolean) => {
      this.showLoader = event;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.hideLeftMenu = false;
        console.log('ervent ', event, ' ' + event.url);
        switch (event.url) {
          case '/home/dashboard':
            this.hiddenCategory = true;
            this.disable = false;
            this.header = 'Efficiency Report: Category (Work in progress)';
            this.showFilters = true;
            break;
          case '/home/lineitemefficiency':
            this.hiddenCategory = true;
            this.disable = true;
            this.header = 'Efficiency Report: Line Item (Work in progress)';
            this.showFilters = true;
            break;
          case '/home/summary':
            this.hiddenCategory = true;
            this.disable = false;
            this.header = 'Overview';
            this.showFilters = true;
            break;
          case '/home/trends':
            this.hiddenCategory = true;
            this.disable = true;
            this.header = 'Trends Report (Work in progress)';
            this.showFilters = true;
            break;
          case '/home/form':
            this.hiddenCategory = true;
            this.disable = false;
            this.header = 'Why-What-Who (Work in progress)';
            this.showFilters = false;
            break;
          case '/home/question':
          this.showFilters = false;
          this.hideLeftMenu = true;
          break;
          default:
          this.header = 'Deepdive';
          this.showFilters = false;
            break;
        }
      }
    });
  }

  ngOnInit() {


  }

}
