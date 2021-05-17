import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';

const SIZE: Map<string, string> = new Map([
  ['lg', '(min-width: 1280px)'],
  ['md', '(min-width: 780px)'],
  ['sm', '(min-width: 480px)'],
  ['xs', '(min-width: 0px)'],
]);

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {
  private size$: Observable<string>;

  constructor() {
    this.size$ = fromEvent(window, 'resize')
      .pipe(
        startWith(this._getScreenSize()),
        map((event: Event) => {
          return this._getScreenSize();
        }),
        distinctUntilChanged(),
        shareReplay(1)
      );
  }

  public get sizeBreakpoint$(): Observable<string> {
    return this.size$;
  }

  private _getScreenSize(): string {
    const [[newSize = 'never']] = Array.from(SIZE.entries())
      .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);
    return newSize;
  }
}
