Ext.require([
	'Ext.cell.volumesGrid',
	'Ext.cell.partitionsGrid',
	'Ext.cell.serversGrid',
	'Ext.cell.cellsGrid'
]);

Ext.define('Ext.core.cellMenu', {
	extend: 'Ext.tree.Panel',
	title: 'Cell',
	rootVisible: false,
	iconCls: 'icon-root',
	store: Ext.create('Ext.data.TreeStore',
	{
		root: {
			expanded: true,
			allowDrop: false,
			children: [
				//{id: 'afsm1', text: 'Demo', iconCls: 'icon-scheduler', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.core.demoTab('Prova'));" },
				{id: 'volumes', text: 'Volumes', iconCls: 'icon-volumes', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.cell.volumesGrid());" },
				{id: 'partitions', text: 'Partitions', iconCls: 'icon-partitions', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.cell.partitionsGrid());"},
				{id: 'servers', text: 'Servers', iconCls: 'icon-servers', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.cell.serversGrid());" },
				{id: 'cells', text: 'Cells', iconCls: 'icon-cells', leaf: true, action: "Ext.getCmp('centralPanel').addTab(new Ext.cell.cellsGrid());" }
			]
		}
	})
});