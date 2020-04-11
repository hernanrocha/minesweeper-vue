<template>
  <div>
    <h1 class="title">Minesweeper Game</h1>

  </div>
</template>

<style scoped lang="scss">
h1.title {
  margin-bottom: 30px;
}

#game {
  margin: auto;
}

#game td {
  font-size: 18px;
  border: solid 1px;
  width: 30px;
  height: 30px;
}

#game td.small {
  width: 15px;
  height: 15px;
}

.game-alert {
  margin-top: 10px;
}

.game-info {
  font-size: 12px;
}

.bomb {
  color: red;
}

.flag {
  color: green;
}
</style>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';

export default Vue.extend({
  name: 'GameBoard',
  props: {
    msg: String,
  }
});
</script>
