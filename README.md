# TweenHandy
Simple tweening library.

## Install

You can install it via npm:

```html
npm install tween-handy
```
## Use
typescript:
```ts
import TweenHandy from "tween-handy";
```
javascript:
```html
<script src="dist/TweenHandy.js"></script>
```

## Example
### Needed
```js
   function render(){
       requestAnimationFrame(render);
       TweenHandy.update();
   }
````
```js
   var tween=new TweenHandy(sprite);
       tween.to({x:100},500);
       tween.start();

   var tween=new TweenHandy(sprite,from)
             .to({x:100})
             .start();
   
   var tween=new TweenHandy(sprite)
             .from({x:750})
             .start();

   
```

```javascript
var sprite={
    x:100,
    y:100,
    scale:{
        x:1,
        y:1
    }
};
var tween = TweenHandy.from(sprite,{x:300},500)
    .to({y:500})
    .to({"scale.x":1.5},{
        duration:500,
        delay:500,
        easing:TweenHandy.Easing.Linear.None //function(percent:number):progress{}
    })
    .yoyo(true)
    .repeat(-1)
    .on("start",function(obj,progress){

    })
    .on("update",function(obj,progress){

    })
    .on("complete",function(obj){

    })
    .on("repeat",function(obj,repeat){

    })
    .on("next",function(obj,time){

    })
    .start();

```

```js
   var tween=new TweenHandy(sprite)
                 .form({
                     x:750,
                     y:80
                 });
       tween.start();
```

```js
   var tween=new TweenHandy(sprite)
                 .to({
                     x:750,
                     y:80
                 });
       tween.start();
```

## Static properties or methods
```js
   TweenHandy.to(sprite,obj,duration);
   TweenHandy.from(Sprite,obj,duration);

   TweenHandy.Easing;                  //Easing object

   TweenHandy.update();          
   TweenHandy.pause();                 //all tweens pause
   TweenHandy.play();                  //all tweens play
   TweenHandy.delay(callback,delay);

   TweenHandy.now();                   //current time
```

### Example
```js
   function render(){
       requestAnimationFrame(render);
       TweenHandy.update();
   }

   document.addEventListener("visibilitychange",function(){
       if(document.hidden){
           Transition.pause();
       }
       else{
           Transition.play();
       }
   },false);
```

## Events
start | update | complete | next | stop | repeat

## Methods
```js
  tween.to(obj);
  tween.from(obj);
  tween.yoyo(boolean);
  tween.repeat(int);     //-1 loop

  tween.start();
  tween.play();
  tween.pause();
  tween.stop();

  tween.update(timeStamp);
  
```

timeline: |--------------------|--------------------|

 .......  start() .........  pause()/play() .......   stop()


## Properties
```js
   tween.paused;       //read,true || false
```

## Easing
TweenHandy.Easing from tween.js
```js
Linear:{None: ƒ}

Quad:{In: ƒ, Out: ƒ, InOut: ƒ}

Cubic:{In: ƒ, Out: ƒ, InOut: ƒ}

Back:{In: ƒ, Out: ƒ, InOut: ƒ}

Bounce:{In: ƒ, Out: ƒ, InOut: ƒ}

Circ:{In: ƒ, Out: ƒ, InOut: ƒ}

Elastic:{In: ƒ, Out: ƒ, InOut: ƒ}

Expo:{In: ƒ, Out: ƒ, InOut: ƒ}

Quart:{In: ƒ, Out: ƒ, InOut: ƒ}

Quint:{In: ƒ, Out: ƒ, InOut: ƒ}

Sine:{In: ƒ, Out: ƒ, InOut: ƒ}
```


Thanks

