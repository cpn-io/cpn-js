package com.indevstudio.cpnide.server.net;

public enum IssueTypes {
    DECLARATION("decl"),
    MONITOR("mon"),
    PAGE("page");

    private String type;

    IssueTypes(String envUrl) {
        this.type = envUrl;
    }

    public String getType() {
        return type;
    }
}
