import { LibsqlError } from '@libsql/client'
import postgres from 'postgres'

export default class SqlXError extends Error {
  name = 'SqlXError'

  originalError: Error

  constructor(err: Error) {
    super()
    this.originalError = err
  }

  get message() {
    const { message: msg } = this.originalError
    if (SqlXError.isPgError(this.originalError)) {
      const err = this.originalError as postgres.PostgresError
      // 这种报错无法提取表名、字段名
      if (err.code === '22001') {
        return '字段长度超出限制'
      }
      // 违反唯一值限制
      if (err.code === '23505') {
        if (msg.includes('publicBookmarks') || msg.includes('userBookmarks')) {
          if (msg.includes('_name_')) return '已存在相同名称的书签'
          if (msg.includes('_url_')) return '已存在相同网址的书签'
        }
        if (msg.includes('publicTags') || msg.includes('userTags')) {
          if (msg.includes('_name_')) return '已存在相同名称的标签'
        }
        return '违反唯一值限制'
      }
    }
    if (SqlXError.isLibsqlError(this.originalError)) {
      // drizzle-orm/sqlite 目前无法对 TEXT 长度进行约束
      const err = this.originalError as LibsqlError
      if (err.rawCode === 2067 || err.code === 'SQLITE_CONSTRAINT') {
        if (msg.includes('publicBookmarks') || msg.includes('userBookmarks')) {
          if (msg.includes('.name')) return '已存在相同名称的书签'
          if (msg.includes('.url')) return '已存在相同网址的书签'
        }
        if (msg.includes('publicTags') || msg.includes('userTags')) {
          if (msg.includes('.name')) return '已存在相同名称的标签'
        }
        return '违反唯一值限制'
      }
    }
    // ! 返回未知错误说明有些异常没有考虑到，务必及时补充！
    return '未知的数据库错误'
  }

  static getMessage(err: any) {
    return new SqlXError(err).message
  }

  static isPgError(err: any) {
    return err?.name === postgres.PostgresError.name
  }

  static isLibsqlError(err: any) {
    return !!err?.libsqlError || err instanceof LibsqlError
  }

  static canParse(err: any) {
    return SqlXError.isPgError(err) || SqlXError.isLibsqlError(err)
  }
}
