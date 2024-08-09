import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav>
      <a routerLink="/" routerLinkActive="active-link">Employee List</a>
      <a routerLink="/form" routerLinkActive="active-link">Add Employee</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      nav {
        display: flex;
        gap: 15px;
        background-color: #f8f9fa;
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }
      a {
        text-decoration: none;
        color: #007bff;
        padding: 5px 10px;
        border-radius: 3px;
      }
      a.active-link {
        background-color: #007bff;
        color: #fff;
      }
    `,
  ],
})
export class AppComponent {
  title = 'dekod';
}
