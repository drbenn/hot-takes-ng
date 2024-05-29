import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected currentYear: Date = new Date();
}
