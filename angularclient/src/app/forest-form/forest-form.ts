import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Simulation } from '../simulation/simulation';

@Component({
  selector: 'app-forest-form',
  imports: [Simulation, FormsModule],
  templateUrl: './forest-form.html',
  styleUrl: './forest-form.scss',
})
export class ForestForm {
  width = 15; // Default width
  height = 15; // Default height
}
