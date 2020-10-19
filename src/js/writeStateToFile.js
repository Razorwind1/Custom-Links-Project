import DIR from "./directories.js"
import fs from "fs"

export default function (state) {
  try {
    fs.mkdirSync(DIR.USER_DATA, { recursive: true })
    fs.writeFileSync(DIR.STATE, JSON.stringify(state));
  }
  catch (e) {
    if (e) console.error(e)
  }
}