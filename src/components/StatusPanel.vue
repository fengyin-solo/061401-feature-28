<script setup lang="ts">
import { computed } from 'vue'

type DangerLevel = 'safe' | 'warning' | 'danger' | 'critical'

interface DangerInfo {
  level: DangerLevel
  label: string
  icon: string
  borderColor: string
  bgGlow: string
  shakeClass: string
  textClass: string
  barPattern: string
}

interface StatItem {
  label: string
  value: number
  max: number
  icon: string
  color: string
  barColor: string
  isReverse?: boolean
}

interface Props {
  health: number
  hunger: number
  thirst: number
  wood: number
  stone: number
}

const props = defineProps<Props>()

function getDangerLevel(value: number, max: number, isReverse?: boolean): DangerLevel {
  const percent = (value / max) * 100
  if (isReverse) {
    if (percent >= 90) return 'critical'
    if (percent >= 80) return 'danger'
    if (percent >= 60) return 'warning'
    return 'safe'
  }
  if (percent <= 10) return 'critical'
  if (percent <= 20) return 'danger'
  if (percent <= 35) return 'warning'
  return 'safe'
}

function getDangerInfo(level: DangerLevel, isReverse?: boolean): DangerInfo {
  const reverseWarningText = '偏高'
  const reverseDangerText = '危险'
  const reverseCriticalText = '危急'
  const normalWarningText = '偏低'
  const normalDangerText = '危险'
  const normalCriticalText = '危急'

  const warningText = isReverse ? reverseWarningText : normalWarningText
  const dangerText = isReverse ? reverseDangerText : normalDangerText
  const criticalText = isReverse ? reverseCriticalText : normalCriticalText

  switch (level) {
    case 'critical':
      return {
        level,
        label: criticalText,
        icon: '🔴',
        borderColor: 'border-red-500/60',
        bgGlow: 'bg-red-500/5',
        shakeClass: 'animate-shake-urgent',
        textClass: 'text-red-400',
        barPattern: 'bg-[repeating-linear-gradient(110deg,transparent,transparent_6px,rgba(0,0,0,0.3)_6px,rgba(0,0,0,0.3)_8px)]',
      }
    case 'danger':
      return {
        level,
        label: dangerText,
        icon: '🟠',
        borderColor: 'border-orange-500/40',
        bgGlow: 'bg-orange-500/5',
        shakeClass: 'animate-shake',
        textClass: 'text-orange-400',
        barPattern: 'bg-[repeating-linear-gradient(110deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_12px)]',
      }
    case 'warning':
      return {
        level,
        label: warningText,
        icon: '🟡',
        borderColor: 'border-yellow-500/30',
        bgGlow: 'bg-yellow-500/5',
        shakeClass: '',
        textClass: 'text-yellow-400',
        barPattern: '',
      }
    default:
      return {
        level,
        label: '',
        icon: '',
        borderColor: 'border-transparent',
        bgGlow: '',
        shakeClass: '',
        textClass: '',
        barPattern: '',
      }
  }
}

const stats = computed<StatItem[]>(() => [
  {
    label: '生命值',
    value: props.health,
    max: 100,
    icon: '❤️',
    color: 'text-red-400',
    barColor: 'bg-red-500',
  },
  {
    label: '饥饿值',
    value: props.hunger,
    max: 100,
    icon: '🍖',
    color: 'text-orange-400',
    barColor: 'bg-orange-500',
    isReverse: true,
  },
  {
    label: '口渴值',
    value: props.thirst,
    max: 100,
    icon: '💧',
    color: 'text-blue-400',
    barColor: 'bg-blue-500',
    isReverse: true,
  },
  {
    label: '木材',
    value: props.wood,
    max: 100,
    icon: '🪵',
    color: 'text-amber-600',
    barColor: 'bg-amber-600',
  },
  {
    label: '石头',
    value: props.stone,
    max: 100,
    icon: '🪨',
    color: 'text-gray-400',
    barColor: 'bg-gray-400',
  },
])

function getBarWidth(value: number, max: number): string {
  const percent = Math.max(0, Math.min(100, (value / max) * 100))
  return `${percent}%`
}

function getDangerForStat(stat: StatItem): DangerInfo {
  const level = getDangerLevel(stat.value, stat.max, stat.isReverse)
  return getDangerInfo(level, stat.isReverse)
}

function isCritical(stat: StatItem): boolean {
  return getDangerLevel(stat.value, stat.max, stat.isReverse) === 'critical'
}
</script>

<template>
  <div class="bg-game-card rounded-2xl p-6 border border-game-border shadow-xl">
    <h2 class="text-xl font-bold text-white mb-5 flex items-center gap-2">
      <span>📊</span>
      <span>生存状态</span>
    </h2>
    <div class="space-y-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        :class="[
          'rounded-xl px-3 py-2.5 transition-all duration-300 border',
          getDangerForStat(stat).borderColor,
          getDangerForStat(stat).bgGlow,
          isCritical(stat) ? 'animate-danger-glow' : '',
        ]"
      >
        <div class="flex items-center justify-between mb-1.5">
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ stat.icon }}</span>
            <span :class="[stat.color, 'font-medium text-sm']">{{ stat.label }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span
              v-if="getDangerForStat(stat).level !== 'safe'"
              :class="[
                'text-xs font-bold px-2 py-0.5 rounded-full',
                getDangerForStat(stat).textClass,
                getDangerForStat(stat).level === 'critical'
                  ? 'bg-red-500/20 border border-red-500/40'
                  : getDangerForStat(stat).level === 'danger'
                    ? 'bg-orange-500/20 border border-orange-500/40'
                    : 'bg-yellow-500/15 border border-yellow-500/30',
                getDangerForStat(stat).shakeClass,
              ]"
            >
              {{ getDangerForStat(stat).icon }} {{ getDangerForStat(stat).label }}
            </span>
            <span
              :class="[
                stat.color,
                'font-bold text-sm tabular-nums',
                getDangerForStat(stat).level !== 'safe' ? getDangerForStat(stat).textClass : '',
                getDangerForStat(stat).level === 'critical' ? 'animate-pulse-soft' : '',
              ]"
            >
              {{ Math.round(stat.value) }}
            </span>
          </div>
        </div>
        <div class="h-2.5 bg-gray-800 rounded-full overflow-hidden relative">
          <div
            :class="[stat.barColor, 'h-full rounded-full transition-all duration-300 ease-out']"
            :style="{ width: getBarWidth(stat.value, stat.max) }"
          ></div>
          <div
            v-if="getDangerForStat(stat).barPattern"
            :class="['absolute inset-0 rounded-full', getDangerForStat(stat).barPattern]"
            :style="{ width: getBarWidth(stat.value, stat.max) }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
