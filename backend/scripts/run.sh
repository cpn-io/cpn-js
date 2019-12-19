
DIRNAME=`dirname "$0"`
echo dir=$DIRNAME
java -jar -server -DPROP_FILE=$DIRNAME/application.properties $DIRNAME/cpn-ide-back-1.24-SNAPSHOT.jar
