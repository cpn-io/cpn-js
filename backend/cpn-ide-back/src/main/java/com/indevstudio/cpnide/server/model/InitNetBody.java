package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

@Data
public class InitNetBody {
    String xml;
    boolean complex_verify = true;
    boolean need_sim_restart = false;
}
