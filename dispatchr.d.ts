interface IEventSystem {
    on(event: string, callback: () => void, ctx: any): void ;
    off(event: string, ctx?: any): void;
    emit(event: string, async?: boolean): void;
}
