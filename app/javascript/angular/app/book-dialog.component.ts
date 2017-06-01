import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Lesson } from './lesson';
import templateString from './book-dialog.component.html';

@Component({
  selector: 'book-dialog',
  template: templateString,
  styles: [`
textarea {
  width: 550px;
  height: 220px;
}`]
})

export class BookDialogComponent {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private bookUrl = '/books.json';
  lesson: Lesson;
  message = '';

  constructor(
    public dialogRef: MdDialogRef<BookDialogComponent>,
    private http: Http
  ) {}

  onSubmit(lesson): Promise<any> {
    return this.http
      .post(this.bookUrl, JSON.stringify({book: { lesson_id: lesson.id }}), { headers: this.headers })
      .toPromise()
      .then(response => {
        this.message = response.json().message;
        // REFACTOR
        if (response.json().status === 'ok') {
          lesson.text = 'BOOK';
          lesson.user_id = response.json().user_id;
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
