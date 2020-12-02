export default function (string, length) {
    let shortString = ""

    if (length < string.length) {
        for (let i = 0; i < length - 3; i++) {
            shortString += string[i]
        }
        shortString += "..."
    }
    else {
        shortString = string
    }
    
    return shortString
}