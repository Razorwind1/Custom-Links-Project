import imgUrlFromBuffer from "@/js/img/imgUrlFromBuffer.js";

export default function (id, url) {
    const imgBuffer = window.ipcRenderer.sendSync("get-image-buffer", {
      id,
      url,
    }).buffer;
    const imgUrl = imgUrlFromBuffer(imgBuffer);
    return imgUrl;
  }