import { File, Folder, path } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';
import * as ftp from 'basic-ftp';

export interface FtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export class FtpService {
  private client: ftp.Client;

  constructor() {
    try {
      this.client = new ftp.Client();
    } catch (ex) {
      console.log(ex);
    }
    this.client.ftp.verbose = true;
  }

  async connect(config: FtpConfig): Promise<boolean> {
    try {
      await this.client.access({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        secure: false,
      });
      return true;
    } catch (error) {
      console.error('FTP connection error:', error);
      return false;
    }
  }

  async syncFolder(localPath: string, remotePath: string): Promise<void> {
    try {
      const localFolder = Folder.fromPath(localPath);
      const files = localFolder.getEntitiesSync();

      // Ensure remote directory exists
      await this.ensureRemoteDirectory(remotePath);

      // Upload each file
      for (const file of files) {
        if (file instanceof File) {
          const remoteFilePath = path.join(remotePath, file.name);
          await this.client.uploadFrom(file.path, remoteFilePath);
        }
      }

      await this.notifySuccess(localPath);
    } catch (error) {
      console.error('Sync error:', error);
      await this.notifyError(localPath);
      throw error;
    }
  }

  private async ensureRemoteDirectory(remotePath: string): Promise<void> {
    try {
      await this.client.ensureDir(remotePath);
    } catch (error) {
      console.error('Error creating remote directory:', error);
      throw error;
    }
  }

  private async notifySuccess(folderPath: string): Promise<void> {
    await LocalNotifications.schedule([
      {
        id: 1,
        title: 'Sync Complete',
        body: `Successfully synced folder: ${folderPath}`,
        badge: 1,
      },
    ]);
  }

  private async notifyError(folderPath: string): Promise<void> {
    await LocalNotifications.schedule([
      {
        id: 2,
        title: 'Sync Error',
        body: `Failed to sync folder: ${folderPath}`,
        badge: 1,
      },
    ]);
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }
}
