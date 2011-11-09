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
                hidden: true,
                flex: 1
            }, {
                text: 'cloneID',
                dataIndex: 'cloneID',
                sortable: true,
                hidden: true,
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
                hidden: true,
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
                hidden: true,
                flex: 1,
                hidden: true,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'flags',
                dataIndex: 'flags',
                sortable: true,
                hidden: true,
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
                hidden: true,
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
                hidden: true,
                flex: 1
            }, { // Da qui in poi....
                text: 'spare3',
                dataIndex: 'spare3',
                sortable: true,
                hidden: true,
                flex: 1
            }, {
                text: 'Creation Date',
                dataIndex: 'cdate',
                sortable: true,
                hidden: true,
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
            }, {
                text: 'Last Update',
                dataIndex: 'udate',
                sortable: true,
                hidden: true,
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
				text: 'Main Operations',
				iconCls: 'ex-menu',
				// <-- icon
				menu: {
					id: 'mainops-menu',
					items: [{
						text: 'Create',
				        iconCls: 'icon-add',
				        tooltip: 'Create new Volume',
				        scope: this,
				        handler: function () {
				            this.volumesAdd();
				        }
				    }, {
						text: 'Edit',
				        iconCls: 'icon-edit',
				        tooltip: 'Edit volume',
				        scope: this,
				        handler: function () {
				            this.buttonHandler('edit');
				        }
				    }, {
						text: 'Delete',
				        iconCls: 'icon-del',
				        tooltip: 'Delete volume',
				        scope: this,
				        handler: function () {
							this.buttonHandler('delete');
				        }

				    }, {
				        iconCls: 'icon-move',
				        tooltip: 'Move volume',
				        text: "Move",
				        scope: this,
				        handler: function () {
							this.buttonHandler('move');
				        }

				    }, {
						id: 'releaseButton',
				        iconCls: 'icon-release',
				        tooltip: 'Release volume',
				        text: "Release",
				        scope: this,
				        handler: function () {
							this.buttonHandler('release');
				        }

				    }, {
						id: 'replyButton',
				        iconCls: 'icon-reply',
				        tooltip: 'Reply the volume',
				        text: "Reply",
				        scope: this,
				        handler: function () {
							this.buttonHandler('reply');
				        }

				    }, {
				        iconCls: 'icon-volumes',
				        tooltip: 'Online',
				        text: "Online",
				        scope: this,
				        handler: function () {
							this.buttonHandler('online');
				        }
				    }, {
				        iconCls: 'icon-offline',
				        tooltip: 'Offline',
				        text: "Offline",
				        scope: this,
				        handler: function () {
							this.buttonHandler('offline');
				        }
				    }]
				}
				}, '-',	Ext.create('Ext.form.field.ComboBox', {
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
					    }, 	'-',{
						                iconCls: 'icon-csv',
						                //text: 'Csv Export',
						                tooltip: 'Export all data (csv)',
						                scope: this,
						                handler: function () {
						                    this.csv_export();
						                }
						            },'-', {
			        text: 'Dump/Restore',
			        iconCls: 'dump_menu',
			        // <-- icon
			        menu: {
			            id: 'dump-menu',
			            items: [{
			                iconCls: 'icon-dump',
			                text: 'Dump Volume',
			                tooltip: 'Dump',
			                scope: this,
			                handler: function () {
								this.buttonHandler('dump');
			                }
			            }, 	{
				                iconCls: 'icon-restore',
				                text: 'Restore Dump',
				                tooltip: 'Restore Dump',
				                scope: this,
				                handler: function () {
									this.volumesRestore();
				                }
				            }]
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
		
		this.getSelectionModel().on('selectionchange', function (sm, selectedRecord) {
			//console.log(selectedRecord[0].data);
			if (selectedRecord[0].data.type != 'RW'){
				Ext.getCmp('releaseButton').disable();
				Ext.getCmp('replyButton').disable();
			}
			else {
				Ext.getCmp('releaseButton').enable();
				Ext.getCmp('replyButton').enable();
			}
		});


        this.callParent(arguments);
    },
    load: function () {
        this.store.load();
    },
    getId: function () {
        return this.id;
    },
    diskUsedPB: function (cellValue, css_class, row) {
        var id = Ext.id();

        Ext.Function.defer(function () {
            var percentage = Ext.util.Format.round(((cellValue * 100) / row.data['maxquota']), 3);
            var pBar = Ext.create('Ext.ProgressBar', {
                renderTo: id
            });
            pBar.updateProgress(percentage / 100, percentage + '%');
        }, 25);

        return '<div id="' + id + '"></div>';

    },
    buttonHandler: function (operation) {
        switch (operation) {
			case 'edit':
        	case 'move':
			case 'delete':
			case 'online':
			case 'offline':
			case 'dump':
            	var m = Ext.getCmp('Volumes').getSelectionModel().getSelection();
            	if (m.length != 0) {
                	Ext.Msg.show({
                    	title: operation.charAt(0).toUpperCase() + operation.slice(1),
                    	msg: "Are you sure you want to <b>" + operation + "</b> the volume <b>" + m[0].data['name'] + "</b>?",
                    	buttons: Ext.Msg.YESNO,
                    	scope: this,
                    	fn: function (btw) {
                        	if (btw == 'yes') {
                            	//this.volumesEdit(m[0]);
								eval("this.volumes"+operation.charAt(0).toUpperCase() + operation.slice(1)+"(m[0])");
							 
                        	}
                    	},
                    	icon: Ext.MessageBox.QUESTION,
                    	minWidth: 270
                	});
            	} else {
                	Ext.Msg.alert('Error', 'You must select one volume to '+operation+'!');
            	}
            break;

			case 'release':
			case 'reply':
			var m = Ext.getCmp('Volumes').getSelectionModel().getSelection();
            if (m.length > 0) {
                if (m[0].data['type'] == 'RW') {
                    Ext.Msg.show({
                        title: 'Move',
                        msg: "Are you sure you want to <b>" + operation + "</b> the volume <b>" + m[0].data['name'] + "</b>?",
                        buttons: Ext.Msg.YESNO,
                        scope: this,
                        fn: function (btw) {
                            if (btw == 'yes') {
                                this.volumesRelease(m[0]);
                            }
                        },
                        icon: Ext.MessageBox.QUESTION,
                        minWidth: 270
                    });
                } else {
                    Ext.Msg.alert('Error', 'You can\'t ' + operation + ' ' + m[0].data['name'] + '<br>The volume is not in RW mode');
                }
            } else {
                Ext.Msg.alert('Error', 'You must select one volume to release!');
            }
			
			break;
            //case <valore 2>:
            //istruzioni
            //break;
            default:
				Ext.Msg.alert('Demo', 'Not implemented yet');
        }
    },
    csv_export: function () {
        var this_url = Ext.getCmp('Volumes').store.getProxy().url;
        location.href = this_url + "?output=csv";
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
            url: URL_PREFIX + '/cell/volume/' + row.data['vid'],
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
                msgTarget: 'side',
				labelWidth: 60
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
                            method: 'PUT',
                            waitTitle: 'Connecting',
                            waitMsg: 'Sending data...',
                            success: function (form, action) {
                                obj = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('OK', obj.message);
                                addWindow.close();
                                Ext.getCmp('Volumes').store.load();
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
            url: URL_PREFIX + '/volume/' + row.data['vid'],
            id: 'volumesEdit-form' + vedit_id,
            fieldDefaults: {
                msgTarget: 'side',
				labelWidth: 60
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
                                Ext.getCmp('Volumes').store.load();
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
            title: 'Edit ' + row.data['name'],
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
    },
    volumesMove: function (row) {
        var vmove_id = Ext.id();

        var vmovePartCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Partition',
            name: 'part',
            id: 'vmove-partCombo' + vmove_id,
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
                autoLoad: true
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
            value: row.data['part']
        });

        var vmoveSrvCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Server',
            name: 'serv',
            id: 'vmove-serverCombo' + vmove_id,
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
                autoLoad: true
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
            value: row.data['serv'],
            listeners: {
                change: function () {
                    vmovePartCombo.clearValue();
                    if (this.getSubmitValue() != null) {
                        vmovePartCombo.store.setProxy({
                            url: URL_PREFIX + '/menu/volume/' + this.getSubmitValue(),
                            type: 'rest',
                            reader: {
                                type: 'json',
                                root: 'data'
                            }
                        });
                        vmovePartCombo.enable();
                        vmovePartCombo.store.load();
                    } else {
                        vmovePartCombo.setDisabled(true);
                    }
                }
            }
        });

        var moveForm = Ext.widget('form', {
            autoScroll: true,
            frame: true,
            width: 300,
            url: URL_PREFIX + '/volume/' + row.data['vid'],
            id: 'volumesMove-form' + vmove_id,
            fieldDefaults: {
                msgTarget: 'side',
				labelWidth: 60
            },
            items: [{
                xtype: 'hidden',
                name: 'old_server',
                value: row.data['serv']
            }, {
                xtype: 'hidden',
                name: 'old_part',
                value: row.data['part']
            },
            vmoveSrvCombo, vmovePartCombo],
            buttons: [{
                text: 'Cancel',
                handler: function () {
                    moveWindow.close();
                }
            }, {
                text: 'Reset',
                handler: function () {
                    moveForm.getForm().reset();
                }
            }, {
                text: 'Send',
                handler: function () {
                    if (moveForm.getForm().isValid()) {
                        moveForm.getForm().submit({
                            method: 'PUT',
                            waitTitle: 'Connecting',
                            waitMsg: 'Sending data...',
                            success: function (form, action) {
                                obj = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('OK', obj.message);
                                moveWindow.close();
                                Ext.getCmp('Volumes').store.load();
                            },
                            failure: function (form, action) {
                                if (action.failureType == 'connect') {
                                    Ext.Msg.alert('Warning!', 'Rest server is unreachable ');
                                } else {
                                    obj = Ext.JSON.decode(action.response.responseText);
                                    Ext.Msg.alert('Failed!!!', obj.message);
                                }
                                moveForm.getForm().reset();
                            }
                        });
                    }
                }
            }]
        });

        var moveWindow = Ext.widget('window', {
            title: 'Move ' + row.data['name'],
            id: 'volumesMove-win' + vmove_id,
            constrain: true,
            closable: true,
            border: false,
            plain: true,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: moveForm
        });
        moveWindow.show();

        vmoveSrvCombo.store.on('load', function () {
            vmoveSrvCombo.setRawValue(vmoveSrvCombo.getSubmitValue());
        });

        vmovePartCombo.store.on('load', function () {
            vmovePartCombo.setRawValue(vmovePartCombo.getSubmitValue());
        });
    },
    volumesRelease: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/volume/' + row.data['vid'],
            method: 'POST',
            params: {
                action: 'release'
            },
            failure: function (response) {
                Ext.Msg.alert('Fail', 'Some error occured');
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == false) {
                    Ext.Msg.alert('Error', resp.errorInfo);
                } else {
                    Ext.Msg.alert('Success', 'The volume ' + row.data['name'] + ' was released successfully');
                }
            }
        });
    },
    volumesReply: function (row) {

        var vreply_id = Ext.id();

        var vreplyPartCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Partition',
            name: 'part',
            id: 'vreply-partCombo' + vreply_id,
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
                autoLoad: true
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
            // Se non carica il value la colpa è del forceSelection!
            editable: false,
            value: row.data['part']
        });

        var vreplySrvCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Server',
            name: 'serv',
            id: 'vreply-serverCombo' + vreply_id,
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
                autoLoad: true
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
            value: row.data['serv'],
            listeners: {
                change: function () {
                    vreplyPartCombo.clearValue();
                    if (this.getSubmitValue() != null) {
                        vreplyPartCombo.store.setProxy({
                            url: URL_PREFIX + '/menu/volume/' + this.getSubmitValue(),
                            type: 'rest',
                            reader: {
                                type: 'json',
                                root: 'data'
                            }
                        });
                        vreplyPartCombo.enable();
                        vreplyPartCombo.store.load();
                    } else {
                        vreplyPartCombo.setDisabled(true);
                    }
                }
            }
        });

        var replyForm = Ext.widget('form', {
            autoScroll: true,
            frame: true,
            width: 300,
            url: URL_PREFIX + '/volume/' + row.data['vid'],
            id: 'volumesReply-form' + vreply_id,
            fieldDefaults: {
                msgTarget: 'side',
				labelWidth: 60
            },
            items: [
            vreplySrvCombo, vreplyPartCombo,
            {
                xtype: 'checkboxfield',
                //boxLabel: 'Item 1',
                fieldLabel: 'Release',
                name: 'release'
            }],
            buttons: [{
                text: 'Cancel',
                handler: function () {
                    replyWindow.close();
                }
            }, {
                text: 'Reset',
                handler: function () {
                    replyForm.getForm().reset();
                }
            }, {
                text: 'Send',
                handler: function () {
                    if (replyForm.getForm().isValid()) {
                        replyForm.getForm().submit({
                            method: 'PUT',
                            waitTitle: 'Connecting',
                            waitMsg: 'Sending data...',
                            params: {
                                action: 'reply'
                            },
                            success: function (form, action) {
                                obj = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('OK', obj.message);
                                replyWindow.close();
                                Ext.getCmp('Volumes').store.load();
                            },
                            failure: function (form, action) {
                                if (action.failureType == 'connect') {
                                    Ext.Msg.alert('Warning!', 'Rest server is unreachable ');
                                } else {
                                    obj = Ext.JSON.decode(action.response.responseText);
                                    Ext.Msg.alert('Failed!!!', obj.message);
                                }
                                replyForm.getForm().reset();
                            }
                        });
                    }
                }
            }]
        });

        var replyWindow = Ext.widget('window', {
            title: 'Reply ' + row.data['name'],
            id: 'volumesReply-win' + vreply_id,
            constrain: true,
            closable: true,
            border: false,
            plain: true,
            layout: 'fit',
            resizable: true,
            modal: true,
            items: replyForm
        });

        replyWindow.show();

        vreplySrvCombo.store.on('load', function () {
            vreplySrvCombo.setRawValue(vreplySrvCombo.getSubmitValue());
        });

        vreplyPartCombo.store.on('load', function () {
            vreplyPartCombo.setRawValue(vreplyPartCombo.getSubmitValue());
        });
    },
    volumesOnline: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/volume/' + row.data['vid'],
            method: 'POST',
            params: {
                action: 'online'
            },
            failure: function (response) {
                Ext.Msg.alert('Fail', 'Some error occured');
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == false) {
                    Ext.Msg.alert('Error', resp.errorInfo);
                } else {
                    Ext.Msg.alert('Success', 'The volume ' + row.data['name'] + ' is now online');
                }
            }
        });
    },
    volumesOffline: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/volume/' + row.data['vid'],
            method: 'POST',
            params: {
                action: 'offline'
            },
            failure: function (response) {
                Ext.Msg.alert('Fail', 'Some error occured');
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == false) {
                    Ext.Msg.alert('Error', resp.errorInfo);
                } else {
                    Ext.Msg.alert('Success', 'The volume ' + row.data['name'] + ' is now offline');
                }
            }
        });
    },
    volumesDump: function (row) {
        Ext.Ajax.request({
            url: URL_PREFIX + '/volume/' + row.data['vid'],
            method: 'POST',
            params: {
                action: 'dump'
            },
            failure: function (response) {
                Ext.Msg.alert('Fail', 'Some error occured');
            },
            success: function (response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == false) {
                    Ext.Msg.alert('Error', resp.errorInfo);
                } else {
                    Ext.Msg.alert('Success', 'The volume ' + row.data['name'] + ' was dumped succesfully');
                }
            }
        });
    },
	volumesRestore: function () {

	    var vrestore_id = Ext.id();

	    var vrestorePartCombo = Ext.create('Ext.form.field.ComboBox', {
	        fieldLabel: 'Partition',
	        name: 'part',
	        id: 'vrestore-partCombo' + vrestore_id,
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
	        // Se non carica il value la colpa è del forceSelection!
	        editable: false,
			disabled: true
	    });

	    var vrestoreSrvCombo = Ext.create('Ext.form.field.ComboBox', {
	        fieldLabel: 'Server',
	        name: 'serv',
	        id: 'vrestore-serverCombo' + vrestore_id,
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
	                vrestorePartCombo.clearValue();
	                if (this.getSubmitValue() != null) {
	                    vrestorePartCombo.store.setProxy({
	                        url: URL_PREFIX + '/menu/volume/' + this.getSubmitValue(),
	                        type: 'rest',
	                        reader: {
	                            type: 'json',
	                            root: 'data'
	                        }
	                    });
	                    vrestorePartCombo.enable();
	                    vrestorePartCombo.store.load();
	                } else {
	                    vrestorePartCombo.setDisabled(true);
	                }
	            }
	        }
	    });

	    var restoreForm = Ext.widget('form', {
	        autoScroll: true,
	        frame: true,
	        width: 300,
	        url: URL_PREFIX + '/volume/0',
	        id: 'volumesRestore-form' + vrestore_id,
	        fieldDefaults: {
	            msgTarget: 'side',
				labelWidth: 60
	        },
	        items: [{
	            fieldLabel: 'Name',
	            name: 'name',
	            xtype: 'textfield',
	            anchor: '98%',
	            allowBlank: false
	        },
	        vrestoreSrvCombo, vrestorePartCombo,
			{
	            xtype: 'filefield',
	            name: 'dump_file',
	            fieldLabel: 'Dump file',
				anchor: '98%'
			}, {
	            xtype: 'checkboxfield',
	            fieldLabel: 'Overwrite',
	            name: 'overwrite'
	        }],
	        buttons: [{
	            text: 'Cancel',
	            handler: function () {
	                restoreWindow.close();
	            }
	        }, {
	            text: 'Reset',
	            handler: function () {
	                restoreForm.getForm().reset();
	            }
	        }, {
	            text: 'Send',
	            handler: function () {
	                if (restoreForm.getForm().isValid()) {
	                    restoreForm.getForm().submit({
	                        method: 'PUT',
	                        waitTitle: 'Connecting',
	                        waitMsg: 'Sending data...',
	                        params: {
	                            action: 'restore'
	                        },
	                        success: function (form, action) {
	                            obj = Ext.JSON.decode(action.response.responseText);
	                            Ext.Msg.alert('OK', obj.message);
	                            restoreWindow.close();
	                            Ext.getCmp('Volumes').store.load();
	                        },
	                        failure: function (form, action) {
	                            if (action.failureType == 'connect') {
	                                Ext.Msg.alert('Warning!', 'Rest server is unreachable ');
	                            } else {
	                                obj = Ext.JSON.decode(action.response.responseText);
	                                Ext.Msg.alert('Failed!!!', obj.message);
	                            }
	                            restoreForm.getForm().reset();
	                        }
	                    });
	                }
	            }
	        }]
	    });

	    var restoreWindow = Ext.widget('window', {
	        title: 'Restore Dump',
	        id: 'volumesRestore-win' + vrestore_id,
	        constrain: true,
	        closable: true,
	        border: false,
	        plain: true,
	        layout: 'fit',
	        resizable: true,
	        modal: true,
	        items: restoreForm
	    });

	    restoreWindow.show();

	    vrestoreSrvCombo.store.on('load', function () {
	        vrestoreSrvCombo.setRawValue(vrestoreSrvCombo.getSubmitValue());
	    });

	    vrestorePartCombo.store.on('load', function () {
	        vrestorePartCombo.setRawValue(vrestorePartCombo.getSubmitValue());
	    });
	}
});