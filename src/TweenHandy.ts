
//////////////////////  playList ////////////////////////////////

//当前播放列表
var playList:any=Object.create(null),
    queues:object[]=[];

playList.queues=queues;

playList.add=function(tw:object):any{
   var queues=this.queues,
       i=queues.indexOf(tw);
       i===-1&&queues.push(tw);
   return this;
};

playList.removeAll=function():void{
    this.queues.length=0;
};

//////////////////////////////////// Easing /////////////////////////
var Easing = {
    Linear: {

        None: function (k:number):number {    
            return k;    
        }

    },
    Quad: {
        In: function (k:number):number {

            return k * k;

        },

        Out: function (k:number):number{

            return k * (2 - k);

        },

        InOut: function (k:number):number {

            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }

            return - 0.5 * (--k * (k - 2) - 1);

        }
    },
    Cubic: {
        In: function (k:number):number {

            return k * k * k;

        },

        Out: function (k:number):number {

            return --k * k * k + 1;

        },

        InOut: function (k:number):number {

            if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
            }

            return 0.5 * ((k -= 2) * k * k + 2);

        }

    },
    Quart: {
        In: function (k:number):number {

            return k * k * k * k;

        },

        Out: function (k:number):number {

            return 1 - (--k * k * k * k);

        },

        InOut: function (k:number):number {

            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
            }

            return - 0.5 * ((k -= 2) * k * k * k - 2);

        }
    },
    Quint: {
        In: function (k:number):number {

            return k * k * k * k * k;

        },

        Out: function (k:number):number {

            return --k * k * k * k * k + 1;

        },

        InOut: function (k:number):number {

            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k * k;
            }

            return 0.5 * ((k -= 2) * k * k * k * k + 2);

        }
    },
    Sine: {
        In: function (k:number):number {

            return 1 - Math.cos(k * Math.PI / 2);

        },

        Out: function (k:number):number {

            return Math.sin(k * Math.PI / 2);

        },

        InOut: function (k:number):number {

            return 0.5 * (1 - Math.cos(Math.PI * k));

        }
    },
    Expo: {
        In: function (k:number):number {

            return k === 0 ? 0 : Math.pow(1024, k - 1);

        },

        Out: function (k:number):number {

            return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

        },

        InOut: function (k:number):number {

            if (k === 0) {
                return 0;
            }

            if (k === 1) {
                return 1;
            }

            if ((k *= 2) < 1) {
                return 0.5 * Math.pow(1024, k - 1);
            }

            return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

        }
    },
    Circ: {
        In: function (k:number):number {

            return 1 - Math.sqrt(1 - k * k);

        },

        Out: function (k:number):number {

            return Math.sqrt(1 - (--k * k));

        },

        InOut: function (k:number):number {

            if ((k *= 2) < 1) {
                return - 0.5 * (Math.sqrt(1 - k * k) - 1);
            }

            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

        }
    },
    Elastic: {
        In: function (k:number):number {

            if (k === 0) {
                return 0;
            }

            if (k === 1) {
                return 1;
            }

            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

        },

        Out: function (k:number):number {

            if (k === 0) {
                return 0;
            }

            if (k === 1) {
                return 1;
            }

            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

        },

        InOut: function (k:number):number {

            if (k === 0) {
                return 0;
            }

            if (k === 1) {
                return 1;
            }

            k *= 2;

            if (k < 1) {
                return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
            }

            return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

        }
    },
    Back: {
        In: function (k:number):number{

            var s = 1.70158;

            return k * k * ((s + 1) * k - s);

        },

        Out: function (k:number):number {

            var s = 1.70158;

            return --k * k * ((s + 1) * k + s) + 1;

        },

        InOut: function (k:number):number {

            var s = 1.70158 * 1.525;

            if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
            }

            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

        }
    },
    Bounce: {
        In: function (k:number):number {

            return 1 - Easing.Bounce.Out(1 - k);

        },

        Out: function (k:number):number {

            if (k < (1 / 2.75)) {
                return 7.5625 * k * k;
            } else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            } else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            } else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }

        },

        InOut: function (k:number):number {

            if (k < 0.5) {
                return Easing.Bounce.In(k * 2) * 0.5;
            }

            return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

        }
    }
};

////////////////////// Core ///////////////////


interface ICoreOption {
    duration:number,
    delay:number,
    easing:any
};

//默认选项
var defaultOption={
    duration:1000,
    delay:0,
    easing:Easing.Quad.Out
};

