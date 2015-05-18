export class Environment {
    constructor() {
        this.tld = window.location.host.substr(window.location.host.lastIndexOf(
            '.'), window.location.host.length);
    }
    currentDomain() {
        var strippedUrl = window.location.host.replace('www.', '');
        var domain = strippedUrl.substr(strippedUrl.indexOf('stv'),
            strippedUrl.lastIndexOf(
                this.tld));
        return domain.substr(0, domain.lastIndexOf('.'));
    }
}
module.exports = Environment;
