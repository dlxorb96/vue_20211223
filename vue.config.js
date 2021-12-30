module.exports = {
    devServer:{
        proxy : {
            // 벡엔드의 http://localhost:3000이 
            // vue에서 url 주소를 생략하여 사용가능 하도록 설정
            '/board' : {
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
            '/item' : {
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            }
        }
    }
}