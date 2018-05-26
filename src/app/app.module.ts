import {
  BrowserModule
} from '@angular/platform-browser';

import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import {
  HttpClientModule
} from '@angular/common/http';

import {
  AppComponent
} from './app.component';
import {
  LoginComponent
} from './login/login.component';
import {
  AppRoutingModule
} from './/app-routing.module';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  CommonService
} from './common.service';
import {
  LineItemEfficiencyComponent
} from './line-item-efficiency/line-item-efficiency.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  MatTable,
  MatTableModule,
  MatProgressBarModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {
  BaseComponent
} from './base/base.component';
import {
  FilterComponent
} from './filter/filter.component';
import {
  SharedService
} from './shared.service';
import {
  FormsModule
} from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';
import { TrendComponent } from './trend/trend.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { SparklineDirective } from './sparkline.directive';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LineItemEfficiencyComponent,
    BaseComponent,
    FilterComponent,
    SummaryComponent,
    TrendComponent,
    FormComponent,
    DetailComponent,
    SparklineDirective,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatProgressBarModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [CommonService, SharedService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}
