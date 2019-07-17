package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimInfo {
    long step;
    String time;
}
