#!/usr/bin/env python
#
# Copyright 2010 Manfred Furuholmen
#
#
"""
Smartest Controller 

"""
import os.path, logging

import tornado.httpserver
import tornado.options
import tornado.web
import tornado.ioloop
from afs.service.AuthService import TokenService
from afs.model.AfsConfig import AfsConfig, setupDefaultConfig
from afsm.controller.BaseHandler import BaseHandler
from afsm.controller.VolumeHandler import VolumeHandler

from   tornado.options import define, options


define("port"         , default=8881, help="run on the given port", type=int)
define("conf"         , default="smtc.conf", help="configuration file")



class AfsmApplication(tornado.web.Application):
    def __init__(self):  
        
        handlers = [
        (r"/", RootHandler),   
        (r"/rest/cell/volume/(.*)", VolumeHandler),
        
        ]
        
        settings = dict(
            template_path=os.path.join(os.path.dirname(__file__), "smtc/view"),
            static_path  =os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=False,
            cookie_secret="3c8b3cca9954fce0e696e1e299eb0ded",
        )
        
     
        # init and configuration
        setupDefaultConfig()
        authMng =  TokenService()
        token = authMng.get_artificial_Token('foo','ipp-garching.mpg.de')
        
        tornado.web.Application.__init__(self, handlers, **settings)
 


class RootHandler(BaseHandler):
    
    
    def get(self):
       # if self.get_secure_cookie("user"):
            self.redirect("/static/main.html")
       # else:
            self.redirect("/static/login.html")
    
def main():
    # Read Command line
    # getopts is better ! 
    ############################################   

    tornado.options.parse_command_line()
    #tornado.options.parse_config_file(options.conf)
    #tornado.options.parse_command_line()
        
    # Start Logging
    ############################################    
    
    
    #Daemonize
    ############################################

        
    # Server starting
    ############################################
    http_server = tornado.httpserver.HTTPServer(AfsmApplication())
    http_server.listen(options.port)
    logging.info('Starting server on port %s' % options.port)
    tornado.ioloop.IOLoop.instance().start()
    

if __name__ == "__main__":
    main()
