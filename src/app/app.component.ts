import { Component } from '@angular/core';

import { diagram as data1 } from './graph/basic-layout/basic-layout-1.data';
import { diagram as data2 } from './graph/basic-layout/basic-layout-2.data';
import { diagram as data3 } from './graph/basic-layout/basic-layout-3.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  data1 = data1;
  data2 = data2;
  data3 = data3;
}
