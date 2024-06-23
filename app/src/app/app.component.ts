import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BelongingsComponent } from "./belongings/belongings.component";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  implements OnInit {
  title = 'app';

  ngOnInit(): void {
    // Initialize the Telegram Web App
    const tg = (window as any).Telegram.WebApp;
    tg.ready();

    // Example: Set the background color to blue
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      tg.BackButton.hide();
    });

    console.log(tg.initDataUnsafe.user);


  }

  closeWebApp(): void {
    const tg = (window as any).Telegram.WebApp;
    tg.close();
  }
}
