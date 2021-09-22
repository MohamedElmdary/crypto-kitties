import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { abi } from './abi';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private readonly web3 = new Web3(Web3.givenProvider);
  private readonly contractAddress =
    '0xFAe10A7D4F4846e820E2a6176828818317eB8B76';
  private user!: string;
  private instance!: any;

  constructor() {
    (window as any).ethereum.enable().then((accounts: string[]) => {
      this.user = accounts[0];
      this.instance = new this.web3.eth.Contract(abi, this.contractAddress, {
        from: this.user,
      });

      this.instance.events
        .Birth()
        .on('data', function (event: any) {
          console.log(event);
        })
        .on('error', function (event: any) {
          console.log(event);
        });

      // this.instance.events
      //   .Birth()
      //   .on('connected', console.log)
      //   .on('data', console.log)
      //   .on('changed', console.log)
      //   .on('error', console.error);
    });
  }

  createKittyGen0(dna: number) {
    return from(
      new Promise((res, rej) => {
        this.instance.methods
          .createKittyGen0(dna)
          .send({}, (error: Error, hash: string) => {
            if (error) return rej(error);
            res(hash);
          });
      })
    );
  }

  // onCatBirth() {
  //   return from(
  //     new Promise((res, rej) => {
  //       console.log(this.instance.events.Birth);
  //     })
  //   );
  // }
}
