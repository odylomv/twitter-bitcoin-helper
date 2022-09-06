import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionMakerRoutingModule } from './transaction-maker-routing.module';
import { TransactionMakerComponent } from './transaction-maker.component';

@NgModule({
    declarations: [TransactionMakerComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        TransactionMakerRoutingModule,
    ],
})
export class TransactionMakerModule {}
