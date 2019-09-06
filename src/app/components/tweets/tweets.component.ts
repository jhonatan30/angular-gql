import gql from 'graphql-tag';
import { AngularFirestore } from '@angular/fire/firestore';
import { Apollo } from 'apollo-angular';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { newUserConverter } from 'src/app/decorators/new-user-converter';
import { Observable } from 'rxjs';
import { Query, User, Tweet } from 'src/app/types/types';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {

  @newUserConverter
  isNew: boolean = true;

  tweets: Tweet[] = [];

  constructor(private apollo: Apollo, private angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets(): void {
    this.apollo.watchQuery<Query>({
      query: gql`
        query {
          tweets {
            id
            tweet
          }
        }
      `
    }).valueChanges.subscribe(response => this.tweets = response.data.tweets);
  }

  generateNewTweet(): void {

  }

  // ******************************************************************************************

  getInfo() {
    this.angularFirestore
      .firestore
      .collection('tweets')
      .get()
      .then(res => res.docs.forEach(doc => console.log(doc.data().data)));

    // this.angularFirestore
    // .collection('info')
    // .snapshotChanges()
    // .subscribe((response) => {
    //   response.forEach((res) => {
    //     console.log(res.payload.doc.data());
    //   });
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    } else {
      // moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    }
  }

}
