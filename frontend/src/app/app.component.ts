import { Component, inject } from '@angular/core';
import { TelegramService } from "./services/telegram/telegram.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tg-angular-abstract-frontend';
  user: any;
  telegram: TelegramService = inject(TelegramService)
  constructor(
  ) {
    this.telegram.ready();
    // Retrieve user data
    this.user = this.telegram.UserInfo

  }

  closeWebApp(): void {
    this.telegram.close()
  }
}
