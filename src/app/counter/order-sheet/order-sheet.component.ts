import { Component, OnInit } from '@angular/core';
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
export class OrderSheetComponent implements OnInit {

  orderSheetForm: FormGroup;
  weirdRequestsControls: FormArray;
  showWelcomeMessage = false;
  customerNameControl;

  constructor(private formBuilder: FormBuilder) {
    this.buildOrderSheetForm();
  }

  ngOnInit() {}
  
  buildOrderSheetForm() {
    this.orderSheetForm = this.formBuilder.group({
      customerName: ['', 
        [Validators.required, 
        Validators.minLength(3)]],
      size: '',
      bread: '',
      specialtySandwich: '',
      weirdRequests: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      otherNotes: '',
      meats: this.formBuilder.group({
        meatHam: false,
        meatTurkey: '',
        meatRoastBeef: ''
      }),
      cheeses: this.formBuilder.group({
        cheeseProvolone: '',
        cheeseCheddar: '',
        cheeseSwiss: ''
      }),
      veggiesAndSuch: this.formBuilder.group({
        veggieLettuce: '',
        veggieTomato: '',
        veggieMustard: ''
      })
    },
    {
      validator: CustomValidators.requiredWhen('bread','specialtySandwich')
    }
    );

    this.weirdRequestsControls = this.orderSheetForm.get('weirdRequests') as FormArray;
    this.customerNameControl = this.orderSheetForm.get('customerName') as FormControl;
    
    this.customerNameControl
      .valueChanges
      .subscribe((value) => {
        this.showWelcomeMessage = value && value.toLowerCase().trim() === 'jampi';
      });
  }

  onAddWeirdRequest() {
    this.weirdRequestsControls.push(this.formBuilder.control(''));
  }

  onRemoveWeirdRequest(index: number) {
    this.weirdRequestsControls.removeAt(index);
  }

  onResetForm() {
    // this.orderSheetForm.reset();
    this.orderSheetForm.get('customerName').reset();
    
  }

  onResetWeirdRequests() {
    this.weirdRequestsControls.reset();
  }

  onSubmitForm() {
    console.log(this.orderSheetForm.value);
  }

}
