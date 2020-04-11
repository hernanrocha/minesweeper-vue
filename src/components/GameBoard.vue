<template>
  <div>
    <h1 class="title">Minesweeper Game</h1>

    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <div v-if="game.board">
            <table  id="game">
              <tr v-for="(row, i) in game.board" :key="i">
                <td v-for="(cell, j) in row" :key="j" @click.left="reveal(i, j)" @click.right.prevent="flag(i, j)" v-bind:class="{ small: game.rows > 8 || game.cols > 8 }">
                  <span v-if="cell === 0"></span>
                  <span v-else-if="cell === -1"></span>
                  <span v-else-if="cell === -2" class="flag">F</span>
                  <span v-else-if="cell === -3">-</span>
                  <span v-else-if="cell === -5" class="bomb">X</span>
                  <span v-else>{{cell}}</span>
                </td>
              </tr>
            </table>
            <p class="game-info">Game ID: <b>{{game.id}}</b> - Playing Time: {{ elapsedTime }}</p>
          </div>
          <div v-else><b>Please Create a New Game</b></div>
        </div>

        <div class="col-md-3 text-right">
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

      <div class="row game-alert">
        <div class="col-sm">
          <div v-if="game.status == 'won'" class="alert alert-success" role="alert">
            Congratulations! You have won
          </div>
          <div v-else-if="game.status == 'lose'" class="alert alert-danger" role="alert">
            Oops! You have selected a bomb. Try again!
          </div>
        </div>
      </div>
    </div>
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
  },
  data () {
    return {
      form: {
        rows: 10,
        cols: 10,
        mines: 12
      },
      game: {},
      now: moment()
    }
  },
  mounted() {
    this.newGame();
    setInterval(() => {
      if (!this.game || !this.game.created_at || this.game.status !== 'playing') {
        return;
      }
      if (this.game.finished_at) {
        this.now = moment(this.game.finished_at)
      } else {
        this.now = moment() 
      }
    }, 1000)
  },
  methods: {
    reveal(i, j) {
      const cell = { row: i, col: j }
      this.$http
        .post(`/api/v1/game/${this.game.id}/reveal`, cell)
        .then(response => {
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
      });
    },
    flag(i, j) {
      const cell = { row: i, col: j }
      this.$http
        .post(`/api/v1/game/${this.game.id}/flag`, cell)
        .then(response => {
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
      });
    },
    newGame() {
      const gameConfig = {
        rows: parseInt(this.form.rows),
        cols: parseInt(this.form.cols),
        mines: parseInt(this.form.mines),
      }
      this.$http
        .post("/api/v1/game", gameConfig)
        .then(response => {
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
      });
    },
    loadGame() {
      this.$http
        .get(`/api/v1/game/${this.form.gameId}`)
        .then(response => {
          console.log({ response });
          this.game = response.data;
        })
        .catch(error => {
          console.error(error);
          alert('Game not found');
      });
    }
  },
  computed: {
    elapsedTime() {
      if (!this.game || !this.game.created_at) {
        return '';
      }

      const now = this.now;
      const before = moment(this.game.created_at);

      let seconds = Math.floor((now - before) / 1000);
      if (seconds < 0) seconds = 0;

      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;

      if (minutes == 0) {
        return `${seconds}s`;
      }

      let hours = Math.floor(minutes / 60);
      minutes = minutes % 60;

      if (hours == 0) {
        return `${minutes}m ${seconds}s`;
      }

      const days = Math.floor(hours / 24);
      hours = hours % 24;

      if (days == 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      }

      return `${days} days ${hours}h ${minutes}m ${seconds}s`;
    }
  }
});
</script>
