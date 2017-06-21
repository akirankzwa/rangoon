import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Lesson }        from './lesson';
import { LessonService } from './lesson.service';
import { BookDialogComponent } from './book-dialog.component';

import * as moment from 'moment';

import templateString from './teachers.component.html';

@Component({
  template: templateString
})

export class TeachersComponent implements OnInit {
  lessons: any[] = [];

  constructor(
    private lessonService: LessonService,
    public dialog: MdDialog
  ) {}

  days = [0, 1, 2, 3, 4, 5, 6].map(function(x) { return moment().add(x, 'days') });

  wdays = { Sun: '日', Mon: '月', Tue: '火', Wed: '水',  Thu: '木', Fri: '金', Sat: '土' };

  intervals = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30'
  ];

  openDialog(lesson: Lesson) {
    let dialogRef = this.dialog.open(BookDialogComponent, { height: '400px', width: '600px' });
    dialogRef.componentInstance.lesson = lesson;
    dialogRef.afterClosed()
      .subscribe(result => { console.log(result); });
  }

  getLessons(): void {
    const now = moment();
    this.lessonService.getLessons()
      .then(lessons => {
        for (let interval of this.intervals) {
          let array: Lesson[] = [];
          for (let day of this.days) {
            let dt = day.format(`YYYY-MM-DDT${interval}:00Z`);
            let lesson: Lesson = lessons.find(function(x: Lesson) { return moment.parseZone(x.start_at).local().format() === dt });
            console.log(lesson);
            array.push({
              id:         lesson === undefined ? 0 : lesson.id,
              canceled:   lesson === undefined ? true : lesson.canceled,
              user_id:    lesson === undefined ? null : lesson.user_id,
              teacher_id: lesson === undefined ? null : lesson.teacher_id,
              text:       lesson !== undefined && lesson.user_id ? 'BOOK' : 'OPEN',
              disabled:   now.utc().diff(dt, 'hours') > -2,
              start_at: dt,
            });
          }
          this.lessons.push(array);
        }
      });
  }

  ngOnInit(): void {
    this.getLessons();
  }
}
