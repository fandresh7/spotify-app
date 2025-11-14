import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { Icon } from '@shared/components'

interface ModalData {
  type: 'create' | 'edit'
  name?: string
}

@Component({
  selector: 'create-playlist-modal',
  imports: [ReactiveFormsModule, Icon],
  templateUrl: './create-playlist-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePlaylistModal {
  dialogRef = inject(DialogRef)
  data = inject<ModalData>(DIALOG_DATA)

  nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
  })

  isEdit = computed(() => this.data.type === 'edit')
  title = computed(() => (this.isEdit() ? 'Edit Playlist' : 'Create Playlist'))
  submitButtonText = computed(() => (this.isEdit() ? 'Save' : 'Create'))

  constructor() {
    if (this.isEdit() && this.data.name) {
      this.nameControl.setValue(this.data.name)
    }
  }

  close() {
    this.dialogRef.close()
  }

  submit() {
    if (this.nameControl.invalid) {
      this.nameControl.markAsTouched()
      return
    }

    this.dialogRef.close({
      name: this.nameControl.value,
      type: this.data.type
    })
  }
}
