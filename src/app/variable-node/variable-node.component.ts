import { Component, OnInit , Input} from '@angular/core';
import {Variable} from '../models/variable';

@Component({
  selector: 'app-variable-node',
  templateUrl: './variable-node.component.html',
  styleUrls: ['./variable-node.component.css']
})
export class VariableNodeComponent implements OnInit {

	@Input() variable:Variable;

  constructor() { }

  ngOnInit() {
  }

}
