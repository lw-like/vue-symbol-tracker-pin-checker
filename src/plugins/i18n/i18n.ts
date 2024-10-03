// Implemented with: https://vuejs.org/guide/reusability/plugins.html#provide-inject-with-plugins
export default {
    install: (app, options: { [key: string]: string | object }) => {
        app.config.globalProperties.$translate = (key) => {
            return key.split('.').reduce((o: string, i: number) => {
                if (o) return o[i]
            }, options);
        }

        app.provide('i18n', options)
    }
}