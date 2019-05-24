package com.indevstudio.cpnide.server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket postsApi() {
        return new Docket(DocumentationType.SWAGGER_2).useDefaultResponseMessages(false)
                .groupName("cpn-back")
                .apiInfo(apiInfo())
                .select()
                .paths(postPaths())
                .build();
    }

    @SuppressWarnings("unchecked")
    private Predicate<String> postPaths() {
        return Predicates.or(
                PathSelectors.regex("/api/v2/.*")
        );
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Access/CPN REST Api")
                .description("Access/CPN API reference for developers")
                .termsOfServiceUrl("")
                .version("0.3.0")
                .build();
    }

}