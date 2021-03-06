import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public catForm = this.fb.group({
    body: [10],
    mouth: [13],
    eye: [96],
    ear: [10],
    eyeShape: [1],
    decorationShape: [0],
    pattern1: [11],
    pattern2: [12],
    animate: [1],
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

  get pattern1(): FormControl {
    return this.catForm.get('pattern1') as FormControl;
  }

  get pattern2(): FormControl {
    return this.catForm.get('pattern2') as FormControl;
  }

  get animate(): FormControl {
    return this.catForm.get('animate') as FormControl;
  }

  get dna(): number {
    const v =
      this.body.value.toString() +
      this.mouth.value.toString() +
      this.eye.value.toString() +
      this.ear.value.toString() +
      this.eyeShape.value.toString() +
      this.decorationShape.value.toString() +
      this.pattern1.value.toString() +
      this.pattern2.value.toString() +
      this.animate.value.toString();
    return +v;
  }

  constructor(private fb: FormBuilder, private web3Service: Web3Service) {}

  createKitty(dna: number): void {
    this.web3Service.createKittyGen0(dna).subscribe(console.log, console.error);
  }
}
