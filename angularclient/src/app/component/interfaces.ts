interface TreeCoordinates {
  x: number;
  y: number;
}

interface Settings {
  strategy: String;
  grid_width: number;
  grid_height: number;
  propag_prob: number;
}

interface BackEndSettings {
  strategy: String;
  gridWidth: number;
  gridHeight: number;
  propagProb: number;
}

interface BackEndSimulationState {
  settings: BackEndSettings;
  firedUpTrees: TreeCoordinates[];
  deadTrees: TreeCoordinates[];
}