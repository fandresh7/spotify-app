import { TestBed } from '@angular/core/testing'

import { PlaylistsStore } from './playlists-store'

describe('PlaylistsStore', () => {
  let service: PlaylistsStore

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PlaylistsStore)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
