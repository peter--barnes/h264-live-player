import sys
import os
import thread
def netcat_from_file(port,src_name):
    print "port:\t\t"+str(port)
    #redirect stdout and stderr
    restd_file=str(port)+"_std.txt";
    cmd = "ffmpeg -re -i "+src_name+" -preset ultrafast -profile:v baseline -f h264 - 2>"+ restd_file +" | nc -k -l "+str(port)
    print "run command:\t"+cmd
    #run cmd in shell
    output = os.popen(cmd)

def netcat_from_rtsp(port,src_path):
    print "port:\t\t"+str(port)
    #redirect stdout and stderr
    restd_file=str(port)+"_std.txt";
    cmd = "ffmpeg -i \""+src_path+"\" -s 1280x720 -preset ultrafast -profile:v baseline -f h264 - 2>"+ restd_file +" | nc -k -l "+str(port)
    print "run command:\t"+cmd
    #run cmd in shell
    output = os.popen(cmd)

#main start
def main(argv):
    print len(argv)
    # start 2 threads
    try:
        if len(argv) == 1:
            thread.start_new_thread( netcat_from_file, (8082,"long.h264") )
            thread.start_new_thread( netcat_from_file, (8083,"long2.h264") )
        else:
            thread.start_new_thread( netcat_from_rtsp, (8082,"rtsp://admin:12345@192.168.0.12:554/Streaming/Channels/101") )
            thread.start_new_thread( netcat_from_rtsp, (8083,"rtsp://admin:admin@192.168.0.104:554/cam/realmonitor?channel=1&subtype=0") )
    except:
        print "Error: unable to start thread"

    while 1:
        pass



if __name__ == '__main__':
    main(sys.argv)
