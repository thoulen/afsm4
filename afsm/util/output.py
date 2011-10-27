"""
publish Python objects as various API formats
"""

import tornado.web

import datetime
import json
import csv
import xmlrpclib


class Output():
    _format = "html"
    JSON = 'json'
    _ftype_map = {
          'html' : 'text/html',
          'xls'  : 'application/excel',
          'json' : 'text/html',
          'xml'  : 'application/rdf+xml'
        }
    
    def __init__(self,format):
        self._format = format

    def _dumpJSON(self,lst,callback):
        if callback:
            out = "%s (%s) " % (callback,json.dumps(lst))
        else:
            out = json.dumps(lst)
        return out
    
    def _dumpHTML(self,lst):

        out = "<table border=1 width=100%>"
        for row in lst['data']:
            out = out + "<tr>"
            for k, v in row.iteritems():
                out = out + "<td>%s</td>" % v
            out = out + "<tr>"
        out = out+"</table>"
        return out  
    
    def _dumpCSV(self,data):
        out = ""
        lst = data.get('data')
        for row in lst:
            for k, v in row.iteritems():
                if v:
                   out = out + str(v) + "\t" 
                else :
                   out = out + "\t"
            out = out + "\n"
        return out  
    
    
    def getMimeType(self):
        return self._ftype_map[self._format]
    
    
    
    def render(self, lst, callback=None):
        preferences = ['html', 'csv', 'json', 'xml']
                  
        if self._format == 'html':
            return self._dumpHTML(lst)
        elif self._format == 'xls':
            return self._dumpCSV(lst)
        elif self._format == 'json':
            return self._dumpJSON(lst,callback)
        else:
            raise ValueError, 'unknown format'
