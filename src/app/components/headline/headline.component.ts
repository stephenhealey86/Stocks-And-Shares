import { Component, OnInit, Input } from '@angular/core';
import { HeadlineModel } from 'src/app/models/headline-model';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  @Input() headline: HeadlineModel;
  @Input() viewType: boolean;

  constructor() { }

  ngOnInit() {
  }

}
