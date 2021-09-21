import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public catForm = this.fb.group({
    body: [10],
    mouth: [13],
    eye: [96],
    ear: [10],
    eyeShape: [1],
    decorationShape: [0]
  });

  get body(): FormControl {
    return this.catForm.get('body') as FormControl;
  }

  get mouth(): FormControl {
    return this.catForm.get('mouth') as FormControl;
  }

  get ear(): FormControl {
    return this.catForm.get('ear') as FormControl;
  }

  get eye(): FormControl {
    return this.catForm.get('eye') as FormControl;
  }

  get eyeShape(): FormControl {
    return this.catForm.get('eyeShape') as FormControl;
  }

  get decorationShape(): FormControl {
    return this.catForm.get('decorationShape') as FormControl;
  }

  constructor(private fb: FormBuilder) {}
}
