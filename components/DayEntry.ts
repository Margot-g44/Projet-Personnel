export default class {
  constructor(public period: boolean, public sleptWell: boolean) {}

  public format(): string {
    return `Period: ${this.period} / sleptWell: ${this.sleptWell}`;
  }
}
