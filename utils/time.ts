import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export const formatDate = (date: string) => {
  return dayjs(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY 年 MMMM D 日')
}

export const formatRelativeTime = (date: string) => {
  return dayjs(date, 'YYYY-MM-DD HH:mm:ss').fromNow()
}
