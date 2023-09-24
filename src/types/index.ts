import {RecordTypes} from '../constants';

export interface Endpoint {
	id: string;
	endpoint: string;
	moxyType: 'proxy' | 'mock';
	proxyDetails: {
		protocal: 'https' | 'http';
		targetHost: string;
	};
	mockDetails: {
        collectionId: string
    }
}

export interface Collection {
	id: string,
    name: string
    path: string
}

export interface CollectionInput {
	id?: string,
    name: string
    value: string
	type: RecordTypes
}

export interface DropDownActions {
        name:string
        action: ()=>void
}