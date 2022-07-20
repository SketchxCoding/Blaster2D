(()=>{"use strict";const e=5e3,t=32.5;class s extends Phaser.GameObjects.Text{constructor(e,t,s,i,n,a=100,o=!1){n||((n={}).fontFamily="Arial",n.fontSize=30,n.background=255),"fontSize"in n||(n.fontSize=30),super(e,t,s,i,n),o||(this.scrollFactorX=0,this.scrollFactorY=0),this.setDepth(100),this.setOrigin(.5),this.setDepth(a),e.add.existing(this)}setPosition(e,t){this.x=e,this.y=t}}const i=s;class n extends Phaser.GameObjects.Container{constructor(e,t,s,n,a,o){super(e),o||((o={}).fontSize=50,o.fontFamily="Arial",o.background=255),"fontSize"in o||(o.fontSize=50),"fontFamily"in o||(o.fontFamily="Arial"),"background"in o||(o.background=255),this.text=new i(e,t,s,n,{fontSize:o.fontSize,fontFamily:o.fontFamily}).setOrigin(.5),this.button=e.add.rectangle(0,0,0,0,o.background).setDepth(99),this.button.scrollFactorX=0,this.button.scrollFactorY=0,this.button.width=this.text.width+15,this.button.height=this.text.height+15,this.button.x=this.text.x-this.text.width/2-5,this.button.y=this.text.y-this.text.height/2-5,this.button.setInteractive().on("pointerdown",a),e.add.existing(this)}}const a=n,o=class{constructor(e,t,s,i,n){this.bar=e.add.rectangle(t,s,100,20,16777215).setDepth(n),this.inside=e.add.rectangle(t,s,i/100*100,20,34047).setDepth(n),e.add.existing(this.bar),e.add.existing(this.inside)}setData(e,t,s){this.bar.x=e,this.bar.y=t,this.inside.x=e,this.inside.y=t,this.inside.width=this.inside.width=s/100*100}destroy(){this.bar.destroy(),this.inside.destroy()}},h=JSON.parse('{"T":[{"id":0,"size":576,"x":3985,"y":1126,"angle":175},{"id":1,"size":423,"x":4783.5,"y":1563.5,"angle":206},{"id":2,"size":279,"x":367.5,"y":1010.5,"angle":310},{"id":3,"size":264,"x":1143,"y":3107,"angle":305},{"id":4,"size":384,"x":4233,"y":1235,"angle":294},{"id":5,"size":540,"x":325,"y":4273,"angle":332},{"id":6,"size":324,"x":4672,"y":1692,"angle":158},{"id":7,"size":381,"x":2755.5,"y":2820.5,"angle":102},{"id":8,"size":381,"x":3038.5,"y":1333.5,"angle":333},{"id":9,"size":375,"x":2325.5,"y":3962.5,"angle":168},{"id":10,"size":348,"x":3942,"y":1200,"angle":177},{"id":11,"size":294,"x":1189,"y":4250,"angle":144},{"id":12,"size":528,"x":1724,"y":4235,"angle":194},{"id":13,"size":195,"x":641.5,"y":1841.5,"angle":132},{"id":14,"size":390,"x":1035,"y":310,"angle":336},{"id":15,"size":213,"x":2123.5,"y":4393.5,"angle":70},{"id":16,"size":333,"x":836.5,"y":4239.5,"angle":54},{"id":17,"size":468,"x":1834,"y":2573,"angle":225},{"id":18,"size":459,"x":2332.5,"y":1268.5,"angle":175},{"id":19,"size":552,"x":4403,"y":390,"angle":127},{"id":20,"size":240,"x":2744,"y":4120,"angle":300},{"id":21,"size":351,"x":1183.5,"y":1256.5,"angle":199},{"id":22,"size":237,"x":2452.5,"y":4471.5,"angle":279},{"id":23,"size":240,"x":1609,"y":1864,"angle":197},{"id":24,"size":243,"x":4498.5,"y":4333.5,"angle":169},{"id":25,"size":546,"x":805,"y":3305,"angle":234},{"id":26,"size":369,"x":640.5,"y":1484.5,"angle":235},{"id":27,"size":453,"x":1204.5,"y":3472.5,"angle":180},{"id":28,"size":552,"x":1813,"y":3222,"angle":65},{"id":29,"size":414,"x":3379,"y":2629,"angle":201},{"id":30,"size":153,"x":3743.5,"y":3468.5,"angle":143},{"id":31,"size":579,"x":3095.5,"y":2582.5,"angle":333},{"id":32,"size":174,"x":2469,"y":3503,"angle":172},{"id":33,"size":339,"x":411.5,"y":4400.5,"angle":198},{"id":34,"size":489,"x":4164.5,"y":3071.5,"angle":351},{"id":35,"size":189,"x":4819.5,"y":212.5,"angle":167},{"id":36,"size":567,"x":1672.5,"y":2857.5,"angle":292},{"id":37,"size":186,"x":4358,"y":1257,"angle":11},{"id":38,"size":186,"x":4669,"y":3182,"angle":254},{"id":39,"size":552,"x":3384,"y":667,"angle":314},{"id":40,"size":531,"x":2407.5,"y":3444.5,"angle":85},{"id":41,"size":456,"x":4548,"y":3396,"angle":92},{"id":42,"size":282,"x":4243,"y":2060,"angle":144},{"id":43,"size":588,"x":1749,"y":1870,"angle":92},{"id":44,"size":582,"x":359,"y":3116,"angle":29},{"id":45,"size":564,"x":1067,"y":1963,"angle":79},{"id":46,"size":273,"x":4299.5,"y":511.5,"angle":265},{"id":47,"size":579,"x":293.5,"y":4051.5,"angle":354},{"id":48,"size":546,"x":1911,"y":3967,"angle":313},{"id":49,"size":231,"x":1409.5,"y":1194.5,"angle":66},{"id":50,"size":216,"x":2141,"y":1113,"angle":255},{"id":51,"size":579,"x":3716.5,"y":3185.5,"angle":39},{"id":52,"size":537,"x":3291.5,"y":4598.5,"angle":97},{"id":53,"size":345,"x":1714.5,"y":3314.5,"angle":234}]}'),r=JSON.parse('[{"id":0,"url":"player","cost":0},{"id":1,"url":"skull","cost":200},{"id":2,"url":"smileyface","cost":100},{"id":3,"url":"target","cost":100},{"id":4,"url":"basketball","cost":250}]');class l extends Phaser.Scene{constructor(){super(),this.left=!1,this.right=!1,this.up=!1,this.down=!1}preload(){for(let e of Object.keys(r))this.load.image(`skin_${r[e].id}`,`/img/skins/${r[e].url}.png`);this.load.image("player","/img/skins/player.png"),this.load.image("coin","/img/gameObjects/coin.png"),this.load.image("grass","/img/gameObjects/tile.png"),this.load.image("bullet","/img/gameObjects/bullet.png"),this.load.image("pistol","/img/guns/pistol.png"),this.load.image("obstacle","/img/gameObjects/obstacle.png"),this.load.image("obstacle2","/img/gameObjects/obstacle2.png"),this.load.image("tree","/img/gameObjects/tree.png"),this.loadingtext=new i(this,window.innerWidth/2,window.innerHeight/2,"Loading...",{fontSize:100,fontFamily:"Arial"}).setOrigin(.5),this.load.plugin("rexbbcodetextplugin","https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js",!0)}create(){this.loaded=!1,this.socket=io(document.getElementById("server").value),this.name=name||localStorage.getItem("name"),this.coins={},this.trees=this.physics.add.group(),this.bulletsGroup=this.physics.add.group(),this.enemies={},this.bullets={},this.verified=!1,this.minimap=new class{constructor(t){this.map=t.add.rectangle(window.innerWidth-220,window.innerHeight-220,200,200,0).setDepth(150).setAlpha(.7).setOrigin(0).setStrokeStyle(3,255),this.map.scrollFactorX=0,this.map.scrollFactorY=0,this.players={},this.scale=e/this.map.width}show(e){e.add.existing(this.map)}addPlayer(e,s,i,n){if(e.died)return;var a=16711680;s==e.socket.id&&(a=16753920);let o=e.add.circle(this.map.x+i/this.scale,this.map.y+n/this.scale,t/this.scale,a).setDepth(151);o.scrollFactorX=0,o.scrollFactorY=0,e.add.existing(o),this.players[s]=o}removePlayer(e){this.players[e]&&(this.players[e].destroy(),delete this.players[e])}update(e){Object.values(e).forEach((e=>{this.players[e.id].x=this.map.x+e.x/this.scale,this.players[e.id].y=this.map.y+e.y/this.scale}))}destroy(){this.map.destroy(),Object.values(this.players).forEach((e=>{e.destroy()}))}}(this),this.chatbox=new class{constructor(e){this.socket=e.socket,this.on=!0,this.name=e.name,this.focus=!1,this.sent=!1,this.chatbox=document.getElementById("chatbox"),this.input=document.getElementById("chat-input"),this.messages=document.getElementById("messages"),this.chatbox.style.display="block",this.input.addEventListener("keydown",(e=>{if(this.on){if("Enter"==e.key){if(!this.validMessage(this.input.value))return this.sent=!1;this.socket.emit("chat message",this.name,this.input.value),this.input.value="",this.sent=!0}"Tab"==e.key&&(e.preventDefault(),this.input.blur())}})),this.socket.on("chat message",(e=>{this.on&&(this.messages.innerHTML+=`<p>${this.encodeHTML(e)}</p>`,this.messages.scrollTo(0,this.messages.scrollHeight))})),this.input.onfocus=()=>{this.input.placeholder="Press TAB to exit",this.focus=!0},this.input.onblur=()=>{this.input.placeholder="Click here or press ENTER to chat",this.focus=!1}}encodeHTML(e){var t=document.createElement("div");return t.innerText=e,t.innerHTML}validMessage(e){if(!e)return!1;for(var t of e)if(" "!=t)return!0;return!1}destroy(){this.on=!1,this.chatbox.style.display="none",this.messages.innerHTML="",this.input.value=""}}(this),this.spawned=!1;let s=this;grecaptcha.ready((function(){grecaptcha.execute("6Lcm-s0gAAAAAEeQqYid3ppPGWgZuGKxXHKLyO77",{action:"submit"}).then((function(e){s.socket.emit("join",s.name,e,loggedIn),s.verified=!0,document.getElementsByClassName("grecaptcha-badge")[0].style.display="none"}))})),window.addEventListener("resize",(()=>{this.scale.resize(window.innerWidth,window.innerHeight)}));const n=function(){window.error="Failed to join server\n\nTry again or choose a different server",s.scene.start("disconnect_scene"),s.chatbox.destroy()};this.socket.on("connect_error",n),this.socket.on("connect_failed",n),this.socket.on("kick",(e=>{window.error=e,s.scene.start("disconnect_scene"),s.chatbox.destroy()})),this.socket.on("gamedata",(e=>{try{this.loaded=!0,this.loadingtext.destroy(),this.player=this.physics.add.sprite(e.players[this.socket.id].x,e.players[this.socket.id].y,"player").setScale(.65,.65).setDepth(2).setAlpha(.5),this.bar=new o(this,this.player.x,this.player.y-t-20,100,2),this.nametext=new i(this,this.player.x,this.player.y+t+20,this.name,{fontSize:20,fontFamily:"sans-serif",color:loggedIn?"blue":"white"},2,!0),this.playerstext=this.add.rexBBCodeText(20,20,"",{fontSize:22,fontFamily:"Arial"}).setOrigin(0).setDepth(100),this.playerstext.scrollFactorX=0,this.playerstext.scrollFactorY=0,this.scorestext=new i(this,200,20,"",{fontSize:22,fontFamily:"Arial"}).setOrigin(0),this.gold=0,this.goldtext=new i(this,window.innerWidth-150,50,"Gold: "+this.gold,{fontSize:30,fontFamily:"copperplate"}),this.fpstext=new i(this,window.innerWidth-150,85,"FPS: 60",{fontSize:30,fontFamily:"copperplate"}),this.tps=new i(this,window.innerWidth-150,120,"TPS: 30",{fontSize:30,fontFamily:"copperplate"}),this.playerInfo={x:this.player.x,y:this.player.y},this.cameras.main.startFollow(this.player),this.minimap.show(this),this.minimap.addPlayer(this,this.socket.id,e.players[this.socket.id].x,e.players[this.socket.id].y),this.data={x:e.players[this.socket.id].x,y:e.players[this.socket.id].y,angle:0,angle2:0};for(let t of Object.values(e.coins)){let e={coin:this.add.image(t.x,t.y,"coin").setScale(.75,.75).setDepth(.99),id:t.id};this.coins[t.id]=e}for(let e of h.T){let t=this.trees.create(e.x,e.y,"tree").setScale(e.size/300).setDepth(10).setAlpha(.7);t.id=e.id,t.angle=e.angle}for(let t of Object.keys(e.players))t!=this.socket.id&&(this.addPlayer(e.players[t]),this.minimap.addPlayer(this,e.players[t].id,e.players[t].x,e.players[t].y));Object.values(e.bullets).forEach((e=>{let t=this.bulletsGroup.create(e.x,e.y,"bullet").setScale(.5,2).setDepth(.999);t.angle=e.angle,t.shooter=e.shooter,t.id=e.id,this.bullets[e.id]=t})),this.main()}catch(e){console.log(e)}})),this.socket.on("new player",(e=>{this.verified&&(this.addPlayer(e),this.minimap.addPlayer(this,e.id,e.x,e.y))})),this.socket.on("collected coin",((e,t)=>{try{if(!this.verified)return;let s;t==this.socket.id?(this.gold++,this.goldtext.setText("Gold: "+this.gold),s=this.player):s=this.enemies[t].player;let i=this.coins[e];this.tweens.add({targets:i.coin,x:s.x,y:s.y,duration:75,onComplete:function(){i.coin.destroy()}})}catch(e){console.log(e)}})),this.socket.on("new coin",(e=>{try{let t={coin:this.add.image(e.x,e.y,"coin").setScale(.75,.75).setDepth(1),id:e.id};this.coins[e.id]=t}catch(e){console.log(e)}})),this.socket.on("tps",(e=>{try{this.tps.setText("TPS: "+e)}catch(e){console.log(e)}})),this.socket.on("left",(e=>{try{this.enemies[e].player.destroy(),this.enemies[e].gun.destroy(),this.enemies[e].healthbar.destroy(),this.enemies[e].nametext.destroy(),delete this.enemies[e],this.minimap.removePlayer(e)}catch(e){console.log(e)}})),this.socket.on("leave",(()=>{this.chatbox.destroy(),window.error="You got disconnected",this.scene.start("disconnect_scene")}))}main(){this.w=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W,!1),this.a=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A,!1),this.s=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S,!1),this.d=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D,!1);var t=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L,!1),s=(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE,!1),this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER,!1)),n=this;t.on("down",(function(){n.chatbox.focus||confirmmodal("","Are you sure you want to exit the game?","Exit").then((()=>{n.sys.game.destroy(!0,!1),n.chatbox.destroy(),document.querySelector("main").style.display="block",n.socket.emit("leaveGame"),document.getElementsByClassName("grecaptcha-badge")[0].style.display="block",getServerData()}))})),s.on("down",(function(){if(n.chatbox.sent)return n.chatbox.sent=!1,n.chatbox.input.blur();n.chatbox.focus||n.chatbox.input.focus()}));for(let t=250;t<e;t+=500)for(let s=250;s<e;s+=500)this.physics.add.image(t,s,"grass").setDepth(0);this.obstacle1=this.physics.add.staticSprite(2500,1750,"obstacle").setDepth(0),this.obstacle2=this.physics.add.staticSprite(2500,3250,"obstacle").setDepth(0),this.obstacle3=this.physics.add.staticSprite(1750,2500,"obstacle2").setDepth(0),this.obstacle4=this.physics.add.staticSprite(3250,2500,"obstacle2").setDepth(0),this.gun=this.physics.add.sprite(this.player.x,this.player.y,"pistol").setDepth(2),this.gun.angle2=0,this.health=100,this.score=0,this.addWeaponActions(),this.socket.on("gamestate",(e=>{try{if(!this.verified)return;if(this.socket.disconnected)return this.chatbox.destroy(),window.error="You got disconnected",void this.scene.start("disconnect_scene");let t=this;if(!this.died){let t=e.players[this.socket.id];this.playerInfo.x=t.x,this.playerInfo.y=t.y,this.health=t.health,t.spawned&&!this.spawned&&this.player.setAlpha(1),this.tweens.add({targets:this.player,x:this.playerInfo.x,y:this.playerInfo.y,duration:100})}if(Object.values(e.players).forEach((e=>{e.id!=this.socket.id&&(e.spawned&&!this.enemies[e.id].spawned&&(this.enemies[e.id].player.setAlpha(1),this.enemies[e.id].spawned=!0),this.enemies[e.id].health=e.health,this.tweens.add({targets:[this.enemies[e.id].player],x:e.x,y:e.y,duration:100,onUpdate:function(){let s=t.enemies[e.id];s&&(s.gun.x=s.player.x+61.5*Math.cos(e.angle2),s.gun.y=s.player.y+61.5*Math.sin(e.angle2),s.gun.angle=e.angle,s.player.angle=e.angle)}}))})),Object.values(e.bullets).forEach((t=>{this.tweens.add({targets:[this.bullets[t.id]],x:e.bullets[t.id].x,y:e.bullets[t.id].y,duration:1e3/30})})),this.died)return;this.minimap.update(e.players)}catch(e){console.log(e)}})),this.socket.on("new bullet",((e,t)=>{try{if(!this.verified)return;let s=this.bulletsGroup.create(t.x,t.y,"bullet").setScale(.5,2).setDepth(.999);s.angle=t.angle,s.shooter=t.shooter,s.id=e,this.bullets[e]=s}catch(e){console.log(e)}})),this.socket.on("removed bullet",(e=>{try{if(!this.verified)return;this.bullets[e].destroy(),delete this.bullets[e]}catch(e){console.log(e)}})),this.socket.on("player died",((e,t,s)=>{try{if(!this.verified)return;let o=this;if(e!=this.socket.id)var n=this.enemies[e].name;e==this.socket.id?(this.died=!0,this.gun.destroy(),this.bar.destroy(),this.nametext.destroy(),this.tweens.add({targets:[this.player],duration:1e3,alpha:0,onComplete:function(){o.player.destroy(),o.nametext.destroy(),o.playerstext.destroy(),o.scorestext.destroy(),o.goldtext.destroy(),o.fpstext.destroy(),o.tps.destroy(),o.minimap.destroy(),o.chatbox.destroy();let e=new i(o,window.innerWidth/2,window.innerHeight/2-200,"You died",{fontSize:50}).setDepth(101).setAlpha(0),n=new i(o,window.innerWidth/2,window.innerHeight/2-100,`Killed By: ${s}\n\nKill Streak: ${o.score}`,{fontSize:30}).setDepth(101).setAlpha(0),h=o.add.rectangle(window.innerWidth/2,window.innerHeight/2,600,500,237136).setOrigin(.5).setAlpha(0).setDepth(100);h.scrollFactorX=0,h.scrollFactorY=0,h.setStrokeStyle(5,0);let r=new a(o,window.innerWidth/2,window.innerHeight/2+100,"Play Again",(function(){o.sys.game.destroy(!0,!1),document.querySelector("main").style.display="block",document.getElementsByClassName("grecaptcha-badge")[0].style.display="block",o.socket.disconnect(),getServerData()}),{background:226559});r.text.setDepth(102).setAlpha(0),r.button.setDepth(101).setAlpha(0),o.enemies[t]&&o.cameras.main.startFollow(o.enemies[t].player),o.tweens.add({targets:h,duration:300,alpha:.5}),o.tweens.add({targets:[e,n,r.text,r.button],duration:300,alpha:1})}})):(this.enemies[e].gun.destroy(),this.enemies[e].healthbar.destroy(),this.enemies[e].nametext.destroy(),this.tweens.add({targets:[this.enemies[e].player],duration:1e3,alpha:0,onComplete:function(){o.enemies[e].player.destroy(),o.enemies[e].nametext.destroy(),delete o.enemies[e],o.minimap.removePlayer(e)}})),t==this.socket.id?(this.score++,this.killText?this.killText.setText(`You killed ${n}\n\nKill Streak: ${this.score}`):this.killText=new i(this,window.innerWidth/2,window.innerHeight-90,`You killed ${n}\n\nKill Streak: ${this.score}`,{fontSize:30}),setTimeout((()=>{this.killText.destroy(),this.killText=void 0}),4e3)):this.enemies[t].score++}catch(e){console.log(e)}}))}addPlayer(e){var s=.5,n=!1;e.spawned&&(s=1,n=!0);var a={id:e.id,x:e.x,y:e.y,name:e.name,player:this.add.image(e.x,e.y,"player").setScale(.65,.65).setDepth(1).setAlpha(s),nametext:new i(this,e.x,e.y+t+20,e.name,{fontSize:20,fontFamily:"sans-serif",color:e.bot?"red":e.account?"blue":"white"},1,!0),healthbar:new o(this,e.x,e.y-t-20,100,1),gun:this.add.image(e.x+61.5*Math.cos(e.angle2),e.y+61.5*Math.sin(e.angle2),"pistol").setDepth(1),angle:null,health:100,score:e.score,spawned:n,bot:e.bot,account:e.account};this.enemies[e.id]=a}addWeaponActions(){this.input.on("pointerdown",(e=>{if(!this.died){if(!this.chatbox.focus){var t=Math.atan2(e.y-window.innerHeight/2,e.x-window.innerWidth/2);this.socket.emit("shoot",t),this.gun.angle=(180*t/Math.PI+360)%360,this.gun.angle2=t}document.getElementById("chat-input").blur()}})),this.input.on("pointermove",(e=>{if(!this.died&&!this.socket.disconnected){var t=Math.atan2(e.y-window.innerHeight/2,e.x-window.innerWidth/2);this.gun.angle=(180*t/Math.PI+360)%360,this.gun.angle2=t}}))}update(){if(!this.loaded)return;if(!this.verified)return;if(this.socket.disconnected)return this.chatbox.destroy(),window.error="You got disconnected",void this.scene.start("disconnect_scene");if(Object.values(this.enemies).forEach((e=>{e.healthbar.setData(e.player.x,e.player.y-t-20,e.health),e.nametext.setPosition(e.player.x,e.player.y+t+20)})),this.died)return;this.bar.setData(this.player.x,this.player.y-t-20,this.health),this.nametext.setPosition(this.player.x,this.player.y+t+20),Array.prototype.insert=function(e,t){this.splice(e,0,t)};let e=[...Object.values(this.enemies)],s={};e.insert(0,{score:this.score,name:this.name,bot:!1,account:loggedIn});let i=e.sort((function(e,t){return t.score-e.score})),n="",a="";for(let e of i)n+=`[color=${e.bot?"red":e.account?"blue":"white"}]${e.name}[/color]\n`,a+=e.score+"\n";this.playerstext.setText(n),this.scorestext.setText(a);for(let e of Object.keys(s))this.playerstext.addColor(s[e],e);this.fpstext.setText("FPS: "+Math.round(this.sys.game.loop.actualFps));let o=this.input.keyboard.createCursorKeys();this.chatbox.focus||(o.left.isDown||this.a.isDown?this.left||(this.socket.emit("movement","left"),this.left=!0,this.right=!1):this.left&&(this.socket.emit("movement_end","left"),this.left=!1),o.right.isDown||this.d.isDown?this.right||(this.socket.emit("movement","right"),this.right=!0,this.left=!1):this.right&&(this.socket.emit("movement_end","right"),this.right=!1),o.up.isDown||this.w.isDown?this.up||(this.socket.emit("movement","up"),this.up=!0,this.down=!1):this.up&&(this.socket.emit("movement_end","up"),this.up=!1),o.down.isDown||this.s.isDown?this.down||(this.socket.emit("movement","down"),this.down=!0,this.up=!1):this.down&&(this.socket.emit("movement_end","down"),this.down=!1)),this.gun.x=this.player.x+61.5*Math.cos(this.gun.angle2),this.gun.y=this.player.y+61.5*Math.sin(this.gun.angle2),this.player.angle=this.gun.angle,this.player.angle!=this.data.angle&&(this.data.angle=this.gun.angle,this.data.angle2=this.gun.angle2,this.socket.emit("player angle",this.data))}}const d=l;class c extends Phaser.Scene{constructor(){super()}preload(){}create(){this.disconnecttext=new i(this,window.innerWidth/2,100,window.error,{fontSize:30,fontFamily:"Arial"}).setOrigin(.5),this.button=new a(this,window.innerWidth/2,window.innerHeight/2,"Reload",(()=>{location.reload()}))}update(){}}const y=c;localStorage.getItem("name")&&!loggedIn&&(document.getElementById("input").value=localStorage.getItem("name")),loggedIn&&localStorage.setItem("name",""),localStorage.getItem("server")&&(document.getElementById("server").value=localStorage.getItem("server")),document.getElementById("playbtn").addEventListener("click",(function(){const e={type:Phaser.AUTO,width:window.innerWidth,height:window.innerHeight,backgroundColor:"#000000",physics:{default:"arcade",arcade:{gravity:{y:0},debug:!1}}};let t=document.getElementById("input").value;if(!t.replace(/\s/g,""))return void(document.querySelector("p").style.display="block");loggedIn?localStorage.setItem("name",""):localStorage.setItem("name",t),localStorage.setItem("server",document.getElementById("server").value);const s=new Phaser.Game(e);s.scene.add("gamescene",d),s.scene.add("disconnect_scene",y),s.scene.start("gamescene"),document.querySelector("canvas").style.cursor="crosshair",window.addEventListener("resize",(()=>{s.scale.resize(window.innerWidth,window.innerHeight)})),document.querySelector("main").style.display="none"})),window.getServerData=()=>{const e={"https://blaster2d.ruiwenge2.repl.co":1,"https://blaster2d.herokuapp.com":2};for(let t of Object.keys(e))fetch(t+"/stats").then((e=>e.json())).then((s=>{document.getElementById("server"+e[t]).innerHTML=`Server ${e[t]} (${s.tps} TPS)`,console.log(t,": ",s.tps)}))},getServerData()})();