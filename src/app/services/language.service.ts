import { Injectable, signal, computed } from '@angular/core';
import { EN, ZH, Translations } from './i18n.data';

export type Language = 'en' | 'zh';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = signal<Language>('en');
  private translations: Record<Language, Translations> = { en: EN, zh: ZH };

  lang = this.currentLang.asReadonly();
  isEnglish = computed(() => this.currentLang() === 'en');

  t(key: string): string {
    return this.translations[this.currentLang()][key] ?? key;
  }

  toggleLanguage(): void {
    this.currentLang.update((lang) => (lang === 'en' ? 'zh' : 'en'));
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }
}
