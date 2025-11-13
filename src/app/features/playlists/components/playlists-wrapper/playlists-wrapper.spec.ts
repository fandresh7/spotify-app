import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PlaylistsWrapper } from './playlists-wrapper'

describe('PlaylistsWrapper', () => {
  let component: PlaylistsWrapper
  let fixture: ComponentFixture<PlaylistsWrapper>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsWrapper]
    }).compileComponents()

    fixture = TestBed.createComponent(PlaylistsWrapper)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
