import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Simulation } from './simulation/simulation';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Simulation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wildfire-simulation');

  private http = inject(HttpClient);

  public grid_width = signal(15);
  public grid_height = signal(15);
  public simul_step = signal(0.5);
  public propag_prob = signal(0.5);
  public fired_up_trees = signal('');

  constructor() {
      this.loadConfig();
    }

  private loadConfig() {
    console.log('loading')
    this.http.get<{
      grid_width: number;
      grid_height: number;
      simul_step: number;
      propag_prob: number;
      fired_up_trees: string;
    }>('assets/config.json').subscribe((config) => {
      this.grid_width.set(config.grid_width);
      this.grid_height.set(config.grid_height);
      this.simul_step.set(config.simul_step);
      this.propag_prob.set(config.propag_prob);
      this.fired_up_trees.set(config.fired_up_trees);

      // ✅ Log the updated values here
      console.log('grid_width: ' + this.grid_width());
      console.log('grid_height: ' + this.grid_height());
      console.log('simul_step: ' + this.simul_step());
      console.log('propag_prob: ' + this.propag_prob());
      console.log('fired_up_trees: ' + this.fired_up_trees());
    });
  }
}