const Rate = require("../../models/rate");
const { startSession } = require("mongoose");

const resolver = {
    Query: {
        async getExchangeRate(_, args){
            try {
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
            await waitForMongooseConnection(mongoose);
            const session = await startSession();
            try {
                await session.withTransaction(
                    async (session) => { const rate = new Rate({
                        src: args.info.name,
                        tgt: args.info.tgt,
                        rate: args.info.rate,
                        date: args.info.date,
                    });
                    const result = await rate.save({ session });
                    await session.commitTransaction(); },
                transactionOptions);
                
                return result;
            } catch (error) {
                await session.abortTransaction();
                console.log(error);
                throw error;
            } finally {
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