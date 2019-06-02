package com.indevstudio.cpnide.server.controllers;

import com.indevstudio.cpnide.server.WebUtils;
import com.indevstudio.cpnide.server.model.IssueDescription;
import com.indevstudio.cpnide.server.model.VerifyResp;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;

@Slf4j
public class RequestBaseLogic {
    static public ResponseEntity HandleRequest(String sessionId, Callable<ResponseEntity> logic) {
        try {
            if (StringUtils.isEmpty(sessionId))
                throw new NoSuchFieldException("Missing sessionId");

            return logic.call();
        } catch (NoSuchFieldException ex) {
            log.error("Request failed", ex);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(WebUtils.PrepareErrorBody(ex));
        } catch (NotFoundException ex) {
            log.error("Request failed:", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(WebUtils.PrepareErrorBody(ex));
        } catch (Exception ex) {
            log.error("Request failed:", ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(WebUtils.PrepareErrorBody(ex));
        }
    }
}
