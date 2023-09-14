import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes it a root-level service
})
export class ActiveRouteService {
  private activeRouteLabelSubject = new BehaviorSubject<string>('');
  activeRouteLabel$: Observable<string> = this.activeRouteLabelSubject.asObservable();

  setActiveRouteLabel(label: string) {
    this.activeRouteLabelSubject.next(label);
  }
}