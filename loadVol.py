#!/usr/bin/env python

import sys, string, time
#sys.path.append("..")

from afs.util.AfsConfig import  setupDefaultConfig
from afs.service.CellService import CellService
from afs.service.VolService import VolService
import afs


# setup Config
setupDefaultConfig()
afs.defaultConfig.CELL_NAME="ipp-garching.mpg.de"

# init services
CS = CellService()
VL = VolService()


# uncomment if debug wanted
#CS.Logger.setLevel(logging.DEBUG)

def printServerList(CellInfo):
    print "FileServers"
    print "========="
    for srv in CellInfo.FileServers :
        print "%s: %s" %( srv["hostnames"][0], string.join(srv["ipaddrs"], ",") )
        for p in srv["partitions"] :
            print "\t%s, size: %u free: %u " % (p["name"], p["size"], p["free"])
            VL.refreshCache(srv["ipaddrs"][0],p["name"])
    print "DBServer"
    print "======="
    for srv in  CellInfo.DBServers :
        print "%s: %s" %( srv["hostnames"][0], string.join(srv["ipaddrs"], ",") ), 
        if srv["clonedbserver"] :
            print " --- CLONE"
        else :
            print

# get a light-weight list of all fileservers and dbservers querying the Cell

startTime=time.mktime(time.localtime())

CellInfo=CS.getCellInfo()
endTime=time.mktime(time.localtime())

printServerList(CellInfo)
print "Time required to get information : %d secs" % (endTime-startTime)


# get a light-weight list of all fileservers and dbservers querying the Cell

startTime=time.mktime(time.localtime())
CellInfo=CS.getCellInfo(cached=True)
endTime=time.mktime(time.localtime())

printServerList(CellInfo)
print "Time required to get information : %d secs" % (endTime-startTime)
