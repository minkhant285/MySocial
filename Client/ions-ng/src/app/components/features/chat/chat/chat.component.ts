import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ions-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() name: string;
  message = "";
  constructor() {
  }

  ngOnInit() {
  }

}
