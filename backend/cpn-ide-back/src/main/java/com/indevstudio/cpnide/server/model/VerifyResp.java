package com.indevstudio.cpnide.server.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Builder
@Data
public class VerifyResp {
    boolean isSuccess;
    Map<String, List<IssueDescription>> issues;
}
