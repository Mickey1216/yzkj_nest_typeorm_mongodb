/**
 * 这个是log4js文件配置，具体参数可参考log4js官网
 */
module.exports = exports = {
  appenders: {
    log: {
      type: 'file', // 如果需要区分日期的，这个值可以改为datefile
      filename: './logs/log.log',
      maxLogSize: 1024 * 1024 * 50, // 日志文件的大小。这里配置的是50M
      encoding: 'utf-8',
      backups: 100, // 最多备份个数
      compress: true, // 是否需要压缩。这个值为true时，会得到.gz格式的日志
      keepFileExt: true, // 是否保持文件扩展名。这个值为false时，会成.1,.2,.3这样的日志文件
      layout: {
        type: 'messagePassThrough' // 直接跳过头部生成，这里已经有自定义的头部生成，所以就不需要这个了
      }
    },
    err: {
      type: 'file',
      filename: './logs/err.log',
      maxLogSize: 1024 * 1024 * 50,
      encoding: 'utf-8',
      backups: 100,
      compress: true,
      keepFileExt: true,
      layout: {
        type: 'messagePassThrough'
      }
    },
    msg: {
      type: 'file',
      filename: './logs/msg.log',
      maxLogSize: 1024 * 1024 * 50,
      encoding: 'utf-8',
      backups: 100,
      compress: true,
      keepFileExt: true,
      layout: {
        type: 'messagePassThrough'
      }
    },
    console: {
      type: 'stdout', // 使用标准输出，会比console的性能高
      layout: { type: "messagePassThrough" }
    }
  },
  categories: {
    default: { appenders: ['log'], level: 'ALL' },
    error: { appenders: ['err'], level: 'ALL' },
    console: { appenders: ['console'], level: 'ALL' },
    msg: { appenders: ['msg'], level: 'ALL' }
  }
}
