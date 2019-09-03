import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Query, User } from 'src/app/types/types';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {

    this.users = this.apollo.watchQuery<Query>({
      query: gql`
        query allUsers {
          allUsers {
            userId
            id
            title
            body
          }
        }`
    }).valueChanges.pipe(
      map((result: any) => result.data.allUsers)
    );

  }

}
