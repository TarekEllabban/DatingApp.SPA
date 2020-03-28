import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  users: User[];
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

}
