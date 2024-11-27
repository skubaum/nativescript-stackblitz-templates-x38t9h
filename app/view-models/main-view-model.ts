import { Observable, ObservableArray } from '@nativescript/core';
import { FtpService, FtpConfig } from '../services/ftp.service';

export interface SyncFolder {
    localPath: string;
    remotePath: string;
    enabled: boolean;
}

export class MainViewModel extends Observable {
    private ftpService: FtpService;
    public folders: ObservableArray<SyncFolder>;
    public ftpConfig: FtpConfig;
    public isConnected: boolean;
    public isSyncing: boolean;

    constructor() {
        super();
        // this.ftpService = new FtpService();
        this.folders = new ObservableArray<SyncFolder>();
        this.ftpConfig = {
            host: '',
            port: 21,
            username: '',
            password: ''
        };
        this.isConnected = false;
        this.isSyncing = false;
    }

    async connectFtp() {
        try {
            this.isConnected = await this.ftpService.connect(this.ftpConfig);
            this.notifyPropertyChange('isConnected', this.isConnected);
        } catch (error) {
            console.error('Connection error:', error);
            this.isConnected = false;
            this.notifyPropertyChange('isConnected', this.isConnected);
        }
    }

    async addFolder(localPath: string) {
        const folderName = localPath.split('/').pop() || 'folder';
        this.folders.push({
            localPath,
            remotePath: '/' + folderName,
            enabled: true
        });
    }

    async syncFolders() {
        if (this.isSyncing) return;

        try {
            this.isSyncing = true;
            this.notifyPropertyChange('isSyncing', this.isSyncing);

            const enabledFolders = this.folders.filter(f => f.enabled);
            for (const folder of enabledFolders) {
                await this.ftpService.syncFolder(folder.localPath, folder.remotePath);
            }
        } finally {
            this.isSyncing = false;
            this.notifyPropertyChange('isSyncing', this.isSyncing);
        }
    }

    async disconnect() {
        await this.ftpService.disconnect();
        this.isConnected = false;
        this.notifyPropertyChange('isConnected', this.isConnected);
    }

    removeFolder(index: number) {
        this.folders.splice(index, 1);
    }
}