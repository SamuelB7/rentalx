module.exports = {
    presets: [
        ["@babel/preset-env", {targets: {node: "current"}}],
        "@babel/presettypescript"
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules": ["./src/modules"],
                    "@config": ["./src/config"],
                    "@shared": ["./src/shared"],
                    "@errors": ["./src/erros"],
                    "@utils": ["./src/utils"],
                }
            }
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ]
}