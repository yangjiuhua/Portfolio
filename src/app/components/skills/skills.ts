import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  titleKey: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [MatIconModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  lang = inject(LanguageService);

  categories: SkillCategory[] = [
    {
      titleKey: 'skills.cat.inference',
      icon: 'bolt',
      skills: [
        { name: 'vLLM', icon: '⚡', level: 95 },
        { name: 'vLLM-Ascend', icon: '🔺', level: 90 },
        { name: 'TensorRT-LLM', icon: '🚀', level: 80 },
        { name: 'Triton Inference', icon: '🔱', level: 85 },
      ],
    },
    {
      titleKey: 'skills.cat.training',
      icon: 'fitness_center',
      skills: [
        { name: 'DeepSpeed', icon: '🏎️', level: 92 },
        { name: 'LLaMA-Factory', icon: '🦙', level: 93 },
        { name: 'LoRA / QLoRA', icon: '🧬', level: 88 },
        { name: 'Megatron-LM', icon: '⚙️', level: 75 },
      ],
    },
    {
      titleKey: 'skills.cat.gpu',
      icon: 'memory',
      skills: [
        { name: 'CUDA', icon: '💚', level: 90 },
        { name: 'NVIDIA A100/H100', icon: '🖥️', level: 92 },
        { name: 'Ascend 910B', icon: '🔷', level: 85 },
        { name: 'Multi-GPU / NVLink', icon: '🔗', level: 88 },
      ],
    },
    {
      titleKey: 'skills.cat.mlops',
      icon: 'cloud',
      skills: [
        { name: 'Kubernetes', icon: '☸️', level: 85 },
        { name: 'Docker', icon: '🐳', level: 90 },
        { name: 'Ray Serve', icon: '☀️', level: 82 },
        { name: 'Prometheus/Grafana', icon: '📊', level: 80 },
      ],
    },
    {
      titleKey: 'skills.cat.languages',
      icon: 'code',
      skills: [
        { name: 'Python', icon: '🐍', level: 95 },
        { name: 'C++ / CUDA C', icon: '⚙️', level: 78 },
        { name: 'PyTorch', icon: '🔥', level: 92 },
        { name: 'Bash / Linux', icon: '🐧', level: 88 },
      ],
    },
    {
      titleKey: 'skills.cat.models',
      icon: 'psychology',
      skills: [
        { name: 'LLaMA / Qwen', icon: '🧠', level: 93 },
        { name: 'Transformer Arch', icon: '🏗️', level: 90 },
        { name: 'MoE Models', icon: '🎯', level: 82 },
        { name: 'Multimodal LLMs', icon: '👁️', level: 78 },
      ],
    },
  ];
}
