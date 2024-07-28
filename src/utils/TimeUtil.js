const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

/**
 * 计算和当前时间的时间差
 * @param {number} timestamp 历史时间戳（毫秒）
 * @returns {string} 格式化的时间差
 */
export function getTimeDifference(timestamp) {
  const now = dayjs();
  const past = dayjs(timestamp);

  // 计算时间差
  const diffMinutes = now.diff(past, 'minute');
  const diffHours = now.diff(past, 'hour');
  const diffDays = now.diff(past, 'day');

  if (diffMinutes < 3) {
    return '刚刚';
  } if (diffMinutes < 60) {
    return `${diffMinutes} 分钟前`;
  } if (diffHours < 24) {
    return `${diffHours} 小时前`;
  } if (diffDays <= 3) {
    return `${diffDays} 天前`;
  }
  return past.format('YYYY 年 M 月 D 日');
}
