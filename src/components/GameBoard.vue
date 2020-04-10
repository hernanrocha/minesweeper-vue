<template>
  <div>
    <h1>Minesweeper Game</h1>

    <div class="container">
      <div class="row">
        <div class="col-md game-container">
          <table id="game">
            <tr v-for="(row, i) in game.board" :key="i">
              <td v-for="(cell, j) in row" :key="j" @click.left="reveal(i, j)" @click.right.prevent="flag(i, j)">
                <span v-if="cell === 0"></span>
                <span v-else-if="cell === -1"></span>
                <span v-else-if="cell === -2">F</span>
                <span v-else-if="cell === -3">-</span>
                <span v-else-if="cell === -5">X</span>
                <span v-else>{{cell}}</span>
              </td>
            </tr>
          </table>
        </div>

        <div class="col-md text-right">
          <form @submit="newGame">
            <div class="form-group row">
              <label for="rows" class="col-sm-4 col-form-label">Rows</label>
              <div class="col-sm-8">
                <input type="number" class="form-control" id="rows" v-model="form.rows" placeholder="Rows">
              </div>
            </div>

            <div class="form-group row">
              <label for="cols" class="col-sm-4 col-form-label">Columns</label>
              <div class="col-sm-8">
                <input type="number" class="form-control" id="cols" v-model="form.cols" placeholder="Columns">
              </div>
            </div>


            <div class="form-group row">
              <label for="mines" class="col-sm-4 col-form-label">Mines</label>
              <div class="col-sm-8">
                <input type="number" class="form-control" id="mines" v-model="form.mines" placeholder="mines">
              </div>
            </div>

            <div class="form-group row text-center">
              <div class="col-sm-12">
                <button type="submit" class="btn btn-primary">New Game</button>
              </div>
            </div>
          </form>

          <form @submit="loadGame">
            <div class="form-group row">
              <label for="gameId" class="col-sm-4 col-form-label">Game ID</label>
              <div class="col-sm-8">
                <input type="input" class="form-control" id="gameId" v-model="form.gameId" placeholder="Game ID">
              </div>
            </div>

            <div class="form-group row text-center">
              <div class="col-sm-12">
                <button type="submit" class="btn btn-primary">Load Game</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>

      <ul class="list-group list-group-flush">
        <li class="list-group-item">Game ID: {{game.id}}</li>
        <li class="list-group-item">Status: {{game.status}}</li>
        <li class="list-group-item">Started At: {{game.created_at | timestamp }}</li>
      </ul>
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
  name: 'GameBoard',
  props: {
    msg: String,
  },
  data () {
    return {
      form: {
        rows: 6,
        cols: 6,
        mines: 5
      },
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
      const cell = { row: i, col: j }
      this.$http
        .post(`/api/v1/game/${this.game.id}/reveal`, cell)
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
      const cell = { row: i, col: j }
      this.$http
        .post(`/api/v1/game/${this.game.id}/flag`, cell)
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
      const gameConfig = {
        rows: parseInt(this.form.rows),
        cols: parseInt(this.form.cols),
        mines: parseInt(this.form.mines),
      }
      this.$http
        .post("/api/v1/game", gameConfig)
        .then(response => {
          console.log({ response });
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
      });
    },
    loadGame() {
      console.log('Load Game');
      this.$http
        .get(`/api/v1/game/${this.form.gameId}`)
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
