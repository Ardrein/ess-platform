import { Component, OnInit, Input } from '@angular/core';
import { IndicatorTabComponent } from '../indicator-tab/indicator-tab.component';

@Component({
	selector: 'app-indicators',
	templateUrl: './indicators.component.html',
	styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {

	@Input() indicatorsLists;		//informacion de los indicadores
	private indicatorTabs: IndicatorTabComponent[] = []; //listado de los componentes visuales para mostrarlos por pestañas.

	constructor() { 
		
	}

	ngOnInit() {
	}

	//recorrido de todos los @indicatorTabs dentro de este componente para desactivarlos y activar
	//el que hace el llamado al metodo (@tab).
	selectTab(tab:IndicatorTabComponent){
		this.indicatorTabs.forEach((tab)=>{
			tab.active = false;
		});
		tab.active = true;
	}


	addTab(tab:IndicatorTabComponent){
		if(this.indicatorTabs.length === 0){
			tab.active = true;
		}
		this.indicatorTabs.push(tab);
	}

}
