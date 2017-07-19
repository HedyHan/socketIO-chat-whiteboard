'use strict';

class Draw {
	constructor (opts) {
		this._whiteboard = opts.whiteboard;
		this._size = {
			width: this._whiteboard.width,
			height: this._whiteboard.height
		}
		this._socket = opts.socket;
		this._isDrawing = false;
	}

	init () {
		// Checking for support
		this._ctx = this._whiteboard.getContext('2d');
		this.bindEvents();
		this.bindSocketEvents();
	}

	drawline (coords, isRemote) {
		this._ctx.beginPath();
		this._ctx.moveTo(coords.sx, coords.sy);
		this._ctx.lineTo(coords.ex, coords.ey);
		this._ctx.strokeStyle = 'green';
		this._ctx.stroke();
        this._ctx.closePath();

    	if(isRemote) return;

    	// 发送本地数据
        let newCoords = {
        	sx: coords.sx / this._size.width,
        	sy: coords.sy / this._size.height,
        	ex: coords.ex / this._size.width,
        	ey: coords.ey / this._size.height
        }
        this._socket.emit('drawing',newCoords);
	}

	bindEvents () { 
		let self = this;
		this._whiteboard.addEventListener('mousedown', function(e) {self.onMousedown(e);}); 
		this._whiteboard.addEventListener('mouseup', function(e) {self.onMouseup(e);});
		this._whiteboard.addEventListener('mouseout', function(e) {self.onMouseout(e);});
		this._whiteboard.addEventListener('mousemove', function(e) {self.onMousemove(e);});
	}

	bindSocketEvents () {
		// 接收广播
		let socket = this._socket;
		let self = this;

		this._socket.on('draw_remote',function(data) {
			let coords = {
	        	sx: data.sx * self._size.width,
	        	sy: data.sy * self._size.height,
	        	ex: data.ex * self._size.width,
	        	ey: data.ey * self._size.height
        	}
			self.drawline(coords,true);
		})
	}

	onMousedown (e) {
		// 获取开始画线坐标
		if(e.which === 1 )  {   // 区别鼠标右键点击事件
			this._isDrawing = true;
			this._startCoordX = e.clientX;
			this._startCoordY = e.clientY;
		}
	}

	onMouseup (e) {
		if(!this._isDrawing) return;
		// 获取结束画线坐标
		let coords = {
	        	sx: this._startCoordX,
	        	sy: this._startCoordY,
	        	ex: e.clientX,
	        	ey: e.clientY
	        }
		// 画线
		this.drawline(coords);
		this._isDrawing = false;
	}


	onMouseout (e) {
		if(!this._isDrawing) return;
		this.onMouseup(e);
	}

	onMousemove (e) {
		if(!this._isDrawing) return;
		// 获取移动至某点的坐标
		let coords = {
	        	sx: this._startCoordX,
	        	sy: this._startCoordY,
	        	ex: e.clientX,
	        	ey: e.clientY
	        }

		// 画线
		this.drawline(coords);
		// 本次结束的点为下一次移动的起点
		this._startCoordX = e.clientX;
		this._startCoordY = e.clientY;
	}
}