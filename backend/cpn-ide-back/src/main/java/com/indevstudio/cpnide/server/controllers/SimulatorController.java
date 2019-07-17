package com.indevstudio.cpnide.server.controllers;

import com.indevstudio.cpnide.server.model.*;
import com.indevstudio.cpnide.server.net.PetriNetContainer;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity simInit(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _netConatiner.InitSimulator(sessionId);
            NetInfo netInf = new NetInfo(_netConatiner.getEnableTransitions(sessionId), _netConatiner.getTokensAndMarking(sessionId));
            return ResponseEntity.status(HttpStatus.OK).body(netInf);
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
        return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(_netConatiner.returnTokensAndMarking(sessionId)));
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
        return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(_netConatiner.returnEnableTrans(sessionId)));
    }

    @GetMapping(value = "/sim/state")
    @ApiOperation(nickname = "Get simulator state", value = "Get simulator state")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = SimInfo.class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity getState(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            return ResponseEntity.status(HttpStatus.OK).body(_netConatiner.getState(sessionId));
        });
    }

    @GetMapping(value = "/sim/step/{transId}")
    @ApiOperation(nickname = "Do simulation step", value = "Do simulation step")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = NetInfo.class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity doStep(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("transId") String transId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _netConatiner.makeStep(sessionId, transId);
            NetInfo netInf = new NetInfo(_netConatiner.getEnableTransitions(sessionId), _netConatiner.getTokensAndMarking(sessionId));
            return ResponseEntity.status(HttpStatus.OK).body(netInf);
        });
    }

    @GetMapping(value = "/sim/bindings/{transId}")
    @ApiOperation(nickname = "Show binding", value = "Do simulation step")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = BindingMark[].class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity getBindings(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("transId") String transId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(_netConatiner.getBindings(sessionId, transId)));
    }

    @PostMapping(value = "/sim/step_fast_forward")
    @ApiOperation(nickname = "Fast forward stepping", value = "Fast forward stepping")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = MultiStep.class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity doStepFastForward(@RequestHeader(value = "X-SessionId") String sessionId, @RequestBody MultiStep stepParams) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _netConatiner.makeStepFastForward(sessionId,stepParams);
            NetInfo netInf = new NetInfo(_netConatiner.getEnableTransitions(sessionId), _netConatiner.getTokensAndMarking(sessionId));
            return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(netInf));
        });
    }

    @PostMapping(value = "/sim/step_with_binding/{transId}")
    @ApiOperation(nickname = "Step using binding", value = "Do simulation step")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Step success", response = NetInfo.class),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity doStepWithBinding(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable("transId") String transId, @RequestBody BindingMark mark) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            _netConatiner.makeStepWithBinding(sessionId, mark.getBind_id(), transId);
            NetInfo netInf = new NetInfo(_netConatiner.getEnableTransitions(sessionId), _netConatiner.getTokensAndMarking(sessionId));
            return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(netInf));
        });
    }


}
