import mongodb, {MongoClient, ObjectID} from 'mongodb';
import {DbActivity} from './format-activity';

let _client: MongoClient | null = null;

export type TokenCollection = {
	_id: ObjectID;
	access_token: string;
	refresh_token: string;
	expires_at: number;
};

export type Runs = {
	_id: ObjectID;
	distance: number;
};

export type Geocoding = {
	types: string[];
	short_name: string;
	long_name: string;
}[];

export type GeocodingCache = {
	query: string;
	response: Geocoding;
};

export default async () => {
	if (!_client || !_client.isConnected) {
		_client = await mongodb.connect(process.env.MONGO_URL as string, {
			useNewUrlParser: true
		});
	}
	return {
		token: _client.db('runeveryday').collection<TokenCollection>('token'),
		runs: _client.db('runeveryday').collection<DbActivity>('runs'),
		geocoding: _client.db('runeveryday').collection<GeocodingCache>('geocoding')
	};
};
