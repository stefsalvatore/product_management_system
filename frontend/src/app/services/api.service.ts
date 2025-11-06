import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Auth
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`, { headers: this.getHeaders() });
  }

  // Users
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data, { headers: this.getHeaders() });
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, data, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  // Categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`, { headers: this.getHeaders() });
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data, { headers: this.getHeaders() });
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, data, { headers: this.getHeaders() });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`, { headers: this.getHeaders() });
  }

  // Products
  getProducts(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get(`${this.baseUrl}/products`, {
      headers: this.getHeaders(),
      params: httpParams
    });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, formData, { headers: this.getHeaders() });
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, formData, { headers: this.getHeaders() });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`, { headers: this.getHeaders() });
  }

  bulkUploadProducts(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/bulk/upload`, formData, { headers: this.getHeaders() });
  }

  exportProducts(format: string, params?: any): Observable<Blob> {
    let httpParams = new HttpParams().set('format', format);
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get(`${this.baseUrl}/products/export`, {
      headers: this.getHeaders(),
      params: httpParams,
      responseType: 'blob'
    });
  }
}
