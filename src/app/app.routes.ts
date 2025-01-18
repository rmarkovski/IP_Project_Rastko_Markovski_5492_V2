import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ShenLoreComponent } from './shen-lore/shen-lore.component';
import { WeeklyRotationComponent } from './weekly-rotation/weekly-rotation.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', component: WeeklyRotationComponent},
    {path: 'header', component: HeaderComponent},
    {path: 'ShenLore', component: ShenLoreComponent},
    {path: '**', redirectTo: ''}
];

