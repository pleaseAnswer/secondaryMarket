module.exports = {
    devServer: {
        port: 8080,
        host: 'localhost',
        https: false,
        open: true,
        proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            }
        },  // 配置多个代理
    }
}