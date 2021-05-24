import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgFallback]'
})
export class ImgFallbackDirective {
  @Input() appImgFallback: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('error')
  loadFallbackError() {
    const element: HTMLImageElement = this.el.nativeElement as HTMLImageElement;
    element.src = this.appImgFallback || 'https://blog.seigoo.com/Media/blogseigoo/Images/error-404-not-found.jpg';
  }
}
