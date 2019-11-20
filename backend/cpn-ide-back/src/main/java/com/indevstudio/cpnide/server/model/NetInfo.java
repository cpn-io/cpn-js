package com.indevstudio.cpnide.server.model;

import lombok.Data;

import java.util.List;

@Data
public class NetInfo {
    List<String> firedTrans;
    List<String> enableTrans;
    List<PlaceMark> tokensAndMark;
    String extraInfo;

    public NetInfo(List<String> firedTrans, List<String> enableTrans, List<PlaceMark> tokensAndMark) {
        this.firedTrans = firedTrans;
        this.enableTrans = enableTrans;
        this.tokensAndMark = tokensAndMark;
    }
}
