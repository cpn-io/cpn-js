package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

@Data
public class BindingMark {
    public BindingMark(){}
    public BindingMark(String id){
        bind_id=id;
    }
    String bind_id;
}
