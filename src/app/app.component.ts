import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ){
    this.iconRegistry.addSvgIcon(
      'google',this.sanitizer.bypassSecurityTrustResourceUrl(
        `/assets/icons/google.svg`
      )
      );
    this.iconRegistry.addSvgIcon(
      'facebook',this.sanitizer.bypassSecurityTrustResourceUrl(
        `/assets/icons/facebook.svg`
      )
      );
    this.iconRegistry.addSvgIcon(
      'twitter',this.sanitizer.bypassSecurityTrustResourceUrl(
        `/assets/icons/twitter.svg`
      )
      );
    this.iconRegistry.addSvgIcon(
      'github',this.sanitizer.bypassSecurityTrustResourceUrl(
        `/assets/icons/github.svg`
      )
      );
  }
}
