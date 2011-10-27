Ext.define('Ext.cell.cellsGrid', {
    extend: 'Ext.grid.Panel',
    id: 'Cells',
    iconCls: 'icon-cells',
    closable: true,
    viewConfig: {
        stripeRows: true
    },
    store: Ext.create('Ext.data.Store', {
        id: 'cellsStore',
        model: Ext.define('cellsModel', {
            extend: 'Ext.data.Model',
            fields: [
		    {name: 'id'},
		    {name: 'server_name'},
		    {name: 'fcount'},
		    {name: 'vtot'},
		    {name: 'vsize'},
		    {name: 'vquota'},
		    {name: 'vperc'},
		    {name: 'ptot'},
		    {name: 'psize'},
		    {name: 'pquota'},
		    {name: 'pperc'} ,
		    {name: 'volpart'}]
        }),
        autoLoad: false,
        remoteSort: true,
        proxy: {
            type: 'rest',
            url: URL_PREFIX + '/cell/cell/',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        }
    }),
    initComponent: function () {
        if (!Ext.ModelManager.isRegistered('comboBoxModel')) {
            Ext.define('comboBoxModel', {
                extend: 'Ext.data.Model',
                fields: [{
                    type: 'string',
                    name: 'id'
                }, {
                    type: 'string',
                    name: 'name'
                }]
            });
        }
        Ext.apply(this, {
            columns: [
			{text: "ID", flex: 1, sortable: true, dataIndex: 'id'},
			{text: "Server", flex: 2, sortable: true, dataIndex: 'server_name'},
			{text: "Tot.Files", flex: 1, sortable: true, dataIndex: 'fcount'},
			{text: "Tot.Vols", flex: 1, sortable: true, dataIndex: 'vtot'},
			{text: "Vol Tot Quota", flex: 1, sortable: true, dataIndex: 'vquota'},
			{text: "Vol Tot Used", flex: 1, sortable: true, dataIndex: 'vsize'},
			{text: "Perc", flex: 1, sortable: false, dataIndex: 'vperc'}, // renderer: progressBarVol
			{text: "Part. Space", flex: 1, sortable: true, dataIndex: 'pquota'},
			{text: "Part. Used", flex: 1, sortable: true, dataIndex: 'psize'},
			{text: "Perc", flex: 1, sortable: false, dataIndex: 'pperc'}, // renderer: progressBarVol
			{text: "Quota/Part", flex: 1, sortable: false, dataIndex: 'volpart'} // renderer: progressBarVol
			],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [Ext.create('Ext.form.field.ComboBox', {
                    store: Ext.create('Ext.data.Store', {
                        model: 'comboBoxModel',
                        data: [{
                            'id': 'serv',
                            'name': 'Server'
                        }, {
                            'id': 'name',
                            'name': 'Cell Name'
                        }, {
                            'id': 'id',
                            'name': 'Cell Id'
                        }]
                    }),
                    id: 'selectCellsField',
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
                    id: 'searchCellsField',
                    emptyText: 'Search',
                    xtype: 'textfield',
                    width: 250,
                    allowBlank: true,
                    listeners: {
                        'specialkey': function (f, e) {
                            if (e.getKey() == 13) Ext.getCmp('Cells').cellsSearch();
                        }
                    }
                }, {
                    iconCls: 'icon-search',
                    tooltip: 'Search',
                    scope: this,
                    handler: function () {
                        this.cellsSearch();
                    }
                }, '-',
                {
                    iconCls: 'icon-reset',
                    tooltip: 'Reset',
                    scope: this,
                    handler: function () {
                        this.cellsResetSearch();
                    }
                }	, '-',{
						iconCls: 'icon-csv',
						tooltip: 'Export all data',
						scope: this,
						handler: function () {
							this.csv_export();
						}
					}]
            }],
            bbar: Ext.create('Ext.PagingToolbar', {
                id: 'cellsPaging',
                store: this.store,
                displayInfo: true,
                displayMsg: 'Displaying log {0} - {1} of {2}',
                emptyMsg: 'No log to display'
            })
        });
        this.callParent(arguments);
    },
    load: function () {
        this.store.load();
    },
    getId: function () {
        return this.id;
    },
    csv_export: function(){
		var this_url = Ext.getCmp('Cells').store.getProxy().url;
		location.href = this_url+"?output=csv";
	},
 	cellsSearch: function () {
        Ext.getCmp('Cells').store.setProxy({
            url: URL_PREFIX + '/rest/log/?filter=' + Ext.getCmp('selectCellsField').getSubmitValue() + '&filterValue=' + Ext.getCmp('searchCellsField').getSubmitValue(),
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Cells').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    cellsResetSearch: function () {
        Ext.getCmp('selectCellsField').setValue('log_timestamp');
        Ext.getCmp('searchCellsField').reset();
        Ext.getCmp('Cells').store.setProxy({
            url: URL_PREFIX + '/rest/log/',
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Cells').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    cellsDelete: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/cell/cell/' + row.data['id'],
            method: 'DELETE',
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if (obj.success) {
                    Ext.MessageBox.alert('Success', "Cell \"" + row.data['name'] + "\" was succesfully deleted!");
                    Ext.getCmp('Cells').store.load();
                } else {
                    Ext.Msg.alert('Failed!', obj.message);
                }
            },
            failure: function () {
                Ext.Msg.alert('Error', 'Some error occurred');
            }
        });
    }
});