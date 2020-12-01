// 增加一个全局变量 名字叫Skeleton
window.Skeleton = (function() {

  const CLASS_NAME_PREFIX = 'sk-';
  const $$ = document.querySelectorAll.bind(document);
  const REMOVE_TAGS = ['title', 'meta', 'style', 'script'];
  const styleCache = new Map();

  // 处理按钮
  function buttonHandler (element, options = {}) {
    const className = CLASS_NAME_PREFIX + 'button'; // sk-button
    const rule = `{
      color: ${options.color} !important;
      background: ${options.color} !important;
      border: none !important;
      box-shadow: none !important;
    }`;
    addStyle(`.${className}`, rule);
    element.classList.add(className);
  }

  // 处理图片
  function imageHandler (element, options = {}) {
    // 宽1px 高1px的透明gif图
    const SMALLEST_BASE64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    const { width, height } = element.getBoundingClientRect();
    const attrs = {
      width,
      height,
      src: SMALLEST_BASE64
    }
    setAttribute(element, attrs);
    const className = CLASS_NAME_PREFIX + 'image'; // sk-image
    const rule = `{
      background: ${options.color} !important;
    }`;
    addStyle(`.${className}`, rule)
    element.classList.add(className);
  }

  function setAttribute (element, attrs) {
    Object.keys(attrs).forEach(key => {
      element.setAttribute(key, attrs[key])
    })
  }

  function addStyle (selector, rule) {
    if (!styleCache.has(selector)) { // 一个类名sk-button只会在缓存中出现一次
      styleCache.set(selector, rule);
    }
  }

  // 转换原始原始为骨架屏DOM元素
  // 我们在此要遍历整个DOM元素树 获取每一个节点或者说元素 根据元素类型进行依次转换
  function genSkeleton (options) {
    let rootElement = document.documentElement;
    ;(function traverse(options) {
      let { button, image } = options;
      const buttons = []; // 所有的按钮
      const images = [];  // 所有的图片
      ;(function preTravers (element) {
        if (element.children && element.children.length > 0) {
          // 如果此元素有儿子 则先遍历儿子 深度优先
          Array.from(element.children).forEach(child => {
            preTravers(child);
          })
        }
        if (element.tagName === 'BUTTON') {
          buttons.push(element);
        } else if (element.tagName === 'IMG') {
          images.push(element);
        }
      })(rootElement);
      buttons.forEach(item => {
        buttonHandler(item, button);
      })
      images.forEach(item => {
        imageHandler(item, image);
      })
    })(options);
    let rules = '';
    for (const [selector, rule] of styleCache) {
      // .sk-button .sk-image
      rules+=`${selector} ${rule}\n`
    }
    const styleElement = document.createElement('style');
    styleElement.innerHTML = rules;
    document.head.appendChild(styleElement);
  }

  // 获取骨架屏的DOM元素字符串和样式style
  function getHtmlAndStyle () {
    console.log(document, '我是document')
    const styles = Array.from($$('style')).map(style => {
      return style.innerHTML || style.innerText
    });
    // 移除['title', 'meta', 'style', 'script']标签
    Array.from($$(REMOVE_TAGS.join(','))).forEach(element => {
      console.log(element, '====>')
      element.parentNode.removeChild(element);
    })
    console.log(document, '我是document22222')
    const html = document.body.innerHTML;
    return { styles, html }
  }

  return {
    genSkeleton,
    getHtmlAndStyle
  }
})();