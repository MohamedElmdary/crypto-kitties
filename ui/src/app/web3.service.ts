import { Injectable } from '@angular/core';
import { abi } from './abi';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private readonly web3 = new Web3(Web3.givenProvider)
  private readonly contractAddress = "0xFAe10A7D4F4846e820E2a6176828818317eB8B76";
  private user!: string;
  private instance!: any;

  constructor() {
    (window as any).ethereum.enable().then((accounts: string[]) => {
        this.user = accounts[0];
        this.instance = new this.web3.eth.Contract(abi, this.contractAddress, {from: this.user});
      })
  }

  createKittyGen0(dna: number) {
    this.instance.methods.createKittyGen0(dna).send({}, function (error: any, txHash: string) {
      if (error) console.error(error);
      else console.log(txHash);
    })
  }
}
