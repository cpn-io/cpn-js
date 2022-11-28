package com.indevstudio.cpnide.server.playout;

import java.io.File;
import java.util.PriorityQueue;

public abstract class PlayOutExporter {

    public abstract boolean hasType(PlayOutConfig config);

    public abstract String getExtension();

    public abstract int createLog(PriorityQueue<PlayOutEvent> events, PlayOutConfig config);

    public abstract boolean hasEmptyLog();

    public abstract void exportLog(File file);

}
