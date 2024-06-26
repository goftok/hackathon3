import {officialSubstreamEndpointsUrls} from "../services/substreams/config.js";
import {ListenerE} from "../services/substreams/listener.js";



export const initializeSubstreamsListeners = async (dataMapStore, fidMapStore) => {
    const listeners = [];
    Object.entries(officialSubstreamEndpointsUrls).forEach(([network, baseUrl]) => {
        listeners.push(new ListenerE({
            network: network,
            apiKey: process.env.SUBSTREAMS_API_KEY,
            baseUrl: baseUrl,
            manifestPath: `https://spkg.io/goftok/smart-contract-events-retriever-${network}-v0.1.0.spkg`,
            outputModule: 'map_contract_events',
            startBlockNum: -1
        }));
    });

    console.log('started initializing streams')
    for (const listener of listeners.values()) {
        console.log(`before ${listener.network}`)
        await listener.start(dataMapStore, fidMapStore);
        console.log(`after ${listener.network}`)
    }
    console.log('ended initializing streams')
}
