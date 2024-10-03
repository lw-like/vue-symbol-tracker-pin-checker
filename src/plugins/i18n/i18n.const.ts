import { I18nKeysAlert, I18nKeysDrawer } from "./i18n.definition";
import { setAlertTranslation, setDrawerTranslation } from "./i18n.helpers";

export enum ELang {
    eng = 'eng',
    pl = 'pl',
}

/** Sample i18nOptions object data structure
 * {
        "Alert": {
            "Delete": "This action will delete entry.Are you sure ?"
        },
        "Drawer": {
            "EnterCode": "Draw symbol",
            "CodeExists": "Symbol already exists"
        }
    }
 */
const i18nOptions = {
    [ELang.eng]: {},
    [ELang.pl]: {},
};

export function providePolishTranslation(): TKeyValue<Object> {
    return i18nOptions[ELang.pl];
}

export function provideEnglishTranslation(): TKeyValue<Object> {
    return i18nOptions[ELang.eng];
}

export const I18nKeysAlertABS = {}
setAlertTranslation(i18nOptions[ELang.eng], I18nKeysAlertABS, I18nKeysAlert.Delete, "This action will delete entry. Are you sure?");
setAlertTranslation(i18nOptions[ELang.pl], I18nKeysAlertABS, I18nKeysAlert.Delete, "Ta akcja spowoduje usunięcie wpisu. Czy potwierdzasz?");

// -- Drawer dict definition
export const I18nKeysDrawerABS = {}
setDrawerTranslation(i18nOptions[ELang.eng], I18nKeysDrawerABS, I18nKeysDrawer.EnterCode, "Draw symbol");
setDrawerTranslation(i18nOptions[ELang.pl], I18nKeysDrawerABS, I18nKeysDrawer.EnterCode, "Narysuj symbol");

setDrawerTranslation(i18nOptions[ELang.eng], I18nKeysDrawerABS, I18nKeysDrawer.CodeExists, "Symbol already exists");
setDrawerTranslation(i18nOptions[ELang.pl], I18nKeysDrawerABS, I18nKeysDrawer.CodeExists, "Symbol już istnieje");

