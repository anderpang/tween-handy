interface IFromTo {
    [name: string]: number | string | IFromTo;
}
declare class TweenHandy {
    static VERSION: string;
    static Easing: object;
    static pause: (timeStamp: number) => TweenHandy;
    static play: (timeStamp: number) => TweenHandy;
    static update: (timeStamp: number) => TweenHandy;
    static _nullObject: any;
    static delay: (cb: Function, delay: number) => TweenHandy;
    static from: (target: object, from: IFromTo, duration?: number | object | undefined) => TweenHandy;
    static to: (target: object, to: IFromTo, duration?: number | object | undefined) => TweenHandy;
    static now: () => number;
    paused: boolean;
    private _target;
    private _chains;
    private __chains;
    private _chains2;
    private _listeners;
    private _pausedTime;
    private _repeat;
    private __repeat;
    private _reverse;
    private _current;
    private _pauseStartTime;
    private _yoyo;
    constructor(target: object, from?: IFromTo);
    from(props: IFromTo, duration?: object | number): TweenHandy;
    to(props: IFromTo, duration?: object | number): TweenHandy;
    start(timeStamp?: number): TweenHandy;
    play(timeStamp?: number): TweenHandy;
    yoyo(bl: boolean): TweenHandy;
    pause(timeStamp?: number): TweenHandy;
    stop(): TweenHandy;
    update(timeStamp?: number): TweenHandy;
    private _put;
    private _next;
    private _repeat_f;
    private _complete;
    distory(): TweenHandy;
    repeat(times: number): TweenHandy;
    on(type: string, fn: any): TweenHandy;
    emit(type: string, a: any, b?: any): TweenHandy;
}
export default TweenHandy;
