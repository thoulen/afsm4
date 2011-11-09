/* CHANGELOG

- Added MOVE function
- Added RELEASE function
- Added REPLY function



####

icon-move
icon-release
icon-restore


*/



volumesRestore: function (row) {

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
        url: URL_PREFIX + '/volume/' + row.data['vid'],
        id: 'volumesRestore-form' + vrestore_id,
        fieldDefaults: {
            msgTarget: 'side'
        },
        items: [{
            fieldLabel: 'Name',
            name: 'name',
            xtype: 'textfield',
            anchor: '98%',
            allowBlank: false,
			value:  row.data['name']
        },
        vrestoreSrvCombo, vrestorePartCombo,
        {
            xtype: 'checkboxfield',
            //boxLabel: 'Item 1',
            fieldLabel: 'Release',
            name: 'release'
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
        title: 'Restore ' + row.data['name'],
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