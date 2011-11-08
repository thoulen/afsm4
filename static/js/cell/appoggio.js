/* CHANGELOG

- Added MOVE function
- Added RELEASE function
- Added REPLY function



####

icon-move
icon-release
icon-reply


*/


{
    text: 'Search',
    iconCls: 'ex-menu',
    // <-- icon
    menu: {
        id: 'search-menu',
        items: [Ext.create('Ext.form.field.ComboBox', {
	        store: Ext.create('Ext.data.Store', {
	            model: 'comboBoxModel',
	            data: [{
	                'id': 'serv',
	                'name': 'Server'
	            }, {
	                'id': 'name',
	                'name': 'Volume Name'
	            }, {
	                'id': 'vid',
	                'name': 'Volume Id'
	            }, {
	                'id': 'type',
	                'name': 'Volume Type'
	            }, {
	                'id': 'status',
	                'name': 'Volume Status'
	            }]
	        }),
	        id: 'selectVolumesField',
	        displayField: 'name',
	        valueField: 'id',
	        value: 'serv',
	        width: 110,
	        typeAhead: false,
	        queryMode: 'local',
	        triggerAction: 'all',
	        allowBlank: false,
	        selectOnFocus: true,
	        forceSelection: true,
	        editable: false
	    }), ' ',
	    {
	        id: 'searchVolumesField',
	        emptyText: 'Search',
	        xtype: 'textfield',
	        width: 250,
	        allowBlank: true,
	        listeners: {
	            'specialkey': function (f, e) {
	                if (e.getKey() == 13) Ext.getCmp('Volumes').volumesSearch();
	            }
	        }
	    }, {
	        iconCls: 'icon-search',
	        tooltip: 'Search',
			text: "Make Search",
	        scope: this,
	        handler: function () {
	            this.volumesSearch();
	        }
	    }, '-',
	    {
	        iconCls: 'icon-reset',
	        tooltip: 'Reset',
			text: 'Reset Search Filters',
	        scope: this,
	        handler: function () {
	            this.volumesResetSearch();
	        }
	    }]
    }
},