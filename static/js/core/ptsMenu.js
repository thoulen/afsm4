Ext.require([
	'Ext.pts.usersGrid',
	'Ext.pts.groupsGrid'
]);

Ext.define('Ext.core.ptsMenu', {
	extend: 'Ext.tree.Panel',
	title: 'Pts',
	rootVisible: false,
	iconCls: 'icon-pts',
	store: Ext.create('Ext.data.TreeStore',
	{
		root: {
			expanded: true,
			allowDrop: false,
			children: [
				{id: 'users', text: 'Users', iconCls: 'icon-users', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.pts.usersGrid());" },
				{id: 'groups', text: 'Groups', iconCls: 'icon-groups', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.pts.groupsGrid());" }
			]
		}
	})
});