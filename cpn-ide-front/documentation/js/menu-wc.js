'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cpn-ide documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' : 'data-target="#xs-components-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' :
                                            'id="xs-components-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApplicationSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ApplicationSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlockHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlockHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditorPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainFrameComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainFrameComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MlEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MlEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModelEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModelEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModelEditorToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModelEditorToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OpenprojectButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OpenprojectButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectConsoleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectConsoleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectExplorerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectExplorerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectMonitorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectMonitorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeBlockNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeBlockNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeDeclarationNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeDeclarationNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeMonitorNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeMonitorNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeMonitorblockNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeMonitorblockNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeOptionNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeOptionNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeOptionsNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeOptionsNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreePageNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreePageNodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProjectTreeToolbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectTreeToolbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PropertiesPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PropertiesPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveprojectButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SaveprojectButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SimulationPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SimulationPanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextEditRowComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TextEditRowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeNodeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TreeNodeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' : 'data-target="#xs-injectables-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' :
                                        'id="xs-injectables-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' }>
                                        <li class="link">
                                            <a href="injectables/AccessCpnService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AccessCpnService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ModelService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ModelService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProjectService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProjectService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SettingsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SettingsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ValidationService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' : 'data-target="#xs-pipes-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' :
                                            'id="xs-pipes-links-module-AppModule-66e54d8673989fd6ba9d96284a739961"' }>
                                            <li class="link">
                                                <a href="pipes/ColorDeclarationsPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorDeclarationsPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/MonitorNamePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MonitorNamePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/OptionsNamePipePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OptionsNamePipePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/RegexPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegexPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ReplaceSpacesPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReplaceSpacesPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/SafeHtmlPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SafeHtmlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TabModule.html" data-type="entity-link">TabModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabModule-57fa89f586af3908bfd1dd4d59e3cb24"' : 'data-target="#xs-components-links-module-TabModule-57fa89f586af3908bfd1dd4d59e3cb24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabModule-57fa89f586af3908bfd1dd4d59e3cb24"' :
                                            'id="xs-components-links-module-TabModule-57fa89f586af3908bfd1dd4d59e3cb24"' }>
                                            <li class="link">
                                                <a href="components/TabComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsContainer.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsContainer</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppVersion.html" data-type="entity-link">AppVersion</a>
                            </li>
                            <li class="link">
                                <a href="classes/BreakpointMonitorTemplate.html" data-type="entity-link">BreakpointMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Constants.html" data-type="entity-link">Constants</a>
                            </li>
                            <li class="link">
                                <a href="classes/CountTransitionOccurrencesMonitorTemplate.html" data-type="entity-link">CountTransitionOccurrencesMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/CpnServerUrl.html" data-type="entity-link">CpnServerUrl</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataCollectionMonitorTemplate.html" data-type="entity-link">DataCollectionMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListLengthDataCollectionMonitorTemplate.html" data-type="entity-link">ListLengthDataCollectionMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/MarkingSizeMonitorTemplate.html" data-type="entity-link">MarkingSizeMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlaceContentBreakPointMonitorTemplate.html" data-type="entity-link">PlaceContentBreakPointMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransitionEnabledBreakPointMonitorTemplate.html" data-type="entity-link">TransitionEnabledBreakPointMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDefinedMonitorTemplate.html" data-type="entity-link">UserDefinedMonitorTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/WriteInFileMonitorTemplate.html" data-type="entity-link">WriteInFileMonitorTemplate</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/MonitorTemplate.html" data-type="entity-link">MonitorTemplate</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});