package com.indevstudio.cpnide.server.controllers;

import com.indevstudio.cpnide.server.WebUtils;
import com.indevstudio.cpnide.server.model.*;
import com.indevstudio.cpnide.server.net.ElementFactory;
import com.indevstudio.cpnide.server.net.IssueTypes;
import com.indevstudio.cpnide.server.net.PetriNetContainer;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/v2/cpn")
@RestController
@Slf4j
public class NetController {

    @Autowired
    PetriNetContainer _netConatiner;

    @PostMapping(value = "/init")
    @ApiOperation(nickname = "Initialize network", value = "Process xml, create initial CPN instance. And full verification")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Net create and verify success", response = VerifyResp.class),
                    @ApiResponse(code = 400, message = "Incorrect Request json body", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity intNetwork(@RequestHeader(value = "X-SessionId") String sessionId, @RequestBody InitNetBody body) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            if (StringUtils.isEmpty(body.getXml()))
                throw new NoSuchFieldException("Missing xml fields");

            _netConatiner.CreateNewNet(sessionId, body.getXml());

            Map<String, List<IssueDescription>> issues = _netConatiner.PerfomEntireChecking(sessionId);

            return ResponseEntity.status(HttpStatus.OK).body(VerifyResp.builder().isSuccess(issues.size() == 0).issues(issues).build());

        });
    }

    @GetMapping(value = "/xml/export")
    @ApiOperation(nickname = "Export net to XML", value = "Export current net object to XML")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Net export success", response = InitNetBody.class),
                    @ApiResponse(code = 400, message = "Incorrect Request json body", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity intNetwork(@RequestHeader(value = "X-SessionId") String sessionId) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            InitNetBody body = new InitNetBody();
            body.setXml(_netConatiner.exportNetToXml(sessionId));
            return RequestBaseLogic.HandleRequest(sessionId, () -> ResponseEntity.status(HttpStatus.OK).body(body));
        });
    }



    @PostMapping(value = "/verify/unit/{type}/{id}")
    @ApiOperation(nickname = "Verify element by ID", value = "Provide element of type [page, mon{itor}, decl{aration}] and id.")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Net create and verify success", response = VerifyResp.class),
                    @ApiResponse(code = 400, message = "Incorrect Request json body or unknown type", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity verifyUnit(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable(value = "type") String type, @PathVariable(value = "id") String id) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            if (StringUtils.isEmpty(type) || StringUtils.isEmpty(id))
                throw new NoSuchFieldException("Missing type and it parameters");

            Map<String, List<IssueDescription>> issues = new HashMap<>();
            switch (IssueTypes.valueOf(type)) {
                case PAGE:
                    issues = _netConatiner.CheckPageByID(sessionId, id);
                    break;
                case MONITOR:
                    issues = _netConatiner.CheckMonitorByID(sessionId, id);
                    break;
                case DECLARATION:
                    issues = _netConatiner.CheckDeclarationByID(sessionId, id);
                    break;
                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unknown type");
            }

            return ResponseEntity.status(HttpStatus.OK).body(VerifyResp.builder().isSuccess(issues.size() == 0).issues(issues).build());
        });
    }



    @PostMapping(value = "/net/decl/create")
    @ApiOperation(nickname = "Create Declaration", value = "Create Declaration on nte")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Element creation success"),
                    @ApiResponse(code = 400, message = "Incorrect Request json body", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity createDeclaration(@RequestHeader(value = "X-SessionId") String sessionId, @RequestBody Declaration declaration) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            if (StringUtils.isEmpty(declaration.getData()) || StringUtils.isEmpty(declaration.getId()))
                throw new NoSuchFieldException("Missing id and data parameters");

            _netConatiner.AddDeclaration(sessionId, ElementFactory.createDeclaration(declaration));
            return ResponseEntity.status(HttpStatus.OK).body("");
        });
    }

    @PostMapping(value = "/net/decl/delete/{id}")
    @ApiOperation(nickname = "Create Declaration", value = "Create Declaration on nte")
    @ApiResponses(
            value = {
                    @ApiResponse(code = 200, message = "Element remove success"),
                    @ApiResponse(code = 400, message = "Incorrect Request", response = ErrorDescription.class),
                    @ApiResponse(code = 404, message = "Element not found", response = ErrorDescription.class),
                    @ApiResponse(code = 500, message = "Internal error. Object with description", response = ErrorDescription.class)
            })
    public ResponseEntity deleteDeclaration(@RequestHeader(value = "X-SessionId") String sessionId, @PathVariable String id) {
        return RequestBaseLogic.HandleRequest(sessionId, () -> {
            if (StringUtils.isEmpty(id))
                throw new NoSuchFieldException("Missing id and data parameters");

            _netConatiner.DeleteDeclaration(sessionId, id);

            return ResponseEntity.status(HttpStatus.OK).body("");
        });
    }
}
