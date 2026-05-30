import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ForestForm } from './forest-form/forest-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ForestForm],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wildfire-simulation');
}