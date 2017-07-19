'use strict';

class Draw {
	constructor (opts) {
		this._whiteboard = opts.whiteboard;
		this._isDrawing = false;
	}

	init () {
		// Checking for support
		this._ctx = this._whiteboard.getContext('2d');
		this.bindEvents();
	}

	drawline () {
		this._ctx.beginPath();
		this._ctx.moveTo(this._startCoordX, this._startCoordY);
		this._ctx.lineTo(this._endCoordX, this._endCoordY);
		this._ctx.strokeStyle = 'green';
		this._ctx.stroke();
        this._ctx.closePath();
	}

	bindEvents () { 
		let self = this;
		this._whiteboard.addEventListener('mousedown', function(e) {self.onMousedown(e);}); 
		this._whiteboard.addEventListener('mouseup', function(e) {self.onMouseup(e);});
		this._whiteboard.addEventListener('mouseout', function(e) {self.onMouseout(e);});
		this._whiteboard.addEventListener('mousemove', function(e) {self.onMousemove(e);});
	}

	onMousedown (e) {
		// 获取开始画线坐标
		this._isDrawing = true;
		this._startCoordX = e.clientX;
		this._startCoordY = e.clientY;
	}

	onMouseup (e) {
		// 获取结束画线坐标
		this._isDrawing = false;
		this._endCoordX = e.clientX;
		this._endCoordY = e.clientY;
		// 画线
		this.drawline();
	}


	onMouseout (e) {
		if(!this._isDrawing) return;
		this.onMouseup(e);
	}

	onMousemove (e) {
		if(!this._isDrawing) return;
		// 获取移动至某点的坐标
		this._endCoordX = e.clientX;
		this._endCoordY = e.clientY;
		// 画线
		this.drawline();
		// 本次结束的点为下一次移动的起点
		this._startCoordX = this._endCoordX;
		this._startCoordY = this._endCoordY;
	}
}