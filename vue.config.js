module.exports = {
  "pluginOptions": {
    "electronBuilder": {
      "preload": "src/preload.js",
      "builderOptions": {
        "appId": "com.link.tailor",
        "productName": "Link Tailor"
      },
    }
  },
}