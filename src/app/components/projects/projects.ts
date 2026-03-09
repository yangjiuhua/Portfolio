import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { LanguageService } from '../../services/language.service';

interface Project {
  titleKey: string;
  descKey: string;
  techKey: string;
  icon: string;
  gradient: string;
}

@Component({
  selector: 'app-projects',
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  lang = inject(LanguageService);

  projects: Project[] = [
    {
      titleKey: 'projects.p1.title',
      descKey: 'projects.p1.desc',
      techKey: 'projects.p1.tech',
      icon: 'dns',
      gradient: 'linear-gradient(135deg, #00ffc8, #00b4ff)',
    },
    {
      titleKey: 'projects.p2.title',
      descKey: 'projects.p2.desc',
      techKey: 'projects.p2.tech',
      icon: 'developer_board',
      gradient: 'linear-gradient(135deg, #7c4dff, #00b4ff)',
    },
    {
      titleKey: 'projects.p3.title',
      descKey: 'projects.p3.desc',
      techKey: 'projects.p3.tech',
      icon: 'hub',
      gradient: 'linear-gradient(135deg, #ff6d00, #ffc107)',
    },
    {
      titleKey: 'projects.p4.title',
      descKey: 'projects.p4.desc',
      techKey: 'projects.p4.tech',
      icon: 'router',
      gradient: 'linear-gradient(135deg, #00ffc8, #76ff03)',
    },
    {
      titleKey: 'projects.p5.title',
      descKey: 'projects.p5.desc',
      techKey: 'projects.p5.tech',
      icon: 'compress',
      gradient: 'linear-gradient(135deg, #e040fb, #7c4dff)',
    },
    {
      titleKey: 'projects.p6.title',
      descKey: 'projects.p6.desc',
      techKey: 'projects.p6.tech',
      icon: 'monitoring',
      gradient: 'linear-gradient(135deg, #00b4ff, #00e5ff)',
    },
  ];

  getTechTags(techKey: string): string[] {
    return this.lang.t(techKey).split(', ');
  }
}
