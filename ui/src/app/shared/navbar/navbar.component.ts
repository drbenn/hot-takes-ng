import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SidebarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  sidebarVisible: boolean = false;

}
