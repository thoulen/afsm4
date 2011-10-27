import tornado.web

import logging, sys, os, time , fnmatch, traceback
from afs.model.QueryCache import QueryCache
from afsm.controller.BaseHandler import BaseHandler
from afs.service.VolService      import VolService



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
        sort = self.get_argument('sort', "[{'property':'schedule', 'direction':'ASC'}]")
        
        evsort = eval(sort)
        lsort = evsort[0]
        query.order = lsort['property']
       
        dir = lsort['direction']
        query.dir = dir.lower()
        
        volMng = VolService()
            
        count = volMng.getVolCountByQuery(query)
        res   = volMng.getVolByQuery(query)
        #print res
        
        mylist = []
            
        for row in res:
            mylist.append(row.getJson())

        result=  { "totalCount": count , "success":True ,"data":mylist }
        
        self.out(result)
        
        