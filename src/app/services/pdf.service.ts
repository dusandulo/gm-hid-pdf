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
  // Primary API endpoint - Azure hosted backend
  private primaryApiUrl = 'https://pdf-generator-backend-hefpaqc4ckaeatae.germanywestcentral-01.azurewebsites.net/api/pdf';
  
  // The URL to use for API calls
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Initialize with the primary API URL
    this.apiUrl = this.primaryApiUrl;
    
    console.log('PDF SERVICE INITIALIZED - USING:', this.apiUrl);
  }

  generatePdf(formData: PdfFormData): Observable<Blob> {
    console.log('Generating PDF using:', this.apiUrl);
    
    return this.http.post(`${this.apiUrl}/generate`, formData, {
      responseType: 'blob'
    }).pipe(
      tap(() => console.log('PDF generation SUCCESS')),
      catchError(error => {
        console.error('PDF generation failed:', error);
        // Return a proper error that can be displayed to the user
        return throwError(() => new Error('Connection to PDF service failed. Please check your internet connection and try again.'));
      })
    );
  }

  generateRacun(formData: PdfFormData): Observable<Blob> {
    console.log('Generating Racun using:', this.apiUrl);
    
    return this.http.post(`${this.apiUrl}/generate-racun`, formData, {
      responseType: 'blob'
    }).pipe(
      tap(() => console.log('Racun generation SUCCESS')),
      catchError(error => {
        console.error('Racun generation failed:', error);
        // Return a proper error that can be displayed to the user
        return throwError(() => new Error('Connection to PDF service failed. Please check your internet connection and try again.'));
      })
    );
  }
}