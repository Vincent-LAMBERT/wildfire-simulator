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
  private _simul_step: number = 0.5;
  private _propag_prob: number = 0.5;
  private _fired_up_trees: TreeCoordinates[] = [];
  private extinguished_trees: TreeCoordinates[] = [];

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
  set propag_prob(value: number) {
    this._propag_prob = value;
  }

  get propag_prob(): number {
    return this._propag_prob;
  }

  @Input()
  set fired_up_trees(value: TreeCoordinates[]) {
    this._fired_up_trees = value;
    this.updateTreesState(); // React to changes
  }

  get fired_up_trees(): TreeCoordinates[] {
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
    this.updateTreesState();
  }

  private updateCellWidth() {
    const size = 400 / Math.max(this.grid_width, this.grid_height);
    this.cellSize = `${size}px`;
  }

  private updateTreesState() {
    // Extinguish trees
    this.extinguished_trees.forEach(element => {
      this.grid[element.x][element.y] = 0
    });
    // Fire up trees
    this.fired_up_trees.forEach(element => {
      this.grid[element.x][element.y] = 1
    });
    // Reinitialize extinguished trees to avoid too much loops in future iterations 
    this.extinguished_trees = [];
  }

  public toggleFire(x: number, y: number) {
    const index = this.fired_up_trees.findIndex(tree => tree.x === x && tree.y === y);
    if (index !== -1) {
       // Remove the tree from the list as it is not fired up anymore
      this.fired_up_trees.splice(index, 1);
      // Add it to extinguished_trees to optimize code clarity in updateTreesState
      this.extinguished_trees.push({ x, y })
    } else {
      // Fire the tree
      this.fired_up_trees.push({ x, y })
    }
    this.updateTreesState();
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
