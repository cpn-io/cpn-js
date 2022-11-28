package com.indevstudio.cpnide.server.controllers;

import com.indevstudio.cpnide.server.model.ErrorDescription;
import com.indevstudio.cpnide.server.playout.PlayOutConfig;
import com.indevstudio.cpnide.server.playout.PlayOutContainer;
import com.indevstudio.cpnide.server.playout.PlayOutResp;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RequestMapping("/api/v2/cpn")
@RestController
@Slf4j
public class PlayOutController {

    private PlayOutContainer _playOutContainer;

    public PlayOutController() {
        _playOutContainer = PlayOutContainer.getInstance();
    }

    /**
     * Sets whether to record events. By default, timestamps will not be recorded.
     * @param sessionId The session ID.
     * @param bool Whether to record events.
     * @return
     */
    @GetMapping(value = "/play_out/events/{bool}")
    @ApiOperation(nickname = "Set recording of events", value = "Set recording of events")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "change success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity setRecordEvents(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("bool") Boolean bool) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _playOutContainer.setRecordEvents(sessionId, bool);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        });
    }

    /**
     * Sets whether to record timestamps for events.
     * @param sessionId The session ID.
     * @param bool Whether to record timestamps for events.
     * @return
     */
    @GetMapping(value = "/play_out/times/{bool}")
    @ApiOperation(nickname = "Set recording of event times", value = "Set recording of event times")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "change success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity setRecordEventTimes(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("bool") Boolean bool) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _playOutContainer.setRecordEventTimes(sessionId, bool);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        });
    }

    /**
     * Clears the recorded events.
     * @param sessionId The session ID.
     * @return
     */
    @GetMapping(value = "/play_out/clear")
    @ApiOperation(nickname = "Clear events", value = "Clear events")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "clear success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity clearLog(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _playOutContainer.clearEvents(sessionId);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        });
    }

    /**
     * Creates the log and exports it to file.
     * @param sessionId The session ID.
     * @param config The config to use for the creation.
     * @return
     */
    @PostMapping(value = "/play_out/apply")
    @ApiOperation(nickname = "Plays out the events, creates a log from it and exports that log to file", value = "Play out - long running op (from mins to hours)")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = PlayOutResp.class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity doPlayOut(@RequestHeader(value = "X-SessionId") String sessionId, @RequestBody PlayOutConfig config) {
        /*
         * The instantiation of the config object causes several fields to be set automatically from the body.
         */
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            try {
                PlayOutResp resp = _playOutContainer.playOutEvents(sessionId, config);
                return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(resp));
            } catch(Exception e){
                System.out.println(HttpStatus.INTERNAL_SERVER_ERROR);
                System.out.println(e);
                return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e));
            }
        });
    }
}
