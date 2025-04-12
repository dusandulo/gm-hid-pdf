import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { PdfFormData } from '../models/pdf-form-data.model';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  // Azure backend API base URL
  private baseApiUrl = 'https://pdf-generator-backend-hefpaqc4ckaeatae.germanywestcentral-01.azurewebsites.net/api/pdf';
  
  constructor(private http: HttpClient) {
    console.log('PDF SERVICE INITIALIZED - USING:', this.baseApiUrl);
  }

  generatePdf(formData: PdfFormData): Observable<Blob> {
    const endpoint = `${this.baseApiUrl}/generate`;
    console.log('Generating PDF using endpoint:', endpoint);
    
    return this.http.post(endpoint, formData, {
      responseType: 'blob'
    }).pipe(
      tap(() => console.log('PDF generation SUCCESS')),
      catchError(error => {
        console.error('PDF generation failed:', error);
        return throwError(() => new Error('Connection to PDF service failed. Please check your internet connection and try again.'));
      })
    );
  }

  generateRacun(formData: PdfFormData): Observable<Blob> {
    const endpoint = `${this.baseApiUrl}/generate-racun`;
    console.log('Generating Racun using endpoint:', endpoint);
    
    return this.http.post(endpoint, formData, {
      responseType: 'blob'
    }).pipe(
      tap(() => console.log('Racun generation SUCCESS')),
      catchError(error => {
        console.error('Racun generation failed:', error);
        return throwError(() => new Error('Connection to PDF service failed. Please check your internet connection and try again.'));
      })
    );
  }
}