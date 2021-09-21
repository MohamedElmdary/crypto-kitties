import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { colors } from '../colors';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  @Input() eye!: keyof typeof colors;
  @Input() eyeShape!: number;
  get eyeStyle() {
    let border: any;

    switch (this.eyeShape) {
      case 1:
        border = {borderTop: '15px solid #333'};
        break;

      case 2:
        border = {borderBottom: '15px solid #333'};
        break;

      default:
        border = {};
    }

    return {
      backgroundColor: this.eye ? '#' + colors[this.eye] : undefined,
      ...border
    }
  }

  @Input() decorationShape!: number;
  get decorationStyle() {
    let style: any;

    switch (this.decorationShape) {
      case 1:
        const s = {display: 'none'};
        style = {left: s, right: s};
        break;

      case 2:
        style = {
          left: { transform: 'rotate(20deg)' },
          right: { transform: 'rotate(-20deg) '}
        };
        break;

      case 3:
        style = {
          left: { transform: 'rotate(-20deg)' },
          right: { transform: 'rotate(20deg) '}
        };
        break;

      default:
        style = {};
    }

    return style;
  }
}

