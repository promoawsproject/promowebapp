import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';



@Injectable()
export class SharedService {
  applyFilter: BehaviorSubject < Object > = new BehaviorSubject({});
  showLoader: BehaviorSubject < boolean > = new BehaviorSubject(false);
}
