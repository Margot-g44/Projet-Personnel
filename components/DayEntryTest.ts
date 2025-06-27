import DayEntry from "./DayEntry";
import DayEntryType from "./DayEntryType";

const day = new DayEntry(DayEntryType.YesNo, DayEntryType.YesNo)
console.log(day.format())
// Period: false / sleptWell: true