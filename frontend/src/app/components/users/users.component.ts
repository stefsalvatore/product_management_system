import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  error: string = '';
  success: string = '';

  showAddModal: boolean = false;
  showEditModal: boolean = false;

  userForm: any = { email: '', password: '' };
  selectedUser: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.apiService.getUsers().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load users';
        this.loading = false;
      }
    });
  }

  openAddModal(): void {
    this.userForm = { email: '', password: '' };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onAddUser(): void {
    this.apiService.createUser(this.userForm).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'User created successfully';
          this.closeAddModal();
          this.loadUsers();
          setTimeout(() => this.success = '', 3000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to create user';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  openEditModal(user: any): void {
    this.selectedUser = { ...user };
    this.userForm = { email: user.email, password: '' };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedUser = null;
  }

  onUpdateUser(): void {
    const updateData: any = {};
    if (this.userForm.email) updateData.email = this.userForm.email;
    if (this.userForm.password) updateData.password = this.userForm.password;

    this.apiService.updateUser(this.selectedUser.id, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = 'User updated successfully';
          this.closeEditModal();
          this.loadUsers();
          setTimeout(() => this.success = '', 3000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to update user';
        setTimeout(() => this.error = '', 3000);
      }
    });
  }

  onDeleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.success = 'User deleted successfully';
            this.loadUsers();
            setTimeout(() => this.success = '', 3000);
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to delete user';
          setTimeout(() => this.error = '', 3000);
        }
      });
    }
  }
}
