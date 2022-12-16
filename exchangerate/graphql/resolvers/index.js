const Rate = require("../../models/rate");
const { startSession } = require("mongoose");

const resolver = {
    Query: {
        async getExchangeRate(_, args){
            try {
            // find 함수를 통한 객체 탐색
              const rate = await Rate.find(args);
              return rate;
            } catch (err) {
              console.log(err);
              throw err;
            }
        },  
    },
    Mutation: {
        async postExchangeRate(_, args) {
            // 세션 시작
            const session = await startSession();
            try {
                // Transaction 포함 코드 구현
                await session.withTransaction(
                    async (session) => { const rate = new Rate({
                        src: args.info.name,
                        tgt: args.info.tgt,
                        rate: args.info.rate,
                        date: args.info.date,
                    });
                    // 생성한 객체 저장
                    const result = await rate.save({ session });
                    // 데이터베이스에 Transaction 커밋
                    await session.commitTransaction(); },
                transactionOptions);
                
                return result;
            } catch (error) {
                await session.abortTransaction();
                console.log(error);
                throw error;
            } finally {
                // 세션 종료
                await session.endSession();
            }
        },
        async deleteExchangeRate(_, args) {
            const session = await startSession();
            try {
                session.startTransaction();
                const rate = Rate.find({
                    src: args.info.name,
                    tgt: args.info.tgt,
                    date: args.info.date,
                });
                await rate.findOneAndRemove();
                return rate;
            } catch (error) {
                await session.abortTransaction();
                console.log(error);
                throw error;
            } finally {
                await session.endSession();
            }
        }
    },
};

module.exports = resolver;