export function dateArrayToDateString(dateArray) {
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).toLocaleDateString();
}

export function dateArrayToDateTime(dateArray) {
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
}
