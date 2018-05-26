import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  CommonService
} from '../common.service';
import {
  User
} from './user';
import {
  SharedService
} from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errormsg: any;
  username: any;
  password: any;
  user: User = new User();
  showLoader: boolean;
  constructor(private router: Router, private service: CommonService, private sharedService: SharedService) {
    // this.user.email = '';
    // this.user.password = '';
    this.sharedService.showLoader.subscribe((event: boolean) => {
      this.showLoader = event;
    });
  }

  ngOnInit() {}

  doLogin() {
    this.sharedService.showLoader.next(true);
    if (this.user.email === 'admin@startv.com' && this.user.password === 'P@ssw0rd') {
      this.router.navigate(['home/question']);
      /*this.service.getFilterData().then(res => {
        console.log('Response ', res);
      }).catch(err => {
        console.log('Error ', err);
      });*/
      this.sharedService.showLoader.next(false);
    } else {
      console.log('user Invalid ');
      this.errormsg = 'Invalid User & Password!';
      this.sharedService.showLoader.next(false);
    }
  }
  onchange() {
    this.errormsg = '';
  }
  onSubmit() {
    /* this.service.getFilterData().then(res => {
       console.log('Response ', res);
     }).catch(err => {
       console.log('Error ', err);
     });*/
    this.router.navigate(['dashboard']);
  }

}
