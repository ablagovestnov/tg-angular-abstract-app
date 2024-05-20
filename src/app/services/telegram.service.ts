import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

// интерфейс для функционала кнопок
interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private window;
  tg;
  constructor(
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.window = (this._document as any).defaultView;
    this.tg = (this.window as any).Telegram.WebApp;
  }

  get MainButton(): TgButton {
    return this.tg.MainButton;
  }

  get BackButton(): TgButton {
    return this.tg.BackButton;
  }

  get UserInfo(): any {
    return this.tg.initDataUnsafe && this.tg.initDataUnsafe.user ? this.tg.initDataUnsafe.user : null
  }

  sendData(data: object) {
    this.tg.sendData(JSON.stringify(data));
  }

  ready() {
    this.tg.ready();
  }

  close() {
    this.tg.close()
  }
}
