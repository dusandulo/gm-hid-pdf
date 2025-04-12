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
  
  // CORS Proxy URL for GitHub Pages deployment
  private corsProxyUrl = 'https://corsproxy.io/?';
  
  // The URL to use for API calls
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // Check if we're running on GitHub Pages
    const isGitHubPages = window.location.hostname === 'dusandulo.github.io';
    
    // Use CORS proxy for GitHub Pages, direct connection otherwise
    this.apiUrl = isGitHubPages 
      ? `${this.corsProxyUrl}${encodeURIComponent(this.primaryApiUrl)}` 
      : this.primaryApiUrl;
    
    console.log('PDF SERVICE INITIALIZED - USING:', this.apiUrl);
  }

  generatePdf(formData: PdfFormData): Observable<Blob> {
    // For GitHub Pages, we need to adjust the endpoint with CORS proxy
    const endpoint = window.location.hostname === 'dusandulo.github.io'
      ? `${this.apiUrl}/generate`
      : `${this.apiUrl}/generate`;
      
    console.log('Generating PDF using endpoint:', endpoint);
    
    return this.http.post(endpoint, formData, {
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
    // For GitHub Pages, we need to adjust the endpoint with CORS proxy
    const endpoint = window.location.hostname === 'dusandulo.github.io'
      ? `${this.apiUrl}/generate-racun`
      : `${this.apiUrl}/generate-racun`;
      
    console.log('Generating Racun using endpoint:', endpoint);
    
    return this.http.post(endpoint, formData, {
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