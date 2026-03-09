import {
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';

interface Bullet {
  x: number;
  y: number;
  speed: number;
}

interface Enemy {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  label: string;
  color: string;
  hp: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
  brightness: number;
}

@Component({
  selector: 'app-game',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class GameComponent implements AfterViewInit, OnDestroy {
  lang = inject(LanguageService);
  @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  gameState = signal<'idle' | 'playing' | 'over'>('idle');
  score = signal(0);
  highScore = signal(0);
  lives = signal(3);

  private ctx!: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;
  private animId = 0;
  private spawnTimer = 0;
  private difficultyTimer = 0;
  private spawnInterval = 90;

  private ship = { x: 0, y: 0, w: 40, h: 28 };
  private bullets: Bullet[] = [];
  private enemies: Enemy[] = [];
  private particles: Particle[] = [];
  private stars: Star[] = [];
  private keys: Record<string, boolean> = {};
  private shootCooldown = 0;
  private audioCtx: AudioContext | null = null;
  soundEnabled = signal(true);

  private readonly enemyTypes: { label: string; color: string; hp: number; speed: number }[] = [
    { label: 'BUG', color: '#ff5f56', hp: 1, speed: 1.5 },
    { label: 'OOM', color: '#ff3d71', hp: 2, speed: 1.2 },
    { label: 'NaN', color: '#ffbd2e', hp: 1, speed: 2.0 },
    { label: 'LEAK', color: '#ff6b00', hp: 1, speed: 1.8 },
    { label: '500', color: '#e040fb', hp: 2, speed: 1.0 },
    { label: 'CUDA ERR', color: '#ff1744', hp: 3, speed: 0.8 },
    { label: 'TIMEOUT', color: '#ff9100', hp: 1, speed: 2.5 },
    { label: 'SEGFAULT', color: '#d500f9', hp: 2, speed: 1.3 },
    { label: 'DEADLOCK', color: '#ff3d00', hp: 3, speed: 0.7 },
    { label: '404', color: '#ffc400', hp: 1, speed: 2.2 },
  ];

  ngAfterViewInit(): void {
    const saved = localStorage.getItem('shuttle_highscore');
    if (saved) this.highScore.set(parseInt(saved, 10));
    this.initCanvas();
    this.initStars();
    this.drawIdle();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    this.keys[e.key] = true;
    if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
    }
    if (this.gameState() === 'idle' || this.gameState() === 'over') {
      if (e.key === ' ' || e.key === 'Enter') this.startGame();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(e: KeyboardEvent): void {
    this.keys[e.key] = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.initCanvas();
  }

  toggleSound(): void {
    this.soundEnabled.update(v => !v);
  }

  startGame(): void {
    if (!this.audioCtx) this.audioCtx = new AudioContext();
    this.score.set(0);
    this.lives.set(3);
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    this.spawnTimer = 0;
    this.difficultyTimer = 0;
    this.spawnInterval = 90;
    this.ship.x = this.W / 2;
    this.ship.y = this.H - 60;
    this.gameState.set('playing');
    cancelAnimationFrame(this.animId);
    this.loop();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.parentElement!.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.W = rect.width;
    this.H = rect.height;
    canvas.width = this.W * dpr;
    canvas.height = this.H * dpr;
    canvas.style.width = this.W + 'px';
    canvas.style.height = this.H + 'px';
    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(dpr, dpr);
    this.ship.x = this.W / 2;
    this.ship.y = this.H - 60;
  }

  private initStars(): void {
    this.stars = [];
    for (let i = 0; i < 80; i++) {
      this.stars.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        speed: 0.2 + Math.random() * 0.8,
        size: 0.5 + Math.random() * 1.5,
        brightness: 0.3 + Math.random() * 0.7,
      });
    }
  }

  private drawIdle(): void {
    const draw = () => {
      if (this.gameState() === 'playing') return;
      this.ctx.clearRect(0, 0, this.W, this.H);
      this.updateStars();
      this.drawStars();

      this.ctx.fillStyle = '#00ffc8';
      this.ctx.font = 'bold 28px "JetBrains Mono", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('GPU DEFENDER', this.W / 2, this.H / 2 - 40);

      this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
      this.ctx.font = '14px "JetBrains Mono", monospace';
      this.ctx.fillText('Destroy bugs before they crash your cluster', this.W / 2, this.H / 2);

      this.ctx.fillStyle = 'rgba(0,255,200,0.7)';
      this.ctx.font = '13px "JetBrains Mono", monospace';
      const blink = Math.floor(Date.now() / 600) % 2;
      if (blink) {
        this.ctx.fillText('[ PRESS SPACE OR CLICK START ]', this.W / 2, this.H / 2 + 40);
      }

      this.drawShipAt(this.W / 2, this.H / 2 + 80);

      if (this.highScore() > 0) {
        this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
        this.ctx.font = '11px "JetBrains Mono", monospace';
        this.ctx.fillText(`HIGH SCORE: ${this.highScore()}`, this.W / 2, this.H / 2 + 120);
      }

      this.animId = requestAnimationFrame(draw);
    };
    this.animId = requestAnimationFrame(draw);
  }

  private loop(): void {
    if (this.gameState() !== 'playing') return;

    this.update();
    this.render();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  private update(): void {
    const speed = 5;
    if (this.keys['ArrowLeft'] || this.keys['a']) this.ship.x = Math.max(this.ship.w / 2, this.ship.x - speed);
    if (this.keys['ArrowRight'] || this.keys['d']) this.ship.x = Math.min(this.W - this.ship.w / 2, this.ship.x + speed);
    if (this.keys['ArrowUp'] || this.keys['w']) this.ship.y = Math.max(this.ship.h, this.ship.y - speed);
    if (this.keys['ArrowDown'] || this.keys['s']) this.ship.y = Math.min(this.H - this.ship.h, this.ship.y + speed);

    if (this.shootCooldown > 0) this.shootCooldown--;
    if (this.keys[' '] && this.shootCooldown <= 0) {
      this.bullets.push({ x: this.ship.x - 8, y: this.ship.y - this.ship.h / 2, speed: 8 });
      this.bullets.push({ x: this.ship.x + 8, y: this.ship.y - this.ship.h / 2, speed: 8 });
      this.shootCooldown = 10;
      this.sfxShoot();
    }

    for (const b of this.bullets) b.y -= b.speed;
    this.bullets = this.bullets.filter(b => b.y > -10);

    this.spawnTimer++;
    this.difficultyTimer++;
    if (this.difficultyTimer % 600 === 0 && this.spawnInterval > 30) {
      this.spawnInterval -= 5;
    }
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnEnemy();
      this.spawnTimer = 0;
    }

    for (const e of this.enemies) e.y += e.speed;

    this.checkCollisions();
    this.updateParticles();
    this.updateStars();

    this.enemies = this.enemies.filter(e => e.y < this.H + 40);

    for (const e of this.enemies) {
      if (e.y + e.h / 2 > this.H - 10) {
        this.lives.update(v => v - 1);
        this.spawnExplosion(e.x, this.H - 10, '#ff5f56', 6);
        this.sfxDamage();
        e.y = this.H + 100;
        if (this.lives() <= 0) this.endGame();
      }
    }
  }

  private spawnEnemy(): void {
    const type = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
    const w = 40 + type.label.length * 7;
    this.enemies.push({
      x: w / 2 + Math.random() * (this.W - w),
      y: -30,
      w,
      h: 24,
      speed: type.speed + (this.difficultyTimer / 3000),
      label: type.label,
      color: type.color,
      hp: type.hp,
    });
  }

  private checkCollisions(): void {
    for (let bi = this.bullets.length - 1; bi >= 0; bi--) {
      const b = this.bullets[bi];
      for (let ei = this.enemies.length - 1; ei >= 0; ei--) {
        const e = this.enemies[ei];
        if (
          b.x > e.x - e.w / 2 && b.x < e.x + e.w / 2 &&
          b.y > e.y - e.h / 2 && b.y < e.y + e.h / 2
        ) {
          this.bullets.splice(bi, 1);
          e.hp--;
          if (e.hp <= 0) {
            this.score.update(v => v + 10);
            this.spawnExplosion(e.x, e.y, e.color, 10);
            this.enemies.splice(ei, 1);
            this.sfxExplosion();
          } else {
            this.spawnExplosion(b.x, b.y, '#00ffc8', 3);
            this.sfxHit();
          }
          break;
        }
      }
    }

    for (const e of this.enemies) {
      const dx = Math.abs(this.ship.x - e.x);
      const dy = Math.abs(this.ship.y - e.y);
      if (dx < (this.ship.w + e.w) / 2 - 4 && dy < (this.ship.h + e.h) / 2 - 4) {
        this.lives.update(v => v - 1);
        this.spawnExplosion(e.x, e.y, '#ff5f56', 12);
        this.sfxDamage();
        e.y = this.H + 100;
        if (this.lives() <= 0) this.endGame();
      }
    }
  }

  private spawnExplosion(x: number, y: number, color: string, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 1 + Math.random() * 3;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        color,
        size: 2 + Math.random() * 3,
      });
    }
  }

  private updateParticles(): void {
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.vx *= 0.97;
      p.vy *= 0.97;
    }
    this.particles = this.particles.filter(p => p.life > 0);
  }

  private updateStars(): void {
    for (const s of this.stars) {
      s.y += s.speed;
      if (s.y > this.H) {
        s.y = 0;
        s.x = Math.random() * this.W;
      }
    }
  }

  private endGame(): void {
    this.gameState.set('over');
    this.sfxGameOver();
    if (this.score() > this.highScore()) {
      this.highScore.set(this.score());
      localStorage.setItem('shuttle_highscore', String(this.score()));
    }
    cancelAnimationFrame(this.animId);
    this.renderGameOver();
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.W, this.H);

    this.drawStars();

    for (const b of this.bullets) {
      this.ctx.fillStyle = '#00ffc8';
      this.ctx.shadowColor = '#00ffc8';
      this.ctx.shadowBlur = 6;
      this.ctx.fillRect(b.x - 1.5, b.y - 6, 3, 12);
      this.ctx.shadowBlur = 0;
    }

    for (const e of this.enemies) {
      this.ctx.fillStyle = e.color + '22';
      this.ctx.strokeStyle = e.color;
      this.ctx.lineWidth = 1.5;
      const r = 6;
      this.roundRect(e.x - e.w / 2, e.y - e.h / 2, e.w, e.h, r);
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.fillStyle = e.color;
      this.ctx.font = 'bold 10px "JetBrains Mono", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(e.label, e.x, e.y);
    }

    for (const p of this.particles) {
      const alpha = p.life / p.maxLife;
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;

    this.drawShipAt(this.ship.x, this.ship.y);

    this.ctx.fillStyle = 'rgba(0,255,200,0.15)';
    this.ctx.fillRect(0, this.H - 3, this.W, 3);
    this.ctx.fillStyle = '#00ffc8';
    this.ctx.fillRect(0, this.H - 3, this.W, 1);
  }

  private drawStars(): void {
    for (const s of this.stars) {
      this.ctx.globalAlpha = s.brightness * 0.5;
      this.ctx.fillStyle = '#fff';
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }

  private drawShipAt(x: number, y: number): void {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#00ffc8';
    ctx.shadowColor = '#00ffc8';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(-16, 12);
    ctx.lineTo(-6, 8);
    ctx.lineTo(0, 14);
    ctx.lineTo(6, 8);
    ctx.lineTo(16, 12);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#0a0a14';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#00b4ff';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    if (this.gameState() === 'playing') {
      const flicker = 0.5 + Math.random() * 0.5;
      ctx.globalAlpha = flicker;
      ctx.fillStyle = '#ff6b00';
      ctx.beginPath();
      ctx.moveTo(-4, 14);
      ctx.lineTo(0, 22 + Math.random() * 6);
      ctx.lineTo(4, 14);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  private renderGameOver(): void {
    const draw = () => {
      if (this.gameState() !== 'over') return;
      this.ctx.clearRect(0, 0, this.W, this.H);
      this.updateStars();
      this.updateParticles();
      this.drawStars();

      for (const p of this.particles) {
        const alpha = p.life / p.maxLife;
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.globalAlpha = 1;

      this.ctx.fillStyle = '#ff5f56';
      this.ctx.font = 'bold 26px "JetBrains Mono", monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('SYSTEM CRASHED', this.W / 2, this.H / 2 - 40);

      this.ctx.fillStyle = '#fff';
      this.ctx.font = '16px "JetBrains Mono", monospace';
      this.ctx.fillText(`SCORE: ${this.score()}`, this.W / 2, this.H / 2);

      this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
      this.ctx.font = '12px "JetBrains Mono", monospace';
      this.ctx.fillText(`HIGH SCORE: ${this.highScore()}`, this.W / 2, this.H / 2 + 30);

      this.ctx.fillStyle = 'rgba(0,255,200,0.7)';
      this.ctx.font = '13px "JetBrains Mono", monospace';
      const blink = Math.floor(Date.now() / 600) % 2;
      if (blink) {
        this.ctx.fillText('[ PRESS SPACE TO RETRY ]', this.W / 2, this.H / 2 + 70);
      }

      this.animId = requestAnimationFrame(draw);
    };
    this.animId = requestAnimationFrame(draw);
  }

  private roundRect(x: number, y: number, w: number, h: number, r: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x + r, y);
    this.ctx.lineTo(x + w - r, y);
    this.ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    this.ctx.lineTo(x + w, y + h - r);
    this.ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.ctx.lineTo(x + r, y + h);
    this.ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    this.ctx.lineTo(x, y + r);
    this.ctx.quadraticCurveTo(x, y, x + r, y);
    this.ctx.closePath();
  }

  // --- Audio SFX (Web Audio API, no external files) ---

  private sfxShoot(): void {
    if (!this.soundEnabled() || !this.audioCtx) return;
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }

  private sfxExplosion(): void {
    if (!this.soundEnabled() || !this.audioCtx) return;
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  }

  private sfxHit(): void {
    if (!this.soundEnabled() || !this.audioCtx) return;
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }

  private sfxDamage(): void {
    if (!this.soundEnabled() || !this.audioCtx) return;
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }

  private sfxGameOver(): void {
    if (!this.soundEnabled() || !this.audioCtx) return;
    const ctx = this.audioCtx;
    const notes = [440, 370, 311, 220];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      const t = ctx.currentTime + i * 0.2;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  onTouchStart(key: string): void {
    this.keys[key] = true;
    if (this.gameState() === 'idle' || this.gameState() === 'over') {
      if (key === ' ') this.startGame();
    }
  }

  onTouchEnd(key: string): void {
    this.keys[key] = false;
  }
}
