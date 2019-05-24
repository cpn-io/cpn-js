package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PlaceMark {
    String id;
    int tokens;
    String marking;
}
