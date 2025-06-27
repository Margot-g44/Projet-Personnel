export default class DayEntryType {
    public static YesNo = new DayEntryType("Oui / Non")   
    public static Percent = new DayEntryType("Pourcentage")  

    constructor(public name: string) {}
}