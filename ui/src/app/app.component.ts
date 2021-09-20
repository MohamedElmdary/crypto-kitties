import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public colors = this.fb.group({
    body: [17],
    mouth: [17],
    ear: [18],
    eye: [15]
  });

  get body(): FormControl {
    return this.colors.get('body') as FormControl;
  }

  get mouth(): FormControl {
    return this.colors.get('mouth') as FormControl;
  }

  get ear(): FormControl {
    return this.colors.get('ear') as FormControl;
  }

  get eye(): FormControl {
    return this.colors.get('eye') as FormControl;
  }

  constructor(private fb: FormBuilder) {}
}
