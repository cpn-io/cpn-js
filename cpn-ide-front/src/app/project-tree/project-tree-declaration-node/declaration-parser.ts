/**
 * Clear declaration layout: remove line breaks, multiple spaces, comments
 * 
 * @param layout 
 */
export function clearDeclarationLayout(layout) {
    // remove line break
    layout = layout.replace(/\n/g, '');

    // remove multiple spaces
    layout = layout.replace(/\s{2,}/g, ' ');

    // remove comments
    layout = layout.replace(/(\(\*\s*)[^\*]+(\s*\*\))/g, '');

    return layout;
}

export function parseUiDeclarartionType(layout) {
    const regex = /^(?<declarationType>\w+)/g;
    let m = regex.exec(layout);

    if (m && m.groups && m.groups.declarationType) {
        return m.groups.declarationType;
    }
    return undefined;
}

export function detectCpnDeclarartionType(cpnElement) {
    if (cpnElement.id !== undefined &&
        (cpnElement.unit !== undefined
            || cpnElement.bool !== undefined
            || cpnElement.int !== undefined
            || cpnElement.intinf !== undefined
            || cpnElement.time !== undefined
            || cpnElement.real !== undefined
            || cpnElement.string !== undefined
            || cpnElement.alias !== undefined
            || cpnElement.list !== undefined
            || cpnElement.product !== undefined
            || cpnElement.index !== undefined
            || cpnElement.enum !== undefined
            || cpnElement.record !== undefined
            || cpnElement.union !== undefined
            || cpnElement.subset !== undefined
        )) {
        return 'color';
    }
    if (cpnElement.__text) {
        return 'ml';
    }
    if (cpnElement.id && cpnElement.type) {
        return 'var';
    }
    if (cpnElement.id && cpnElement.ml) {
        return 'globref';
    }

    return 'ml';
}

/**
 * Parse declaration layout: extract declaration type
 * 
 * @param layout 
 */
export function parseDeclarartion(layout) {
    let result:any = {};

    const regex = /^(?<declarationType>\w+)/g;
    let m = regex.exec(layout);

    const declarationType = parseUiDeclarartionType(layout);

    switch (declarationType) {
        case 'globref':
            result.cpnElement = parseGlobrefDeclaration(layout);
            result.cpnDeclarationType = 'globref';
            break;
        case 'colset':
            result.cpnElement = parseColsetDeclaration(layout);
            result.cpnDeclarationType = 'color';
            break;
        case 'var':
            result.cpnElement = parseVarDeclaration(layout);
            result.cpnDeclarationType = 'var';
            break;
        default:
            result.cpnElement = parseMlDeclaration(layout);
            result.cpnDeclarationType = 'ml';
    }

    return result;
}


function parseGlobrefDeclaration(layout) {
    let result = undefined;

    let regex = /globref\s+(?<id>\w+)\s*=\s*(?<exp>[^;]+)/g;
    let m = regex.exec(layout);

    console.log('onParse(), parseGlobrefDeclaration(), layout = ', layout);

    if (m && m.groups && m.groups.id && m.groups.exp) {

        console.log('onParse(), parseGlobrefDeclaration(), m = ', m);

        result = {
            id: m.groups.id,
            ml: m.groups.exp
        };
        if (layout.includes("timed")) {
            result.timed = "";
        }
    }

    return result;
}

function parseVarDeclaration(layout) {
    let result = undefined;

    let regex = /var\s+(?<id>[^:]+)\s*:\s*(?<name>\w+)/g;
    let m = regex.exec(layout);

    console.log('onParse(), parseVarDeclaration(), layout = ', layout);

    if (m && m.groups && m.groups.id && m.groups.name) {
        console.log('onParse(), parseVarDeclaration(), m = ', m);

        const idList: any = m.groups.id.split(',');
        for (const key in idList) {
            idList[key] = idList[key].trim();
        }

        console.log('onParse(), parseVarDeclaration(), idList = ', idList);

        result = {
            type: { id: m.groups.name },
            id: idList && idList.length === 1 ? idList[0] : idList
        };
        if (layout.includes("timed")) {
            result.timed = "";
        }
    }

    return result;
}

function parseMlDeclaration(layout) {
    let result = undefined;

    console.log('onParse(), parseMlDeclaration(), layout = ', layout);

    result = {
        __text: layout,
    };

    return result;
}


/**
 * Parse colset declaration: extract name, type and extentions (with, and, timed)
 * 
 * @param layout 
 */
