//Parses an advanced search string into an object.
//Full text search strings are interpreted as-is.
//Tagged search entities, when recognized, are parsed into special search conditions.
//Examples:
//  "method:POST" => {method: ["POST"]}
//  "method:POST method:GET" => {method: ["POST", "GET"]}
//  "method:POST method:GET method:PUT" => {method: ["POST", "GET", "PUT"]}
//  "domain:example.com" => {domain: ["example.com"]}
//  "domain:example.com domain:example.org" => {domain: ["example.com", "example.org"]}
//  "method:POST domain:example.org" => {method: ["POST"], domain: ["example.org"]}
//  "hello method:POST world" => {text: "hello world", method: ["POST"]}
//  "hello method:POST method:GET world" => {text: "hello world", method: ["POST", "GET"]}

export interface SearchCondition {
    method: Set<string>;
    domain: Set<string>;
    text: string;
}

export function parseSearchString(searchString: string): SearchCondition {
    const conditions: SearchCondition = {
        method: new Set(),
        domain: new Set(),
        text  : '',
    };
    const conditionStrings = searchString.split(' ');
    for (const conditionString of conditionStrings) {
        const condition = parseConditionString(conditionString);
        if (condition.method) {
            conditions.method.add(condition.method);
        }
        if (condition.domain) {
            conditions.domain.add(condition.domain);
        }
        if (condition.text) {
            conditions.text += ' ' + condition.text;
        }

        conditions.text = conditions.text.trim();
    }
    return conditions;
}

function parseConditionString(conditionString: string): {
    method?: string;
    domain?: string;
    text?: string;
} {
    if (conditionString.startsWith('method:')) {
        return {
            method: conditionString.substring('method:'.length),
        };
    }
    if (conditionString.startsWith('domain:')) {
        return {
            domain: conditionString.substring('domain:'.length),
        };
    }
    return {
        text: conditionString,
    };
}
