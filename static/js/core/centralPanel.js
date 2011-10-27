Ext.define('Ext.core.centralPanel', {
	id: 'centralPanel',
    extend: 'Ext.tab.Panel',
    region: 'center',
    border: false,
    items: [{
		title: 'Main Menu',
		autoLoad: 'menu.html',
		border: true
	}],

    addTab: function (obj) {

        if (obj == null) {
            Ext.Msg.alert('Error', 'Something goes wrong!');
            return;
        }

        var title = obj.getId();

        if (this.getComponent(title)) {
            this.setActiveTab(this.getComponent(title));
        } else {
            obj.setTitle(title);
            this.add(obj);
            obj.load();
            this.setActiveTab(title);
        }
    },

    addUrlTab: function (title, url) {

        if (this.getComponent(title)) {
			this.setActiveTab(this.getComponent(title));
        } else {
            this.add({
				id: title,
                title: title,
                autoLoad: url,
                autoScroll: true,
                closable: true
            }).show();
        }
    },

    pwdChange: function (id_user) {
		
		var chpwdForm = Ext.widget('form', {
			url: '/rest/password/'+id_user,
			bodyStyle: 'padding:5px 5px 0 8px',
			id: 'changePwdForm' + Ext.id(),
			//width: 200,
			
			fieldDefaults: {
				msgTarget: 'side'
			},
			items: [{
				xtype: 'textfield',
				name: 'password',
				inputType: 'password',
				fieldLabel: 'New Password'
			}]
		});

		var changePwdWin = Ext.widget('window', {
			title: 'Change Password',
			id: 'changePwdWin' + Ext.id(),
			constrain: true,
			width: 300,
			layout: 'fit',
			resizable: false,
			modal: true,
			items: chpwdForm,
			buttons: [{
				text: 'Cancel',
				handler: function () {
					changePwdWin.close();
				}
			}, {
				text: 'Send',
				handler: function () {
					if (chpwdForm.getForm().isValid()) {
						chpwdForm.getForm().submit({
							method: 'POST',
							waitTitle: 'Connecting',
							waitMsg: 'Sending data...',
							success: function (form, action) {
								obj = Ext.JSON.decode(action.response.responseText);
								Ext.Msg.alert('OK', obj.message);
								changePwdWin.close();
							},
							failure: function (form, action) {
								if (action.failureType == 'connect') {
									Ext.Msg.alert('Warning!', 'Rest server is unreachable ');
								} else {
									obj = Ext.JSON.decode(action.response.responseText);
									Ext.Msg.alert('Failed!!!', obj.message);
								}
							}
						});
					}
				}
			}]
		});
		changePwdWin.show();

    }

});