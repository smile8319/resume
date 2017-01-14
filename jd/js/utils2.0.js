/**
 * Created by Administrator on 2016-10-23.
 */
var utils = (function(){
    var isStanderBrowser = !!window.getComputedStyle;
    function listToArray(likeAry) {
        try {
            return [].slice.call(likeAry);
        } catch (e) {
            var arr = null;
            for (var i = 0; i < likeAry.length; i++) {
                arr.push(likeAry[i]);
            }
            return arr;
        }
    }
    function jsonParse(jsonstr) {
        return 'JSON' in window ? JSON.parse(jsonstr) : eval("(" + jsonstr + ")");
    }
    function getRandom(n, m) {
        var n = Number(n);
        var m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = null;
            temp = n;
            n = m;
            m = temp;
        }
        return Math.round(Math.random() * (m - n) + n);
    }
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            if (!/MSIE 8/.test(window.navigator.userAgent)) {//>>只有ie8
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    }
    function win(attr, val) {
        if (val == undefined) {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }
    function getCss(ele, attr) {
        var val = null;
        if (isStanderBrowser) {
            val = window.getComputedStyle(ele, null)[attr];
        } else {
            if (attr == 'opacity') {
                var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;//filter :alpha(opacity=100)
                var filter = ele.currentStyle.filter;
                val = reg.test(filter) ? reg.exec(val)[1] / 100 : 1;
            }
            val = ele.currentStyle[attr];
        }
        var reg = /-?\d+(\.\d+)?(reg|rem|em|px|pt)?/;
        if (reg.test(val)) {
            val=parseFloat(val);
        }
        return val;
    }
    function setCss(ele, attr, val) {
        if (attr == 'opacity') {
            ele.style.opacity = val;
            ele.style.fiter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr == 'float') {
            ele.style.cssFloat = val;
            ele.style.styleFloat = val;
            return;
        }
        var reg = /width|height|left|right|top|bottom|(margin|padding)(Left|Top|Right|Bottom)?/;
        if (reg.test(attr)) {
            val += 'px';
        }
        ele.style[attr] = val;
    }
    function children(ele, tagName) {//获取所有元素子节点
        var childEle = [];
        if (isStanderBrowser) {
            childEle = this.listToArray(ele.children);
        } else {
            var child = ele.childNodes;
            for (var i = 0; i < child.length; i++) {
                if (child[i].nodeType == 1) {
                    childEle.push(child[i]);
                }
            }
        }

        if (typeof tagName == 'string') {
            for (var i = 0; i < childEle.length; i++) {
                if (childEle[i].nodeName !== tagName.toUpperCase()) {
                    childEle.splice(i, 1);
                    i--;
                }
            }
        }
        return childEle;
    }
    function prev(ele) {//获取上一个元素哥哥节点
        if (isStanderBrowser) {
            return ele.previousElementSibling;
        }
        var preEle = ele.previousSibling;
        while (preEle && preEle.nodeType !== 1) {
            preEle = preEle.previousSibling;
        }
        return preEle;
    }
    function next(ele) {//后一个弟弟
        if (isStanderBrowser) {
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType != 1) {
            next = next.nextSibling;
        }
        return next;
    }
    function prevAll(ele) {//所有的哥哥
        var ary = [];
        var pre = ele.previousSibling;
        while (pre) {
            if (pre.nodeType == 1) {
                ary.unshift(pre);
            }
            pre = pre.previousSibling;
        }
        return ary;
    }
    function nextAll(ele) {//所有的弟弟
        var ary = [];
        var next = this.next(ele);
        while (next) {
            ary.push(next);
            next = this.next(next);
        }
        return ary;
        /*   var ary = [];
         var next = ele.nextSibling;
         while(next){
         if(next.nodeType==1){
         ary.push(next);
         }
         next=ele.nextSibling;
         }
         return ary*/
    }
    function firstEleChild(ele) {//第一个孩子
        if (isStanderBrowser) {
            return ele.firstElementChild;
        }
        var first = this.children(ele);
        return first.length ? null : first[0];
        /*if(first.length>0){
         return first[0];
         }
         return null;*/
    }
    function lastEleChild(ele) {//最后一个孩子
        if (isStanderBrowser) {
            return ele.lastElementChild;
        }
        var last = this.children(ele);
        return last.length ? null : last[last.length - 1];
    }
    function siblings(ele){//所有兄弟
        return this.prevAll(ele).concat(this.nextAll(ele));
    }
    function sibling(ele){//相邻的两个
        var ary = [];
        var prev = this.prev(ele);
        var next = this.next(ele);
        if(prev !=null){
            ary.push(prev);
        }
        if(next!=null){
            ary.push(next);
        }
        return ary;
    }
    function index(ele){//获取元素索引
        return this.prevAll(ele).length;
    }
    function append(ele,container){//把一个元素添加到指定容器中的末尾
        container.appendChild(ele);
    }
    function prepend(ele,container){//把一个元素添加到指定容器的开头
        var first = this.firstEleChild(container);
        if(first){
            container.insertBefore(ele,first);
        }else{
            this.append(ele,container);
        }
    }
    function insertBefore(oldEle,newEle){
        oldEle.parentNode.insertBefore(newEle,oldEle);
    }
    function insertAfter(oldEle,newEle){//把新元素newEle插入到oldEle的后面
        var next = this.next(oldEle);
        if(next){
            oldEle.parentNode.insertBefore(newEle,next);
        }else{
            oldEle.parentNode.appendChild(newEle);
        }
    }
    function hasClass(ele,strClass){//判断ele是否有strClass这个类
        var reg = new RegExp('(^| +)'+strClass+'( +|$)');///(?:^| +)?c6(?: +|$)/
        return reg.test(ele.className);
    }
    function addClass(ele,strClass){
        //以一个或者多个空格开始，或者以一个或者多个空格结束->去首尾空格，并且还要按照一个或者多个空格拆分成数组
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        for(var i=0;i<strClassAry.length;i++){
            //循环判断当前class中是否含c5或者c6,vkjse yi i et iglkb
            var curClass=strClassAry[i];//c5,c6
            if(!this.hasClass(ele,curClass)){
                ele.className+=' '+curClass;
            }
        }
    }
    function remvoeClass(ele,strClass){//移除ele上的strClass这个类
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        for(var i=0;i<strClassAry.length;i++){
            var curClass = strClassAry[i];
            while(this.hasClass(ele,curClass)){
                //移除类就是把className上符合规则的那一段字符串
                var reg = new RegExp('(^| +)'+curClass+'( +|$)','g');//g是全文，保证把所有的符合规则的类都移除
                ele.className = ele.className.replace(reg,' ');
            }
        }
    }
    function getElesByClass(strClass,context){//通过类名获取元素
        context=context||document;
        if(isStanderBrowser){
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        //ie6-8中处理
        var tags = context.getElementsByTagName('*');
        var strClassAry = strClass.replace(/^ +| +$/g,'').split(/ +/);
        var arr = [];
        for(var i=0;i<tags.length;i++){
            var curTag = tags[i];
            var curTagOk = true;
            for(var j=0;j<strClassAry.length;i++){
                var curClass = strClassAry[i];
                var reg = new RegExp('(^| +)'+curClass+'( +|$)');
                if(!reg.test(curTag.className)){
                    curTagOk=false;
                    break;
                }
            }
            if(curTagOk){
                arr.push(curTag);
            }
        }
        return arr;
    }
    function css(ele){
        if(typeof arguments[1]=='string'){
            if(arguments[2]){
                setCss(ele,arguments[1],arguments[2]);
                return;
            }
            return getCss(ele,arguments[1]);
        }
        arguments[1]=arguments[1]||[];
        if(arguments[1].toString()=='[object Object]'){
            setGroupCss(ele,arguments[1]);
        }
    }
    function setGroupCss(ele,obj){
        //Object.prototype.toString.call
        if(obj.toString()=='[object Object]'){//
            for(var key in obj){
                setCss(ele,key,obj[key]);
            }
        }
    }
    function animate(ele,target,duration,fn){
        ele.timer&&window.clearInterval(ele.timer);
        duration = duration||2000;
        var effect={
            linear:function(t,b,c,d){
                return b+t/d*c;
            }
        };
        var begin={},change={};
        for(var key in target){
            begin[key]=css(ele,key);
            change[key]=target[key]-begin[key];
        }
        var time = 0;
        ele.timer=window.setInterval(function(){
            time+=10;
            if(time>=duration){
                window.clearInterval(ele.timer);
                css(ele,target);
                fn.call(ele);
                return;
            }
            for(var key in change){
                if(change[key]){
                    var pos = effect.linear(time,begin[key],change[key],duration)/*begin[key]+change[key]/duration*time*/;
                    css(ele,key,pos);
                }
            }
        },10);
    }
    function fetchData(method,url,opatical){
        var xhr = new XMLHttpRequest();
        var data = null;
        xhr.open(method,url,opatical);
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4 && xhr.status == 200){
                data = jsonParse(xhr.responseText);
            }
        }
        xhr.send(null);
        return data;
    }

    return {
        fetchData:fetchData,
        animate:animate,
        listToArray: listToArray,
        jsonParse: jsonParse,
        getRandom: getRandom,
        offset: offset,
        win: win,
       /* getCss: getCss,
        setCss: setCss,*/
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        firstEleChild: firstEleChild,
        lastEleChild: lastEleChild,
        siblings:siblings,
        sibling:sibling,
        index:index,
        append:append,
        prepend:prepend,
        insertBefore:insertBefore,
        insertAfter:insertAfter,
        hasClass:hasClass,
        addClass:addClass,
        remvoeClass:remvoeClass,
        getElesByClass:getElesByClass,
        /*setGroupCss:setGroupCss*/
        css:css
    };
})();
