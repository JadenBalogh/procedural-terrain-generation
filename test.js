import SimplexNoise from '/node_modules/simplex-noise';
var simplex = new SimplexNoise(Math.random);

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 2000 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload()
{
  this.load.image('square', 'assets/Square.png');
  this.load.image('player', 'assets/Player.png');
  this.load.image('bullet', 'assets/Bullet.png');
  this.load.image('background', 'assets/Background.png');
}

function create()
{
  console.log("bruh" + simplex.noise2D(10, 10));

  var w = this.game.canvas.width;
  var h = this.game.canvas.height;
  
  this.input.mouse.disableContextMenu();
  this.keys = {
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
  };

  this.add.image(w / 2, h / 2, 'background');

  this.boxes = this.physics.add.staticGroup();
  this.boxes.create(50, 550, 'square');
  this.boxes.create(150, 550, 'square');
  this.boxes.create(250, 550, 'square');
  this.boxes.create(350, 550, 'square');
  this.boxes.create(450, 550, 'square');
  this.boxes.create(550, 550, 'square');
  this.boxes.create(650, 550, 'square');
  this.boxes.create(750, 550, 'square');
  this.boxes.create(150, 250, 'square');
  this.boxes.create(350, 350, 'square');
  this.boxes.create(600, 450, 'square');

  this.bullets = this.physics.add.group();

  this.player = this.physics.add.sprite(400, 450, 'player');
  this.player.setCollideWorldBounds(true);

  this.physics.add.collider(this.boxes, this.player);
  this.physics.add.collider(this.boxes, this.bullets, bulletCollide);

  this.input.on('pointerdown', function(pointer) {
    if (pointer.leftButtonDown())
    {
      var bullet = this.bullets.create(this.player.x, this.player.y, 'bullet');
      bullet.setCollideWorldBounds(true);
      bullet.setVelocityX(500);
    }
  }, this);
}

function bulletCollide(box, bullet)
{
  bullet.disableBody(true, true);
}

function update()
{
  if (this.keys.left.isDown)
  {
    this.player.setVelocityX(-250);
  }
  else if (this.keys.right.isDown)
  {
    this.player.setVelocityX(250);
  }
  else
  {
    this.player.setVelocityX(0);
  }

  if (this.keys.up.isDown && this.player.body.touching.down)
  {
    this.player.setVelocityY(-800);
  }

  var mouse = this.input.activePointer;
  if (mouse.isDown && mouse.leftButtonDown())
  {
    console.log("left");
  }
  if (mouse.isDown && mouse.rightButtonDown())
  {
    console.log("right");
  }
}