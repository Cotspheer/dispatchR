/// <reference path="../../scripts/typings/linqjs/linq.d.ts" />
/// <reference path="../../scripts/typings/q/q.d.ts" />

export class DispatchR implements IEventSystem {

    private eventDictionary: {} = {};

    public on(event: string, callback: () => void, ctx: any): void {
        this.eventDictionary[event] = this.eventDictionary[event] || [];

        var eventObject = Enumerable.from(this.eventDictionary[event]).firstOrDefault((x: any) => x.ctx == ctx);

        //already attached
        if (eventObject)
            return;

        this.eventDictionary[event].push({
            callback: callback,
            context: ctx
        });
    }

    public off(event: string, ctx: any = null): void {
        if (!this.eventDictionary[event])
            return;        

        //remove all
        if (!ctx) {
            this.eventDictionary[event] = [];

            return;
        }

        var eventContainer: Array<any> = this.eventDictionary[event];
        var eventObject = Enumerable.from(this.eventDictionary[event]).firstOrDefault((x: any) => x.context == ctx);

        if (!eventObject)
            return;

        eventContainer.splice(eventContainer.indexOf(eventObject), 1);
    }

    public emit(event: string, async: boolean = false): void {
        var args: Array<any> = Array.apply([], arguments);
        args.shift();
        args.shift();
        
        var eventContainer = this.eventDictionary[event];

        if (!eventContainer)
            return;

        if (!async) {

            eventContainer.forEach((eventObject: any) => {
                eventObject.callback.apply(eventObject.context, args);
            });

            return;
        }

        var promises = [];

        eventContainer.forEach((eventObject: any) => {
            promises.push(Q.fcall(() => {
                eventObject.callback.apply(eventObject.context, args);
            }));
        });

        Q.all(promises).done();

        return;
    }
}

var instance: DispatchR;

export function getInstance(): DispatchR {
    if (!instance) {
        instance = new DispatchR();
    }

    return instance;
}
