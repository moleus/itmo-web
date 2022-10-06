const path = require('path');
const stylesConfig = require('./styles.json');

const cacheGroups = {}
const entryPoints = {
    script: "./scripts/main.ts"
}

module.exports = {
    cacheGroups,
    entryPoints
}

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

stylesConfig.scss.forEach(entry => {
    entryPoints[entry.name] = path.resolve(__dirname, "../styles/" + entry.path);
});

stylesConfig.scss.forEach(entryPoint => {
    cacheGroups[entryPoint.name] = {
        name: entryPoint.name,
        test: (m, c, entry = entryPoint.name) => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        chunks: 'all',
        enforce: true
    }
});