import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  lang = inject(LanguageService);

  readonly commands = [
    'AI_ENGINEER.init()',
    'vllm serve Qwen/Qwen2-72B --tensor-parallel 8',
    'deepspeed --num_gpus=8 train.py',
    'llamafactory-cli train qlora_sft.yaml',
    'nvidia-smi --query-gpu=utilization.gpu',
    'python -m vllm.entrypoints.api_server',
    'torch.distributed.launch --nproc=8',
    'model.generate(max_new_tokens=4096)',
  ];

  displayText = signal('');
  isTyping = signal(true);

  private currentIndex = 0;
  private charIndex = 0;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private phase: 'typing' | 'pause' | 'deleting' = 'typing';

  ngOnInit(): void {
    this.tick();
  }

  ngOnDestroy(): void {
    if (this.timerId) clearTimeout(this.timerId);
  }

  private tick(): void {
    const current = this.commands[this.currentIndex];

    if (this.phase === 'typing') {
      if (this.charIndex <= current.length) {
        this.displayText.set(current.slice(0, this.charIndex));
        this.charIndex++;
        const jitter = 40 + Math.random() * 80;
        this.timerId = setTimeout(() => this.tick(), jitter);
      } else {
        this.phase = 'pause';
        this.timerId = setTimeout(() => this.tick(), 2200);
      }
    } else if (this.phase === 'pause') {
      this.phase = 'deleting';
      this.isTyping.set(false);
      this.tick();
    } else if (this.phase === 'deleting') {
      if (this.charIndex > 0) {
        this.charIndex--;
        this.displayText.set(current.slice(0, this.charIndex));
        const speed = 20 + Math.random() * 30;
        this.timerId = setTimeout(() => this.tick(), speed);
      } else {
        this.currentIndex = (this.currentIndex + 1) % this.commands.length;
        this.phase = 'typing';
        this.isTyping.set(true);
        this.timerId = setTimeout(() => this.tick(), 500);
      }
    }
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
