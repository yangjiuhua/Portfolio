import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  lang = inject(LanguageService);
  year = new Date().getFullYear();
}
