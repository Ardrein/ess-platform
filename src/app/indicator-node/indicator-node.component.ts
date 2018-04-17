import { Component, OnInit , Input} from '@angular/core';
import {Indicator} from '../models/indicator';

@Component({
  selector: 'app-indicator-node',
  templateUrl: './indicator-node.component.html',
  styleUrls: ['./indicator-node.component.css']
})
export class IndicatorNodeComponent implements OnInit {

	@Input() indicator:Indicator;

  constructor() { }

  ngOnInit() {
  }

}
