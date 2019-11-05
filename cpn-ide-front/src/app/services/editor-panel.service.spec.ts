import { TestBed } from '@angular/core/testing';

import { EditorPanelService } from './editor-panel.service';

describe('EditorPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorPanelService = TestBed.get(EditorPanelService);
    expect(service).toBeTruthy();
  });
});
