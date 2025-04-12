import { Routes } from '@angular/router';
import { PdfFormComponent } from './components/pdf-form/pdf-form.component';
import { PdfFormRacunComponent } from './components/pdf-form-racun/pdf-form-racun.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ponuda', component: PdfFormComponent },
  { path: 'racun', component: PdfFormRacunComponent },
  { path: '**', redirectTo: '' }
];
