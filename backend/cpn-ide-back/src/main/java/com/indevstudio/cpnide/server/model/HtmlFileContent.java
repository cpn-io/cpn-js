package com.indevstudio.cpnide.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HtmlFileContent {
    String fileName;
    String htmlContent;
}
