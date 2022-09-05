import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TransactionMakerComponent } from './components/transaction-maker/transaction-maker.component';
import { TwitterGuard } from './guards/twitter.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [TwitterGuard] },
    { path: 'transaction-maker', component: TransactionMakerComponent },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
