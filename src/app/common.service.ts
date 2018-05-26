import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  reject
} from 'q';
import { SharedService } from './shared.service';

@Injectable()
export class CommonService {
  constructor(private http: HttpClient, private sharedService:SharedService) {}

  public getData(body) {
    this.sharedService.showLoader.next(true);
    const url = 'https://hke3dwjydd.execute-api.us-east-1.amazonaws.com/dev/getdata',
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      requestOptions = {
        headers: headers
      };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, requestOptions).subscribe(response => {
        resolve(response);
        this.sharedService.showLoader.next(false);
      }, error => {
        console.log('Error ', error);
        this.sharedService.showLoader.next(false);
        reject(error);
      });
    }).catch((ex) => {
      this.sharedService.showLoader.next(false);
    });

  }


  public getFilterData(body ) {
    this.sharedService.showLoader.next(true);
    const url = 'https://hke3dwjydd.execute-api.us-east-1.amazonaws.com/dev/getfilter';
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      requestOptions = {
        headers: headers
      };
    return new Promise((resolve, reject) => {
      this.http.post(url, body , requestOptions).subscribe(response => {
        this.sharedService.showLoader.next(false);
        resolve(response);
      }, error => {
        this.sharedService.showLoader.next(false);
        console.log('Error ', error);
        reject(error);
      });
    }).catch((ex) => {
      this.sharedService.showLoader.next(false);
      reject(ex);
    });

  }
}
