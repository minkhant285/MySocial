import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ions-people-list',
  templateUrl: './ions-people-list.component.html',
  styleUrls: ['./ions-people-list.component.scss']
})
export class IonsPeopleListComponent implements OnInit {

  @Output() public people = new EventEmitter<string>();
  public datas;
  constructor() {
    this.datas = ['Minkhant', 'Thet htet aung', 'Phyu thazin',
      'Banyar', 'Ye Htike Aung', 'Kaung Satt Han', 'Oakar Kyaw', 'Min Khant Zin',
      'Bo Bo', 'Hein Min Htet', 'Thura Htwe', 'Kaung Myat Soe', 'Khin Sandar',
      'Aung Ko ko pyae', 'Hein Min Htet', 'Thura Htwe', 'Kaung Myat Soe', 'Khin Sandar',
      'Hein Min Htet', 'Thura Htwe', 'Kaung Myat Soe', 'Khin Sandar', 'Mi Mi Thaw', 'Th'];
  }

  ngOnInit() {
  }

  public message(data: string) {
    this.people.emit(data);
    new IonsPeopleListComponent();
  }

  public searchPeople(data: string) {
    if (data == "")
      alert("Enter Keyword");
    else {
      let result = "";
      for (let i = 0; i < this.datas.length; i++) {
        if (this.datas[i] == data) {
          result = data;
        }
      }
      if (!result) {
        alert("Not Found!");
      }
      else {
        this.datas = [result];
      }
    }
  }

}
