Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath({
	'Ext.core': 'js/core',
	'Ext.cell': 'js/cell',
	'Ext.pts': 'js/pts'
});

Ext.require([
	'Ext.core.centralPanel',
	'Ext.core.cellMenu',
	'Ext.core.ptsMenu',
	'Ext.core.adminMenu'
]);

Ext.onReady(function () {
    Ext.QuickTips.init();
	
    // CheckSession
	// 1 - Admin, 2 - Group Admin, 3 - Normal User
	/**********************************************************************
	Ext.Ajax.request({
        url: URL_PREFIX+'/rest/session/check',
        method: 'GET',
		failure: function(response){
				Ext.Msg.alert('Failed!!!', 'Some error occured');
				window.location = "/static/login.html";
		},
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText);
            if (resp.success == false) {
                Ext.Msg.alert('Session Expired!!!', resp.errorInfo);
				window.location = "/static/login.html";
            }
			USER_TYPE = resp.user_type;
			renderAll();
        }
    });
	*/
	
	renderAll();
	
	function renderAll(){

		var centralPanel = new Ext.core.centralPanel();
		var menu_items = [new Ext.core.cellMenu(), new Ext.core.ptsMenu(), new Ext.core.adminMenu()];

	    Ext.create('Ext.Viewport', {
	        height: '100%',
	        width: '100%',
	        layout: {
	            type: 'border',
	            padding: 5
	        },
	        defaults: {
	            split: true
	        },
	        items: [{
	            id: 'afsm-header',
	            el: 'header',
	            xtype: 'box',
	            region: 'north',
	            height: 40
	        }, {
	            id: 'afsm-side-menu',
	            title: 'Menu',
	            region: 'west',
	            animCollapse: true,
	            width: 200,
	            minWidth: 150,
	            maxWidth: 400,
	            split: true,
	            collapsible: true,
				//collapsed: true,
	            layout: 'accordion',
	            layoutConfig: {
	                animate: true
	            },
	            items: menu_items
	        },
	        centralPanel]
	    });

	    Ext.Array.each(Ext.getCmp('afsm-side-menu').items.items, function (item) {
	        item.getSelectionModel().on('select', function (selModel, record) {
	            if (record.get('leaf')) {
	                eval(record.raw['action']);
					selModel.deselectAll();
	            }
	        });
	    });
	}


});