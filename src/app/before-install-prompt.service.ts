import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeforeInstallPromptService {
  private _promptEvent: any = null;
  public promptEvent$: Subject<any> = new Subject();

  constructor() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this._promptEvent = event;
      this.promptEvent$.next(event);
    });
  }

  public prompt() {
    if (!this._promptEvent) {
      return;
    }
    this._promptEvent.prompt();
    this._promptEvent = null;
  }
}
