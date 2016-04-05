function Neuron(options){
  this.ctx = options.context;
  this.color = options.color || "white";
  this.radius = options.radius || 2;
  this.level = options.level;
  this.parentNeuron = options.parentNeuron || null;
  this.deltas = options.deltas;
  this.y = options.y || this.setYFromParent();
  this.x = options.x || this.setXFromParent();
};
Neuron.prototype = {
  drawNeuralHead: function(){
    this.ctx.beginPath(); 
    this.ctx.arc(this.x,this.y, this.radius, 0, Math.PI*2); 
    this.ctx.closePath(); 
    this.ctx.fillStyle = this.color; 
    this.ctx.fill(); 
  },
  drawPathToParent: function(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.x,this.y);
    this.ctx.lineTo(this.parentNeuron.x,this.parentNeuron.y);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  },
  setXFromParent: function(){
    //[-1, 0]
    var deltaX = this.parentNeuron.x + 50*this.deltas[0] + Math.floor(Math.random() * 20);
    return deltaX;
  },
  setYFromParent: function(){
    var deltaY = this.parentNeuron.y + 50*this.deltas[1] + Math.floor(Math.random() * 20);
    return deltaY;
  },
}