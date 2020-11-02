/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

// 存放回调函数
const callbacks = [] 
// 是否有异步队列正在等待执行
let pending = false

// 执行cb列表中的函数
function flushCallbacks () {
  // 表示没有异步队列在等待
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// 处理异步队列的函数
//（Promise， MutationObserver, setTimeout）
let timerFunc

// nextTick 利用微任务队列
// 微任务队列可以用原生的Promise | MutationObserver实现
// MutationObserver被广泛支持，但在ios》=9.3.3上会有严重bug
// 因此优先使用Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  // 用Promise把回调函数推入微任务队列
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    /**
     * 在有问题的UIWebViews中，promise.then没有完全break，但它会陷入一种奇怪的状态
     * 即回调被推入微任务队列，但队列没有被刷新，直到浏览器需要做一些其他的工作，比如处理一个计时器。
     * 因此，我们可以通过添加一个空计时器来“强制”清空微任务队列。
    */
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // Promise并不能用则用MutationObserver，MutationObserver也属于微任务
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  // 创建一个看不见的文本节点，让MutationObserver来监听它
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 退回到setimmediation。
  // 从技术上讲，它利用了(宏)任务队列
  // 但它仍然是比setTimeout更好的选择。
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 001 包裹传入的函数，绑定其上下文，并push到callbacks中
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    // 002 如果没有异步队列在等待执行，那么处理当前的异步队列
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
