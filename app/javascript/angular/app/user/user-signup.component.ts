import { Component } from '@angular/core';
import { User } from '../user';

import templateString from './user-signup.component.html';

@Component({
  template: templateString
})

export class UserSignupComponent {
  submitted = false;

  model = new User(0, 'test@example.com', 'Taro', 'Suzuki', '', '', '', ''); // TODO

  onSubmit() {
    this.submitted = true;
    // authenticity_token
    document.forms[1].appendChild(document.forms[0].elements[1]);
    document.forms[1].submit();
  }

  newUser() {
    this.model = new User(0, '', '', '', '', '', '', '');
  }

  get diagnostic() { return JSON.stringify(this.model); };
}