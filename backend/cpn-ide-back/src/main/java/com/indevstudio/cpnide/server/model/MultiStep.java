package com.indevstudio.cpnide.server.model;

import lombok.Data;

@Data
public class MultiStep {
    String addStep;
    String untilStep;
    String untilTime;
    String addTime;
    int amount;
}
