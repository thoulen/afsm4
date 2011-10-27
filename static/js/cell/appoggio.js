{header: "Server", width: 40, sortable: true, dataIndex: 'server_name'},
{header: "name", width: 100, sortable: true, dataIndex: 'partition_name'},
{header: "Class", width: 100, sortable: true, dataIndex: 'class'},
{header: "Size", width: 50, sortable: true, dataIndex: 'size'},
{header: "Free", width: 100, sortable: true, dataIndex: 'free'},
//{header: "Perc", width: 50, sortable: true, dataIndex: 'perc', renderer: progressBarVol}, SOSTITUITA DAL PLUGIN
percColumn,
{header: "Description", width: 50, sortable: true, dataIndex: 'description'},
{header: "Update", width: 100, sortable: true, dataIndex: 'ldate'},
{header: "Create", width: 50, sortable: true, dataIndex: 'cdate'}

{
    text: 'ID',
    dataIndex: 'vid',
    sortable: true,
    flex: 1
}, {
    text: 'Partition Name',
    dataIndex: 'name',
    sortable: true,
    flex: 1
}, {
    text: 'Server',
    dataIndex: 'serv',
    sortable: true,
    flex: 1
}, {
    text: 'Partition',
    dataIndex: 'part',
    sortable: true,
    flex: 1
}, {
    text: 'parentID',
    dataIndex: 'parentID',
    sortable: true,
    flex: 1
}, {
    text: 'backupID',
    dataIndex: 'backupID',
    sortable: true,
    flex: 1
}, {
    text: 'cloneID',
    dataIndex: 'cloneID',
    sortable: true,
    flex: 1
}, {
    text: 'In Use',
    dataIndex: 'inUse',
    sortable: true,
    flex: 1
}, {
    text: 'Need Salvaged',
    dataIndex: 'needsSalvaged',
    sortable: true,
    flex: 1
}, {
    text: 'Destroy Me',
    dataIndex: 'destroyMe',
    sortable: true,
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
    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
}, {
    text: 'updateDate',
    dataIndex: 'updateDate',
    sortable: true,
    flex: 1,
    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
}, {
    text: 'backupDate',
    dataIndex: 'backupDate',
    sortable: true,
    flex: 1,
    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
}, {
    text: 'copyDate',
    dataIndex: 'copyDate',
    sortable: true,
    flex: 1,
    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
}, {
    text: 'flags',
    dataIndex: 'flags',
    sortable: true,
    flex: 1
}, {
    text: 'diskused',
    dataIndex: 'diskused',
    sortable: true,
    flex: 1
}, {
    text: 'maxquota',
    dataIndex: 'maxquota',
    sortable: true,
    flex: 1
}, {
    text: 'minquota',
    dataIndex: 'minquota',
    sortable: true,
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
    flex: 1
}, {
    text: 'spare3',
    dataIndex: 'spare3',
    sortable: true,
    flex: 1
}, {
    text: 'Creation Date',
    dataIndex: 'cdate',
    sortable: true,
    flex: 1,
    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
}, {
    text: 'Last Update',
    dataIndex: 'udate',
    sortable: true,
    flex: 1,
    renderer: Ext.util.Format.dateRenderer('Y-m-d H:i')
}, {
    text: 'sync',
    dataIndex: 'sync',
    sortable: true,
    flex: 1
},