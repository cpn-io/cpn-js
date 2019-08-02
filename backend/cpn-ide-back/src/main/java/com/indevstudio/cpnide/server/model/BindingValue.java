package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BindingValue {
    String name;
    String value;
}
