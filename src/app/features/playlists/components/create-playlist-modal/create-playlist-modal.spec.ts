import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreatePlaylistModal } from './create-playlist-modal'

describe('CreatePlaylistModal', () => {
  let component: CreatePlaylistModal
  let fixture: ComponentFixture<CreatePlaylistModal>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlaylistModal]
    }).compileComponents()

    fixture = TestBed.createComponent(CreatePlaylistModal)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
