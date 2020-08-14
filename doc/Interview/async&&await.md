# Question

* 实现异步编程的方法有哪些？
  * async && await
  * promise
  * 回调

* 怎么理解async && await, async && await 怎么来的？
  * async && await 都是函数定义的关键字。await用于等待Promise对象的返回结果，且不能单独使用而必须放在async函数中；利用async定义的函数会返回一个Promise对象，async函数的返回值就是Promise状态为resolved的返回值。
  * async && await 使得异步代码看起来像同步代码。
  * async await 是基于Promise实现的，他不能用于普通的回调函数。

* async && await 和 promise的用法的区别，举例
  * await 关键字只能用在async定义的函数内，async函数会隐式地返回一个promise，该promise的resolve值就是函数return的值。

* async && await 和 promise的性能区别在哪里
  * 使用async函数会让代码简洁很多，不需要像Promise一样需要写then，不需要写匿名函数处理Promise的resolve值，也不需要定义多余的data变量，还避免了嵌套代码。
  * 错误处理
    * async await 让try/catch 可以同时处理同步和异步错误。在Promise中try/catch不能处理JSON.parse,需要使用.catch。
    * 使用async await catch能处理JSON.parse错误。
  * 中间值

    ```js
    // 调用promise1，使用promise1返回的结果去调用promise2，然后使用两者的结果去调用promise3
    const makeRequest = () => {
      return promise1().then(value1 => {
        return promise2(value1).then(value2 => {
          return promise3(value1, value2)
        })
      })
    }
    // 使用promise.all避免深层嵌套
    const makeRequest = () => {
      return promise1().then(value1 => {
        return Promise.all([value1, promise2(value1)])
      }).then(([value1, value2]) => {
        return promise3(value1, value2)
      })
    }
    // 使用async await
    const makeRequest = async () => {
      const value1 = await promise1()
      const value2 = await promise2(value1)
      return promise3(value1, value2)
    }
    ```
