import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelegramService } from "./services/telegram.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  telegram = inject(TelegramService);
  title = 'tg-angular-abstract-app';
  user: any;
  constructor() {
    this.telegram.ready();
    // Retrieve user data
    this.user = this.telegram.UserInfo
  }

  closeWebApp(): void {
    this.telegram.close()
  }
}
