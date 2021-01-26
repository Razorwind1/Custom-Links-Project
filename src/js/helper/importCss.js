export default function (name){
    let element = document.createElement("link")
    element.setAttribute("rel", "stylesheet")
    element.setAttribute("type", "text/css")
    element.setAttribute("href", `appThemes/${name}.css`)
    document.getElementsByTagName("head")[0].appendChild(element)
}