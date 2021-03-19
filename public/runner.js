class Level extends Phaser.Scene {
  constructor(key) {
    super(StartScene);
  }

  preload() {
    this.load.image(
      "platform",
      "https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/platform.png"
    );
    this.load.spritesheet(
      "campfire",
      "https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/campfire.png",
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet(
      "codey",
      "https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/codey.png",
      { frameWidth: 72, frameHeight: 90 }
    );

    this.load.image("bg2", "https://i.imgur.com/IgxkQw0.gif");
    this.load.image(
      "bg3",
      "https://content.codecademy.com/courses/learn-phaser/Codey%20Tundra/snowdunes.png"
    );
  }

  create() {
    gameState.active = true;

    gameState.bgColor = this.add
      .rectangle(0, 0, config.width, config.height, 0x00ffbb)
      .setOrigin(0, 0);
    this.createParallaxBackgrounds();

    gameState.player = this.physics.add.sprite(920, 590, "codey").setScale(0.5);
    this.createAnimations();

    this.cameras.main.setBounds(
      0,
      0,
      gameState.bg2.width,
      gameState.bg2.height
    );
    this.physics.world.setBounds(
      0,
      0,
      gameState.width,
      gameState.bg2.height + gameState.player.height
    );

    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);
    gameState.player.setCollideWorldBounds(true);

    gameState.cursors = this.input.keyboard.createCursorKeys();
  }

  createAnimations() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("codey", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createParallaxBackgrounds() {
    gameState.bg2 = this.add.image(0, 0, "bg2");

    gameState.bg2.setOrigin(0, 0);

    const game_width = parseFloat(gameState.bg2.getBounds().width);
    gameState.width = game_width;
    const window_width = config.width;

    const bg2_width = gameState.bg2.getBounds().width;
    gameState.bg2.setScrollFactor(
      (bg2_width - window_width) / (game_width - window_width)
    );
  }

  update() {
    if (gameState.active) {
      if (gameState.cursors.right.isDown) {
        gameState.player.flipX = false;
        gameState.player.setVelocityX(gameState.speed);
        gameState.player.anims.play("run", true);
      } else if (gameState.cursors.left.isDown) {
        gameState.player.flipX = true;
        gameState.player.setVelocityX(-gameState.speed);
        gameState.player.anims.play("run", true);
      } else if (gameState.cursors.up.isDown) {
        gameState.player.setVelocityY(-gameState.speed);
        gameState.player.anims.play("run", true);
      } else if (gameState.cursors.down.isDown) {
        gameState.player.setVelocityY(gameState.speed);
        gameState.player.anims.play("run", true);
      } else {
        gameState.player.setVelocityX(0);
        gameState.player.setVelocityY(0);
        gameState.player.anims.play("run", false);
      }
    }
  }
}

class StartScene extends Level {
  constructor() {
    super("Level1");
  }
}

const gameState = {
  speed: 240,
  ups: 380,
};

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  transparent: true,
  roundPixels: false,
  audio: { noAudio: false },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      enableBody: true,
    },
  },
  scene: [StartScene],
};

const game = new Phaser.Game(config);
