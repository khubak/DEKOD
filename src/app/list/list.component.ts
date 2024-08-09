import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  employees: any[] = [];
  searchTerm: string = '';
  positionFilter: string = '';
  page: number = 1;
  jobTitles: string[] = [];
  sortCriteria: string = '';
  sortDirection: boolean = true; // true for ascending, false for descending

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe((response) => {
      this.employees = response.data;
      this.jobTitles = Array.from(
        new Set(this.employees.map((employee) => employee.jobTitle))
      );
    });
  }

  filterByPosition() {
    if (this.positionFilter) {
      this.page = 1;
      return this.employees.filter(
        (employee) => employee.jobTitle === this.positionFilter
      );
    }
    return this.employees;
  }

  search() {
    return this.filterByPosition().filter(
      (employee) =>
        employee.firstName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortBy(criteria: string) {
    if (this.sortCriteria === criteria) {
      this.sortDirection = !this.sortDirection; // Toggle sort direction if the same criteria is selected
    } else {
      this.sortDirection = true; // Default to ascending if a new criteria is selected
    }
    this.sortCriteria = criteria;

    this.employees.sort((a, b) => {
      if (criteria === 'dateOfBirth') {
        return this.sortDirection
          ? new Date(a.dateOfBirth).getTime() -
              new Date(b.dateOfBirth).getTime()
          : new Date(b.dateOfBirth).getTime() -
              new Date(a.dateOfBirth).getTime();
      }
      return this.sortDirection
        ? a[criteria].localeCompare(b[criteria])
        : b[criteria].localeCompare(a[criteria]);
    });
  }
}
