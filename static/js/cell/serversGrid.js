Ext.define('Ext.cell.serversGrid', {
    extend: 'Ext.grid.Panel',
    id: 'Servers',
    iconCls: 'icon-servers',
    closable: true,
    viewConfig: {
        stripeRows: true
    },
    store: Ext.create('Ext.data.Store', {
        id: 'serversStore',
        model: Ext.define('serversModel', {
            extend: 'Ext.data.Model',
            fields: [
			{name: 'id'},
			{name: 'cell_name'},
			{name: 'uuid'},
			{name: 'name'},
			{name: 'ip'},
			{name: 'iplist'},
			{name: 'os'},
			{name: 'fileserver'},
			{name: 'dbserver'},
			{name: 'confserver'},
			{name: 'status'} ,
			{name: 'description'},
			{
				name: 'ldate',
				type: 'date',
				dateFormat: 'Y-m-d H:i:s' // 1970-01-01 01:00:00
			},
			{
				name: 'cdate',
				type: 'date',
				dateFormat: 'Y-m-d H:i:s' // 1970-01-01 01:00:00
			}]
        }),
        autoLoad: false,
        remoteSort: true,
        proxy: {
            type: 'rest',
            url: URL_PREFIX + '/cell/server/',
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
			{text: "Server ID", flex: 1, sortable: true, dataIndex: 'id'},
			{text: "Server name", flex: 1, sortable: true, dataIndex: 'name'},
			{text: "UUID", flex: 1, sortable: true, dataIndex: 'uuid'},
			{text: "IPs", flex: 1, sortable: true, dataIndex: 'iplist'},
			{text: "OS", flex: 2, sortable: true, dataIndex: 'os'},
			{text: "FS", flex: 1, sortable: true, dataIndex: 'fileserver'},
			{text: "DB ", flex: 1, sortable: false, dataIndex: 'dbserver' },
			{text: "Conf", flex: 1, sortable: true, dataIndex: 'confserver'},
			{text: "Bin", flex: 1, sortable: true, dataIndex: 'distserver'},
			{text: "Status", flex: 1, sortable: true, dataIndex: 'status'},
			{text: "Desc", flex: 2, sortable: true, dataIndex: 'description'},
			{text: "Update", flex: 1, sortable: true, dataIndex: 'ldate', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')},
			{text: "Create", flex: 1, sortable: true, dataIndex: 'cdate', renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')}
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
                            'name': 'Server Name'
                        }, {
                            'id': 'id',
                            'name': 'Server Id'
                        }]
                    }),
                    id: 'selectServersField',
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
                    id: 'searchServersField',
                    emptyText: 'Search',
                    xtype: 'textfield',
                    width: 250,
                    allowBlank: true,
                    listeners: {
                        'specialkey': function (f, e) {
                            if (e.getKey() == 13) Ext.getCmp('Servers').serversSearch();
                        }
                    }
                }, {
                    iconCls: 'icon-search',
                    tooltip: 'Search',
                    scope: this,
                    handler: function () {
                        this.serversSearch();
                    }
                }, '-',
                {
                    iconCls: 'icon-reset',
                    tooltip: 'Reset',
                    scope: this,
                    handler: function () {
                        this.serversResetSearch();
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
                id: 'serversPaging',
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
		var this_url = Ext.getCmp('Servers').store.getProxy().url;
		location.href = this_url+"?output=csv";
	},
 	serversSearch: function () {
        Ext.getCmp('Servers').store.setProxy({
            url: URL_PREFIX + '/rest/log/?filter=' + Ext.getCmp('selectServersField').getSubmitValue() + '&filterValue=' + Ext.getCmp('searchServersField').getSubmitValue(),
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Servers').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    serversResetSearch: function () {
        Ext.getCmp('selectServersField').setValue('log_timestamp');
        Ext.getCmp('searchServersField').reset();
        Ext.getCmp('Servers').store.setProxy({
            url: URL_PREFIX + '/rest/log/',
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Servers').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    serversDelete: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/cell/server/' + row.data['id'],
            method: 'DELETE',
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if (obj.success) {
                    Ext.MessageBox.alert('Success', "Server \"" + row.data['name'] + "\" was succesfully deleted!");
                    Ext.getCmp('Servers').store.load();
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