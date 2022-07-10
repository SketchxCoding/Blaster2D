/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _objects_text_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _objects_button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _objects_bar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _chat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _minimap_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _trees_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _skins_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);









class gamescene extends Phaser.Scene {
  constructor(){
    super();
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.frames = 0;
  }
  
  preload() {
    document.getElementsByClassName("grecaptcha-badge")[0].style.display = "none";
    for(let i of Object.keys(_skins_json__WEBPACK_IMPORTED_MODULE_7__)){
      this.load.image(`skin_${_skins_json__WEBPACK_IMPORTED_MODULE_7__[i].id}`, `/img/skins/${_skins_json__WEBPACK_IMPORTED_MODULE_7__[i].url}.png`);
    }
    this.load.image("player", "/img/skins/player.png");
    this.load.image("coin", "/img/gameObjects/coin.png");
    this.load.image("grass", "/img/gameObjects/tile.png");
    this.load.image("bullet", "/img/gameObjects/bullet.png");
    this.load.image("pistol", "/img/guns/pistol.png");
    this.load.image("obstacle", "/img/gameObjects/obstacle.png");
    this.load.image("obstacle2", "/img/gameObjects/obstacle2.png");
    this.load.image("tree", "/img/gameObjects/tree.png");
    this.loadingtext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, window.innerWidth / 2, window.innerHeight / 2, "Loading...", { fontSize: 100, fontFamily: "Arial" }).setOrigin(0.5);
  }

  create() {
    this.loaded = false;
    this.socket = io(document.getElementById("server").value);
    this.coins = this.physics.add.group();
    this.trees = this.physics.add.group();
    this.bulletsGroup = this.physics.add.group();
    this.enemies = {};
    this.bullets = {};
    this.verified = false;
    this.minimap = new _minimap_js__WEBPACK_IMPORTED_MODULE_5__["default"](this);
    this.name = name || localStorage.getItem("name");
    let game = this;
    grecaptcha.ready(function() {
      grecaptcha.execute('6Lcm-s0gAAAAAEeQqYid3ppPGWgZuGKxXHKLyO77', {action: 'submit'}).then(function(token) {
        game.socket.emit("join", game.name, token);
        game.verified = true;
      });
    });
    
    window.addEventListener("resize", () => {
      this.scale.resize(window.innerWidth, window.innerHeight);
      // this.cameras.main.setZoom((window.innerWidth * window.innerHeight) / (1300 * 730));
    });
    
    this.socket.on("gamedata", data => { // when game data arrives
      this.loaded = true;
      this.loadingtext.destroy();
      this.player = this.physics.add.sprite(data.players[this.socket.id].x, data.players[this.socket.id].y, "player").setScale(_functions_js__WEBPACK_IMPORTED_MODULE_0__.playersize / 100, _functions_js__WEBPACK_IMPORTED_MODULE_0__.playersize / 100).setDepth(2);
      this.bar = new _objects_bar_js__WEBPACK_IMPORTED_MODULE_3__["default"](this, this.player.x, this.player.y - _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius - 20, 100, 2);
      this.nametext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.player.x, this.player.y + _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 20, this.name, { fontSize: 20, fontFamily: "sans-serif" }, 2, true);
      this.playerstext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, 20, 20, "", { fontSize: 20, fontFamily: "Arial" }).setOrigin(0);
      this.scorestext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, 200, 20, "", { fontSize: 20, fontFamily: "Arial" }).setOrigin(0);

      
      this.gold = 0;
      this.goldtext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, window.innerWidth - 150, 50, "Gold: " + this.gold, { fontSize: 30, fontFamily: "copperplate" });
      
      this.fpstext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, window.innerWidth - 150, 85, "FPS: 60", { fontSize: 30, fontFamily: "copperplate" });
      this.tps = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, window.innerWidth - 150, 120, "TPS: 30", { fontSize: 30, fontFamily: "copperplate" });

      this.playerInfo = {
        x: this.player.x,
        y: this.player.y
      };
      
      this.cameras.main.startFollow(this.player);
      this.minimap.addPlayer(this, this.socket.id, data.players[this.socket.id].x, data.players[this.socket.id].y)
      
      this.data = {
        x: data.players[this.socket.id].x,
        y: data.players[this.socket.id].y,
        angle: 0,
        angle2:0
      };
  
      for(let i of data.coins){
        let coin = this.coins.create(i.x, i.y, "coin").setScale(0.75, 0.75).setDepth(1);
        coin.id = i.id;
      }
      for(let i of _trees_json__WEBPACK_IMPORTED_MODULE_6__.trees){
        let tree = this.trees.create(i.x, i.y, "tree").setScale(i.size / _functions_js__WEBPACK_IMPORTED_MODULE_0__.treesize).setDepth(10).setAlpha(0.7);
        tree.id = i.id;
        tree.angle = i.angle;
      }
      
      for(let oplayer of Object.keys(data.players)){
        if(oplayer != this.socket.id){
          this.addPlayer(data.players[oplayer]);
          this.minimap.addPlayer(this, data.players[oplayer].id, data.players[oplayer].x, data.players[oplayer].y);
        }
      }

      Object.values(data.bullets).forEach(bullet => {
        let bullet_image = this.bulletsGroup.create(bullet.x, bullet.y, "bullet").setScale(0.5, 2).setDepth(0.9);
        bullet_image.angle = bullet.angle;
        bullet_image.shooter = bullet.shooter;
        bullet_image.id = bullet.id;
        this.bullets[bullet.id] = bullet_image;
      });
      this.main();
        
    });

    this.socket.on("new player", data => { // when new player joins
      if(!this.verified) return;
      this.addPlayer(data);
      this.minimap.addPlayer(this, data.id, data.x, data.y);
    });

    this.socket.on("collected gold", id => {
      if(!this.verified) return;
      this.coins.children.entries.forEach(coin => {
        if(coin.id == id){
          coin.destroy();
        }
      });
    });
  
    this.socket.on("left", id => {
      if(!this.verified) return;
      this.enemies[id].player.destroy();
      this.enemies[id].gun.destroy();
      this.enemies[id].healthbar.destroy();
      this.enemies[id].nametext.destroy();
      delete this.enemies[id];
      this.minimap.removePlayer(id);
    });
  
    this.socket.on("leave", () => {
      this.scene.start("disconnect_scene");
    });
  }

  main(){
    setInterval(() => {
      this.tps.setText("TPS: " + this.frames);
      this.frames = 0;
    }, 1000);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.l = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    var game = this;
    this.l.on("down", function(){
      confirmmodal("", "Are you sure you want to exit the game?", "Exit").then(() => {
        game.sys.game.destroy(true, false);
        document.querySelector("main").style.display = "block";
        game.socket.emit("leaveGame");
        document.getElementsByClassName("grecaptcha-badge")[0].style.display = "block";
      });
    });

    for(let i = _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / (_functions_js__WEBPACK_IMPORTED_MODULE_0__.ratio * 2); i < _functions_js__WEBPACK_IMPORTED_MODULE_0__.size; i += _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / _functions_js__WEBPACK_IMPORTED_MODULE_0__.ratio){
      for(let j = _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / (_functions_js__WEBPACK_IMPORTED_MODULE_0__.ratio * 2); j < _functions_js__WEBPACK_IMPORTED_MODULE_0__.size; j += _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / _functions_js__WEBPACK_IMPORTED_MODULE_0__.ratio){
        let grass = this.physics.add.image(i, j, "grass").setDepth(0);
      }
    }
    
    this.obstacle1 = this.physics.add.staticSprite(_functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2, _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2 - 750, "obstacle").setDepth(0);
    this.obstacle2 = this.physics.add.staticSprite(_functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2, _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2 + 750, "obstacle").setDepth(0);
    this.obstacle3 = this.physics.add.staticSprite(_functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2 - 750, _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2, "obstacle2").setDepth(0);
    this.obstacle4 = this.physics.add.staticSprite(_functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2 + 750, _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / 2, "obstacle2").setDepth(0);

  
    this.gun = this.physics.add.sprite(this.player.x, this.player.y, "pistol").setDepth(2);

    this.gun.angle2 = 0;

    this.health = 100;

    this.score = 0;


    this.addWeaponActions();

    this.physics.add.collider(this.player, this.coins, (player, coin) => { // player collects coin
      this.collect(player, coin);
    });

    this.socket.on("gamestate", data => {
      if(!this.verified) return;
      if(this.socket.disconnected){
        this.scene.start("disconnect_scene");
        return;
      }
      this.frames += 1;
      if(!this.died){
        let self = data.players[this.socket.id];
        this.playerInfo.x = self.x;
        this.playerInfo.y = self.y;
        let game = this;
  
        this.tweens.add({
          targets: this.player,
          x: this.playerInfo.x,
          y: this.playerInfo.y,
          duration: 100
        });
      }

      Object.values(data.players).forEach(enemy => {
        if(enemy.id == this.socket.id) return;
        this.tweens.add({
          targets: [this.enemies[enemy.id].player],
          x: enemy.x,
          y: enemy.y,
          duration: 100,
          onUpdate: function(){
            try {
              let player = game.enemies[enemy.id];
              player.gun.x = player.player.x + Math.cos(enemy.angle2) * (_functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 29);
             player.gun.y = player.player.y + Math.sin(enemy.angle2) * (_functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 29);
              player.gun.angle = enemy.angle;
              player.player.angle = enemy.angle;
            } catch(e){
              console.log(e);
            }
          } 
        });
      });

      Object.values(data.bullets).forEach(bullet => {
        try {
          this.tweens.add({
            targets: [this.bullets[bullet.id]],
            x: data.bullets[bullet.id].x,
            y: data.bullets[bullet.id].y,
            duration: 1000 / 30
          });
        } catch(e){
          console.log(e);
        }
      });

      if(this.died) return;
      this.minimap.update(data.players);
    });

    this.socket.on("new bullet", (id, data) => {
      if(!this.verified) return;
      let bullet_image = this.bulletsGroup.create(data.x, data.y, "bullet").setScale(0.5, 2).setDepth(0.9);
      bullet_image.angle = data.angle;
      bullet_image.shooter = data.shooter;
      bullet_image.id = id;
      this.bullets[id] = bullet_image;
    });

    this.socket.on("removed bullet", id => {
      if(!this.verified) return;
      this.bullets[id].destroy();
      delete this.bullets[id];
    });

    this.socket.on("player died", (id, shooter, shooterName) => {
      if(!this.verified) return;
      let game = this;
      if(id != this.socket.id) var playerName = this.enemies[id].name;
      if(id == this.socket.id){
        this.died = true;
        this.gun.destroy();
        this.bar.destroy();
        this.nametext.destroy();
        this.tweens.add({
          targets: [this.player],
          duration: 1000,
          alpha: 0,
          onComplete: function(){
            game.player.destroy();
            game.nametext.destroy();
            game.playerstext.destroy();
            game.scorestext.destroy();
            game.goldtext.destroy();
            game.fpstext.destroy();
            game.tps.destroy();
            game.minimap.destroy();
            let deathtext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](game, window.innerWidth / 2, window.innerHeight / 2 - 200, "You died", { fontSize: 50 }).setDepth(101).setAlpha(0);
            let infotext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](game, window.innerWidth / 2, window.innerHeight / 2 - 100, `Killed By: ${shooterName}\n\nKill Streak: ${game.score}`, { fontSize: 30 }).setDepth(101).setAlpha(0);
            let deathRect = game.add.rectangle(window.innerWidth / 2, window.innerHeight / 2, 600, 500, 0x032a852).setOrigin(0.5).setAlpha(0).setDepth(100);
            
            deathRect.scrollFactorX = 0;
            deathRect.scrollFactorY = 0;
            let playAgain = new _objects_button_js__WEBPACK_IMPORTED_MODULE_2__["default"](game, window.innerWidth / 2, window.innerHeight / 2 + 100, "Play Again", function(){
              game.sys.game.destroy(true, false);
              document.querySelector("main").style.display = "block";
              document.getElementsByClassName("grecaptcha-badge")[0].style.display = "block";
            }, { background: 0x00374ff });
            playAgain.text.setDepth(102).setAlpha(0);
            playAgain.button.setDepth(101).setAlpha(0);
            game.tweens.add({
              targets: deathRect,
              duration: 300,
              alpha:0.7
            });
            game.tweens.add({
              targets: [deathtext, infotext, playAgain.text, playAgain.button],
              duration: 300,
              alpha:1
            });
          }
        });
      } else {
        this.enemies[id].gun.destroy();
        this.enemies[id].healthbar.destroy();
        this.enemies[id].nametext.destroy();
        this.tweens.add({
          targets: [this.enemies[id].player],
          duration: 1000,
          alpha: 0,
          onComplete: function(){
            game.enemies[id].player.destroy();
            game.enemies[id].nametext.destroy();
            delete game.enemies[id];
            game.minimap.removePlayer(id);
          }
        });
      }
      if(shooter == this.socket.id){
        this.score++;
        if(this.killText){
          this.killText.setText(`You killed ${playerName}\n\nKill Streak: ${this.score}`);
        } else {
          this.killText = new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, window.innerWidth / 2, window.innerHeight - 100, `You killed ${playerName}\n\nKill Streak: ${this.score}`, { fontSize: 30 });
        }
        setTimeout(() => {
          this.killText.destroy();
          this.killText = undefined;
        }, 4000);
      } else {
        this.enemies[shooter].score++;
      }
    });
  }

  addPlayer(player){
    var playerObj = {
      id: player.id,
      x: player.x,
      y: player.y,
      name: player.name,
      player: this.add.image(player.x, player.y, "player").setScale(_functions_js__WEBPACK_IMPORTED_MODULE_0__.playersize / 100, _functions_js__WEBPACK_IMPORTED_MODULE_0__.playersize / 100).setDepth(1),
      nametext: new _objects_text_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, player.x, player.y + _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 20, player.name, { fontSize: 20, fontFamily: "sans-serif" }, 1, true),
      healthbar: new _objects_bar_js__WEBPACK_IMPORTED_MODULE_3__["default"](this, player.x, player.y - _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius - 20, 100, 1),
      gun: this.add.image(player.x + Math.cos(player.angle2) * (_functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 29), player.y + Math.sin(player.angle2) * (_functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 29), "pistol").setDepth(1),
      angle: null,
      health: 100,
      score: player.score
    }
    this.enemies[player.id] = playerObj;
  }

  collect(player, coin){
    this.socket.emit("collect gold", coin.id);
    this.gold += 1;
    this.goldtext.setText("Gold: " + this.gold);
    coin.destroy();
    if(this.gold > localStorage.getItem("bestgold")){
      localStorage.setItem("bestgold", this.gold);
    }
    for(let i = 0; i < (0,_functions_js__WEBPACK_IMPORTED_MODULE_0__.random)(0, 2); i++){
      this.coins.create((0,_functions_js__WEBPACK_IMPORTED_MODULE_0__.random)(_functions_js__WEBPACK_IMPORTED_MODULE_0__.coinsize / 2, _functions_js__WEBPACK_IMPORTED_MODULE_0__.size - _functions_js__WEBPACK_IMPORTED_MODULE_0__.coinsize / 2), (0,_functions_js__WEBPACK_IMPORTED_MODULE_0__.random)(_functions_js__WEBPACK_IMPORTED_MODULE_0__.coinsize / 2, _functions_js__WEBPACK_IMPORTED_MODULE_0__.size - _functions_js__WEBPACK_IMPORTED_MODULE_0__.coinsize / 2), "coin").setScale(0.75, 0.75);
    }
  }

  addWeaponActions(){
    this.useweapon = true;
    this.input.on("pointerdown", e => {
      if(!this.useweapon || this.died) return;
      var angle = Math.atan2(e.y - (window.innerHeight / 2), e.x - (window.innerWidth / 2));
      this.socket.emit("shoot", angle);
      this.gun.angle = ((angle * 180 / Math.PI) + 360) % 360;
      this.gun.angle2 = angle;
      this.useweapon = false;
    });
    
    window.addEventListener("mousemove", e => {
      if(this.died || this.socket.disconnected) return;
      var angle = Math.atan2(e.clientY - (window.innerHeight / 2), e.clientX - (window.innerWidth / 2));
      this.gun.angle = ((angle * 180 / Math.PI) + 360) % 360;
      this.gun.angle2 = angle;
    });

    setInterval(() => {
      if(!this.useweapon){
        this.useweapon = true;
      }
    }, 500);
  }

  update() {
    if(!this.loaded) return;
    if(!this.verified) return;
    if(this.socket.disconnected){
      this.scene.start("disconnect_scene");
      return;
    }
    
    Object.values(this.enemies).forEach(enemy => {
      enemy.healthbar.setData(enemy.player.x, enemy.player.y - _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius - 20, enemy.health);
      enemy.nametext.setPosition(enemy.player.x, enemy.player.y + _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 20);
    });

    if(this.died) return;

    this.bar.setData(this.player.x, this.player.y - _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius - 20, 100);
    this.nametext.setPosition(this.player.x, this.player.y + _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 20);
    
    Array.prototype.insert = function(index, item) {
      this.splice(index, 0, item);
    };

    let playerslist = [...Object.values(this.enemies)];

    playerslist.insert(0, {
      score: this.score,
      name: this.name
    });
    
    let sorted_players = playerslist.sort(function(a, b){return b.score - a.score});
    let text = "";
    let text2 = "";
    for(let i of sorted_players){
      text += i.name + "\n";
      text2 += i.score + "\n";
    }
    this.playerstext.setText(text);
    this.scorestext.setText(text2);
    
    this.fpstext.setText("FPS: " + Math.round(this.sys.game.loop.actualFps));
    let cursors = this.input.keyboard.createCursorKeys();
    if(cursors.left.isDown || this.a.isDown){
      if(!this.left){
        this.socket.emit("movement", "left");
        this.left = true;
        this.right = false;
      }
    } else {
      if(this.left){
        this.socket.emit("movement_end", "left");
        this.left = false;
      }
    }
    
    if(cursors.right.isDown || this.d.isDown){
      if(!this.right){
        this.socket.emit("movement", "right");
        this.right = true;
        this.left = false;
      }
    } else {
      if(this.right){
        this.socket.emit("movement_end", "right");
        this.right = false;
      }
    }
    
    if(cursors.up.isDown || this.w.isDown){
      if(!this.up){
        this.socket.emit("movement", "up");
        this.up = true;
        this.down = false;
      }
    } else {
      if(this.up){
        this.socket.emit("movement_end", "up");
        this.up = false;
      }
    }
    
    if(cursors.down.isDown || this.s.isDown){
      if(!this.down){
        this.socket.emit("movement", "down");
        this.down = true;
        this.up = false;
      }
    } else {
      if(this.down){
        this.socket.emit("movement_end", "down");
        this.down = false;
      }
    }
    
    this.gun.x = this.player.x + Math.cos(this.gun.angle2) * (_functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 29);
    this.gun.y = this.player.y + Math.sin(this.gun.angle2) * (_functions_js__WEBPACK_IMPORTED_MODULE_0__.radius + 29);

    this.player.angle = this.gun.angle;

    if(this.player.angle != this.data.angle){
      this.data.angle = this.gun.angle;
      this.data.angle2 = this.gun.angle2;
      this.socket.emit("player angle", this.data);
    }
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gamescene);

