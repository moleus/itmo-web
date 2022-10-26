const path = require('path');
const stylesConfig = require('./styles.json');

const cacheGroups = {}
const entryPoints = {
    script: "./scripts/main.ts",
    login_script: "./scripts/auth/authForm.ts"
}

module.exports = {
    cacheGroups,
    entryPoints
}

stylesConfig.scss.forEach(entry => {
    entryPoints[entry.name] = path.resolve(__dirname, "../styles/" + entry.path);
});

stylesConfig.scss.forEach(entryPoint => {
    cacheGroups[entryPoint.name] = {
            type: "css/mini-extract",
            name: entryPoint.name,
            test: entryPoint.path,
            chunks: 'all',
            enforce: true,
        }
    }
);