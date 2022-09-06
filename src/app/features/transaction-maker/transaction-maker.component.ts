import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'tbh-transaction-maker',
    templateUrl: './transaction-maker.component.html',
    styleUrls: ['./transaction-maker.component.scss'],
})
export class TransactionMakerComponent {
    transactionForm = new FormGroup({
        utxo: new FormControl<string>('', Validators.required),
        amount: new FormControl<number>(0, Validators.required),
        address: new FormControl<string>('', Validators.required),
    });

    constructor() {}
}
