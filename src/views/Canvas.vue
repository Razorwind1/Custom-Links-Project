<template>
<div id="canvas">
  <div class="grid">
    <div class="item">
      <div class="item-content">
        <div class="my-custom-content">
          First </div> 
      </div>
    </div>
        <div class="item">
      <div class="item-content">
        <div class="my-custom-content">
         Second </div>
      </div>
    </div>
    <div class="item">
      <div class="item-content">
        <div class="my-custom-content">
          Third </div> 
      </div>
    </div>
    <div class="item">
      <div class="item-content">
        <div class="my-custom-content">
          Fourth </div> 
      </div>
    </div>
  </div>
</div>
</template>

<script src="https://cdn.jsdelivr.net/npm/muuri@0.9.3/dist/muuri.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/web-animations-js@2.3.2/web-animations.min.js"></script>

<script>

  import 'web-animations-js';
  import Muuri from 'muuri';

  export default {
    mounted() {
      var grid = new Muuri('.grid', {
        dragEnabled: true,
        dragSort: true,
      });
    }, 
  };
</script>

<style scoped>
  #canvas {
  display: grid;
  width: 100%;
}
  .grid {
    position: relative;
  }
  .item {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    position: absolute;
    width: 100px;
    height: 100px;
    margin: 5px;
    z-index: 1;
    color: #fff;
    text-align: center;
    align-content: center;
    line-height: 100px;
  }
  .item.muuri-item-dragging {
    z-index: 2;
  }
  .item.muuri-item-releasing {
    z-index: 3;
  }
  .item.muuri-item-hidden {
    z-index: 0;
  }
  .item-content {
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: black;
    cursor: pointer;
  }
  .item.muuri-item-dragging .item-content,
  .item.muuri-item-releasing .item-content {
    background:	#A8A8A8;
} 
</style>




 