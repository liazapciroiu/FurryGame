document.addEventListener('DOMContentLoaded', function(event) {

  //4. furry and coin constructor
  var Furry = function(x, y, direction) {
      this.x = 0;
      this.y = 0;
      this.direction = 'right';
  }

  var Coin = function(x, y) {
    this.x = Math.floor(Math.random() * 9);
    this.y = Math.floor(Math.random() * 9);
  }

  //5.game controlling object
  var Game = function(board, furry, coin, score) {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    //6. calculatimg position
    this.index = function (x, y) {
      return x + (y * 10);
    }
    //7. drawing the board state
    this.showFurry = function () {
      if (document.querySelector('.furry') !== null) {
        this.hideVisibleFurry();
      }
      console.log(this.board);
      console.log(this.index());
      this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }
    //9. clean view
    this.hideVisibleFurry = function () {
      document.querySelector('.furry').classList.remove('furry');
    }
    this.showCoin = function () {
      this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }
    //9. modifying furry's position
    this.moveFurry = function () {
      if (this.furry.direction === 'right') {
        this.furry.x += 1;
      } else if (this.furry.direction === 'left') {
        this.furry.x -= 1;
      } else if (this.furry.direction === 'up') {
        this.furry.y -= 1;
      } else if (this.furry.direction === 'down') {
        this.furry.y += 1;
      }
      this.showFurry();
      this.gameOver();
      this.checkCoinCollision();
    }
    //10. keyboard support
    this.turnFurry = function (event) {
      switch (event.which) {
        case 37:
          this.furry.direction = 'left';
          break;
        case 39:
          this.furry.direction = 'right';
          break;
        case 38:
          this.furry.direction = 'up';
          break;
        case 40:
          this.furry.direction = 'down';
          break;
      }
    }
    //11. checking for collision with the coin
    this.checkCoinCollision = function () {
      if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
        this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
        this.score++;
        document.querySelector('#score strong').innerHTML = this.score;
        var newCoin = new Coin();
        this.coin = newCoin;
        this.showCoin();
      }
    }
    //12. checking for collision with the wall
    this.gameOver = function () {
      if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
        clearInterval(this.idSetInterval);
        this.hideVisibleFurry();
        var gameOverMessage = document.createElement('h1');
        gameOverMessage.innerText = 'You lost!';
        gameOverMessage.style.textAlign = 'center';
        document.querySelector('#score').append(gameOverMessage);
      }
    }
    //8. Start
    this.startGame = function () {
      this.showCoin();
      var self = this;
      this.idSetInterval = setInterval(function () {
        //console.log('hooray from setInterval');
        self.moveFurry();
      }, 250);
    }
  }

  //Initializing
  var game = new Game();
  game.startGame();
  document.addEventListener('keydown', function(event) {
    game.turnFurry(event);
  });

});