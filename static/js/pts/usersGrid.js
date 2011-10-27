Ext.define('Ext.pts.usersGrid', {
    extend: 'Ext.grid.Panel',
    id: 'Users',
    iconCls: 'icon-users',
    closable: true,
    viewConfig: {
        stripeRows: true
    },
    store: Ext.create('Ext.data.Store', {
        id: 'usersStore',
        model: Ext.define('usersModel', {
            extend: 'Ext.data.Model',
            fields: [
			{name: 'id'},
			{name: 'uid'},
			{name: 'realm'},
			{name: 'krb5'},
			{name: 'name'},
			{name: 'owner'},
			{name: 'creator'},
			{name: 'quota'},
			{name: 'flag1'},
			{name: 'flag2'},
			{name: 'flag3'},
			{name: 'flag4'},
			{name: 'flag5'},
			{name: 'ctype'},
			{name: 'maxspace'},
			{name: 'maxvol'},
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
            url: URL_PREFIX + '/pts/user/',
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
			{text: "id", width: 40, sortable: true, dataIndex: 'id'},
			{text: "name", flex: 2, sortable: true, dataIndex: 'name'},
			{text: "Owner", flex: 2, sortable: true, dataIndex: 'owner'},
			{text: "Creator", flex: 2, sortable: true, dataIndex: 'creator'},
			{text: "Quota", flex: 2, sortable: true, dataIndex: 'quota'},
			{text: "S", width: 20, sortable: true, dataIndex: 'flag1'},
			{text: "O", width: 20, sortable: true, dataIndex: 'flag2'},
			{text: "M", width: 20, sortable: true, dataIndex: 'flag3'},
			{text: "A", width: 20, sortable: true, dataIndex: 'flag4'},
			{text: "R", width: 20, sortable: true, dataIndex: 'flag5'},
			{text: "Class", flex: 1, sortable: true, dataIndex: 'ctype'},
			{text: "MaxSpace", flex: 1, sortable: true, dataIndex: 'space'},
			{text: "MaxVol", flex: 1, sortable: true, dataIndex: 'maxvol'},
			{text: "Description", flex: 1, sortable: true, dataIndex: 'description'},
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
                            'name': 'User Name'
                        }, {
                            'id': 'id',
                            'name': 'User Id'
                        }]
                    }),
                    id: 'selectUsersField',
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
                    id: 'searchUsersField',
                    emptyText: 'Search',
                    xtype: 'textfield',
                    width: 250,
                    allowBlank: true,
                    listeners: {
                        'specialkey': function (f, e) {
                            if (e.getKey() == 13) Ext.getCmp('Users').usersSearch();
                        }
                    }
                }, {
                    iconCls: 'icon-search',
                    tooltip: 'Search',
                    scope: this,
                    handler: function () {
                        this.usersSearch();
                    }
                }, '-',
                {
                    iconCls: 'icon-reset',
                    tooltip: 'Reset',
                    scope: this,
                    handler: function () {
                        this.usersResetSearch();
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
                id: 'usersPaging',
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
		var this_url = Ext.getCmp('Users').store.getProxy().url;
		location.href = this_url+"?output=csv";
	},
 	usersSearch: function () {
        Ext.getCmp('Users').store.setProxy({
            url: URL_PREFIX + '/rest/log/?filter=' + Ext.getCmp('selectUsersField').getSubmitValue() + '&filterValue=' + Ext.getCmp('searchUsersField').getSubmitValue(),
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Users').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    usersResetSearch: function () {
        Ext.getCmp('selectUsersField').setValue('log_timestamp');
        Ext.getCmp('searchUsersField').reset();
        Ext.getCmp('Users').store.setProxy({
            url: URL_PREFIX + '/rest/log/',
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Users').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    usersDelete: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/pts/user/' + row.data['id'],
            method: 'DELETE',
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if (obj.success) {
                    Ext.MessageBox.alert('Success', "User \"" + row.data['name'] + "\" was succesfully deleted!");
                    Ext.getCmp('Users').store.load();
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