// 增加一个全局变量 名字叫Skeleton
window.Skeleton = (function() {

  const CLASS_NAME_PREFIX = 'sk-';
  const $$ = document.querySelectorAll.bind(document);
  const REMOVE_TAGS = ['title', 'meta', 'style', 'script', 'noscript']; // 获取骨架屏DOM字符串和样式时 需删除的标签
  const SMALLEST_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // 宽1px 高1px的透明gif图 占位使用
  const styleCache = new Map();
  // loading样式
  const styleContent = `
    @keyframes flush {
      0% {
        left: 0;
      }
      50% {
        left: 50%;
      }
      100% {
        left: 100%;
      }
    }
    .sk-loading::after {
      content: '';
      animation: flush 1s linear infinite;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: linear-gradient(to left, 
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, .2) 50%,
        rgba(255, 255, 255, 0) 100%
      )
    }
  `

  /**
   * 处理按钮
   * @param element 按钮元素 
   * @param options 按钮配置 颜色...
   */
  function buttonHandler (element, options = {}) {
    const className = CLASS_NAME_PREFIX + 'button'; // sk-button
    const rule = `{
      position: relative;
      color: ${options.color} !important;
      background: ${options.color} !important;
      border: none !important;
      box-shadow: none !important;
    }`;
    addStyle(`.${className}`, rule);
    element.classList.add(className, 'sk-loading');
  }

  /**
   * 处理图片
   * @param  element 图片元素
   * @param  options 图片配置 颜色等...
   */
  function imageHandler (element, options = {}) {
    const { width, height } = element.getBoundingClientRect();
    const attrs = {
      width,
      height,
      src: SMALLEST_BASE64
    };
    const shape = new Map([
      ['rect', '5px'],
      ['circle', '50%']
    ]);
    setAttribute(element, attrs); // 为元素设置属性
    const className = CLASS_NAME_PREFIX + 'image';
    const rule = `{
      background: ${options.color} !important;
      border-radius: ${shape.get(options.shape)} !important;
    }`;
    addStyle(`.${className}`, rule)
    element.classList.add(className);
  }

  /**
   * 处理svg
   * @param element svg元素
   * @param attrs   svg配置 颜色等...
   */
  function svgHandler (element, options = {}) {
    // 清空svg的innerHTML
    emptyElement(element)
    const className = CLASS_NAME_PREFIX + 'svg';
    const rule = `{
      background: ${options.color} !important;
      border-radius: ${shape.get(options.shape)} !important;
    }`;
    addStyle(`.${className}`, rule)
    element.classList.add(className);
  }

  /**
   * 清空元素的html
   * @param element 需要清空的元素
   */
  function emptyElement (element){
    element.innerHTML = '';
  }


  /**
   * 移除元素
   * @param element 需要移除的元素
   */
  function romoveElement (element) {
    const parent = element.parentNode;
    if (parent) {
      parent.removeChild(element)
    }
  }

  /**
   * 目前只有处理图片在使用
   * @param element 元素
   * @param attrs   属性和属性值 
   */
  function setAttribute (element, attrs) {
    Object.keys(attrs).forEach(key => {
      element.setAttribute(key, attrs[key])
    })
  }

  /**
   * 向缓存存入样式 一个类型只会在缓存中出现一次
   * @param  selector class名字
   * @param  rule     class对应的值
   */
  function addStyle (selector, rule) {
    if (!styleCache.has(selector)) {
      styleCache.set(selector, rule);
    }
  }

  /**
   * 获取需要创建骨架屏的元素 设置骨架屏样式
   * @param options 配置项 
   */
  function genSkeleton (options) {
    let rootElement = document.documentElement;
    ;(function traverse(options) {
      let { 
        button: buttonOptions,
        image: imageOptions ,
        svg: svgOptions
      } = options;
      const buttons = []; // 所有的按钮
      const images = [];  // 所有的图片
      const svgs = [];    // 所有的svg

      // 遍历整个DOM元素 获取每一个元素 根据元素类型依次进行转换
      ;(function preTravers (element) {
        // 如果此元素有子元素 则先遍历子元素 深度优先
        if (element.children && element.children.length > 0) {
          Array.from(element.children).forEach(child => {
            preTravers(child);
          })
        }
        // 存入骨架屏元素集合
        switch (element.tagName) {
          case 'BUTTON':
            buttons.push(element);
            break;
          case 'IMG':
            images.push(element);
            break
          case 'SVG':
            svgs.push(element)
            break;
        }
      })(rootElement);

      // 循环遍历处理所有的button
      buttons.forEach(ele => {
        buttonHandler(ele, buttonOptions);
      })
      // 循环遍历处理所有的image
      images.forEach(ele => {
        imageHandler(ele, imageOptions);
      })
      // 循环遍历处理所有的svg
      svgs.forEach(ele => {
        svgHandler(ele, svgOptions);
      })
    })(options);

    // styleContent为loading动画 后面优化写法
    let rules = styleContent;
    // 循环去样式缓存中取出对应的样式
    for (const [selector, rule] of styleCache) {
      // .sk-button .sk-image
      rules+=`${selector} ${rule}\n`
    }
    const styleElement = document.createElement('style');
    styleElement.innerHTML = rules;
    document.head.appendChild(styleElement);
  }

  /**
   * 获取骨架屏的DOM元素字符串和样式style
   * @param options 插件传入的配置项
   */
  function getHtmlAndStyle (options) {
    const { elRoot } = options;
    const styles = Array.from($$('style')).map(style => {
      return style.innerHTML || style.innerText
    });
    // 移除标签
    Array.from($$(REMOVE_TAGS.join(','))).forEach(element => {
      romoveElement(element);
    })
    // elRoot为public下index.html文件的根元素 不知道这样做好不好 暂时先这样 [默认值#app]
    const html = document.querySelector(elRoot).innerHTML;
    return { styles, html }
  }

  return {
    genSkeleton,
    getHtmlAndStyle
  }
})();