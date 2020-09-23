<template>
  <div class="settings">
    <div class="theClass123">
      Some setting here:
      <select name="select" id>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </select>
    </div>
    <button v-on:click="getFavicon()">Favicon Test Button</button>
    <div class="attribution">
      Icons made by
      <span v-on:click="attributionLink">Freepik</span>
    </div>
  </div>
</template>


<script>

export default {
  methods: {
attributionLink: function () {
      window.shell.openExternal("https://www.flaticon.com/authors/freepik");
    },
    getFavicon: function () {
    var favicon = undefined;
    console.log("getFavicon function activated");
    var theRequest = new XMLHttpRequest();
try {
    console.log("request tried");
    theRequest.open("GET", "https://razorwind1.github.io/RealityCheck/Index.html", false);
    theRequest.onload = function () {
        console.log("document loaded");
        var nodeList = document.getElementsByTagName("link");
        console.log(nodeList);
        for (var i = 0; i < nodeList.length; i++)
        {
            console.log(nodeList[i].getAttribute("href"));
            if((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon"))
            {
                console.log("favico element found");
                favicon = nodeList[i].getAttribute("href");
            }
        }
    }
    theRequest.send();
}
catch (e) {
    console.log("Unable to load the questeded file.");
}

    return favicon;
}
  },
};
</script>

<style>

.settings {
  width: 100%;
  margin-bottom: 15px;
  padding-right: 5px;
  overflow: auto;
}
.settings > div {
  margin: 20px 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.settings .attribution {
  user-select: none;
  height: auto;
  display: block;
  position: fixed;
  bottom: 2px;
  left: 0px;
  width: 100%;
  margin: 0;
  text-align: right;
  padding: 0 6px;
  font-size: 12px;
  background-color: transparent;
  opacity: .5;
}
.settings .attribution:hover {
  opacity: .9;
}
.settings .attribution span {
  color: rgb(108, 187, 233);
  cursor: pointer;
}

.settings select {
  width: 150px;
  background-color: var(--dark-background-color);
  color: var(--main-text-color);
  border: none;
  height: 70%;
}
.settings select:hover {
  cursor: pointer;
}
</style>
