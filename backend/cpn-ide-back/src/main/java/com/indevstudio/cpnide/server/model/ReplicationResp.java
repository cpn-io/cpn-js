package com.indevstudio.cpnide.server.model;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class ReplicationResp {
    @Getter
    String extraInfo;
    @Getter
    List<HtmlFileContent> files;
}
