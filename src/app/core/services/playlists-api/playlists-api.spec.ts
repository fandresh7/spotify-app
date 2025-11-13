import { TestBed } from '@angular/core/testing'

import { PlaylistsApi } from './playlists-api'

describe('PlaylistsApi', () => {
  let service: PlaylistsApi

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(PlaylistsApi)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
