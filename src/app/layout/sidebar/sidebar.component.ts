import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([`/dashboard/${path}`]);
  }

  isActive(path: string): boolean {
    return this.router.url.includes(`/dashboard/${path}`);
  }

  logout() {
    // Aqui você coloca sua lógica de logout
    console.log('Usuário saiu');
    this.router.navigate(['/auth/login']);
  }
}
