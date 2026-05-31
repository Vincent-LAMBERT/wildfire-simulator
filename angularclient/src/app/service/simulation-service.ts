import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  private apiUrl = 'http://localhost:8081/api/simulation'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Call the /step endpoint to get the next BackendForestState
  nextStep(simulationState: BackEndSimulationState): Observable<BackEndSimulationState> {
    return this.http.post<BackEndSimulationState>(`${this.apiUrl}/step`, simulationState);
  }
}


