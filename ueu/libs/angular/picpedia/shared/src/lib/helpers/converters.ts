import { Params } from '@angular/router';

export function getOriginalRoutePathUrlByReplacingParamValues(currentUrlPath: string, params: Params): string {
    let replacedUrlPath = '';
    Object.keys(params).forEach(key => {
        const paramValuePrefix = '/';
        const paramValue = params[key];
        const paramValueInUrl = paramValuePrefix.concat(paramValue);

        const angularParamKeyPrefix = '/:';
        replacedUrlPath = currentUrlPath.replace(paramValueInUrl, angularParamKeyPrefix.concat(key));
    });

    return replacedUrlPath || currentUrlPath;
}

export function getCurrentUrlPathReplacingParamValues(currentUrlPath: string, params: Params): string {
    let replacedUrlPath = '';
    Object.keys(params).forEach(key => {
        const paramValuePrefix = '/';
        const paramValue = params[key];

        const paramValueInUrl = paramValuePrefix.concat(paramValue);

        const angularParamKeyPrefix = '';
        replacedUrlPath = currentUrlPath.replace(paramValueInUrl, angularParamKeyPrefix);
    });

    return replacedUrlPath || currentUrlPath;
}
