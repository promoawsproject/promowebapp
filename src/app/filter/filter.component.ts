import {
  Component,
  OnInit,
  OnChanges,
  Input
} from '@angular/core';
import {
  CommonService
} from '../common.service';
import {
  MatSelect,
  MatSelectChange
} from '@angular/material';
import {
  FormControl
} from '@angular/forms';
import {
  SharedService
} from '../shared.service';
import {
  CastExpr
} from '@angular/compiler';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  brands = [];
  products = [];
  projectTitles = [];
  costOptions = [];
  categories = [];
  filmDescs = [];
  timelines = [];
  sbus = [];
  selectedProTitle: any = this.getDefaultType();
  selectedCostOption: any = this.getDefaultType();
  selectedProduct: any = this.getDefaultType();
  selectedBrand: any = this.getDefaultType();
  selectedCategory: any = this.getDefaultType();
  selectedFilmDesc: any = this.getDefaultType();
  selectedTimeline: any = this.getDefaultType();
  selectedSBU: any = this.getDefaultType();
  isFistTime = true;
  @Input() hiddenCategory;
  @Input() disable;
  constructor(private service: CommonService, private sharedSerice: SharedService) {}

  ngOnInit() {
    this.getData('sbus');

  }

  getFilterData(type) {
    switch (type) {
      case 'project_title':
        break;
      case 'filmdesc':
        break;
      case 'cost_option':
        break;
      default:
        break;
    }
  }

  onFilterSelected(type: any, event: any) {
    switch (type) {
      case 'sbus':
        this.selectedSBU = event.value;
        this.getData('project_title');
        break;
      case 'project_title':
        this.selectedProTitle = event.value;
        this.getData('filmdesc');
        break;
      case 'filmdesc':
        break;
      case 'cost_option':
        break;
      default:
        break;
    }
    console.log('filter selected ', type, event.value);
  }

  getDefaultType() {
    return {
      name: '',
      id: 0
    };
  }
  getData(type) {

    const body = {
      type: 'filter',
      filter_name: type,
      sbu_id: this.selectedSBU.id,
      project_title: this.selectedProTitle.id,
      category: this.selectedCategory.id,
      cost_option: this.selectedCostOption.id,
      filmdesc: this.selectedFilmDesc.id,
      time_constraint: this.selectedTimeline
    };

    this.service.getFilterData(body).then(response => {

      const type = response['type'];

      switch (type) {
        case 'sbus':
          this.sbus = response['data'];
          if (this.sbus.length > 1) {
            this.selectedSBU = this.sbus[1];
          } else {
            this.selectedSBU = this.sbus[0];
          }
          this.getData('project_title');
          break;
        case 'project_title':
          this.projectTitles = response['data'];
          if (this.projectTitles.length > 1) {
            this.selectedProTitle = this.projectTitles[1];
          } else {
            this.selectedProTitle = this.projectTitles[0];
          }
          this.getData('filmdesc');
          break;
        case 'filmdesc':
          this.filmDescs = response['data'];
          this.selectedFilmDesc = this.filmDescs[0];
          this.getData('time_constraint');
          break;
        case 'cost_option':
          this.costOptions = response['data'];
          this.selectedCostOption = this.costOptions[0];
          this.getData('category');
          if (this.isFistTime) {
            this.isFistTime = false;
            this.onApply();
          }
          break;
        case 'category':
          this.categories = response['data'];
          this.selectedCategory = this.categories[0];
          break;
        case 'time_constraint':
          this.timelines = response['data'];
          this.selectedTimeline = this.timelines[0];
          this.getData('cost_option');
          break;
        default:
          break;
      }
    }).catch(ex => {

    });
  }

  onApply() {
    const body = {
      type: 'filter',
      sbu_id: this.selectedSBU.id,
      project_title: this.selectedProTitle.id,
      category: this.selectedCategory.id,
      cost_option: this.selectedCostOption.id,
      filmdesc: this.selectedFilmDesc.id
    };
    this.sharedSerice.applyFilter.next(body);
  }

}
