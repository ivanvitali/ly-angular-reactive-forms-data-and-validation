import { Component } from '@angular/core';
import { 
  FormGroup, 
  FormBuilder, 
  FormControl, 
  FormArray, 
  Validators 
} from '@angular/forms';

import { CustomValidators } from '../shared/custom-validators';

@Component({
  selector: 'order-sheet',
  templateUrl: 'app/counter/order-sheet/order-sheet.component.html',
  styleUrls: ['app/counter/order-sheet/order-sheet.component.css']
})
export class OrderSheetComponent {

  orderSheetForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildOrderSheetForm();
  }
  
  buildOrderSheetForm() {
    this.orderSheetForm = this.formBuilder.group();
  }

}
