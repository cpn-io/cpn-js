package com.indevstudio.cpnide.server.model.monitors;

import java.util.HashMap;
import java.util.Map;

public enum MonitorTypes {
    MARKING_SIZE(0),
    LIST_LEN_DATA_COLLECTION(5),
    PLACE_CONTENT_BP(7),
    COUNT_TRANSITION_OCCURRENCES(6),
    TRANSITION_ENABLED(8),
    DATA_COLLECTION(3),
    BREAKPOINT(1),
    USER_DEFINED(2),
    WRITE_IN_FILE(4);

    private int value;
    private static Map map = new HashMap<>();



    private MonitorTypes(int value) {
        this.value = value;
    }

    static {
        for (MonitorTypes monitorTypes : MonitorTypes.values()) {
            map.put(monitorTypes.value, monitorTypes);
        }
    }

    public static MonitorTypes valueOf(int pageType) {
        return (MonitorTypes) map.get(pageType);
    }

    public int getValue() {
        return value;
    }
}
