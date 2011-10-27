import tornado.web
from afsm.util.output import Output



class BaseHandler(tornado.web.RequestHandler):
    '''
    Basic Handler for Node controller
    '''
    
    
    @property
    def sharedkey(self):
        return self.application.sharedkey
    
      
    # @property
    def out(self,lst):
        #FIXME read format also from header 
        format = self.get_argument("format", None)
        
        if format == None:
            format = Output.JSON
        conv = Output(format)
        
        #Write header
        self.set_header('Content-Type',conv.getMimeType())
         
        #Search callback
        callback=self.get_argument("callback", None)
        
        #Send result 
        self.finish(conv.render(lst,callback))
    
    def listout(self, count, lst):
        result=  { "totalCount":count, "success":True, "data":lst }
        self.out(result)
        
                
