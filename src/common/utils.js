export function dateArrayToDateString(dateArray) {
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).toLocaleDateString();
}

export function dateArrayToDateTime(dateArray) {
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
    console.log(date)
    return date;
}
