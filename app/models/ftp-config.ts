export interface FtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface SyncFolder {
  localPath: string;
  remotePath: string;
  enabled: boolean;
}
