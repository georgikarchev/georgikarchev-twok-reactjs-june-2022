const languages = [];
languages['english'] = { iso2: 'en' };
languages['german'] = { iso2: 'de' };
languages['dutch'] = { iso2: 'nl' };


export const languageCodesIso2 = {
    en: "en",
    de: "de",
    nl: "nl"
};

export const languageToIso2 = (language) => {
    return languages[language.toLowerCase()].iso2;
};