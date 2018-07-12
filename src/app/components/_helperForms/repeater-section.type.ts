import { Component } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

/**
* Component used in formly's type for repeating a form.
*/
@Component({
  selector: 'formly-repeat-section',
  template: `
  <div class="row">
        <div *ngFor="let field of field.fieldGroup; let i = index;" class="card col-6"
          [ngClass]="{'alert-success': model[i].alert === 0, 
          'alert-warning': model[i].alert === 1 ,'alert-danger': model[i].alert === 2 }">
          <div class="card-body">
            <formly-group
              [model]="model[i]"
              [field]="field"
              [options]="options"
              [form]="formControl">
            </formly-group>
          </div>
      </div>
  </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {
  
  /**
  * @ignore
  * Constructor method.
  */
  constructor(builder: FormlyFormBuilder) {
    super(builder);
  }
}