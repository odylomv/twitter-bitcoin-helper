import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'transaction-maker',
        loadChildren: () =>
            import('./features/transaction-maker/transaction-maker.module').then(m => m.TransactionMakerModule),
    },
    { path: '**', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
