import fs from 'fs'

export default function (imageUrl) {
  var imageBuffer = null
  try {
    imageBuffer = Buffer.from(fs.readFileSync(imageUrl))
  }
  catch (err) {
    if (err){
      console.log(err)
    }
  }
  return imageBuffer
}