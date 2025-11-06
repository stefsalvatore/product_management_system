import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  loading: boolean = false;
  error: string = '';
  success: string = '';

  showAddModal: boolean = false;
  showEditModal: boolean = false;

  categoryForm: any = { name: '' };
  selectedCategory: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.apiService.getCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories = response.data;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load categories';
        this.loading = false;
      }
    });
  }

  openAddModal(): void {
    this.categoryForm = { name: '' };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onAddCategory(): void {
    this.apiService.createCategory(this.categoryForm).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Category created successfully';
          this.closeAddModal();
          this.loadCategories();
          setTimeout(() => this.success = '', 3000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to create category';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  openEditModal(category: any): void {
    this.selectedCategory = { ...category };
    this.categoryForm = { name: category.name };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedCategory = null;
  }

  onUpdateCategory(): void {
    this.apiService.updateCategory(this.selectedCategory.id, this.categoryForm).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'Category updated successfully';
          this.closeEditModal();
          this.loadCategories();
          setTimeout(() => this.success = '', 3000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to update category';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  onDeleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.apiService.deleteCategory(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.success = 'Category deleted successfully';
            this.loadCategories();
            setTimeout(() => this.success = '', 3000);
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to delete category';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }
}
