import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SidebarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  protected sidebarVisible: boolean = false;
  protected isUserLoggedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.isUserLoggedIn = true;        
      } else {
        this.isUserLoggedIn = false;
      };
    }
  )};


  protected loginUser():void {
    this.auth.loginWithRedirect();
  };

  protected logoutUser():void {
    this.auth.logout();
  };
}
