import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IEvent, IEvents } from "../types";
import axios from 'axios';

@Module
export default class Events extends VuexModule implements IEvents {

    public events: IEvent[] = [];
    public loading: boolean = false;

    @Action({ commit: "populateEvents", rawError: true })
    public async requestEvents() {
        try {
            console.log("context", this);
            this.context.rootState.Loading.enable = true;
            const events = await axios.get(
                `/accounts/${this.context.getters.getUserId}/events`/*,
                {
                    onDownloadProgress: (evt) => { // ça marche pas ...
                        console.log("onDownloadProgress", evt);
                    },
                }*/
            );
            this.context.rootState.Loading.enable = false;
            console.log("Events", events);
            return events.data;
        } catch(err) {
            console.log(err);
        }
    }

    @Mutation
    public populateEvents(events: IEvent[]) {
        this.events = events;
    }
}
