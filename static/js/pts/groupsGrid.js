Ext.define('Ext.pts.groupsGrid', {
    extend: 'Ext.grid.Panel',
    id: 'Groups',
    iconCls: 'icon-groups',
    closable: true,
    viewConfig: {
        stripeRows: true
    },
    store: Ext.create('Ext.data.Store', {
        id: 'groupsStore',
        model: Ext.define('groupsModel', {
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
            url: URL_PREFIX + '/pts/group/',
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
                            'name': 'Group Name'
                        }, {
                            'id': 'id',
                            'name': 'Group Id'
                        }]
                    }),
                    id: 'selectGroupsField',
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
                    id: 'searchGroupsField',
                    emptyText: 'Search',
                    xtype: 'textfield',
                    width: 250,
                    allowBlank: true,
                    listeners: {
                        'specialkey': function (f, e) {
                            if (e.getKey() == 13) Ext.getCmp('Groups').groupsSearch();
                        }
                    }
                }, {
                    iconCls: 'icon-search',
                    tooltip: 'Search',
                    scope: this,
                    handler: function () {
                        this.groupsSearch();
                    }
                }, '-',
                {
                    iconCls: 'icon-reset',
                    tooltip: 'Reset',
                    scope: this,
                    handler: function () {
                        this.groupsResetSearch();
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
                id: 'groupsPaging',
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
		var this_url = Ext.getCmp('Groups').store.getProxy().url;
		location.href = this_url+"?output=csv";
	},
 	groupsSearch: function () {
        Ext.getCmp('Groups').store.setProxy({
            url: URL_PREFIX + '/rest/log/?filter=' + Ext.getCmp('selectGroupsField').getSubmitValue() + '&filterValue=' + Ext.getCmp('searchGroupsField').getSubmitValue(),
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Groups').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    groupsResetSearch: function () {
        Ext.getCmp('selectGroupsField').setValue('log_timestamp');
        Ext.getCmp('searchGroupsField').reset();
        Ext.getCmp('Groups').store.setProxy({
            url: URL_PREFIX + '/rest/log/',
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Groups').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    groupsDelete: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/pts/group/' + row.data['id'],
            method: 'DELETE',
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if (obj.success) {
                    Ext.MessageBox.alert('Success', "Group \"" + row.data['name'] + "\" was succesfully deleted!");
                    Ext.getCmp('Groups').store.load();
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