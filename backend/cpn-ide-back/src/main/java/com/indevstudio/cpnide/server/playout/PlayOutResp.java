package com.indevstudio.cpnide.server.playout;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class PlayOutResp {
    @Getter
    String absoluteFileName;
    @Getter
    int nofPlayOutEvents;
    @Getter
    int nofLogEvents;
}
