import DIR from "../helper/directories.js"
import path from "path"
import fs from "fs"

export default function (imgBuffer, imgSrc, linkId = "") {
  const linkFolderDir = path.join(DIR.LINK_ICONS, linkId.toString())

  try {
    fs.rmdirSync(linkFolderDir, { recursive: true })
    fs.mkdirSync(linkFolderDir, { recursive: true })
    const imageDir = path.join(linkFolderDir, path.basename(imgSrc))
    fs.writeFileSync(imageDir, imgBuffer);
  }
  catch (e) {
    if (e) console.error(e)
  }
}