import mongodb, {MongoClient, ObjectID} from 'mongodb';
import {DbActivity} from './format-activity';

let _client: MongoClient | null = null;

export interface TokenCollection {
	_id: ObjectID;
	access_token: string;
	refresh_token: string;
	expires_at: number;
}

export interface Runs {
	_id: ObjectID;
	distance: number;
}

export interface SingleGeocoding {
	types: string[];
	short_name: string;
	long_name: string;
}

export type Geocoding = SingleGeocoding[];

export interface GeocodingCache {
	query: string;
	response: Geocoding;
}

export interface Database {
	token: mongodb.Collection<TokenCollection>;
	runs: mongodb.Collection<DbActivity>;
	geocoding: mongodb.Collection<GeocodingCache>;
}

export default async (): Promise<Database> => {
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
