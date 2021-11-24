export const Priority = [
    { name: "low", value: "low" },
    { name: "normal", value: "normal" },
    { name: "high", value: "high" },
]
export function convertDate(rawDate) {
    let result = rawDate
    let date = ""
    if (result[2] !== "/") {
        if (result[4] && result[4] !== '/') {
            result = result.slice(0, 4) + "/" + result.slice(5);
        }

        if (result[5] && result[9] !== '/') {
            result = result.slice(0, 7) + "/" + result.slice(8);
        }
        date = result.slice(8, 10) + result.slice(4, 8) + result.slice(0, 4)
    }
    else {
        date = result
    }

    return date
}

