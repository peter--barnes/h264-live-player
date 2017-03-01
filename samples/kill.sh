kill $(ps aux|grep "ffmpeg"|awk '{print $2}')
kill $(ps aux|grep "nc -k -l"|awk '{print $2}')
killall ffmpeg
