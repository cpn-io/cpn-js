package com.indevstudio.cpnide.server.playout;

import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.deckfour.xes.extension.std.XLifecycleExtension;

public class PlayOutEvent implements Comparable<PlayOutEvent> {

    /*
     * THe binding involved. Holds data for the event.
     */
    private Binding binding;

    /*
     * The time of the event.
     */
    private double time;

    /*
     * The lifecycle transition for the event.
     */
    private XLifecycleExtension.StandardModel lifeCycleTransition;

    /*
     * A sequence number of the event. THis results in two events with the same
     * timestamp to be ordered such that the event that was created first will come first.
     */
    private int sequenceNumber;

    /*
     * Create an event.
     */
    public PlayOutEvent(Binding binding, double time, String lifeCycleTransition, int sequenceNumber) {
        this.binding = binding;
        this.time = time;
        this.lifeCycleTransition = XLifecycleExtension.StandardModel.decode(lifeCycleTransition);
        this.sequenceNumber = sequenceNumber;
    }

    /*
     * Returns hte binding involved in the event.
     */
    public Binding getBinding() {
        return this.binding;
    }

    /*
     * Returns the time of the event.
     */
    public double getTime() {
        return this.time;
    }

    /*
     * Whether the event is a start event.
     */
    public boolean isStartEvent() {
        return lifeCycleTransition.equals(XLifecycleExtension.StandardModel.START);
    }

    /*
     * Whether the event is a complete event.
     */
    public boolean isCompleteEvent() {
        return lifeCycleTransition.equals(XLifecycleExtension.StandardModel.COMPLETE);
    }

    /*
     * Returns the lifecycle transition of the event.
     */
    public String getLifeCycleTransition() {
        return this.lifeCycleTransition.getEncoding();
    }

    /*
     * Whether two events are equal.
     */
    public boolean equals(Object o) {
        if (!(o instanceof PlayOutEvent)) {
            return false;
        }
        PlayOutEvent e = (PlayOutEvent) o;
        return e.binding.equals(binding) && e.time == time && e.lifeCycleTransition.equals(lifeCycleTransition);
    }

    /*
     * Comparing two events. Time comes first, then the sequence number.
     */
    public int compareTo(PlayOutEvent e) {
        int c = Double.compare(time, e.time);
        if (c != 0) { return c; }
        return Integer.compare(sequenceNumber, e.sequenceNumber);
//        if (time < e.time) {
//            return -1;
//        }
//        if (time > e.time) {
//            return 1;
//        }
//        if (sequenceNumber < e.sequenceNumber) {
//            return -1;
//        }
//        if (sequenceNumber > e.sequenceNumber) {
//            return 1;
//        }
//        return 0;

    }}
