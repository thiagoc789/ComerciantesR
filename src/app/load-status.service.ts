import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadStatusService {

  public isFirstLoad: boolean = true;

  constructor() { }
}
