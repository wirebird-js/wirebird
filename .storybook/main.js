module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

    babel: async (options) => ({
        ...options,
        presets: [
            ['@babel/preset-env', { shippedProposals: true }],
            '@babel/preset-typescript',
            '@babel/preset-react',
        ],
        plugins: ['@babel/plugin-transform-typescript', ...options.plugins],
    }),
};
