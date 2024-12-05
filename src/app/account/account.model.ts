//import { User } from "../user/user.model";

//export class Account {
//  accountId: number = 0;
//  accountNumber: string = '';
//  balance: number = 0;
//  accountType: string | null = null; // Savings, Checking, Loan
//  currency: string | null = null; // USD, EUR, INR, BDT
//  userId: number = 0;

//  // Optional: Add user details if needed
//  //user?: User;
//  //transactions?: Transaction[];
//}
import { User } from '../user/user.model';

export class Account {
  accountId: number = 0;
  accountNumber: string = '';
  balance: number = 0;
  accountType: string | null = null;
  currency: string | null = null;
  userId: number = 0;

  // Add user property
  user?: User;
}
