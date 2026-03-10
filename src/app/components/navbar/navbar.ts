import { Component, inject, HostListener, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  lang = inject(LanguageService);
  scrolled = signal(false);
  mobileMenuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleLanguage(): void {
    this.lang.toggleLanguage();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
    document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
  }

  scrollTo(id: string): void {
    this.mobileMenuOpen.set(false);
    document.body.style.overflow = '';
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
