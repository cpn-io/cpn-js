package com.indevstudio.cpnide.server.controllers;

import com.indevstudio.cpnide.server.model.ErrorDescription;
import com.indevstudio.cpnide.server.model.PlaceMark;
import com.indevstudio.cpnide.server.net.PetriNetContainer;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v2/cpn")
@RestController
@Slf4j
public class SimulatorController {


    @Autowired
    PetriNetContainer _netConatiner;

    @GetMapping(value = "/sim/init")
    @ApiOperation(nickname = "Initialize simulation", value = "Init (or ReInit) simulator")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Init success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity deleteDeclaration(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _netConatiner.InitSimulator(sessionId);
            return ResponseEntity.status(HttpStatus.OK).body("");
        });
    }

    @GetMapping(value = "/sim/marks")
    @ApiOperation(nickname = "Get Marks", value = "Get Current Marks State")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", response = PlaceMark[].class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity getMarks(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {

            return ResponseEntity.status(HttpStatus.OK).body(_netConatiner.getTokensAndMarking(sessionId));
        });
    }

    @GetMapping(value = "/sim/transitions/enabled")
    @ApiOperation(nickname = "Get Enabled Transitions", value = "Get Enabeld trsitions")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Success", response = String[].class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity getEnabledTransitions(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            return ResponseEntity.status(HttpStatus.OK).body(_netConatiner.getEnableTransitions(sessionId));
        });
    }
}
