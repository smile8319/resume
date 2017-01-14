var address = document.getElementsByClassName('address')[0];
var addressBox = address.getElementsByClassName('addressBox')[0];
var J_event = document.getElementsByClassName('J_event')[0];
var i = J_event.getElementsByTagName('i')[0];
//点击关闭 (实现的不怎么好)
i.onclick = function (){
    var opacity = utils.css(J_event,'opacity');
    console.log(opacity)
    utils.animate(J_event,{opacity:0},300, function () {
        J_event.style.display = 'none';
    });
}
//点击导航的城市切换
;(function (){
    var citys = utils.fetchData('get','json/navigatorCity.txt',false);
    var cityLi = '';
    if(citys){
        for(var i=0;i<citys.length;i++){
            cityLi += '<li class="addressItem">';
            cityLi += i==0?'<a href="##" class="red">'+citys[i].city+'</a>':'<a href="##">'+citys[i].city+'</a>';
            cityLi += '</li>';
        }
    }
    addressBox.innerHTML = cityLi;
})();
;(function(){
    var span = address.getElementsByTagName('span')[0];
    addressBox.onclick = function(e){
        e = e || window.event;
        e.target = e.target || e.srcElement;
        if(e.target.nodeName == 'A'){
            span.innerHTML = e.target.innerText;
            var siblings = addressBox.getElementsByTagName('a');
            for(var i=0;i<siblings.length;i++){
                siblings[i].className = null;
            }
            utils.addClass(e.target,'red');
        }
    }
})();
//header>.search>div>fastSearch 输入框下的快速查找
var header = document.getElementsByClassName('header')[0];
var fastSearch = header.getElementsByClassName('fastSearch')[0];
;(function(){
    var fastSearchData = utils.fetchData('get','json/fastSearch.txt',false);
    var str = '';
    for(var i=0;i<fastSearchData.length;i++){
        str += i==0 ? '<a href="##" class="fastSearchRed">'+fastSearchData[i].text+'</a>':'<a href="##">'+fastSearchData[i].text+'</a>'
    }
    fastSearch.innerHTML = str;
})();
//header>search>navigateSearch
var navigateSearch = header.getElementsByClassName('navigateSearch')[0];
;(function(){
    var navigateSearchData = utils.fetchData('get','json/navigateSearch.txt',false);
    var str = '';
    for(var i=0;i<navigateSearchData.length;i++){
        var spe = i;
        if((spe+1)%5==0){
            str += '<li class="separate"></li>';
            continue;
        }
        if(navigateSearchData[i].src){
            str += '<li><a href="##">'+navigateSearchData[i].text+'</a><img src="'+navigateSearchData[i].src+'"/></li>';
            continue;
        }
        str += '<li><a href="##">'+navigateSearchData[i].text+'</a></li>';
    }
    navigateSearch.innerHTML = str;
})();
//获取购物车数量
var num = header.getElementsByClassName('carNum')[0].getElementsByClassName('num')[0];
//....
//fs.给左边最大的li增加内容
var fs = document.getElementsByClassName('fs')[0];
var fs_col1 = fs.getElementsByClassName('fs_col1')[0];
;(function(){
var lis = fs_col1.getElementsByClassName('fs1_item');
var fs_col1Date = utils.fetchData('get','json/fsData.txt',false);
    if(fs_col1Date){
        for(var i=0;i<fs_col1Date.length;i++){
            var str = '';
            for(var key in fs_col1Date[i]){
                str += '<a href="##">'+fs_col1Date[i][key]+'</a>'
                str += '<span>/</span>';
            }
            str = str.slice(0,str.length-14);
            lis[i].innerHTML += str;
        }
    }
})();
//fs hover:display框增加内容
;(function (){
    var fs1_left_top = fs_col1.getElementsByClassName('fs1_left_top');
    var fs1_left_bot = fs_col1.getElementsByClassName('fs1_left_bot');
    var data = utils.fetchData('get','json/fsLeftTop.txt',false);
    if(data){
        for(var i = 0;i<data.length;i++){
            var ulStr = '';
            var dlStr = '';
            var flag = false;
            for(var key in data[i]){
                if(key.indexOf('ul')!=-1){
                    ulStr += '<li><span>'+data[i][key]+'</span><i class="i1"></i><i class="i2"></i></li>'
                }
                if(key.indexOf('dt')!=-1){
                    if(flag)dlStr += '</dd></dl>';
                    dlStr += '<dl>';
                    dlStr += '<dt><a href="##">'+data[i][key]+'<i class="i1"></i><i class="i2"></i></a></dt>';
                    flag?dlStr += '<dd class="clear">':dlStr += '<dd class="first clear">';
                    flag = true;
                }
                if(key.indexOf('dd')!=-1){
                    dlStr += '<a href="##">'+data[i][key]+'</a>';
                }
            }
            fs1_left_top[i].innerHTML = ulStr;
            fs1_left_bot[i].innerHTML = dlStr;
        }
    }
})();
var fs_col2 = fs.getElementsByClassName('fs_col2')[0];
var lis = fs_col1.getElementsByClassName('li1');
var imgs = fs_col1.getElementsByTagName('img');
;(function(){
    var data = utils.fetchData('get','json/banner.txt',false);

})();
