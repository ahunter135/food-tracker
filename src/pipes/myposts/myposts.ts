import { Pipe, PipeTransform } from '@angular/core';
import { UserProvider } from '../../providers/stores/user';
@Pipe({
  name: 'myposts',
})
export class MypostsPipe implements PipeTransform {
  
  constructor(private user: UserProvider) {}

  transform(value, ...args) {
    let postArr = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i].uid === this.user.user.uid) {
        postArr.push(value[i]);
      }
    }

    return postArr;
  }
}
