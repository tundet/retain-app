import {
    Component,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'note-creator',
    styles: [`
    .note-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
  `],
    template: `
    <div class="note-creator shadow-2" [ngStyle]="{'background-color': newNote.color}">
      <form class="row" (ngSubmit)="onCreateNote()">
        <input
          type="text"
          (focus)="toggle(true)"
          [(ngModel)]="newNote.title"
          name="newNoteTitle"
          placeholder="Title"
          class="col-xs-10 title"
          *ngIf="fullForm"
        >
        <input
          type="text"
          (focus)="toggle(true)"
          [(ngModel)]="newNote.value"
          name="newNoteValue"
          placeholder="Take a note..."
          class="col-xs-10"
        >
        <div class="actions col-xs-12 row between-xs" *ngIf="fullForm">
        <div class="col-xs-3">
            <color-picker 
            [colors]="colors"
            (selected)="onColorSelect($event)"
            >
            </color-picker>
        </div>
          <button
            type="submit"
            class="btn-light"
           >
            Done
          </button>
        </div>
      </form>
    </div>
  `
})
export class NoteCreator {
    @Output() createNote = new EventEmitter();
    colors: Array<string> = ['#b19cd9', '#ff9691', '#77dd77', '#aec6cf', '#f49ac2', 'white'];
    newNote = {
        title: '',
        value: '',
        color: 'white'
    };
    fullForm: boolean = false;

    onCreateNote() {
        const {title, value, color} = this.newNote;

        if (title && value) {
            this.createNote.next({title, value, color});
        }

        this.reset();
        this.fullForm = false;
    }

    reset() {
        this.newNote = {
            title: '',
            value: '',
            color: 'white'
        };
    }

    toggle(value: boolean) {
        this.fullForm = value;
    }

    onColorSelect(color: string){
        this.newNote.color = color;

    }
}
