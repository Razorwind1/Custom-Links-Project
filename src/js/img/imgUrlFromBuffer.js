export default function (imageBuffer) {
  const blob = new Blob([imageBuffer], { type: "image/png" });
  const url = URL.createObjectURL(blob);

  return url
}