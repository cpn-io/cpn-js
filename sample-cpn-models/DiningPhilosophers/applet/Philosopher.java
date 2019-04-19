class Philosopher{

    public double x,y;
    private int position;
    public int state = 0; // 0 = think - 1 = eat - 2 grabbed right fork - 3 grabbed left fork

    public Philosopher(double x, double y, int position){

	this.x=x;
	this.y=y;
	this.position=position;

    }

}
