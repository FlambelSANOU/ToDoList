import { Component } from '@angular/core';

/**
 * Root component of the To-Do List application.
 * Serve as the appliction shell and entry point.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  /** Application title displayed in the header or browser tab */
  title = 'To-Do List App';
}
