import mongodb, {MongoClient, ObjectID} from 'mongodb';

let _client: MongoClient | null = null;

export type TokenCollection = {
	_id: ObjectID;
	access_token: string;
	refresh_token: string;
	expires_at: number;
};

export default async () => {
	if (!_client || !_client.isConnected) {
		_client = await mongodb.connect(process.env.MONGO_URL as string, {
			useNewUrlParser: true
		});
	}
	return {
		token: _client.db('runeveryday').collection<TokenCollection>('token')
	};
};
