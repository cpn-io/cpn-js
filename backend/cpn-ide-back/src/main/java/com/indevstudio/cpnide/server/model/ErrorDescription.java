package com.indevstudio.cpnide.server.model;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "Server error description")
public class ErrorDescription {
    String description;
    String stackTrace;
}
