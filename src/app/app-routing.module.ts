import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  LoginComponent
} from './login/login.component';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  LineItemEfficiencyComponent
} from './line-item-efficiency/line-item-efficiency.component';

import {
  BaseComponent
} from './base/base.component';
import {
  SummaryComponent
} from './summary/summary.component';
import {
  TrendComponent
} from './trend/trend.component';
import {
  FormComponent
} from './form/form.component';
import {
  DetailComponent
} from './detail/detail.component';
import {
  QuestionComponent
} from './question/question.component';
const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: LoginComponent
}, {
  path: 'home',
  component: BaseComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'question',
    component: QuestionComponent
  }, {
    path: 'lineitemefficiency',
    component: LineItemEfficiencyComponent
  }, {
    path: 'summary',
    component: SummaryComponent
  }, {
    path: 'trends',
    component: TrendComponent
  }, {
    path: 'form',
    component: FormComponent
  }, {
    path: 'detail/:id',
    component: DetailComponent
  }]
}, {
  path: '**',
  component: LoginComponent
}];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
