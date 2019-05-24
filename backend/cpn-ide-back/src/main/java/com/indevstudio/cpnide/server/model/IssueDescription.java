package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class IssueDescription {

    String id;
    String type;
    String description;
}
