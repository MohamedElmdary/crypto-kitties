import { Component, Input } from '@angular/core';
import { colors } from '../colors';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent {
  
  bodyAndHead?: string;
  @Input()
  set body(key: keyof typeof colors) {
    this.bodyAndHead = '#' + colors[key];
  }

  mouthAndTail?: string;
  @Input()
  set mouth(key: keyof typeof colors) {
    this.mouthAndTail = '#' + colors[key];
  }

  earAndPaw?: string;
  @Input()
  set ear(key: keyof typeof colors) {
    this.earAndPaw = '#' + colors[key];
  }

  eyes?: string;
  @Input()
  set eye(key: keyof typeof colors) {
    this.eyes = '#' + colors[key];
  }
}

