Ext.define('Ext.cell.partitionsGrid', {
    extend: 'Ext.grid.Panel',
    id: 'Partitions',
    iconCls: 'icon-partitions',
    closable: true,
    viewConfig: {
        stripeRows: true
    },
    store: Ext.create('Ext.data.Store', {
        id: 'partitionsStore',
        model: Ext.define('partitionsModel', {
            extend: 'Ext.data.Model',
            fields: [{name: 'id'},
			{name: 'server_name'},
			{name: 'name'},
			{name: 'partition_name'},
			{name: 'ctype'},
			{name: 'size'},
			{name: 'free'},
			{name: 'perc'},
			{name: 'description'},
			{name: 'sync'},
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
            url: URL_PREFIX + '/cell/partition/',
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
			{text: "ID", width: 40, sortable: true, dataIndex: 'id'},
			{text: "Server", flex: 1, sortable: true, dataIndex: 'server_name'},
			{text: "name", flex: 2, sortable: true, dataIndex: 'partition_name'},
			{text: "Class", flex: 2, sortable: true, dataIndex: 'class'},
			{text: "Size", flex: 1, sortable: true, dataIndex: 'size'},
			{text: "Free", flex: 1, sortable: true, dataIndex: 'free'},
			{text: "Description", flex: 2, sortable: true, dataIndex: 'description'},
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
                            'name': 'Partition Name'
                        }, {
                            'id': 'id',
                            'name': 'Partition Id'
                        }]
                    }),
                    id: 'selectPartitionsField',
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
                    id: 'searchPartitionsField',
                    emptyText: 'Search',
                    xtype: 'textfield',
                    width: 250,
                    allowBlank: true,
                    listeners: {
                        'specialkey': function (f, e) {
                            if (e.getKey() == 13) Ext.getCmp('Partitions').partitionsSearch();
                        }
                    }
                }, {
                    iconCls: 'icon-search',
                    tooltip: 'Search',
                    scope: this,
                    handler: function () {
                        this.partitionsSearch();
                    }
                }, '-',
                {
                    iconCls: 'icon-reset',
                    tooltip: 'Reset',
                    scope: this,
                    handler: function () {
                        this.partitionsResetSearch();
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
                id: 'partitionsPaging',
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
		var this_url = Ext.getCmp('Partitions').store.getProxy().url;
		location.href = this_url+"?output=csv";
	},
 	partitionsSearch: function () {
        Ext.getCmp('Partitions').store.setProxy({
            url: URL_PREFIX + '/rest/log/?filter=' + Ext.getCmp('selectPartitionsField').getSubmitValue() + '&filterValue=' + Ext.getCmp('searchPartitionsField').getSubmitValue(),
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Partitions').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    partitionsResetSearch: function () {
        Ext.getCmp('selectPartitionsField').setValue('log_timestamp');
        Ext.getCmp('searchPartitionsField').reset();
        Ext.getCmp('Partitions').store.setProxy({
            url: URL_PREFIX + '/rest/log/',
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Partitions').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    partitionsDelete: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/cell/partition/' + row.data['id'],
            method: 'DELETE',
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if (obj.success) {
                    Ext.MessageBox.alert('Success', "Partition \"" + row.data['name'] + "\" was succesfully deleted!");
                    Ext.getCmp('Partitions').store.load();
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