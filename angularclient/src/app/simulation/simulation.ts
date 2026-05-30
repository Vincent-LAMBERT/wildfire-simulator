import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulation',
  imports: [CommonModule, FormsModule],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation {
  private _grid_width: number = 15;
  private _grid_height: number = 15;
  private _simul_step: number = 15;
  private _propag_prob: String = "";
  private _fired_up_trees: String = "";

  @Input()
  set grid_width(value: number) {
    this._grid_width = value;
    this.reinitializeGrid(); // React to changes
  }

  get grid_width(): number {
    return this._grid_width;
  }

  @Input()
  set grid_height(value: number) {
    this._grid_height = value;
    this.reinitializeGrid(); // React to changes
  }

  get grid_height(): number {
    return this._grid_height;
  }

  @Input()
  set simul_step(value: number) {
    this._simul_step = value;
  }

  get simul_step(): number {
    return this._simul_step;
  }

  @Input()
  set propag_prob(value: String) {
    this._propag_prob = value;
  }

  get propag_prob(): String {
    return this._propag_prob;
  }

  @Input()
  set ired_up_trees(value: String) {
    this._fired_up_trees = value;
  }

  get ired_up_trees(): String {
    return this._fired_up_trees;
  }
  
  cellSize: string = '30px'; // Default width

  grid: number[][] = [];
  autoSimulating = false;
  currentStep = 0;

  // Initialize the grid when the component is created
  constructor() {
    this.reinitializeGrid();
  }

  // Helper method to initialize the grid
  public reinitializeGrid() {
    this.grid = Array(this.grid_height)
      .fill(null)
      .map(() => Array(this.grid_width).fill(0));
    this.updateCellWidth();
  }

  private updateCellWidth() {
    const size = 400 / Math.max(this.grid_width, this.grid_height);
    this.cellSize = `${size}px`;
  }

  public toggleFire(x: number, y: number) {
    console.log(`Toggling fire state at (${x}, ${y})`);
    if (this.grid[x][y] === 0) {
      this.grid[x][y] = 1; // Set on fire
    } else if (this.grid[x][y] === 1) {
      this.grid[x][y] = 0; // Empty
    }
  }

  // Toggle auto-simulation when the checkbox changes
  onAutoSimulateToggle() {
    this.autoSimulating = !this.autoSimulating;
  }

  public nextStepSimulation() {
  }

  public startStopAutoSimulation() {
  }
}