if (typeof (<any>Object).assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target:any):any { // .length of function is 2
        if (target == null) { // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource != null) { // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
}

class Core{

    public props:object;
    public options:ICoreOption;
    public startTime:number=0;

    constructor(props:object,prevProps:object|null,options:number|object|undefined,target:any){
        this.props=copyProps(props,prevProps,target);
        this.options=options===undefined?defaultOption:(<any>Object).assign({},defaultOption,
             typeof options==="number"?
            {
              duration:options
            }:options);
    }
        
}

 function copyProps(props:any, prevProps:any, target:any) {
    var out = Object.create(null), k, v, tye, n;
    for (k in props) {
        if (k[0] === "_") {
            continue;
        }
       
        v = props[k];
        tye = typeof v;
        if (tye !== "object" && !isNaN(v)) {
            if (tye === "number") {
                out[k] = v;
                setPrveValue(prevProps,target, k);
            }
            else if (tye === "string") {
                n = v.charCodeAt(0);
                v = parseFloat(v);
                if (n === 43) {
                    out[k] =getPrevValue(prevProps,target,k) + v;
                }
                else if(n===45){
                    out[k] =getPrevValue(prevProps,target,k) - v;
                }
                else {
                    out[k] = v;
                }
                setPrveValue(prevProps,target, k);
            }
        }
    }
    return out;
}

function setPrveValue(prevProps:any,target:any,k:string):void{
    prevProps && !Object.prototype.hasOwnProperty.call(prevProps.props, k) && (prevProps.props[k] = getTargetValue(target, k));
}

function getPrevValue(prevProps:any,target:any, k:string):number {
    if(prevProps && Object.prototype.hasOwnProperty.call(prevProps.props, k)){
        return prevProps.props[k];
    }

    return getTargetValue(target,k);
}

function getTargetValue(target:any,k:string):number{
    var ks = k.split("."), i = 0, ii = ks.length - 1;

    for (; i < ii; i++) {
        target = target[ks[i]];
    }

    return target[ks[ii]];
}

/////////////////////////////////////////// TweenHandy //////////////////////////////////////

interface IFromTo{
    [name:string]:number | string | IFromTo
}

var pfm:Performance=performance,
    getNow=pfm.now?
    function():number{
        return pfm.now();
    }:function():number{
        return Date.now()-pfm.timing.navigationStart;
    };

class TweenHandy{
    static VERSION:string="1.0.0";

    static Easing:object=Easing;

    static pause=function(timeStamp:number):TweenHandy{
        var queues=playList.queues,
            i=queues.length,
            item;
   
        while(i--){
            item=queues[i];
            if(!item.paused){
               item._paused_=true;
               item.pause(timeStamp);
            }                  
        }
        return this;
    };
    static play=function(timeStamp:number):TweenHandy{
       var queues=playList.queues,
            i=queues.length,
            item;
   
        while(i--){
            item=queues[i];
            if(item._paused_)
            {
               item._paused_=false;
               item.play(timeStamp);
            }
        }
        return this;
    };
    static update=function(timeStamp:number):TweenHandy{
        var queues=playList.queues,
             i=queues.length,
             item;
    
         while(i--){
             item=queues[i];
             item.paused?
                 queues.splice(i,1):
                 item.update(timeStamp);             
         }

         return this;
     };

     static _nullObject=Object.create(null);
     static delay=function(cb:Function,delay:number):TweenHandy{
           this.to(this._nullObject,this._nullObject,delay)
           .on("complete",cb)
           .start();
       return this;
    };

    static from=function(target:object,from:IFromTo,duration?:object|number):TweenHandy{
        return new this(target).from(from,duration);
    };
    static to=function(target:object,to:IFromTo,duration?:object|number):TweenHandy{
        return new this(target).to(to,duration);
    };
    static now=getNow;

    public paused:boolean=true;

    private _target:object;
    private _chains:Core[];
    private __chains:Core[]|undefined;
    private _chains2:Core[]|undefined;
    private _listeners=Object.create(null);
    private _pausedTime:number=0;
    private _repeat:number=1;
    private __repeat:number=1;
    private _reverse:boolean=false;
    
    private _current:number=0;
    private _pauseStartTime:number=0;

    private _yoyo:boolean=false;

    constructor(target:object,from?:IFromTo){
        this._target=target;
        this._chains=[new Core(from||target,null,undefined,target)];
    }
    
    from(props:IFromTo,duration?:object|number):TweenHandy{
        var chains = this._chains,
         len = chains.length, 
         prev = len - 1, 
         prevChain = chains[prev],
         chain = new Core(props, prevChain, duration, this._target);

        chains[prev] = chain;
        chains[len] = prevChain;
        return this;
    }
    
    to(props:IFromTo,duration?:object|number):TweenHandy{
        var chains=this._chains;
        chains.push(new Core(props,chains[chains.length-1],duration,this._target));

        return this;
    }
    
    start(timeStamp?:number):TweenHandy{  
        this.paused=this._reverse=false;          
        this._current=this._pausedTime=0;
        this._yoyo && (this._chains=this.__chains!);
        this._chains[0].startTime=(timeStamp||getNow());            
        playList.add(this);         
        this.emit("start",this._target);
        return this;
    }

    play(timeStamp?:number):TweenHandy{
        if(this.paused)
        {
            this.paused=false;
            timeStamp || (timeStamp=getNow());
            if(this._pauseStartTime){
                this._chains[this._current].startTime+=timeStamp-this._pauseStartTime;
                this._pauseStartTime=0;
                
            }
            else{
                this._chains[this._current].startTime=timeStamp;
            }
            playList.add(this);
        }
        return this;
    }
    yoyo(bl:boolean):TweenHandy{
        this.__chains=this._chains;
        this._chains2=this._chains.slice().reverse();
        this._yoyo=bl;
        return this;
    }
    pause(timeStamp?:number):TweenHandy{
        if(!this.paused)
        {
            this.paused=true;
            this._pauseStartTime=timeStamp||getNow();
        }
        return this;
    }
    stop():TweenHandy{
        this.paused=true;
        this._current=this._pausedTime=0;            
        this._repeat=this.__repeat;
        this.emit("stop",this._target);
        return this;
    }
    update(timeStamp?:number):TweenHandy{
        if(this.paused) return this;   

        var chains=this._chains,
            chainsLen=chains.length,
            target:any=this._target,
            current=this._current,
            _put=this._put,
            startCore:Core,
            endCore:Core,
            startProps:any,
            endProps:any,
            baseValue,
            elapsed,
            options,
            progress,
            value;

            if(chainsLen===1){                    
                return this;
            }
        
        timeStamp || (timeStamp=getNow());
        startCore=chains[current];
        endCore=chains[current+1];

        elapsed=timeStamp-startCore.startTime;

        options=this._reverse?startCore.options:endCore.options;
        
        if(elapsed<options.delay){
            return this;
        }
        
        progress=Math.min(1,(elapsed-options.delay)/options.duration);
        value=options.easing(progress);

        startProps=startCore.props;
        endProps=endCore.props;

        for(var k in endProps){
            baseValue=startProps[k];
            //target[k]=baseValue+(endProps[k]-baseValue)*value;
            baseValue===undefined || _put(target,k, baseValue + (endProps[k] - baseValue) * value);
        }
        
        this.emit("update",target,progress);

        if(progress===1){
            ++this._current===chainsLen-1?
            this._complete(timeStamp): 
            this._next(endCore,timeStamp);
        }

        return this;
    }
   private _put(target:any,k:string,value:number):TweenHandy{
        var ks:string[]=k.split("."),i=0,ii=ks.length-1;
        for(;i<ii;i++){
            target=target[ks[i]];
        }
        target[ks[ii]]=value;
        return this;
    }
    private _next(endCore:Core,timeStamp:number):TweenHandy{
        endCore.startTime=timeStamp;
        this._pausedTime=this._pauseStartTime=0;
        return this.emit("next",this._target,this._current);
    }
    private _repeat_f(timeStamp?:number):TweenHandy{   
        this._current=this._pausedTime=0;  
                
        this.emit("repeat",this._target,this.__repeat-this._repeat);
        if(this._yoyo){
            this._reverse=!this._reverse;
            this._chains=this._reverse?this._chains2!:this.__chains!;
        }
        this._chains[0].startTime=(timeStamp||getNow());
        return this;
    }
    private _complete(timeStamp:number):TweenHandy{
        if(--this._repeat){
            this._repeat_f(timeStamp);
        }
        else
        {
            this.stop().emit("complete",this._target);
        }
        return this;
    }
    distory():TweenHandy{
        this.paused=true;
        return this;
    }
    repeat(times:number):TweenHandy{
        this._repeat=this.__repeat=isFinite(times)?times:0;
        return this;
    }
    on(type:string,fn:any):TweenHandy{
        var listeners=this._listeners,
            queues=listeners[type];
        if(queues){
            queues.push(fn);
        }
        else{
            listeners[type]=[fn];
        }
        return this;
    }
    emit(type:string,a:any,b?:any):TweenHandy{
        var queues=this._listeners[type],
            ii,
            i;
        if(!queues)return this;

        for(i=0,ii=queues.length;i<ii;i++){
            queues[i].call(this,a,b);
        }
        return this;
    }
};

export default TweenHandy;