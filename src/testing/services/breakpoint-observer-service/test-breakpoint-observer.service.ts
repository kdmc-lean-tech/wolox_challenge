import { Injectable } from '@angular/core';
import {
  BreakpointObserverService
} from '@services/breakpoint-observer/breakpoint-observer.service';
import { asyncData } from '@testing/helpers/async-observable-helpers';
import { Observable } from 'rxjs';

@Injectable()
export class TestBreakPointObserverService extends BreakpointObserverService {
  constructor() {
    super();
  }

  public get sizeBreakpoint$(): Observable<string> {
    return asyncData('xs');
  }
}
