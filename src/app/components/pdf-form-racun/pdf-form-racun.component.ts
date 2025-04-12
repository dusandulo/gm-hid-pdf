import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { PdfFormData } from '../../models/pdf-form-data.model';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pdf-form-racun',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pdf-form-racun.component.html',
  styleUrls: ['./pdf-form-racun.component.scss']
})
export class PdfFormRacunComponent {
  formData: PdfFormData = {
    subject: '',
    items: [
      { description: '', quantity: 1, price: 0 }
    ],
    notes: [],
    offerNumber: '',
    issueDate: new Date().toISOString().substring(0, 10),
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientPostalCode: '',
    clientTaxId: '',
    clientCompanyId: '',
    manualTotal: undefined
  };

  newNote = '';
  isLoading = false;
  errorMessage = '';
  currentYear = new Date().getFullYear();

  get totalPrice(): number {
    return this.formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }
  
  formatPrice(price: number): string {
    return new Intl.NumberFormat('sr-RS', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  }

  constructor(private pdfService: PdfService, private http: HttpClient) {}

  addItem() {
    this.formData.items.push({ description: '', quantity: 1, price: 0 });
  }

  removeItem(index: number) {
    if (this.formData.items.length > 1) {
      this.formData.items.splice(index, 1);
    } else {
      alert("Mora postojati bar jedna stavka u računu.");
    }
  }

  addNote() {
    if (this.newNote.trim()) {
      this.formData.notes.push(this.newNote.trim());
      this.newNote = '';
    }
  }

  removeNote(index: number) {
    this.formData.notes.splice(index, 1);
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.pdfService.generateRacun(this.formData).subscribe({
      next: (pdfBlob: Blob) => {
        console.log('Račun generated successfully!');
        this.isLoading = false;
        this.downloadPdf(pdfBlob);
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error generating račun:', error);
        this.isLoading = false;
        this.errorMessage = 'Greška prilikom povezivanja sa serverom. Molimo proverite internet konekciju i pokušajte ponovo.';
      }
    });
  }

  private downloadPdf(pdfBlob: Blob): void {
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `racun-${this.formData.offerNumber}.pdf`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
