import { I18nKeys } from "./i18n.definition";

type TranslationArgs = [TKeyValue<Object>, TKeyValue<string>, string, string];

function i18nKeyDefHelper(keys: string[]): string {
    return keys.join('.');
}

function setTranslation(
    groupKey: I18nKeys,
    optionsRef: TKeyValue<Object>,
    dataRef: TKeyValue<string>,
    key: string,
    translation: string
) {

    if (!optionsRef[groupKey]) {
        optionsRef[groupKey] = {}
    }

    optionsRef[groupKey][key] = translation;
    dataRef[key] = i18nKeyDefHelper([groupKey, key]);
}

export function setDrawerTranslation(...args: TranslationArgs): void {
    setTranslation(I18nKeys.Drawer, ...args);
}

export function setAlertTranslation(...args: TranslationArgs): void {
    setTranslation(I18nKeys.Alert, ...args);
}