function parseColsetDeclaration(layout) {
    let result = undefined;

    const originalLayout = layout;

    layout = clearDeclarationLayout(layout);

    let regex = /colset\s+(?<name>\w+)\s*=\s*(?<type>\w+)/g;
    let m = regex.exec(layout);
    let m2;

    console.log('onParse(), parseColsetDeclaration(), layout = ', layout);

    if (m && m.groups && m.groups.name && m.groups.type) {

        let type: any;
        let typeName = m.groups.type;

        console.log('onParse(), parseColsetDeclaration(), m = ', m);

        switch (m.groups.type) {
            case 'unit':
                type = parseUnitDeclarartion(layout);
                break;
            case 'bool':
                type = parseBoolDeclarartion(layout);
                break;
            case 'int':
            case 'intinf':
            case 'real':
            case 'time':
                type = parseNumericDeclarartion(layout);
                break;
            case 'time':
                break;
            case 'string':
                type = parseStringDeclarartion(layout);
                break;
            case 'with':
                type = parseEnumDeclarartion(layout);
                typeName = "enum";
                break;
            case 'index':
                type = parseIndexDeclarartion(layout);
                break;

            case 'product':
                type = parseProductDeclarartion(layout);
                break;
            case 'record':
                type = parseRecordDeclarartion(layout);
                break;
            case 'union':
                type = parseUnionDeclarartion(layout);
                break;
            case 'list':
                type = parseListDeclarartion(layout);
                break;
            case 'subset':
                type = parseSubsetDeclarartion(layout);
                break;
        }

        result = {
            id: m.groups.name
        };
        if (layout.includes("timed")) {
            result.timed = "";
        }
        if (type !== undefined) {
            // typed declaration
            result[typeName] = type;
        } else {
            // alias declaration
            result.alias = { id: typeName };
        }

        result.layout = originalLayout;
    }

    return result;
}

/**
 * Parse unit declaration
 * 
 * @param layout 
 */
function parseUnitDeclarartion(layout) {
    let type: any = "";

    const regex = /with\s+(?<new_unit>\w+)/g;
    const m = regex.exec(layout);

    if (m && m.groups && m.groups.new_unit) {
        type = {
            with: {
                id: m.groups.new_unit
            }
        };
    }
    return type;
}

/**
 * Parse boolean declaration
 * 
 * @param layout 
 */
function parseBoolDeclarartion(layout) {
    let type: any = "";

    const regex = /with\s*\(\s*(?<new_false>\w+)\s*\,\s*(?<new_true>\w+)\s*\)/g;
    const m = regex.exec(layout);

    if (m && m.groups && m.groups.new_false && m.groups.new_true) {
        type = {
            with: {
                id: [m.groups.new_false, m.groups.new_true]
            }
        };
    }
    return type;
}

/**
 * Parse numeric and time declaration
 * 
 * @param layout 
 */
function parseNumericDeclarartion(layout) {
    let type: any = "";

    const regex = /with\s+(?<exp1>[\w\.]+)\s*\.\.\s*(?<exp2>[\w\.]+)/g;
    const m = regex.exec(layout);

    if (m && m.groups && m.groups.exp1 && m.groups.exp2) {
        type = {
            with: {
                ml: [m.groups.exp1, m.groups.exp2]
            }
        };
    }
    return type;
}

/**
 * Parse string declaration
 * 
 * @param layout 
 */
