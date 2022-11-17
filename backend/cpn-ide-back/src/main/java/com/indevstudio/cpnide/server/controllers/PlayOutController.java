package com.indevstudio.cpnide.server.controllers;

import com.indevstudio.cpnide.server.model.ErrorDescription;
import com.indevstudio.cpnide.server.playout.PlayOutConfig;
import com.indevstudio.cpnide.server.playout.PlayOutContainer;
import com.indevstudio.cpnide.server.playout.PlayOutProgress;
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
    @GetMapping(value = "/sim/recordactivities/{bool}")
    @ApiOperation(nickname = "Set recording of bindings", value = "Set recording of bindings")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "change success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity setRecordActivities(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("bool") Boolean bool) {
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
    @GetMapping(value = "/sim/recordtime/{bool}")
    @ApiOperation(nickname = "Set recording of timestamps", value = "Set recording of timestamps")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "change success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity setRecordTime(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("bool") Boolean bool) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _playOutContainer.setRecordTime(sessionId, bool);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        });
    }

    /**
     * Sets the full path to the output file.
     * @param sessionId The session ID.
     * @param fileName The full path to the output file.
     * @return
     */
//    @GetMapping(value = "/sim/fileName/{fileName}")
//    @ApiOperation(nickname = "Set output file name", value = "Set output file name")
//    @ApiResponses(
//            value = {
//                    @ApiResponse(code = 200, message = "set success"),
//                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
//                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
//            })
//    public ResponseEntity setOutputPath(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("fileName") String fileName) {
//        System.out.println("[PlayOutController] /sim/fileName/" + fileName);
//        return RequestBaseLogic.HandleRequest(sessionId, () -> {
//            _playOutContainer.setFileName(sessionId, fileName);
//            return ResponseEntity.status(HttpStatus.OK).body(null);
//        });
//    }

    /**
     * Clears the recorded events.
     * @param sessionId The session ID.
     * @return
     */
    @GetMapping(value = "/sim/clear_log")
    @ApiOperation(nickname = "Clear log", value = "Clear log")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "clear success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity clearLog(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _playOutContainer.clear(sessionId);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        });
    }

    /**
     * Returns whether there are any recorded events.
     * @param sessionId The session ID.
     * @return Whether there are any recorded events.
     */
//    @GetMapping(value = "/sim/exist_recorded_events")
//    @ApiOperation(nickname = "is log empty", value = "is log empty")
//    @ApiResponses(
//            value = {
//                    @ApiResponse(code = 200, message = "Request success", response = Boolean.class),
//                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
//                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
//            })
//    public ResponseEntity existRecordedEvents(@RequestHeader(value = "X-SessionId") String sessionId) {
//        System.out.println("[PlayOutController] /sim/exist_recorded_events");
//        return RequestBaseLogic.HandleRequest(sessionId, () -> {
//            Boolean bool = _playOutContainer.existRecordedEvents(sessionId);
//            return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(bool));
//        });
//    }

    /**
     * Creates the log and exports it to file.
     * @param sessionId The session ID.
     * @param config The config to use for the creation.
     * @return
     */
    @PostMapping(value = "/sim/create_log")
    @ApiOperation(nickname = "Create log", value = "Create log - long running op (from mins to hours)")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = PlayOutResp.class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity doCreateLog(@RequestHeader(value = "X-SessionId") String sessionId, @RequestBody PlayOutConfig config) {
        /*
         * The instantiation of the config object causes several fields to be set automatically from the body.
         */
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            try {
                PlayOutResp resp = _playOutContainer.create(sessionId, config);
                return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(resp));
            } catch(Exception e){
                System.out.println(HttpStatus.INTERNAL_SERVER_ERROR);
                System.out.println(e);
                return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e));
            }
        });
    }

    /**
     * Returns whether the log exported last for the given session ID was empty.
     * @param sessionId
     * @return
     */
//    @GetMapping(value = "/sim/is_log_empty")
//    @ApiOperation(nickname = "is log empty", value = "is log empty")
//    @ApiResponses(
//            value = {
//                    @ApiResponse(code = 200, message = "Request success", response = Boolean.class),
//                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
//                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
//            })
//    public ResponseEntity isLogEmpty(@RequestHeader(value = "X-SessionId") String sessionId) {
//        System.out.println("[PlayOutController] /sim/is_log_empty");
//        return RequestBaseLogic.HandleRequest(sessionId, () -> {
//            Boolean bool = _playOutContainer.isLogEmpty(sessionId);
//            return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(bool));
//        });
//    }

    /**
     * Returns a progress report. Not sure whether this is used.
     * @param sessionId
     * @param config
     * @return
     */
    @PostMapping(value = "/sim/create_log_progress")
    @ApiOperation(nickname = "Create log progress", value = "Create log - long running op (from mins to hours)")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = PlayOutProgress.class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity CreateLogProgress(@RequestHeader(value = "X-SessionId") String sessionId, @RequestBody PlayOutConfig config) {
        /*
         * The instantiation of the config object causes several fields to be set automatically from the body.
         */
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            System.out.println("[PlayOutController] CreateLogProgress");
            PlayOutProgress resp = _playOutContainer.getProgress(sessionId, config);
            return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(resp));
        });
    }

    /**
     * Gets details on the full path of the file logs are epxorted to.
     * @param sessionId
     * @return
     */
//    @GetMapping(value = "/sim/get_output_path")
//    @ApiOperation(nickname = "Get outputPath", value = "Get outputPath")
//    @ApiResponses(
//            value = {
//                    @ApiResponse(code = 200, message = "success", response = String[].class),
//                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
//                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
//            })
//    public ResponseEntity getOutputPath(@RequestHeader(value = "X-SessionId") String sessionId) {
//        System.out.println("[PlayOutController] /sim/get_output_path");
//        return RequestBaseLogic.HandleRequest(sessionId, () -> {
//            String[] path = {_playOutContainer.getPath(sessionId)};
//            return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(path));
//        });
//    }
}
