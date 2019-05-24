package com.indevstudio.cpnide.server;

import com.indevstudio.cpnide.server.model.ErrorDescription;

import java.util.Arrays;

public class WebUtils {
    public static ErrorDescription PrepareErrorBody(Exception ex)
    {
        ErrorDescription err = new ErrorDescription();
        err.setDescription(ex.getLocalizedMessage());

        final StringBuilder sb = new StringBuilder();
        Arrays.stream(ex.getStackTrace()).forEach(stackTraceElement -> sb.append(stackTraceElement.toString()+"\n"));
        err.setStackTrace(sb.toString());
        return err;
    }
}
