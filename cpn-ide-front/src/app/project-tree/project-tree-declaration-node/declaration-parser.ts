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

/**
 * Parse declaration layout: extract declaration type
 * 
 * @param layout 
 */
export function parseDeclarartion(layout) {
    let result = undefined;

    const regex = /^(?<declarationType>\w+)/g;
    let m = regex.exec(layout);

    if (m && m.groups && m.groups.declarationType) {
        result = {};
        result.declarationType = m.groups.declarationType;

        switch (m.groups.declarationType) {
            case 'colset':
                result.cpnElement = parseColsetDeclaration(layout);
                break;
        }
    }
    return result;
}

/**
 * Parse colset declaration: extract name, type and extentions (with, and, timed)
 * 
 * @param layout 
 */
export function parseColsetDeclaration(layout) {
    let result = undefined;

    const regex = /colset\s+(?<name>\w+)\s*=\s*(?<type>\w+)/g;
    let m = regex.exec(layout);

    if (m && m.groups && m.groups.name && m.groups.type) {
        result = {
            id: m.groups.name
        };
        result[m.groups.type] = "";
    }

    return result;
}

export function parseUnitDeclarartion(layout) {
    const result = {};

    return result;
}