<template>
  <div class="hello">
    <h1>Minesweeper Game</h1>


    <div class="game-container">
      <table id="game">
        <tr v-for="(row, i) in game.board" :key="i">
          <td v-for="(cell, j) in row" :key="j" @click.left="reveal(i, j)" @click.right.prevent="flag(i, j)">
            <span v-if="cell === 0"></span>
            <span v-else-if="cell === -1"></span>
            <span v-else-if="cell === -2">F</span>
            <span v-else-if="cell === -3">-</span>
            <span v-else>{{cell}}</span>
          </td>
        </tr>
      </table>
    </div>

    <ul class="list-group list-group-flush">
      <li class="list-group-item">Rows: {{game.rows}}</li>
      <li class="list-group-item">Cols: {{game.cols}}</li>
      <li class="list-group-item">Mines: {{game.mines}}</li>
      <li class="list-group-item">Started At: {{game.created_at | timestamp }}</li>
    </ul>

    <button type="button" class="btn btn-primary" @click="newGame">New Game</button>
  </div>
</template>

<style scoped lang="scss">
.game-container {
  margin: 20px 0;
}
#game {
  margin: auto;
}

#game td {
  border: solid 1px;
  width: 50px;
  height: 50px;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data () {
    return { 
      game: {
        "rows": 5,
        "cols": 5,
        "mines": 3,
        "board": [
            [
                -1, 0, 0, 0, 0
            ],
            [
                0, 4,-2, 0, 0
            ],
            [
                0,-1, 0, 0, 0
            ],
            [
                0,0,0,0,0
            ],
            [
                0, 0, 0, 0,-1
            ]
        ],
        "created_at": "2020-04-10T11:22:42.655249633-03:00"
      }
    }
  },
  methods: {
    reveal(i, j) {
      console.log('Reveal: ', i, j);
      const gameId = 1;
      const cell = { row: i, col: j }
      this.$http
        .post(`/api/v1/game/${gameId}/reveal`, cell)
        .then(response => {
          console.log({ response });
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
      });
    },
    flag(i, j) {
      console.log('Flag: ', i, j);
      const gameId = 1;
      const cell = { row: i, col: j }
      this.$http
        .post(`/api/v1/game/${gameId}/flag`, cell)
        .then(response => {
          console.log({ response });
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
      });
    },
    newGame() {
      console.log('New Game');
      const gameConfig = {}
      this.$http
        .post("/api/v1/game", gameConfig)
        .then(response => {
          console.log({ response });
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
      });
    }
  }
});
</script>
