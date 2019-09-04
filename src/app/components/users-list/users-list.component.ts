import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { newUserConverter } from 'src/app/decorators/new-user-converter';
import { Observable } from 'rxjs';
import { Query, User } from 'src/app/types/types';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @newUserConverter
  isNew: boolean = true;

  // users: Observable<User[]>;
  users: User[] = [{
    id: 0,
    userId: 0,
    isNew: false,
    title: '',
    body: ''
  }];

  alterUsers: User[] = [];
  constructor(private apollo: Apollo) { }

  ngOnInit() {

    // this.users = this.apollo.watchQuery<Query>({
    this.apollo.watchQuery<Query>({
      query: gql`
        query allUsers {
          allUsers {
            userId
            id
            isNew
            title
            body
          }
        }`
    }).valueChanges.subscribe(response => this.users = response.data.allUsers);
    // }).valueChanges.pipe(
    //   map((result: any) => result.data.allUsers)
    // );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    }
  }

}
