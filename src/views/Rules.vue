<template>
  <div class="container text-left">
    <h1>Rules</h1>
    <p>The board is divided into cells, which have three states: uncovered, covered and flagged. A covered cell is blank and clickable, while an uncovered cell is exposed, either containing a number (the mines adjacent to it), or a mine. When a cell is uncovered by a player click, and if it bears a mine, the game ends. A flagged cell is similar to a covered one, in the way that mines are not triggered when a cell is flagged, and it is impossible to lose through the action of flagging a cell. However, flagging a cell implies that a player thinks there is a mine underneath, which causes the game to deduct an available mine from the display.</p>
    <p>In order to win the game, you must logically deduce where mines exist through the use of the numbers given by uncovered cells. To win, all non-mine cells must be uncovered and all mine cells must be flagged. At this stage, the timer is stopped.</p>
    
    <h1>How To Play</h1>
    <p><b>Left-click:</b> uncover a cell. If there are no mines adjacent to that particular cell, the mine will display a blank tile or a "0", and all adjacent cells will automatically be uncovered.</p>
    <p><b>Right-click:</b> flag/unflag a cell</p>

    <div class="text-center">
      <button class="btn btn-primary" @click="goPlay">Play</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Rules',
  methods: {
    goPlay() {
      this.$router.push({ name: "Home" });
    }
  }
}
</script>
