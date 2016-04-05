function Neural(options){
  this.ctx = options.context;
  this.width = options.width;
  this.height = options.height;
  this.clearScreen();
  this.createNeurons();
};

Neural.prototype = {
  clearScreen: function(){
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fill();
  },
  createNeurons: function(){
    
  },
};