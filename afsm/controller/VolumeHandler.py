import tornado.web

import logging, sys, os, time , fnmatch, traceback
from afs.model.QueryCache import QueryCache
from afsm.controller.BaseHandler import BaseHandler




class VolumeHandler(BaseHandler):
    '''
    classdocs
    '''
    
    def get(self, id):
       
        query = QueryCache()
        #Limit
        query.limit  = self.get_argument('limit', 25)
            
        #Offset
        query.offset  = self.get_argument('start', 0)
            
        # SORT
        sort = self.get_argument('sort', "[{'property':'name', 'direction':'ASC'}]")
        
        evsort = eval(sort)

        query.sort.append(evsort[0]['property'])
       
        query.dir = evsort[0]['direction']
        
        print query.sort
        
        volMng = self.application.volumeSrv
            
        count = volMng.getVolCountByQuery(query)
        res   = volMng.getVolByQuery(query)
        #print res
        
        mylist = []
            
        for row in res:
            mylist.append(row.getJson())

        result=  { "totalCount": count , "success":True ,"data":mylist }
        
        self.out(result)
        
        