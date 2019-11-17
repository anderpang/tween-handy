//////////////////////  playList ////////////////////////////////
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //当前播放列表
    var playList = Object.create(null), queues = [];
    playList.queues = queues;
    playList.add = function (tw) {
        var queues = this.queues, i = queues.indexOf(tw);
        i === -1 && queues.push(tw);
        return this;
    };
    playList.removeAll = function () {
        this.queues.length = 0;
    };
    //////////////////////////////////// Easing /////////////////////////
    var Easing = {
        Linear: {
            None: function (k) {
                return k;
            }
        },
        Quad: {
            In: function (k) {
                return k * k;
            },
            Out: function (k) {
                return k * (2 - k);
            },
            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k;
                }
                return -0.5 * (--k * (k - 2) - 1);
            }
        },
        Cubic: {
            In: function (k) {
                return k * k * k;
            },
            Out: function (k) {
                return --k * k * k + 1;
            },
            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k + 2);
            }
        },
        Quart: {
            In: function (k) {
                return k * k * k * k;
            },
            Out: function (k) {
                return 1 - (--k * k * k * k);
            },
            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k;
                }
                return -0.5 * ((k -= 2) * k * k * k - 2);
            }
        },
        Quint: {
            In: function (k) {
                return k * k * k * k * k;
            },
            Out: function (k) {
                return --k * k * k * k * k + 1;
            },
            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return 0.5 * k * k * k * k * k;
                }
                return 0.5 * ((k -= 2) * k * k * k * k + 2);
            }
        },
        Sine: {
            In: function (k) {
                return 1 - Math.cos(k * Math.PI / 2);
            },
            Out: function (k) {
                return Math.sin(k * Math.PI / 2);
            },
            InOut: function (k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }
        },
        Expo: {
            In: function (k) {
                return k === 0 ? 0 : Math.pow(1024, k - 1);
            },
            Out: function (k) {
                return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
            },
            InOut: function (k) {
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                if ((k *= 2) < 1) {
                    return 0.5 * Math.pow(1024, k - 1);
                }
                return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            }
        },
        Circ: {
            In: function (k) {
                return 1 - Math.sqrt(1 - k * k);
            },
            Out: function (k) {
                return Math.sqrt(1 - (--k * k));
            },
            InOut: function (k) {
                if ((k *= 2) < 1) {
                    return -0.5 * (Math.sqrt(1 - k * k) - 1);
                }
                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            }
        },
        Elastic: {
            In: function (k) {
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
            },
            Out: function (k) {
                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }
                return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
            },
            InOut: function (k) {
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
            In: function (k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            },
            Out: function (k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            },
            InOut: function (k) {
                var s = 1.70158 * 1.525;
                if ((k *= 2) < 1) {
                    return 0.5 * (k * k * ((s + 1) * k - s));
                }
                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            }
        },
        Bounce: {
            In: function (k) {
                return 1 - Easing.Bounce.Out(1 - k);
            },
            Out: function (k) {
                if (k < (1 / 2.75)) {
                    return 7.5625 * k * k;
                }
                else if (k < (2 / 2.75)) {
                    return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                }
                else if (k < (2.5 / 2.75)) {
                    return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                }
                else {
                    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                }
            },
            InOut: function (k) {
                if (k < 0.5) {
                    return Easing.Bounce.In(k * 2) * 0.5;
                }
                return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
            }
        }
    };
    ;
    //默认选项
    var defaultOption = {
        duration: 1000,
        delay: 0,
        easing: Easing.Quad.Out
    };
    if (typeof Object.assign !== 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target) {
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
    var Core = /** @class */ (function () {
        function Core(props, prevProps, options, target) {
            this.startTime = 0;
            this.props = copyProps(props, prevProps, target);
            this.options = options === undefined ? defaultOption : Object.assign({}, defaultOption, typeof options === "number" ?
                {
                    duration: options
                } : options);
        }
        return Core;
    }());
    function copyProps(props, prevProps, target) {
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
                    setPrveValue(prevProps, target, k);
                }
                else if (tye === "string") {
                    n = v.charCodeAt(0);
                    v = parseFloat(v);
                    if (n === 43) {
                        out[k] = getPrevValue(prevProps, target, k) + v;
                    }
                    else if (n === 45) {
                        out[k] = getPrevValue(prevProps, target, k) - v;
                    }
                    else {
                        out[k] = v;
                    }
                    setPrveValue(prevProps, target, k);
                }
            }
        }
        return out;
    }
    function setPrveValue(prevProps, target, k) {
        prevProps && !Object.prototype.hasOwnProperty.call(prevProps.props, k) && (prevProps.props[k] = getTargetValue(target, k));
    }
    function getPrevValue(prevProps, target, k) {
        if (prevProps && Object.prototype.hasOwnProperty.call(prevProps.props, k)) {
            return prevProps.props[k];
        }
        return getTargetValue(target, k);
    }
    function getTargetValue(target, k) {
        var ks = k.split("."), i = 0, ii = ks.length - 1;
        for (; i < ii; i++) {
            target = target[ks[i]];
        }
        return target[ks[ii]];
    }
    var pfm = performance, getNow = pfm.now ?
        function () {
            return pfm.now();
        } : function () {
        return Date.now() - pfm.timing.navigationStart;
    };
    var TweenHandy = /** @class */ (function () {
        function TweenHandy(target, from) {
            this.paused = true;
            this._listeners = Object.create(null);
            this._pausedTime = 0;
            this._repeat = 1;
            this.__repeat = 1;
            this._reverse = false;
            this._current = 0;
            this._pauseStartTime = 0;
            this._yoyo = false;
            this._target = target;
            this._chains = [new Core(from || target, null, undefined, target)];
        }
        TweenHandy.prototype.from = function (props, duration) {
            var chains = this._chains, len = chains.length, prev = len - 1, prevChain = chains[prev], chain = new Core(props, prevChain, duration, this._target);
            chains[prev] = chain;
            chains[len] = prevChain;
            return this;
        };
        TweenHandy.prototype.to = function (props, duration) {
            var chains = this._chains;
            chains.push(new Core(props, chains[chains.length - 1], duration, this._target));
            return this;
        };
        TweenHandy.prototype.start = function (timeStamp) {
            this.paused = this._reverse = false;
            this._current = this._pausedTime = 0;
            this._yoyo && (this._chains = this.__chains);
            this._chains[0].startTime = (timeStamp || getNow());
            playList.add(this);
            this.emit("start", this._target);
            return this;
        };
        TweenHandy.prototype.play = function (timeStamp) {
            if (this.paused) {
                this.paused = false;
                timeStamp || (timeStamp = getNow());
                if (this._pauseStartTime) {
                    this._chains[this._current].startTime += timeStamp - this._pauseStartTime;
                    this._pauseStartTime = 0;
                }
                else {
                    this._chains[this._current].startTime = timeStamp;
                }
                playList.add(this);
            }
            return this;
        };
        TweenHandy.prototype.yoyo = function (bl) {
            this.__chains = this._chains;
            this._chains2 = this._chains.slice().reverse();
            this._yoyo = bl;
            return this;
        };
        TweenHandy.prototype.pause = function (timeStamp) {
            if (!this.paused) {
                this.paused = true;
                this._pauseStartTime = timeStamp || getNow();
            }
            return this;
        };
        TweenHandy.prototype.stop = function () {
            this.paused = true;
            this._current = this._pausedTime = 0;
            this._repeat = this.__repeat;
            this.emit("stop", this._target);
            return this;
        };
        TweenHandy.prototype.update = function (timeStamp) {
            if (this.paused)
                return this;
            var chains = this._chains, chainsLen = chains.length, target = this._target, current = this._current, _put = this._put, startCore, endCore, startProps, endProps, baseValue, elapsed, options, progress, value;
            if (chainsLen === 1) {
                return this;
            }
            timeStamp || (timeStamp = getNow());
            startCore = chains[current];
            endCore = chains[current + 1];
            elapsed = timeStamp - startCore.startTime;
            options = this._reverse ? startCore.options : endCore.options;
            if (elapsed < options.delay) {
                return this;
            }
            progress = Math.min(1, (elapsed - options.delay) / options.duration);
            value = options.easing(progress);
            startProps = startCore.props;
            endProps = endCore.props;
            for (var k in endProps) {
                baseValue = startProps[k];
                //target[k]=baseValue+(endProps[k]-baseValue)*value;
                baseValue === undefined || _put(target, k, baseValue + (endProps[k] - baseValue) * value);
            }
            this.emit("update", target, progress);
            if (progress === 1) {
                ++this._current === chainsLen - 1 ?
                    this._complete(timeStamp) :
                    this._next(endCore, timeStamp);
            }
            return this;
        };
        TweenHandy.prototype._put = function (target, k, value) {
            var ks = k.split("."), i = 0, ii = ks.length - 1;
            for (; i < ii; i++) {
                target = target[ks[i]];
            }
            target[ks[ii]] = value;
            return this;
        };
        TweenHandy.prototype._next = function (endCore, timeStamp) {
            endCore.startTime = timeStamp;
            this._pausedTime = this._pauseStartTime = 0;
            return this.emit("next", this._target, this._current);
        };
        TweenHandy.prototype._repeat_f = function (timeStamp) {
            this._current = this._pausedTime = 0;
            this.emit("repeat", this._target, this.__repeat - this._repeat);
            if (this._yoyo) {
                this._reverse = !this._reverse;
                this._chains = this._reverse ? this._chains2 : this.__chains;
            }
            this._chains[0].startTime = (timeStamp || getNow());
            return this;
        };
        TweenHandy.prototype._complete = function (timeStamp) {
            if (--this._repeat) {
                this._repeat_f(timeStamp);
            }
            else {
                this.stop().emit("complete", this._target);
            }
            return this;
        };
        TweenHandy.prototype.distory = function () {
            this.paused = true;
            return this;
        };
        TweenHandy.prototype.repeat = function (times) {
            this._repeat = this.__repeat = isFinite(times) ? times : 0;
            return this;
        };
        TweenHandy.prototype.on = function (type, fn) {
            var listeners = this._listeners, queues = listeners[type];
            if (queues) {
                queues.push(fn);
            }
            else {
                listeners[type] = [fn];
            }
            return this;
        };
        TweenHandy.prototype.emit = function (type, a, b) {
            var queues = this._listeners[type], ii, i;
            if (!queues)
                return this;
            for (i = 0, ii = queues.length; i < ii; i++) {
                queues[i].call(this, a, b);
            }
            return this;
        };
        TweenHandy.VERSION = "1.0.0";
        TweenHandy.Easing = Easing;
        TweenHandy.pause = function (timeStamp) {
            var queues = playList.queues, i = queues.length, item;
            while (i--) {
                item = queues[i];
                if (!item.paused) {
                    item._paused_ = true;
                    item.pause(timeStamp);
                }
            }
            return this;
        };
        TweenHandy.play = function (timeStamp) {
            var queues = playList.queues, i = queues.length, item;
            while (i--) {
                item = queues[i];
                if (item._paused_) {
                    item._paused_ = false;
                    item.play(timeStamp);
                }
            }
            return this;
        };
        TweenHandy.update = function (timeStamp) {
            var queues = playList.queues, i = queues.length, item;
            while (i--) {
                item = queues[i];
                item.paused ?
                    queues.splice(i, 1) :
                    item.update(timeStamp);
            }
            return this;
        };
        TweenHandy._nullObject = Object.create(null);
        TweenHandy.delay = function (cb, delay) {
            this.to(this._nullObject, this._nullObject, delay)
                .on("complete", cb)
                .start();
            return this;
        };
        TweenHandy.from = function (target, from, duration) {
            return new this(target).from(from, duration);
        };
        TweenHandy.to = function (target, to, duration) {
            return new this(target).to(to, duration);
        };
        TweenHandy.now = getNow;
        return TweenHandy;
    }());
    ;
    exports.default = TweenHandy;
});