function parseStringDeclarartion(layout) {
    let type: any = "";

    const stringExpList = [];
    const intExpList = [];

    let regex = /with\s+(?<string_exp1>\"\w+\")\s*\.\.\s*(?<string_exp2>\"\w+\")/g;
    let m = regex.exec(layout);

    if (m && m.groups && m.groups.string_exp1 && m.groups.string_exp2) {
        stringExpList.push(m.groups.string_exp1);
        stringExpList.push(m.groups.string_exp2);
    }

    regex = /and\s+(?<int_exp1>\w+)\s*\.\.\s*(?<int_exp2>\w+)/g;
    m = regex.exec(layout);

    if (m && m.groups && m.groups.int_exp1 && m.groups.int_exp2) {
        intExpList.push(m.groups.int_exp1);
        intExpList.push(m.groups.int_exp2);
    }

    if (stringExpList.length > 0) {
        type = {
            with: {
                ml: stringExpList
            }
        };

        if (intExpList.length > 0) {
            type.with.and = {
                ml: intExpList
            };
        }
    }

    return type;
}

/**
 * Parse index declaration
 * 
 * @param layout 
 */
function parseIndexDeclarartion(layout) {
    let type: any = "";

    const regex = /(?<id>\w+)\s+with\s+(?<int_exp1>\w+)\s*\.\.\s*(?<int_exp2>\w+)/g;
    const m = regex.exec(layout);

    if (m && m.groups && m.groups.id && m.groups.int_exp1 && m.groups.int_exp2) {
        type = {
            ml: [m.groups.int_exp1, m.groups.int_exp2],
            id: m.groups.id
        };
    }
    return type;
}

/**
 * Parse enum declaration
 * 
 * @param layout 
 */
function parseEnumDeclarartion(layout) {
    let type: any = "";

    const regex = /(with\s+(?<id>\w+))|(\|\s*(?<id2>\w+))/g;
    let m;

    const idList = [];

    while ((m = regex.exec(layout)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m && m.groups) {
            if (m.groups.id) {
                idList.push(m.groups.id);
            }
            if (m.groups.id2 && idList.length > 0) {
                idList.push(m.groups.id2);
            }
        }
    }

    if (idList.length > 0) {
        type = {
            id: idList
        };
    }
    return type;
}

/**
 * Parse product declaration
 * 
 * @param layout 
 */
function parseProductDeclarartion(layout) {
    let type: any = "";

    const regex = /(product\s+(?<name>\w+))|(\*\s*(?<name2>\w+))/g;
    let m;

    const nameList = [];

    while ((m = regex.exec(layout)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m && m.groups) {
            if (m.groups.name) {
                nameList.push(m.groups.name);
            }
            if (m.groups.name2 && nameList.length > 0) {
                nameList.push(m.groups.name2);
            }
        }
    }

    if (nameList.length > 0) {
        type = {
            id: nameList
        };
    }
    return type;
}

/**
 * Parse record declaration
 * 
 * @param layout 
 */
function parseRecordDeclarartion(layout) {
    let type: any = "";

    const regex = /(record\s+(?<id>\w+)\s*:\s*(?<name>\w+))|(\*\s*(?<id2>\w+)\s*:\s*(?<name2>\w+))/g;
    let m;

    const fieldList = [];

    while ((m = regex.exec(layout)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m && m.groups) {
            if (m.groups.id && m.groups.name) {
                fieldList.push({ id: [m.groups.id, m.groups.name] });
            }
            if (m.groups.id2 && m.groups.name2 && fieldList.length > 0) {
                fieldList.push({ id: [m.groups.id2, m.groups.name2] });
            }
        }
    }

    if (fieldList.length > 0) {
        type = {
            recordfield: fieldList
        };
    }
    return type;
}

/**
 * Parse union declaration
 * 
 * @param layout 
 */
function parseUnionDeclarartion(layout) {
    let type: any = "";

    const regex = /(union\s+(?<id>\w+)\s*(:\s*(?<name>\w+))*)|(\+\s*(?<id2>\w+)\s*(:\s*(?<name2>\w+))*)/g;
    let m;

    const fieldList = [];

    while ((m = regex.exec(layout)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m && m.groups) {
            if (m.groups.id) {
                const item: any = { id: m.groups.id };
                if (m.groups.name) {
                    item.type = { id: m.groups.name };
                }
                fieldList.push(item);
            }
            if (m.groups.id2 && fieldList.length > 0) {
                const item: any = { id: m.groups.id2 };
                if (m.groups.name2) {
                    item.type = { id: m.groups.name2 };
                }
                fieldList.push(item);
            }
        }
    }

    if (fieldList.length > 0) {
        type = {
            unionfield: fieldList
        };
    }
    return type;
}

/**
 * Parse list declaration
 * 
 * @param layout 
 */
function parseListDeclarartion(layout) {
    let type: any = "";

    const regex = /list\s+(?<id>\w+)(\s+with\s+(?<int_exp1>\w+)\s*\.\.\s*(?<int_exp2>\w+))*/g;
    const m = regex.exec(layout);

    if (m && m.groups && m.groups.id) {
        type = {
            id: m.groups.id
        };
        if (m.groups.int_exp1 && m.groups.int_exp2) {
            type.ml = [m.groups.int_exp1, m.groups.int_exp2];
        }
    }
    return type;
}

/**
 * Parse subset declaration
 * 
 * @param layout 
 */
function parseSubsetDeclarartion(layout) {
    let type: any = "";

    const regex = /(subset\s+(?<id>\w+))|(by\s+(?<subset_function>\w+))|(with\s+(?<subset_list>\[.+\]))/g;
    let m;

    let id;
    let subset_function;
    let subset_list;

    while ((m = regex.exec(layout)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        if (m && m.groups) {
            if (m.groups.id) {
                id = m.groups.id;
            }
            if (m.groups.subset_function) {
                subset_function = m.groups.subset_function;
            }
            if (m.groups.subset_list) {
                subset_list = m.groups.subset_list;
            }
        }
    }

    if (id) {
        type = {
            id: id
        };
        if (subset_function) {
            type.by = {
                ml: subset_function
            }
        }
        if (subset_list) {
            type.with = {
                ml: subset_list
            }
        }
    }

    return type;
}
