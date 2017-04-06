define(function(require) {

    // 利用Promise封装一个加载函数，这里也是可以单独放在一个功能模块中进一步优化
    var imageLoad = function(img) {
        return new Promise(function(resolve, reject) {
            //图片已经缓存时
            if (img.complete) {
                resolve();
            } else {
                img.onload = function(event) {
                    resolve(event);
                }

                img.onerror = function(err) {
                    reject(err);
                }
            }
        })
    }

    var imageCenter = function(domList, mode) {

        domList.forEach(function(item) {
            var img = item.children[0];
            //对象的可见宽度
            var itemW = item.offsetWidth;
            var itemH = item.offsetHeight;
            var itemR = itemW / itemH;

            imageLoad(img).then(function() {
                //html5中新加的图片真实高度、宽度
                var imgW = img.naturalWidth;  
                var imgH = img.naturalHeight;
                var imgR = imgW / imgH;

                var resultMode = null;

                switch (mode) {
                    case 'aspectFill':
                        resultMode = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y';
                        break;
                    case 'wspectFill':
                        resultMode = itemR > imgR ? 'aspectFill-x' : 'aspectFill-y'
                        break;
                    default:
                }

                $(img).addClass(resultMode);
            })
        })
    }

    return imageCenter;
})
