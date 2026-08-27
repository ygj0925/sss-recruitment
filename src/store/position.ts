import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePositionStore = defineStore(
  'position',
  () => {
    const favoriteIds = ref<string[]>([])
    const appliedIds = ref<string[]>([])

    function isFavorite(positionId: string) {
      return favoriteIds.value.includes(positionId)
    }

    function toggleFavorite(positionId: string) {
      if (isFavorite(positionId)) {
        favoriteIds.value = favoriteIds.value.filter(id => id !== positionId)
        return false
      }
      favoriteIds.value = [...favoriteIds.value, positionId]
      return true
    }

    function isApplied(positionId: string) {
      return appliedIds.value.includes(positionId)
    }

    function markApplied(positionId: string) {
      if (!isApplied(positionId)) {
        appliedIds.value = [...appliedIds.value, positionId]
      }
    }

    return {
      favoriteIds,
      appliedIds,
      isFavorite,
      toggleFavorite,
      isApplied,
      markApplied,
    }
  },
  {
    persist: true,
  },
)
