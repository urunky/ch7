
var EventDispatcher = function()
{
	this.map = {};
}

EventDispatcher.prototype = 
{
	addEventListener: function( type, listener, scope )
	{
		// { type: [ listener, listener, list ...... ],
		//   enterframe: [ list .... .] }

		if( !this.hasEventListener( type ) )
			this.map[ type ] = [];

		var index = this.indexOf( type, listener );

		if( index > -1 ) return;

		this.map[ type ].push( { listener: listener, scope: scope } );
	},

	removeEventListener: function( type, listener )
	{
		var index = this.indexOf( type, listener );

		if( index == -1 ) return;

		this.map[ type ].splice( index, 1 );
	},

	hasEventListener: function( type )
	{

	},

	dispatchEvent: function( event )
	{

	},

	indexOf: function( type, listener )
	{
		if( !this.hasEventListener( type ) ) return -1;

		for( var i = 0; i < this.map[ type ].length; i++ )
		{
			if( this.map[ type ].listener == listener )
				return i;
		}

		return -1;
	}
}


var Stage = function( context )
{
	this.context = context;
	this.children = [];
}

Stage.prototype = 
{
	addChild: function( child )
	{
		if( this.contains( child ) )
			this.removeChild( child );

		this.children.push( child );
	},

	removeChild: function( child )
	{
		var index = this.children.indexOf( child );

		if( index > -1 ) return;

		this.children.splice( index, 1 );
	},

	contains: function( child )
	{
		return this.children.indexOf( child ) > -1;
	},

	update: function()
	{
		this.context.clearRect( 
			0, 0, this.context.canvas.width, this.context.canvas.height );

		for( var i = 0; i < this.children.length; i++ )
		{
			this.context.save();

			this.children[i].draw( this.context );

			this.context.restore();
		}
	}
}


var Circle = function( radius, fillStyle )
{
	this.x = 0;
	this.y = 0;

	this.radius = radius;
	this.fillStyle = fillStyle;
}

Circle.prototype = 
{
	draw: function( context )
	{
		context.translate( this.x, this.y );

		context.fillStyle = this.fillStyle;
		context.beginPath();
		context.arc( 0, 0, this.radius, 0, 2 * Math.PI );
		context.fill();
	}
}










var canvas;
var context;
var stage;

window.onload = function()
{
	console.log( "init" );

	canvas = document.getElementById( "canvas" );
	context = canvas.getContext( "2d" );
	stage = new Stage( context );

	testCircle();
}


function testCircle()
{
	var c = new Circle( 10, "#0000ff" );

	stage.addChild( c );

	c.x = 100;
	c.y = 100;

	stage.update();

	function render()
	{
		c.x++;
		stage.update();

		id = requestAnimationFrame( render );
	}

	var id = requestAnimationFrame( render );
}











