import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, FooterComponent],
})
export class AppComponent {
  title = 'lol-weekly-rotation';
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
  }

}
