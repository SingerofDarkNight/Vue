const SERVER = 'http://165.227.17.140/';
const BASE_PATH = '/v3/';

const BYPASS_PREFIXS = [BASE_PATH, '/sockjs-node/']

const string_array_prefix_matcher = function(str) {
    return function(prefix) {
        return str.startsWith(prefix);
    };
};

const proxy_filter = function(pathname, req) {
    return !BYPASS_PREFIXS.some(string_array_prefix_matcher(pathname))
}

module.exports = {
    publicPath: BASE_PATH,
    pluginOptions: {
        proxy: {
            enabled: true,
            context: proxy_filter,
            options: {
                target: SERVER,
                logLevel: 'debug',
            }
        }
    }
}

