import { Observable, ObservableArray } from '@nativescript/core';
import { FtpService, FtpConfig } from './services/ftp.service';

export interface SyncFolder {
  localPath: string;
  remotePath: string;
  enabled: boolean;
}

export class HelloWorldModel extends Observable {
  private _counter: number;
  private _message: string;

  private ftpService: FtpService;
  public folders: ObservableArray<SyncFolder>;
  public ftpConfig: FtpConfig;
  public isConnected: boolean;
  public isSyncing: boolean;

  constructor() {
    super();
    this.ftpService = new FtpService();
    this.folders = new ObservableArray<SyncFolder>();
    this.ftpConfig = {
      host: '',
      port: 21,
      username: '',
      password: '',
    };
    this.isConnected = false;
    this.isSyncing = false;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value);
    }
  }

  onTap() {
    this._counter--;
    this.updateMessage();
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message =
        'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }

    // log the message to the console
    console.log(this.message);
  }
}
