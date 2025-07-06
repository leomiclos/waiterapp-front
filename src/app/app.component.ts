import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements AfterViewInit {
  title = 'waiterapp';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.routeToLogin();

    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 300);
    }
  }

  routeToLogin() {
    console.log('Routing to login page...');
    setTimeout(() => {
      this.router.navigate(['auth/login']);
    }, 1000);
  }
}
