class Block extends Phaser.GameObjects.Container {
  constructor(parent, x, y, type) {
    const blocks = [
      "block-001",
      "block-002",
      "block-003",
      "block-004",
      "block-087",
    ];

    var blockImage = new Phaser.GameObjects.Sprite(
      parent,
      0,
      0,
      "isoblocks",
      blocks[type]
    );
    blockImage.setScale(2, 2);

    super(parent, x, y, [blockImage]);

    this.parent = parent;
    this.blocks = blocks;
    this.blockImage = blockImage;

    parent.add.existing(this);
  }

  updateBlock(type) {
    this.blockImage.destroy();
    var blockImage = this.parent.add.image(
      0,
      0,
      "isoblocks",
      this.blocks[type]
    );
    this.add(blockImage);
  }
}
