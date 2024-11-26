import { EventData, Page } from '@nativescript/core';
import { MainViewModel } from './view-models/main-view-model';
import { HelloWorldModel } from './main-view-model';
import * as fileSystemModule from '@nativescript/core/file-system';

let viewModel: MainViewModel;

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  //viewModel = new MainViewModel();
  // page.bindingContext = viewModel;
  page.bindingContext = new HelloWorldModel();
}

export function onAddFolder() {
  // const documentsFolder = fileSystemModule.knownFolders.documents();
  // viewModel.addFolder(documentsFolder.path);
}

export function onRemoveFolder(args: any) {
  // const index = args.index;
  // viewModel.removeFolder(index);
}
