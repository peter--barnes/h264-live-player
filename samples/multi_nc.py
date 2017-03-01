import sys
import time
import os
import thread
def netcat_from_file(port,src_name):
    print "port:\t\t"+str(port)
    #redirect stdout and stderr
    restd_file=str(port)+"_std.txt";
    cmd = "ffmpeg -re -i "+src_name+" -s 640x360 -preset ultrafast -profile:v baseline -f h264 - 2>"+ restd_file +" | nc -k -l "+str(port) 
    print "run command:\t"+cmd
    #run cmd in shell
    output = os.popen(cmd)

def limit_ffmpeg():
    cmd = "cpulimit -p $(ps aux|grep 'ffmpeg'|awk '{print $2}') -l 10"
    print "run command:\t"+cmd
    output = os.popen(cmd)
#kill $(ps aux|grep "ffmpeg"|awk '{print $2}')

def netcat_from_rtsp(port,src_path):
    print "port:\t\t"+str(port)
    #redirect stdout and stderr
    restd_file=str(port)+"_std.txt";
    cmd = "ffmpeg -i \""+src_path+"\" -s 640x360 -preset ultrafast -profile:v baseline -f h264 - 2>"+ restd_file +" | nc -k -l "+str(port)
    print "run command:\t"+cmd
    #run cmd in shell
    output = os.popen(cmd)

#main start
def main(argv):
    print len(argv)
    # start 2 threads
    try:
        if len(argv) == 1:
            thread.start_new_thread( netcat_from_file, (9010,"long.h264") )
            thread.start_new_thread( netcat_from_file, (9011,"long2.h264") )
            thread.start_new_thread( netcat_from_file, (9012,"long2.h264") )
            thread.start_new_thread( netcat_from_file, (9013,"long.h264") )

            #thread.start_new_thread( limit_ffmpeg, () )
        else:
            thread.start_new_thread( netcat_from_rtsp, (9010,"rtsp://admin:12345@192.168.0.11:554/Streaming/Channels/101") )
            thread.start_new_thread( netcat_from_rtsp, (9011,"rtsp://admin:admin@192.168.0.104:554/cam/realmonitor?channel=1&subtype=0") )
            thread.start_new_thread( netcat_from_rtsp, (9012,"rtsp://admin:admin@192.168.0.104:554/cam/realmonitor?channel=1&subtype=0") )
            thread.start_new_thread( netcat_from_rtsp, (9013,"rtsp://admin:12345@192.168.0.11:554/Streaming/Channels/101") )

            thread.start_new_thread( limit_ffmpeg, () )
    except:
        print "Error: unable to start thread"

    time.sleep(2)



if __name__ == '__main__':
    main(sys.argv)
