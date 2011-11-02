Ext.define('Ext.cell.volumesGrid', {
    extend: 'Ext.grid.Panel',
    id: 'Volumes',
    iconCls: 'icon-volumes',
    closable: true,
    viewConfig: {
        stripeRows: true
    },
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
		var volStore = Ext.create('Ext.data.Store', {
	        id: 'volumesStore',
	        model: Ext.define('volumesModel', {
	            extend: 'Ext.data.Model',
	            fields: [{
	                name: 'vid'
	            }, {
	                name: 'name'
	            }, {
	                name: 'serv'
	            }, {
	                name: 'part'
	            }, {
	                name: 'parentID'
	            }, {
	                name: 'backupID'
	            }, {
	                name: 'cloneID'
	            }, {
	                name: 'inUse'
	            }, {
	                name: 'needsSalvaged'
	            }, {
	                name: 'destroyMe'
	            }, {
	                name: 'type'
	            }, {
	                name: 'creationDate',
	                type: 'date',
	                dateFormat: 'Y-m-d-H:i:s' // 1970-01-01 01:00:00
	            }, {
	                name: 'updateDate',
	                type: 'date',
	                dateFormat: 'Y-m-d-H:i:s' // 1970-01-01 01:00:00
	            }, {
	                name: 'backupDate',
	                type: 'date',
	                dateFormat: 'Y-m-d-H:i:s' // 1970-01-01 01:00:00
	            }, {
	                name: 'copyDate',
	                type: 'date',
	                dateFormat: 'Y-m-d-H:i:s' // 1970-01-01 01:00:00
	            }, {
	                name: 'flags'
	            }, {
	                name: 'diskused'
	            }, {
	                name: 'maxquota'
	            }, {
	                name: 'minquota'
	            }, {
	                name: 'status'
	            }, {
	                name: 'filecount'
	            }, {
	                name: 'dayUse'
	            }, {
	                name: 'weekUse'
	            }, {
	                name: 'spare2'
	            }, {
	                name: 'spare3'
	            }, {
	                name: 'cdate',
	                type: 'date',
	                dateFormat: 'Y-m-d-H:i:s' // 1970-01-01 01:00:00
	            }, {
	                name: 'udate',
	                type: 'date',
	                dateFormat: 'Y-m-d-H:i:s' // 1970-01-01 01:00:00
	            }, {
	                name: 'sync'
	            }]
	        }),
	        autoLoad: false,
	        remoteSort: true,
	        proxy: {
	            type: 'rest',
	            url: URL_PREFIX + '/cell/volume/',
	            reader: {
	                type: 'json',
	                root: 'data',
	                totalProperty: 'totalCount'
	            }
	        }
	    });


        Ext.apply(this, {
			store: volStore,
            columns: [{
                text: 'ID',
                dataIndex: 'vid',
                sortable: true,
                flex: 2
            }, {
                text: 'Volume Name',
                dataIndex: 'name',
                sortable: true,
                flex: 2
            }, {
                text: 'Server',
                dataIndex: 'serv',
                sortable: true,
                flex: 2
            }, {
                text: 'Part',
                dataIndex: 'part',
                sortable: true,
				width: 50
            }, {
                text: 'parentID',
                dataIndex: 'parentID',
                sortable: true,
                hidden: true,
                flex: 1
            }, {
                text: 'backupID',
                dataIndex: 'backupID',
                sortable: true,
                hidden: true ,
                flex: 1
            }, {
                text: 'cloneID',
                dataIndex: 'cloneID',
                sortable: true,
                hidden: true ,
                flex: 1
            }, {
                text: 'In Use',
                dataIndex: 'inUse',
                sortable: true,
				width: 50
            }, {
                text: 'Need Salvaged',
                dataIndex: 'needsSalvaged',
                sortable: true,
                flex: 1
            }, {
                text: 'Destroy Me',
                dataIndex: 'destroyMe',
                sortable: true,
                hidden: true ,
                flex: 1
            }, {
                text: 'Type',
                dataIndex: 'type',
                sortable: true,
                flex: 1
            }, {
                text: 'creationDate',
                dataIndex: 'creationDate',
                sortable: true,
                flex: 1,
				hidden: true,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'updateDate',
                dataIndex: 'updateDate',
                sortable: true,
                flex: 1,
				hidden: true,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'backupDate',
                dataIndex: 'backupDate',
                sortable: true,
                flex: 1,
				hidden: true,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'copyDate',
                dataIndex: 'copyDate',
                sortable: true,
                hidden: true , 
                flex: 1,
				hidden: true,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'flags',
                dataIndex: 'flags',
                sortable: true,
                hidden: true ,
                flex: 1
            }, {
                text: 'diskused',
                dataIndex: 'diskused',
                sortable: true,
                flex: 2,
				renderer: this.diskUsedPB
            }, {
                text: 'maxquota',
                dataIndex: 'maxquota',
                sortable: true,
                flex: 1
            }, {
                text: 'minquota',
                dataIndex: 'minquota',
                sortable: true,
                hidden: true ,
                flex: 1
            }, {
                text: 'status',
                dataIndex: 'status',
                sortable: true,
                flex: 1
            }, {
                text: 'filecount',
                dataIndex: 'filecount',
                sortable: true,
                flex: 1
            }, {
                text: 'dayUse',
                dataIndex: 'dayUse',
                sortable: true,
                flex: 1
            }, {
                text: 'weekUse',
                dataIndex: 'weekUse',
                sortable: true,
                flex: 1
            }, {
                text: 'spare2',
                dataIndex: 'spare2',
                sortable: true,
                hidden: true ,
                flex: 1
            },  { // Da qui in poi....
                text: 'spare3',
                dataIndex: 'spare3',
                sortable: true,
                hidden: true ,
                flex: 1
            }, {
                text: 'Creation Date',
                dataIndex: 'cdate',
                sortable: true,
                hidden: true ,
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'Last Update',
                dataIndex: 'udate',
                sortable: true, 
                hidden: true ,
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'sync',
                dataIndex: 'sync',
                sortable: true,
                hidden: true,
                flex: 1
            }],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    iconCls: 'icon-add',
                    tooltip: 'Create new Volume',
                    scope: this,
                    handler: function () {
                        this.volumesAdd();
                    }
                }, '-', {
                    iconCls: 'icon-edit',
                    tooltip: 'Edit volume',
                    scope: this,
                    handler: function () {
                        var m = Ext.getCmp('Volumes').getSelectionModel().getSelection();
                        if (m.length != 0) {
							Ext.Msg.show({
			                    title: 'Edit',
			                    msg: "Are you sure you want to <b>edit</b> the volume <b>"+m[0].data['name']+"</b>?",
			                    buttons: Ext.Msg.YESNO,
			                    scope: this,
			                    fn: function (btw) {
			                        if (btw == 'yes') {
			                             this.volumesEdit(m[0]);
			                        }
			                    },
			                    icon: Ext.MessageBox.QUESTION,
			                    minWidth: 270
			                });
                        } else {
                            Ext.Msg.alert('Error', 'You must select one volume to edit!');
                        }
                    }
                }, '-', {
                    iconCls: 'icon-del',
                    tooltip: 'Delete volume',
                    scope: this,
                    handler: function () {
                        var m = Ext.getCmp('Volumes').getSelectionModel().getSelection();
                        if (m.length > 0) {
							Ext.Msg.show({
			                    title: 'Delete',
			                    msg: "Are you sure you want to <b>delete</b> the volume <b>"+m[0].data['name']+"</b>?",
			                    buttons: Ext.Msg.YESNO,
			                    scope: this,
			                    fn: function (btw) {
			                        if (btw == 'yes') {
			                             this.volumesDelete(m[0]);
			                        }
			                    },
			                    icon: Ext.MessageBox.QUESTION,
			                    minWidth: 270
			                });
                        } else {
                            Ext.Msg.alert('Error', 'You must select one volume to delete!');
                        }
                    }

                }, '-', {
                    //iconCls: 'icon-move',
                    tooltip: 'Move volume',
                    text: "Move",
                    scope: this,
                    handler: function () {
                        var m = Ext.getCmp('Volumes').getSelectionModel().getSelection();
                        if (m.length > 0) {
                            Ext.Msg.alert('Demo', 'Moving volume ' + m[0].data['name'] + ' <br>(DEMO)');
                        } else {
                            Ext.Msg.alert('Error', 'You must select one volume to move!');
                        }
                    }

                }, '-', {
	                    //iconCls: 'icon-release',
	                    tooltip: 'Release volume',
	                    text: "Release",
	                    scope: this,
	                    handler: function () {
	                        var m = Ext.getCmp('Volumes').getSelectionModel().getSelection();
	                        if (m.length > 0) {
	                            Ext.Msg.alert('Demo', 'Releasing volume ' + m[0].data['name'] + ' <br>(DEMO)');
	                        } else {
	                            Ext.Msg.alert('Error', 'You must select one volume to release!');
	                        }
	                    }

	                }, '-', {
		                    //iconCls: 'icon-clone',
		                    tooltip: 'Clone volume',
		                    text: "Clone",
		                    scope: this,
		                    handler: function () {
		                        var m = Ext.getCmp('Volumes').getSelectionModel().getSelection();
		                        if (m.length > 0) {
		                            Ext.Msg.alert('Demo', 'Cloning volume ' + m[0].data['name'] + ' <br>(DEMO)');
		                        } else {
		                            Ext.Msg.alert('Error', 'You must select one volume to clone!');
		                        }
		                    }

		                }, '-', Ext.create('Ext.form.field.ComboBox', {
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
                    scope: this,
                    handler: function () {
                        this.volumesSearch();
                    }
                }, '-',
                {
                    iconCls: 'icon-reset',
                    tooltip: 'Reset',
                    scope: this,
                    handler: function () {
                        this.volumesResetSearch();
                    }
                }, '-',{
					iconCls: 'icon-csv',
					tooltip: 'Export all data',
					scope: this,
					handler: function () {
						this.csv_export();
					}
				}]
            }],
            bbar: Ext.create('Ext.PagingToolbar', {
                id: 'volumesPaging',
                store: volStore,
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
	diskUsedPB: function (cellValue, css_class, row){
			var id = Ext.id();
			
			Ext.Function.defer(function(){
				var percentage = Ext.util.Format.numberRenderer('0.000')((cellValue*100)/row.data['maxquota']);				
				var pBar = Ext.create('Ext.ProgressBar', { renderTo: id });
				pBar.updateProgress(percentage/100, percentage+'%');
			}, 25);
			
			return '<div id="' + id + '"></di>';
			
	},
    csv_export: function(){
		var this_url = Ext.getCmp('Volumes').store.getProxy().url;
		location.href = this_url+"?output=csv";
	},
	volumesSearch: function () {
        Ext.getCmp('Volumes').store.setProxy({
            url: URL_PREFIX + '/rest/log/?filter=' + Ext.getCmp('selectVolumesField').getSubmitValue() + '&filterValue=' + Ext.getCmp('searchVolumesField').getSubmitValue(),
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Volumes').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    volumesResetSearch: function () {
        Ext.getCmp('selectVolumesField').setValue('log_timestamp');
        Ext.getCmp('searchVolumesField').reset();
        Ext.getCmp('Volumes').store.setProxy({
            url: URL_PREFIX + '/rest/log/',
            type: 'rest',
            reader: {
                type: 'json',
                root: 'data',
                totalProperty: 'totalCount'
            }
        });
        Ext.getCmp('Volumes').store.load({
            params: {
                start: 0,
                limit: 25
            }
        });
    },
    volumesDelete: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/cell/volume/' + row.data['id'],
            method: 'DELETE',
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText);
                if (obj.success) {
                    Ext.MessageBox.alert('Success', "Volume \"" + row.data['name'] + "\" was succesfully deleted!");
                    Ext.getCmp('Volumes').store.load();
                } else {
                    Ext.Msg.alert('Failed!', obj.message);
                }
            },
            failure: function () {
                Ext.Msg.alert('Error', 'Some error occurred');
            }
        });
    },
    volumesAdd: function () {
        var vadd_id = Ext.id();

        var vaddPartCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Partition',
            name: 'part',
            id: 'vadd-partCombo' + vadd_id,
            store: Ext.create('Ext.data.Store', {
                model: 'comboBoxModel',
                proxy: {
                    type: 'rest',
                    url: URL_PREFIX + '/menu/volume/',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                },
                autoLoad: false
            }),
            displayField: 'name',
            valueField: 'id',
            anchor: '98%',
            typeAhead: false,
            triggerAction: 'all',
            emptyText: 'Select...',
            allowBlank: false,
            selectOnFocus: true,
            forceSelection: true,
            editable: false,
            disabled: true // Abilita su scelta server
        });

        var vaddSrvCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Server',
            name: 'serv',
            id: 'vadd-serverCombo' + vadd_id,
            store: Ext.create('Ext.data.Store', {
                model: 'comboBoxModel',
                proxy: {
                    type: 'rest',
                    url: URL_PREFIX + '/menu/volume/',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                },
                autoLoad: false
            }),
            displayField: 'name',
            valueField: 'id',
            anchor: '98%',
            typeAhead: false,
            triggerAction: 'all',
            emptyText: 'Select...',
            allowBlank: false,
            selectOnFocus: true,
            forceSelection: true,
            editable: false,
            listeners: {
                change: function () {
                    vaddPartCombo.clearValue();
                    if (this.getSubmitValue() != null) {
                        vaddPartCombo.store.setProxy({
                            url: URL_PREFIX + '/menu/volume/' + this.getSubmitValue(),
                            type: 'rest',
                            reader: {
                                type: 'json',
                                root: 'data'
                            }
                        });
                        vaddPartCombo.enable();
                        vaddPartCombo.store.load();
                    } else {
                        vaddPartCombo.setDisabled(true);
                    }
                }
            }
        });

        var vaddOwnerCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Owner',
            name: 'owner',
            id: 'vadd-ownerCombo' + vadd_id,
            store: Ext.create('Ext.data.Store', {
                model: 'comboBoxModel',
                proxy: {
                    type: 'rest',
                    url: URL_PREFIX + '/menu/owner/',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                },
                autoLoad: false
            }),
            displayField: 'name',
            valueField: 'id',
            anchor: '98%',
            typeAhead: false,
            triggerAction: 'all',
            emptyText: 'Select...',
            allowBlank: false,
            selectOnFocus: true,
            forceSelection: true,
            editable: false
        });

        var vaddProjectCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Project',
            name: 'project',
            id: 'vadd-projectCombo' + vadd_id,
            store: Ext.create('Ext.data.Store', {
                model: 'comboBoxModel',
                proxy: {
                    type: 'rest',
                    url: URL_PREFIX + '/menu/project/',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                },
                autoLoad: false
            }),
            displayField: 'name',
            valueField: 'id',
            anchor: '98%',
            typeAhead: false,
            triggerAction: 'all',
            emptyText: 'Select...',
            allowBlank: false,
            selectOnFocus: true,
            forceSelection: true,
            editable: false
        });

        var addForm = Ext.widget('form', {
            autoScroll: true,
            frame: true,
            width: 300,
            url: URL_PREFIX + '/volume/0',
            id: 'volumesAdd-form' + vadd_id,
            fieldDefaults: {
                msgTarget: 'side'
            },
            items: [{
                fieldLabel: 'Name',
                name: 'name',
                xtype: 'textfield',
                anchor: '98%',
                allowBlank: false
            },
            vaddSrvCombo, vaddPartCombo,
            {
                xtype: 'numberfield',
                name: 'maxquota',
                fieldLabel: 'Quota',
                value: 1000,
                minValue: 0,
                anchor: '98%'
            },
            vaddOwnerCombo, vaddProjectCombo,
            {
                xtype: 'datefield',
                fieldLabel: 'End Date',
                allowBlank: false,
                format: 'd/m/Y H:i:s',
                name: 'end_date',
                anchor: '98%'
            }],
            buttons: [{
                text: 'Cancel',
                handler: function () {
                    addWindow.close();
                }
            }, {
                text: 'Reset',
                handler: function () {
                    addForm.getForm().reset();
                }
            }, {
                text: 'Send',
                handler: function () {
                    if (addForm.getForm().isValid()) {
                        addForm.getForm().submit({
                            method: 'POST',
                            waitTitle: 'Connecting',
                            waitMsg: 'Sending data...',
                            success: function (form, action) {
                                obj = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('OK', obj.message);
                                addWindow.close();
                                Ext.getCmp('Scheduler').store.load();
                            },
                            failure: function (form, action) {
                                if (action.failureType == 'connect') {
                                    Ext.Msg.alert('Warning!', 'Rest server is unreachable ');
                                } else {
                                    obj = Ext.JSON.decode(action.response.responseText);
                                    Ext.Msg.alert('Failed!!!', obj.message);
                                }
                                addForm.getForm().reset();
                            }
                        });
                    }
                }
            }]
        });

        var addWindow = Ext.widget('window', {
            title: 'Create new volume',
            id: 'volumesAdd-win' + vadd_id,
            constrain: true,
            closable: true,
            border: false,
            plain: true,

            layout: 'fit',
            resizable: true,
            modal: true,
            items: addForm
        });
        addWindow.show();
    },
    volumesEdit: function (row) {
        var vedit_id = Ext.id();

console.log(row.data['end_date']);

        var veditOwnerCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Owner',
            name: 'owner',
            id: 'vedit-ownerCombo' + vedit_id,
            store: Ext.create('Ext.data.Store', {
                model: 'comboBoxModel',
                proxy: {
                    type: 'rest',
                    url: URL_PREFIX + '/menu/owner/',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                },
                autoLoad: false
            }),
            displayField: 'name',
            valueField: 'id',
            anchor: '98%',
            typeAhead: false,
            triggerAction: 'all',
            emptyText: 'Select...',
            allowBlank: false,
            selectOnFocus: true,
            forceSelection: true,
            editable: false,
            value: row.data['owner']
        });

        var veditProjectCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Project',
            name: 'project',
            id: 'vedit-projectCombo' + vedit_id,
            store: Ext.create('Ext.data.Store', {
                model: 'comboBoxModel',
                proxy: {
                    type: 'rest',
                    url: URL_PREFIX + '/menu/project/',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                },
                autoLoad: false
            }),
            displayField: 'name',
            valueField: 'id',
            anchor: '98%',
            typeAhead: false,
            triggerAction: 'all',
            emptyText: 'Select...',
            allowBlank: false,
            selectOnFocus: true,
            forceSelection: true,
            editable: false,
            value: row.data['project']
        });

        var editForm = Ext.widget('form', {
            autoScroll: true,
            frame: true,
            width: 300,
            url: URL_PREFIX + '/volume/' + row.data['id'],
            id: 'volumesEdit-form' + vedit_id,
            fieldDefaults: {
                msgTarget: 'side'
            },
            items: [{
                fieldLabel: 'Name',
                name: 'name',
                xtype: 'textfield',
                anchor: '98%',
                allowBlank: false,
                value: row.data['name']
            }, {
                xtype: 'numberfield',
                name: 'maxquota',
                fieldLabel: 'Quota',
                value: 1000,
                minValue: 0,
                anchor: '98%',
                value: row.data['maxquota']
            },
            veditOwnerCombo, veditProjectCombo,
            {
                xtype: 'datefield',
                fieldLabel: 'End Date',
                allowBlank: false,
                format: 'd/m/Y H:i:s',
                name: 'end_date',
                anchor: '98%',
                value: row.data['end_date']
            }],
            buttons: [{
                text: 'Cancel',
                handler: function () {
                    editWindow.close();
                }
            }, {
                text: 'Reset',
                handler: function () {
                    editForm.getForm().reset();
                }
            }, {
                text: 'Send',
                handler: function () {
                    if (editForm.getForm().isValid()) {
                        editForm.getForm().submit({
                            method: 'POST',
                            waitTitle: 'Connecting',
                            waitMsg: 'Sending data...',
                            success: function (form, action) {
                                obj = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('OK', obj.message);
                                editWindow.close();
                                Ext.getCmp('Scheduler').store.load();
                            },
                            failure: function (form, action) {
                                if (action.failureType == 'connect') {
                                    Ext.Msg.alert('Warning!', 'Rest server is unreachable ');
                                } else {
                                    obj = Ext.JSON.decode(action.response.responseText);
                                    Ext.Msg.alert('Failed!!!', obj.message);
                                }
                                editForm.getForm().reset();
                            }
                        });
                    }
                }
            }]
        });

        var editWindow = Ext.widget('window', {
            title: 'Edit '+row.data['name'],
            id: 'volumesEdit-win' + vedit_id,
            constrain: true,
            closable: true,
            border: false,
            plain: true,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: editForm
        });
        editWindow.show();

        veditOwnerCombo.store.on('load', function () {
            veditOwnerCombo.setRawValue(veditOwnerCombo.getSubmitValue());
        });

        veditProjectCombo.store.on('load', function () {
            veditProjectCombo.setRawValue(veditProjectCombo.getSubmitValue());
        });
    }
});