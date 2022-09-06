import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionMakerComponent } from './transaction-maker.component';

const routes: Routes = [{ path: '', component: TransactionMakerComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TransactionMakerRoutingModule {}
