
DIR="$(dirname $(readlink -f $0))"
echo "DIR = $DIR"
cd $DIR
java -jar -Xms512m $DIR/cpn-ide-back-1.24-SNAPSHOT.jar
