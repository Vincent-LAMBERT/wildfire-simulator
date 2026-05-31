import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SimulationService } from '../service/simulation-service';

@Component({
  selector: 'app-simulation',
  imports: [CommonModule, FormsModule],
  templateUrl: './simulation.html',
  styleUrl: './simulation.scss',
})
export class Simulation implements OnChanges {
  private _strategy: String = 'all_or_nothing';
  private _grid_width: number = 15;
  private _grid_height: number = 15;
  private _simul_step: number = 0.5;
  private _propag_prob: number = 0.5;
  private _fired_up_trees: TreeCoordinates[] = [];
  private _dead_trees: TreeCoordinates[] = [];
  private extinguished_trees: TreeCoordinates[] = [];
  @Input()
  public simulationEnded: boolean = false; // Flag to indicate if the simulation has ended

  @Input()
  set strategy(value: String) {
    this._strategy = value;
  }

  get strategy(): String {
    return this._strategy;
  }

  @Input()
  set grid_width(value: number) {
    this._grid_width = value;
    this.reinitializeGrid();
  }

  get grid_width(): number {
    return this._grid_width;
  }

  @Input()
  set grid_height(value: number) {
    this._grid_height = value;
    this.reinitializeGrid(); 
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
    // this.updateFiredUpTrees(); // React to changes
  }

  get fired_up_trees(): TreeCoordinates[] {
    return this._fired_up_trees;
  }

  @Input()
  set dead_trees(value: TreeCoordinates[]) {
    this._dead_trees = value;
    // this.updateDeadTrees(); // React to changes
  }

  get dead_trees(): TreeCoordinates[] {
    return this._dead_trees;
  }
  
  cellSize: string = '30px'; // Default width

  @Input()
  grid: number[][] = [];
  autoSimulating = false;
  currentStep = 0;

  constructor(
    private simulationService: SimulationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.updateGUITrees();
  }

  // Helper method to initialize the grid
  public reinitializeGrid() {
    this.grid = Array(this.grid_height)
      .fill(null)
      .map(() => Array(this.grid_width).fill(0));
    this.updateCellWidth();
    this.updateGUITrees();
  }

  private updateCellWidth() {
    const size = 400 / Math.max(this.grid_width, this.grid_height);
    this.cellSize = `${size}px`;
  }

  private updateFiredUpTrees() {
    this.fired_up_trees.forEach(element => {
      this.grid[element.x][element.y] = 1
    });
  }

  private updateDeadTrees() {
    this.dead_trees.forEach(element => {
      this.grid[element.x][element.y] = 2
    });
  }

  private updateExtinguishedTrees() {
    this.extinguished_trees.forEach(element => {
      this.grid[element.x][element.y] = 0
    });
    // Reinitialize extinguished trees to avoid too much loops in future iterations 
    this.extinguished_trees = [];
  }

  private updateGUITrees() {
    // Extinguish trees (fired up from the UI)
    this.updateExtinguishedTrees();
    // Update the grid with the new fired up trees
    this.updateFiredUpTrees();
    // Update the grid with the new dead trees
    this.updateDeadTrees();
    this.checkSimulationEnd();
    this.cdr.detectChanges(); // Manually trigger change detection to update the UI
  }

  private checkSimulationEnd() {
    return this.simulationEnded = this.fired_up_trees.length === 0;
  }

  public toggleFire(x: number, y: number) {
    const index = this.fired_up_trees.findIndex(tree => tree.x === x && tree.y === y);
    if (index !== -1) {
       // Remove the tree from the list as it is not fired up anymore
      this.fired_up_trees.splice(index, 1);
      // Add it to extinguished_trees to optimize code clarity in updateGUITrees
      this.extinguished_trees.push({ x, y })
    } else {
      // Fire the tree
      this.fired_up_trees.push({ x, y })
    }
    this.updateGUITrees();
  }

  // Toggle auto-simulation when the checkbox changes
  onAutoSimulateToggle() {
    this.autoSimulating = !this.autoSimulating;
  }

  public nextStepSimulation() {
    if (this.simulationEnded) {
      return; // Do not proceed if the simulation has already ended
    }
    this.currentStep++;
    const simulationState: BackEndSimulationState = {
      settings: {
        strategy: this.strategy,
        gridWidth: this.grid_width,
        gridHeight: this.grid_height,
        propagProb: this.propag_prob
      },
      firedUpTrees: this.fired_up_trees,
      deadTrees: this.dead_trees
    };
    this.simulationService.nextStep(simulationState).subscribe({
      next: (simulationState: BackEndSimulationState) => {
        this.fired_up_trees = simulationState.firedUpTrees;
        this.dead_trees = simulationState.deadTrees;
        this.updateGUITrees();
      },
      error: (err) => {
        console.error('Error fetching next step:', err);
      },
    });
  }

  public startStopAutoSimulation() {
    // Auto-simulation logic: if autoSimulating is true, we call nextStepSimulation every simul_step seconds
    if (this.autoSimulating) {
      this.nextStepSimulation();
      setTimeout(() => this.startStopAutoSimulation(), this.simul_step * 1000);
    }
  }
}
