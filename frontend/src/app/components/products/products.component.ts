import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading: boolean = false;
  error: string = '';
  success: string = '';

  // Pagination
  currentPage: number = 1;
  limit: number = 10;
  totalPages: number = 1;
  total: number = 0;

  // Filters
  searchTerm: string = '';
  categoryFilter: string = '';
  sortBy: string = 'created_at';
  order: string = 'DESC';

  // Modal states
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showBulkModal: boolean = false;

  // Form data
  productForm: any = {
    name: '',
    price: 0,
    category_id: '',
    image: null
  };
  selectedProduct: any = null;
  bulkFile: File | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    const params = {
      page: this.currentPage,
      limit: this.limit,
      sortBy: this.sortBy,
      order: this.order,
      search: this.searchTerm,
      category: this.categoryFilter
    };

    this.apiService.getProducts(params).subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.data;
          this.total = response.pagination.total;
          this.totalPages = response.pagination.totalPages;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load products';
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data;
        }
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = column;
      this.order = 'ASC';
    }
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  openAddModal(): void {
    this.productForm = { name: '', price: 0, category_id: '', image: null };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.productForm = { name: '', price: 0, category_id: '', image: null };
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.image = file;
    }
  }

  onAddProduct(): void {
    const formData = new FormData();
    formData.append('name', this.productForm.name);
    formData.append('price', this.productForm.price);
    formData.append('category_id', this.productForm.category_id);
    if (this.productForm.image) {
      formData.append('image', this.productForm.image);
    }

    this.apiService.createProduct(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Product created successfully';
          this.closeAddModal();
          this.loadProducts();
          setTimeout(() => this.success = '', 3000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to create product';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  openEditModal(product: any): void {
    this.selectedProduct = { ...product };
    this.productForm = {
      name: product.name,
      price: product.price,
      category_id: product.category_id,
      image: null
    };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedProduct = null;
  }

  onUpdateProduct(): void {
    const formData = new FormData();
    formData.append('name', this.productForm.name);
    formData.append('price', this.productForm.price);
    formData.append('category_id', this.productForm.category_id);
    if (this.productForm.image) {
      formData.append('image', this.productForm.image);
    }

    this.apiService.updateProduct(this.selectedProduct.id, formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Product updated successfully';
          this.closeEditModal();
          this.loadProducts();
          setTimeout(() => this.success = '', 3000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to update product';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  onDeleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.success = 'Product deleted successfully';
            this.loadProducts();
            setTimeout(() => this.success = '', 3000);
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to delete product';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }

  openBulkModal(): void {
    this.showBulkModal = true;
  }

  closeBulkModal(): void {
    this.showBulkModal = false;
    this.bulkFile = null;
  }

  onBulkFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.bulkFile = file;
    }
  }

  onBulkUpload(): void {
    if (!this.bulkFile) {
      this.error = 'Please select a file';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.bulkFile);

    this.loading = true;
    this.apiService.bulkUploadProducts(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = `Bulk upload completed. Inserted: ${response.data.inserted}, Failed: ${response.data.failed}`;
          this.closeBulkModal();
          this.loadProducts();
          this.loading = false;
          setTimeout(() => this.success = '', 5000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Bulk upload failed';
        this.loading = false;
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  onExport(format: string): void {
    this.apiService.exportProducts(format, { search: this.searchTerm, category: this.categoryFilter }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.success = `Products exported as ${format.toUpperCase()}`;
        setTimeout(() => this.success = '', 3000);
      },
      error: (err) => {
        this.error = 'Failed to export products';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
