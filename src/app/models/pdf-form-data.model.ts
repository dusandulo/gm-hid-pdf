export interface Item {
  description: string;
  quantity: number;
  price: number;
}

export interface PdfFormData {
  subject: string;
  items: Item[];
  notes: string[];
  offerNumber: string;
  issueDate: string;
  clientName: string;
  clientAddress: string;
  clientCity: string;
  clientPostalCode: string;
  clientTaxId: string;
  clientCompanyId: string;
  manualTotal?: number;
}
