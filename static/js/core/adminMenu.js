Ext.require([
	'Ext.core.demoTab'
]);

Ext.define('Ext.core.adminMenu', {
	extend: 'Ext.tree.Panel',
	title: 'Admin',
	rootVisible: false,
	iconCls: 'icon-admin',
	store: Ext.create('Ext.data.TreeStore',
	{
		root: {
			expanded: true,
			allowDrop: false,
			children: [
				{id: 'afsm1', text: 'Demo', iconCls: 'icon-scheduler', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.core.demoTab('Prova'));" },
			]
		}
	})
});