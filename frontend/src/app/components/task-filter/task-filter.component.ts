import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Component for filtering tasks based on category and priority.
 * Emits filter criteria to the parent component.
 */
@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styles: []
})
export class TaskFilterComponent {

  /** Emits selected category to the parent */
  @Output() categoryFilter = new EventEmitter<string>();

  /** Emits selected priority to the parent */
  @Output() priorityFilter = new EventEmitter<string>();

  /** Emits an event to clear all filters */
  @Output() clearAllFilters = new EventEmitter<void>();

  /**
   * Handles the category dropdown change and emits selected value.
   * @param event - Change event from the category <select> element
   */
  onCategoryFilter(event: any): void {
    this.categoryFilter.emit(event.target.value);
  }

  /**
   * Handles the priority dropdown change and emits selected value.
   * @param event - Change event from the priority <select> element
   */
  onPriorityFilter(event: any): void {
    this.priorityFilter.emit(event.target.value);
  }

  /**
   * Emits a signal to reset all filters and resets the dropdown values to "all".
   */
  clearFilters(): void {
    this.clearAllFilters.emit();

    // Manually reset the select elements in the DOM
    const categorySelect = document.getElementById('categoryFilter') as HTMLSelectElement;
    const prioritySelect = document.getElementById('priorityFilter') as HTMLSelectElement;

    if (categorySelect) categorySelect.value = 'all';
    if (prioritySelect) prioritySelect.value = 'all';
  }
}
