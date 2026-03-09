import { Component, inject, signal, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

interface TermLine {
  type: 'command' | 'response' | 'blank';
  text: string;
}

interface TermSession {
  command: string;
  responses: string[];
}

@Component({
  selector: 'app-contact',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnInit, OnDestroy {
  lang = inject(LanguageService);
  @ViewChild('termBody') termBody!: ElementRef<HTMLDivElement>;

  name = '';
  email = '';
  message = '';

  termLines = signal<TermLine[]>([]);
  currentTyping = signal('');
  showCursor = signal(true);

  private sessions: TermSession[] = [
    { command: 'ssh savi@ai-cluster', responses: ['Connected to GPU node [A100x8]'] },
    { command: 'nvidia-smi', responses: ['8x NVIDIA A100 80GB | Utilization: 94%', 'Temperature: 62°C | Power: 287W/300W'] },
    { command: 'python serve.py --model qwen-72b', responses: ['Loading model weights... ████████████ 100%', 'vLLM engine initialized. Ready.'] },
    { command: 'curl localhost:8000/v1/models', responses: ['{"models": ["qwen-72b"], "status": "serving"}'] },
    { command: 'deepspeed --num_gpus=8 train.py --zero_stage=3', responses: ['[DeepSpeed] ZeRO-3 enabled', 'Training... epoch 1/3 | loss: 0.847'] },
    { command: 'llamafactory-cli train qlora_sft.yaml', responses: ['[LLaMA-Factory] LoRA rank=64, alpha=128', 'Fine-tuning on 50k samples...', 'Checkpoint saved at step 2000'] },
    { command: 'vllm serve --tensor-parallel 4 --max-model-len 8192', responses: ['PagedAttention enabled | KV cache: 48GB', 'Serving at http://0.0.0.0:8000'] },
    { command: 'python benchmark.py --concurrent 128', responses: ['Throughput: 2,847 tokens/s', 'p50: 42ms | p99: 187ms | QPS: 312'] },
    { command: 'kubectl get pods -n llm-serving', responses: ['vllm-qwen-72b-0   Running   8/8 GPUs', 'vllm-qwen-72b-1   Running   8/8 GPUs'] },
    { command: 'python quantize.py --bits 4 --method awq', responses: ['Quantizing layers... 80/80 complete', 'Model size: 72B → 18.4GB (4-bit AWQ)'] },
    { command: 'htop --filter=python', responses: ['CPU: 12% | MEM: 247GB/512GB | SWAP: 0B'] },
    { command: 'tail -f /var/log/inference.log', responses: ['[INFO] Request #48291 | 512 tokens | 1.2s', '[INFO] Request #48292 | 1024 tokens | 2.1s', '[INFO] Batch size: 32 | Queue: 0'] },
  ];

  private timerId: ReturnType<typeof setTimeout> | null = null;
  private sessionIdx = 0;

  ngOnInit(): void {
    this.runNextSession();
  }

  ngOnDestroy(): void {
    if (this.timerId) clearTimeout(this.timerId);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.termBody) {
        this.termBody.nativeElement.scrollTop = this.termBody.nativeElement.scrollHeight;
      }
    }, 10);
  }

  private trimLines(): void {
    const lines = this.termLines();
    if (lines.length > 40) {
      this.termLines.set(lines.slice(lines.length - 30));
    }
  }

  private async runNextSession(): Promise<void> {
    const session = this.sessions[this.sessionIdx];
    this.sessionIdx = (this.sessionIdx + 1) % this.sessions.length;

    await this.typeCommand(session.command);
    for (const resp of session.responses) {
      await this.wait(300 + Math.random() * 400);
      this.termLines.update(lines => [...lines, { type: 'response', text: resp }]);
      this.scrollToBottom();
    }

    await this.wait(1500 + Math.random() * 1000);
    this.trimLines();
    this.runNextSession();
  }

  private typeCommand(cmd: string): Promise<void> {
    return new Promise(resolve => {
      let i = 0;
      this.currentTyping.set('');
      const tick = () => {
        if (i <= cmd.length) {
          this.currentTyping.set(cmd.slice(0, i));
          this.scrollToBottom();
          i++;
          const jitter = 30 + Math.random() * 70;
          this.timerId = setTimeout(tick, jitter);
        } else {
          this.termLines.update(lines => [...lines, { type: 'command', text: cmd }]);
          this.currentTyping.set('');
          this.scrollToBottom();
          resolve();
        }
      };
      tick();
    });
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      this.timerId = setTimeout(resolve, ms);
    });
  }

  onSubmit(): void {
    const subject = encodeURIComponent(`Portfolio Contact from ${this.name}`);
    const body = encodeURIComponent(`Name: ${this.name}\nEmail: ${this.email}\n\n${this.message}`);
    window.open(`mailto:savi@example.com?subject=${subject}&body=${body}`, '_blank');
  }
}
