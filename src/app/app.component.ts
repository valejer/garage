import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ButtonFlag {
  name: string,
  state: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  ngOnInit() { }
  ngOnDestroy() { }
}
