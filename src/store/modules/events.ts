import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IEvent, IEvents } from "../types";
import axios from "axios";

@Module
export default class Events extends VuexModule implements IEvents {

    public events: IEvent[] = [];
    public loading: boolean = false;

    @Action({ commit: "populateEvents", rawError: true })
    public async requestEvents() {
        try {
            //TODO: modifier le loading via interceptor de axios maybe
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
            throw new Error(err);
        }
    }

    @Action({ commit: "addEvent", rawError: true})
    public async createEvent(event: IEvent) {
        try {
            const {data} = await axios.post(
                `/Events/`,
                event
            );
            console.log(data);
            return data;
        } catch(err) {
            throw new Error(err);
        }
    }

    @Action({rawError: true})
    public async uploadPicture(file: File) {
        console.log(file);
    }

    @Mutation
    public populateEvents(events: IEvent[]) {
        this.events = events;
    }

    @Mutation
    public addEvent(event: IEvent) {
        this.events.push(event);
    }
}
