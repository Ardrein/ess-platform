import { Component, Input, OnInit } from '@angular/core';

import { IndicatorsComponent } from '../indicators/indicators.component';

@Component({
  selector: 'app-indicator-tab',
  templateUrl: './indicator-tab.component.html',
  styleUrls: ['./indicator-tab.component.css']
})
export class IndicatorTabComponent implements OnInit {

	@Input() title:string;
	@Input() active = false;
	@Input() indicators;

  constructor(private indicatorsContainer:IndicatorsComponent) { 
  	this.indicatorsContainer.addTab(this);
  }

  ngOnInit() {
  }

}
