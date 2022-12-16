const mongoose = require('mongoose');
const MONGO_URL = `mongodb://localhost:27017/test`;

// 데이터베이스 연결 모듈 export
module.exports = () => {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB is connected')
    }).catch(err => {
        console.log(err);
    });
}

module.exports = resolvers