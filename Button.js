let Button;
let ButtonRender;
let ButtonManager;
(()=>{






	ButtonManager = class{
		constructor(){
			this.buttons = [];
		}
		onClick(e){
			this.buttons.forEach(button=>{
				if(this.collide(button, {
					x: e.offsetX,
					y: e.offsetY,
					width:1,
					height:1
				}))
					button.click();
			});
		}
		addButton(button){
			this.buttons.push(button);
			return button;
		}
		collide(o1,o2){
			return (o1.x < o2.x + o2.width && o1.x + o1.width > o2.x && o1.y < o2.y + o2.height && o1.y + o1.height > o2.y) && o1 !== o2;
		}
		render(ctx){
			this.buttons.forEach(button=>button.render(ctx));
		}

	}

	ButtonRenderer = class {
		constructor(){
			this.font = 'Arial';
			this.fontSize = 16;
			this.backgroundColor = 'black';
			this.textColor = 'white';
		}
		render(button,ctx){
			ctx.fillStyle = this.backgroundColor;
			ctx.fillRect(button.x, button.y, button.width, button.height);
			ctx.fillStyle = this.textColor;
			ctx.font = `${this.fontSize}px ${this.font}`;
			const x = button.x + button.width/2 - ctx.measureText(button.text).width/2;
			const y = button.y + button.height/2 + this.fontSize/4;
			console.log(x,y)
			ctx.fillText(button.text,x,y);
		}
	}
	const defaultRenderer = new ButtonRenderer();


	Button = class {
		constructor(x, y, width, height, text, renderer){
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.text = text;
			this.renderer = renderer;
			if(!renderer)
				this.renderer = defaultRenderer;
			this.clickEvents = [];
		}
		addClickEvent(e){
			this.clickEvents.push(e);
		}
		removeClickEvent(e){
			this.clickEvents.filter(ev=> ev !== e);
		}
		render(ctx){
			this.renderer.render(this,ctx);
		}
		click(){
			this.clickEvents.forEach(e=>e());
		}

	}
})()
