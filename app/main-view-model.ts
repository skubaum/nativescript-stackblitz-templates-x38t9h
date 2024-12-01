import { Observable, ObservableArray } from '@nativescript/core';
import { FtpService, FtpConfig } from './services/ftp.service';
import { FtpClient } from 'nativescript-ftp-client';

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
    // try {
    //   this.ftpService = new FtpService();
    // } catch (ex) {
    //   console.log(ex);
    // }
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

  async onTap() {
    this._counter--;
    this.updateMessage();
    await this.testarFtp();
  }

  async testarFtp() {
    var client = new FtpClient();

    //all methods are promises so use await or then
    await client.connect('192.168.101.165');
    await client.login('daniel', 'a');
    console.log("Sucesso ftp");
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
    // var client = new ftp.Client();
    
  }
}