// https://www.html5gamedevs.com/topic/7273-best-way-to-fix-weapon-to-player/

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkMovement": () => (/* binding */ checkMovement),
/* harmony export */   "coinsize": () => (/* binding */ coinsize),
/* harmony export */   "gamestate_rate": () => (/* binding */ gamestate_rate),
/* harmony export */   "playersize": () => (/* binding */ playersize),
/* harmony export */   "radius": () => (/* binding */ radius),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "ratio": () => (/* binding */ ratio),
/* harmony export */   "size": () => (/* binding */ size),
/* harmony export */   "treesize": () => (/* binding */ treesize)
/* harmony export */ });
const size = 5000;
const playersize = 65;
const radius = playersize / 2;
const coinsize = 37.5;
const ratio = size / 500;
const treesize = 300;
const gamestate_rate = 100;

function random(number1, number2){
  return Math.round(Math.random() * (number2 - number1)) + number1;
}

function checkMovement(direction, x, y){
  if(direction == "left"){
    if(x <= 0) return false;
  } if(direction == "right"){
    if(x + playersize >= size) return false;
  } if(direction == "up"){
    if(y <= 0) return false;
  } if(direction == "down"){
    if(y + playersize >= size) return false;
  } if(direction == "none"){
    return false;
  }
  return true;
}



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Text extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style, depth = 100, scroll = false){
    // default values
    
    if(!style){
      style = {};
      style.fontFamily = "Arial";
      style.fontSize = 30;
      style.background = 0x0000ff;
    }
    if(!("fontSize" in style)){
      style.fontSize = 30;
    }
    
    super(scene, x, y, text, style);
    if(!scroll){
      this.scrollFactorX = 0;
      this.scrollFactorY = 0;
    }
    this.setDepth(100);
    this.setOrigin(0.5);
    this.setDepth(depth);
    scene.add.existing(this);
  }

  setPosition(x, y){
    this.x = x;
    this.y = y;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Text);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, onclick, style){
    super(scene);
    // default values
    if(!style){
      style = {};
      style.fontSize = 50;
      style.fontFamily = "Arial";
      style.background = 0x0000ff;
    }
    if(!("fontSize" in style)){
      style.fontSize = 50;
    }
    if(!("fontFamily" in style)){
      style.fontFamily = "Arial";
    }
    if(!("background" in style)){
      style.background = 0x0000ff;
    }
    this.text = new _text_js__WEBPACK_IMPORTED_MODULE_0__["default"](scene, x, y, text, {fontSize: style.fontSize, fontFamily: style.fontFamily}).setOrigin(0.5);
    this.button = scene.add.rectangle(0, 0, 0, 0, style.background).setDepth(99);
    this.button.scrollFactorX = 0;
    this.button.scrollFactorY = 0;
    this.button.width = this.text.width + 15;
    this.button.height = this.text.height + 15;
    this.button.x = this.text.x - (this.text.width / 2) - 5;
    this.button.y = this.text.y - (this.text.height / 2) - 5;
    this.button.setInteractive().on('pointerdown', onclick);
    scene.add.existing(this);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Bar {
  constructor(scene, x, y, health, depth){
    this.bar = scene.add.rectangle(x, y, 100, 20, 0x0ffffff).setDepth(depth);
    this.inside = scene.add.rectangle(x, y, health / 100 * 100, 20, 0x00084ff).setDepth(depth);
    scene.add.existing(this.bar);
    scene.add.existing(this.inside);
  }
  
  setData(x, y, health){
    this.bar.x = x;
    this.bar.y = y;
    this.inside.x = x;
    this.inside.y = y;
    this.inside.width = this.inside.width = health / 100 * 100;
  }

  destroy(){
    this.bar.destroy();
    this.inside.destroy();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bar);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Chatbox {
  constructor(game){
    this.socket = game.socket;
  }
  
  create(){
    
  }
  
  remove(){
    
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Chatbox);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Minimap {
  constructor(scene){
    this.map = scene.add.rectangle(window.innerWidth - 220, window.innerHeight - 220, 200, 200, 0x0000000).setDepth(150).setAlpha(0.7).setOrigin(0).setStrokeStyle(3, 0x0000ff);
    this.map.scrollFactorX = 0;
    this.map.scrollFactorY = 0;
    scene.add.existing(this.map);
    this.players = {};
    this.scale = _functions_js__WEBPACK_IMPORTED_MODULE_0__.size / this.map.width;
  }

  addPlayer(scene, id, x, y){
    if(scene.died) return;
    var color = 0x0ff0000;
    if(id == scene.socket.id) color = 0x0ffa500;
    console.log(this.map.x);
    let player = scene.add.circle(this.map.x + x / this.scale, this.map.y + y / this.scale, _functions_js__WEBPACK_IMPORTED_MODULE_0__.radius / this.scale, color).setDepth(151);
    player.scrollFactorX = 0;
    player.scrollFactorY = 0;
    scene.add.existing(player);
    this.players[id] = player;
  }

  removePlayer(id){
    if(!this.players[id]) return;
    this.players[id].destroy();
    delete this.players[id];
  }

  update(players){
    Object.values(players).forEach(player => {
      this.players[player.id].x = this.map.x + player.x / this.scale;
      this.players[player.id].y = this.map.y + player.y / this.scale;
    });
  }

  destroy(){
    this.map.destroy();
    Object.values(this.players).forEach(player => {
      player.destroy();
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Minimap);

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = JSON.parse('{"trees":[{"id":0,"size":576,"x":3985,"y":1126,"angle":175},{"id":1,"size":423,"x":4783.5,"y":1563.5,"angle":206},{"id":2,"size":279,"x":367.5,"y":1010.5,"angle":310},{"id":3,"size":264,"x":1143,"y":3107,"angle":305},{"id":4,"size":384,"x":4233,"y":1235,"angle":294},{"id":5,"size":540,"x":325,"y":4273,"angle":332},{"id":6,"size":324,"x":4672,"y":1692,"angle":158},{"id":7,"size":381,"x":2755.5,"y":2820.5,"angle":102},{"id":8,"size":381,"x":3038.5,"y":1333.5,"angle":333},{"id":9,"size":375,"x":2325.5,"y":3962.5,"angle":168},{"id":10,"size":348,"x":3942,"y":1200,"angle":177},{"id":11,"size":294,"x":1189,"y":4250,"angle":144},{"id":12,"size":528,"x":1724,"y":4235,"angle":194},{"id":13,"size":195,"x":641.5,"y":1841.5,"angle":132},{"id":14,"size":390,"x":1035,"y":310,"angle":336},{"id":15,"size":213,"x":2123.5,"y":4393.5,"angle":70},{"id":16,"size":333,"x":836.5,"y":4239.5,"angle":54},{"id":17,"size":468,"x":1834,"y":2573,"angle":225},{"id":18,"size":459,"x":2332.5,"y":1268.5,"angle":175},{"id":19,"size":552,"x":4403,"y":390,"angle":127},{"id":20,"size":240,"x":2744,"y":4120,"angle":300},{"id":21,"size":351,"x":1183.5,"y":1256.5,"angle":199},{"id":22,"size":237,"x":2452.5,"y":4471.5,"angle":279},{"id":23,"size":240,"x":1609,"y":1864,"angle":197},{"id":24,"size":243,"x":4498.5,"y":4333.5,"angle":169},{"id":25,"size":546,"x":805,"y":3305,"angle":234},{"id":26,"size":369,"x":640.5,"y":1484.5,"angle":235},{"id":27,"size":453,"x":1204.5,"y":3472.5,"angle":180},{"id":28,"size":552,"x":1813,"y":3222,"angle":65},{"id":29,"size":414,"x":3379,"y":2629,"angle":201},{"id":30,"size":153,"x":3743.5,"y":3468.5,"angle":143},{"id":31,"size":579,"x":3095.5,"y":2582.5,"angle":333},{"id":32,"size":174,"x":2469,"y":3503,"angle":172},{"id":33,"size":339,"x":411.5,"y":4400.5,"angle":198},{"id":34,"size":489,"x":4164.5,"y":3071.5,"angle":351},{"id":35,"size":189,"x":4819.5,"y":212.5,"angle":167},{"id":36,"size":567,"x":1672.5,"y":2857.5,"angle":292},{"id":37,"size":186,"x":4358,"y":1257,"angle":11},{"id":38,"size":186,"x":4669,"y":3182,"angle":254},{"id":39,"size":552,"x":3384,"y":667,"angle":314},{"id":40,"size":531,"x":2407.5,"y":3444.5,"angle":85},{"id":41,"size":456,"x":4548,"y":3396,"angle":92},{"id":42,"size":282,"x":4243,"y":2060,"angle":144},{"id":43,"size":588,"x":1749,"y":1870,"angle":92},{"id":44,"size":582,"x":359,"y":3116,"angle":29},{"id":45,"size":564,"x":1067,"y":1963,"angle":79},{"id":46,"size":273,"x":4299.5,"y":511.5,"angle":265},{"id":47,"size":579,"x":293.5,"y":4051.5,"angle":354},{"id":48,"size":546,"x":1911,"y":3967,"angle":313},{"id":49,"size":231,"x":1409.5,"y":1194.5,"angle":66},{"id":50,"size":216,"x":2141,"y":1113,"angle":255},{"id":51,"size":579,"x":3716.5,"y":3185.5,"angle":39},{"id":52,"size":537,"x":3291.5,"y":4598.5,"angle":97},{"id":53,"size":345,"x":1714.5,"y":3314.5,"angle":234}]}');

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = JSON.parse('[{"id":0,"url":"player","cost":0},{"id":1,"url":"skull","cost":200},{"id":2,"url":"smileyface","cost":100},{"id":3,"url":"target","cost":100},{"id":4,"url":"basketball","cost":250}]');

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class joinscene extends Phaser.Scene {
  constructor(){
    super();
  }
  
  preload(){
    
  }
  
  create(){
    if(!localStorage.getItem("bestscore")){
      localStorage.setItem("bestscore", 0);
    }
    if(!localStorage.getItem("bestgold")){
      localStorage.setItem("bestgold", 0);
    }
    this.add.text(window.innerWidth / 2, 100, "Game", { fontFamily: "Arial", fontSize:100 }).setOrigin(0.5);

    this.button = this.add.rectangle(0, 0, 0, 0, 0x0f0);
    this.text = this.add.text(window.innerWidth / 2, window.innerHeight / 2.5, 'Play', { fill: '#ffffff', fontFamily: "Arial", fontSize:50 }).setOrigin(0.5);
    this.button.width = this.text.width + 15;
    this.button.height = this.text.height + 15;
    this.button.x = this.text.x - (this.text.width / 2) - 5;
    this.button.y = this.text.y - (this.text.height / 2) - 5;
    this.button.setInteractive().on('pointerdown', () => {
      this.scene.start("gamescene");
    });

    this.button2 = this.add.rectangle(0, 0, 0, 0, 0x0f0);
    this.text2 = this.add.text(window.innerWidth / 2, window.innerHeight / 1.8, 'How To Play', { fill: '#ffffff', fontFamily: "Arial", fontSize:50 }).setOrigin(0.5);
    this.button2.width = this.text2.width + 15;
    this.button2.height = this.text2.height + 15;
    this.button2.x = this.text2.x - (this.text2.width / 2) - 5;
    this.button2.y = this.text2.y - (this.text2.height / 2) - 5;
    this.button2.setInteractive().on('pointerdown', () => {
      this.scene.start("howtoplay");
    });

    this.button3 = this.add.rectangle(0, 0, 0, 0, 0x0f0);
    this.text3 = this.add.text(window.innerWidth / 2, window.innerHeight / 1.4, 'Your Best Scores', { fill: '#ffffff', fontFamily: "Arial", fontSize:50 }).setOrigin(0.5);
    this.button3.width = this.text3.width + 15;
    this.button3.height = this.text3.height + 15;
    this.button3.x = this.text3.x - (this.text3.width / 2) - 5;
    this.button3.y = this.text3.y - (this.text3.height / 2) - 5;
    this.button3.setInteractive().on('pointerdown', () => {
      this.scene.start("bestscores");
    });
  }
  
  update(){

  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (joinscene);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class howtoplay extends Phaser.Scene {
  constructor(){
    super();
  }

  preload(){
    
  }
  
  create(){
    this.add.text(window.innerWidth / 2, 100, "How To Play", { fontFamily: "Arial", fontSize:75 }).setOrigin(0.5 );
    this.button = this.add.rectangle(0, 0, 0, 0, 0x0f0);
    this.text = this.add.text(window.innerWidth / 2, window.innerHeight / 1.5, 'Back', { fill: '#ffffff', fontFamily: "Arial", fontSize:50 }).setOrigin(0.5);
    this.button.width = this.text.width + 10;
    this.button.height = this.text.height + 10;
    this.button.x = this.text.x - (this.text.width / 2) - 5;
    this.button.y = this.text.y - (this.text.height / 2) - 5;
    this.button.setInteractive().on('pointerdown', () => {
      this.scene.start("joinscene");
    });
  }
  
  update(){

  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (howtoplay);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class diedscene extends Phaser.Scene {
  constructor(){
    super();
  }
  
  preload(){
     
  }
  
  create(){
    this.add.text(window.innerWidth / 2, 100, "You Died", { fontFamily: "Arial", fontSize:100 }).setOrigin(0.5);

    this.button = this.add.rectangle(0, 0, 0, 0, 0x0f0);
    this.text = this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'OK', { fill: '#ffffff', fontFamily: "Arial", fontSize:50 }).setOrigin(0.5);
    this.button.width = this.text.width + 15;
    this.button.height = this.text.height + 15;
    this.button.x = this.text.x - (this.text.width / 2) - 5;
    this.button.y = this.text.y - (this.text.height / 2) - 5;
    this.button.setInteractive().on('pointerdown', () => {
      this.scene.start("joinscene");
    });
  }
  
  update(){

  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (diedscene);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class bestscores extends Phaser.Scene {
  constructor(){
    super();
  }

  preload(){
    
  }
  
  create(){
    this.add.text(window.innerWidth / 2, 100, "Your Best", { fontFamily: "Arial", fontSize:100 }).setOrigin(0.5);
    this.add.text(window.innerWidth / 2, 300, "Score: " + localStorage.getItem("bestscore"), { fontFamily: "Arial", fontSize:75 }).setOrigin(0.5);
    this.add.text(window.innerWidth / 2, 400, "Gold: " + localStorage.getItem("bestgold"), { fontFamily: "Arial", fontSize:75 }).setOrigin(0.5);

    this.button = this.add.rectangle(0, 0, 0, 0, 0x0f0);
    this.text = this.add.text(window.innerWidth / 2, window.innerHeight / 1.25, 'Back', { fill: '#ffffff', fontFamily: "Arial", fontSize:50 }).setOrigin(0.5);
    this.button.width = this.text.width + 15;
    this.button.height = this.text.height + 15;
    this.button.x = this.text.x - (this.text.width / 2) - 5;
    this.button.y = this.text.y - (this.text.height / 2) - 5;
    this.button.setInteractive().on('pointerdown', () => {
      this.scene.start("joinscene");
    });
  }
  update(){

  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bestscores);

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_text_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _objects_button_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



class disconnect_scene extends Phaser.Scene {
  constructor(){
    super();
  }
  
  preload(){
    
  }
  
  create(){
    this.disconnecttext = new _objects_text_js__WEBPACK_IMPORTED_MODULE_0__["default"](this, window.innerWidth / 2, 100, "You got disconnected", { fontSize: 50, fontFamily: "Arial" }).setOrigin(0.5);
    this.button = new _objects_button_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, window.innerWidth / 2, window.innerHeight / 2, "Reload", () => {
      location.reload();
    });
  }
  
  update(){

  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (disconnect_scene);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _scenes_join_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _scenes_howtoplay_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _scenes_died_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _scenes_best_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _scenes_disconnect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);







function startGame(){
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#000000",
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 0
        },
        debug: false
      }
    }
  };
  let name = document.getElementById("input").value;
  if(!name.replace(/\s/g, "")){
    document.querySelector("p").style.display = "block";
    return;
  }
  localStorage.setItem("name", name);
  localStorage.setItem("server", document.getElementById("server").value);
  
  const game = new Phaser.Game(config);
  
  game.scene.add("gamescene", _game__WEBPACK_IMPORTED_MODULE_0__["default"]);
  game.scene.add("joinscene", _scenes_join_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
  game.scene.add("howtoplay", _scenes_howtoplay_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
  game.scene.add("diedscene", _scenes_died_js__WEBPACK_IMPORTED_MODULE_3__["default"]);
  game.scene.add("bestscores", _scenes_best_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
  game.scene.add("disconnect_scene", _scenes_disconnect_js__WEBPACK_IMPORTED_MODULE_5__["default"]);
  game.scene.start("gamescene");
  document.querySelector("canvas").style.cursor = "crosshair";
  
  window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
  });
  
  document.querySelector("main").style.display = "none";
}

if(localStorage.getItem("name") && !loggedIn){
  document.getElementById("input").value = localStorage.getItem("name");
}

if(localStorage.getItem("server")){
  document.getElementById("server").value = localStorage.getItem("server");
}

document.getElementById("playbtn").addEventListener("click", startGame);
})();

/******/ })()
;