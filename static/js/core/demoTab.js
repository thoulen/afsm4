Ext.define('Ext.core.demoTab', {
	extend: 'Ext.Panel',
	id: 'DemoTab',
	closable: true,
	load: function () { 
		this.html = '<center><h1>'+ this.id +'</h1><br/> It\'s only a demo!</center>'; 
	},
	getId : function() { 
		return this.id; 
	}
});