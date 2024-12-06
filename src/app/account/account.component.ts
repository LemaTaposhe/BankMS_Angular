
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { Account } from './account.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Account[] = [];
  accountForm: Account = new Account();
  selectedAccountId: number | null = null;
  currentUser: User | null = null;
  users: User[] = []; // To store the list of users

  constructor(private accountService: AccountService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllAccounts();
    this.loadCurrentUser(); 
    this.loadUsers(); 
  }

  // Get all accounts
  getAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  // Load users from the database for the dropdown
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Apply for an account
  applyForAccount(): void {
    if (this.currentUser) {
      this.accountForm.userId = this.accountForm.userId || this.currentUser.userId; 
      this.accountService.applyForAccount(this.accountForm).subscribe((newAccount) => {
        this.accounts.push(newAccount);
        this.accountForm = new Account(); // Reset form
      }, (error) => {
        console.error('Error applying for account', error);
      });
    }
  }

  // Get details of a specific account
  getAccountDetails(id: number): void {
    this.accountService.getAccountById(id).subscribe((account) => {
      this.selectedAccountId = account.accountId;
      this.accountForm = account;
    });
  }

  // Update account information
  updateAccount(): void {
    if (this.selectedAccountId != null) {
      this.accountService.updateAccount(this.selectedAccountId, this.accountForm).subscribe(() => {
        this.getAllAccounts();
        this.selectedAccountId = null;
        this.accountForm = new Account(); // Reset form
      });
    }
  }

  // Close account
  closeAccount(id: number): void {
    this.accountService.closeAccount(id).subscribe(() => {
      this.getAllAccounts();
    });
  }

  // Load current user details (Example)
  loadCurrentUser(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (userId) {
      this.userService.getUserById(userId).subscribe((user) => {
        this.currentUser = user;
      });
    }
  }
}
