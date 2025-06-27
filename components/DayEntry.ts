import DayEntryType from "./DayEntryType";

export default class {
  constructor(public period: DayEntryType, public sleptWell: DayEntryType) {}

  public format(): string {
    return `Period: ${this.period.name} / sleptWell: ${this.sleptWell.name}`;
  }
}
