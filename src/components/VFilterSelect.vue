<template>
  <div ref="root" class="relative">
    <div class="relative flex bg-gray-100 rounded-full h-9">
      <input 
        :value="searchQuery"
        @focus="dropdown = true"
        @input="onInput($event.target.value)"
        :placeholder="label"
        class="flex-grow w-full h-full pl-4 pr-8 text-sm outline-none text-zinc-400" 
      />
      <div class="!absolute top-0 right-2 !h-full">
        <v-icon 
          icon="mdi-close-circle"
          class="mx-1 !h-full !text-gray-400 cursor-pointer"
          v-if="searchQuery"
          @click="reset"
        ></v-icon>
        <v-icon 
          icon="mdi-menu-down" 
          class="!h-full !text-gray-400 cursor-auto"
          @click="dropdown = !dropdown"
        ></v-icon>
      </div>
    </div>

    <ul
      v-if="dropdown"
      class="absolute left-0 right-0 py-2 overflow-auto text-lg text-left bg-white rounded-md shadow-xl max-h-56"
      ref="dropdownList"
    >
      <li 
        v-for="item in filteredItems" :key="item.id" :data-id="item.id"
        :ref="el => setItemRef(el, item.id)"
        @click="selectItem(item)"
        class="px-6 py-2 cursor-pointer hover:bg-gray-200 text-nowrap"
        :class="highlightItem === item.id ? 'bg-gray-200' : 'bg-none'"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
    import { onClickOutside } from '@vueuse/core'
    import { computed, nextTick, ref, watch } from 'vue'

    // v-model pour l'id (valeur émise au parent)
    const model = defineModel()

    const props = defineProps(['label', 'items'])

    const dropdown = ref(false)
    const showFiltered = ref(false)
    const highlightItem = ref(null)
    const searchQuery = ref('') // texte affiché dans l'input

    const listItems = ref([])        // refs pour les <li>
    const dropdownList = ref(null)   // ref pour le UL

    const root = ref(null)

    const filteredItems = computed(() => {
    // showFiltered est true lorsqu'on écrit dans l'input
    // on affiche l'item contenant le displayValue  
        if (showFiltered.value === true) {
            return props.items.filter(item =>
                item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        } 
    // si showFiltered est false, on affiche tous les items
        else {
            return props.items
        }
    })

    const onInput = (value) => {
        searchQuery.value = value
        highlightItem.value = null;
        model.value = null;
        showFiltered.value = true // mettre la valeur de showFiltered en TRUE car on écrit dans l'input
        dropdown.value = true // afficher le dropdown
    }

    const selectItem = (item) => {
        model.value = item.id      // on envoie uniquement l'id au parent
        searchQuery.value = item.name
        highlightItem.value = item.id // ajouter une style à l'item sélectionné
        dropdown.value = false // fermer le dropdown
        showFiltered.value = false // afficher tous les items quand le dropdown s'ouvre de nouveau
    }

    const reset = () => {
        model.value = null
        searchQuery.value = ''
        highlightItem.value = null
    }

    onClickOutside(root, () => {
        dropdown.value = false // fermer le dropdown
        showFiltered.value = false // afficher tous les items quand le dropdown s'ouvre de nouveau
    })

    function setItemRef(el, key) {
        if (el) {
            listItems.value[key] = el
        }
    }
    watch(dropdown, async (isOpen) => {
        if (isOpen && highlightItem.value !== null) {
            await nextTick()
            const el = listItems.value[highlightItem.value]
            if (el && dropdownList.value) {
              dropdownList.value.scrollTop = el.offsetTop - dropdownList.value.offsetTop
            }
        }
    })
</script>
