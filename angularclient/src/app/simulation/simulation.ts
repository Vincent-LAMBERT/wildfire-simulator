import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-simulation',
  imports: [CommonModule],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation implements OnChanges {
  @Input()
  grid_width: number = 15;
  @Input()
  grid_height: number = 15;
  @Input()
  cellSize: string = '30px'; // Default width

  grid: number[][] = [];
  autoSimulating = false;
  currentStep = 0;

  // Initialize the grid when the component is created
  constructor() {
    this.initializeGrid();
  }

  // Reinitialize the grid when inputs change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['grid_width'] || changes['grid_height']) {
      this.initializeGrid();
    }
  }

  // Helper method to initialize the grid
  private initializeGrid() {
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
