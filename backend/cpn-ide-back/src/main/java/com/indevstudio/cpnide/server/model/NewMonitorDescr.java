package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewMonitorDescr {
    String defaultPredicate;
    String defaultObserver;
    boolean defaultTimed;
    String defaultInit;
    String defaultStop;
}
