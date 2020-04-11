<template>
  <div>
    <h1>Tap Colors</h1>

    <div class="container">
      <div class="row">

        <div class="col-md-9">
          <div v-if="err">{{err}}</div>
          
          <div v-if="game.board">
            <table  id="game">
              <tr v-for="(row, i) in game.board" :key="i">
                <td v-for="(cell, j) in row" :key="j"
                  @click="tap(i, j)" 
                  v-bind:class="{ 
                    green: cell == 0, 
                    red: cell == 1, 
                    medium: game.board.length == 7,
                    small: game.board.length == 10, 
                    extrasmall: game.board.length == 15 }">
                </td>
              </tr>
            </table>
            <p class="game-info">Latency: {{latency}} us</p>
          </div>
          <div v-else><b>Please Create a New Game</b></div>
        </div>

        <div class="col-md-3 text-left">
          <p><b>Instructions</b></p>
          <p>Tap on cells to get all board in green<p>
          <form @submit="newGame">

            <div class="form-group">
              <label for="level">Level</label>
              <select class="form-control" id="level" v-model="form.level" @change="newGame">
                <option value="4">Easy</option>
                <option value="7">Medium</option>
                <option value="10">Hard</option>
                <option value="15">Insane</option>
              </select>
            </div>

            <div class="form-group row text-center">
              <div class="col-sm-12">
                <button type="submit" class="btn btn-primary">New Game</button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
label {
  font-weight: bolder;
}
#game {
  margin: auto;
}

#game td {
  font-size: 18px;
  border: solid 2px;
  width: 120px;
  height: 120px;
  color: black;

}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

#game td.medium {
  width: 70px;
  height: 70px;
}

#game td.small {
  width: 50px;
  height: 50px;
}

#game td.extrasmall {
  width: 35px;
  height: 35px;
}
</style>

<script>
import moment from 'moment';

export default {
  name: 'TapColors',
  data() {
    return {
      ws: null,
      err: null,
      form: {
        level: 4
      },
      latency: 0,
      game: {
        board: [
        [
            1,
            1,
            1,
            0
        ],
        [
            1,
            1,
            0,
            1
        ],
        [
            0,
            0,
            1,
            0
        ],
        [
            1,
            0,
            0,
            0
        ]
      ]
      }
    }
  },
  mounted() {
      this.ws = new WebSocket('ws://192.168.0.230:8002/api/v1/tapcolors/ws');
      this.ws.addEventListener("message", e => {
        this.game = JSON.parse(e.data);
        this.latency = moment() - moment(this.game.timestamp);
      });
      this.ws.addEventListener("error", e => {
        console.log("STORE WEBSOCKET ERROR");
        console.log({ e });
        this.err = e.message;
      });
      this.ws.addEventListener("close", e => {
        console.log("STORE WEBSOCKET CLOSE");
      });
      this.ws.addEventListener("open", e => {
        console.log("WEBSOCKET OPEN");
      });
  },
  methods: {
    tap(i, j) {
      this.ws.send(JSON.stringify({ action: 'tap', payload: { row: i, col: j, timestamp: moment().toISOString() } }));
    },
    newGame() {
      this.ws.send(JSON.stringify({ action: 'newgame', payload: { level: parseInt(this.form.level), timestamp: moment().toISOString() } }));
    }
  }
}
</script>


