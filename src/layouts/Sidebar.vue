<template>
    <v-navigation-drawer class="!bg-white border-none custom-border" permanent rail expand-on-hover>

        <div class="flex flex-col justify-between h-full">
          <div class="flex items-center gap-4 px-2 py-2">
              <img :src="logo" width="40" height="40" class="rounded-lg"/>
              <p class="text-black whitespace-nowrap">Cession de salaire</p>

          </div>

          
          <ul class="p-2" v-if="props.navigations">
            <li v-for="navigation in props.navigations" :key="navigation.link">
              
              <router-link
                :to="navigation.link"
                class="flex items-center gap-6 px-2 py-3 text-gray-400 transition-all duration-200 ease-in rounded-lg"
                active-class="font-bold !text-emerald-500"
              >
                <v-icon 
                  :icon="navigation.icon"
                  size="28"
                ></v-icon>
                <p>{{ navigation.title }}</p>
              </router-link>
              
            </li>
          </ul>
      
          <div>            
            <button
              @click="signUp()"
              class="flex items-center w-full gap-4 px-3 py-2 transition border-t"
            >
              <v-avatar class="!bg-orange-500" size="32">
                <span class="text-sm font-bold text-white">
                  {{ getInitials(props.profil.first_name) }}
                </span>
              </v-avatar>
              
              <div class="flex flex-col items-start whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-800">
                    {{ props.profil.first_name }}
                  </span>
                  <span class="text-gray-400 text-caption">
                    Mon profil
                  </span>
              </div>
            </button>
          </div>

        </div>
          
    
    </v-navigation-drawer>
</template>

<script setup>
// Imports
    import logo from '@assets/images/logo/logo.jpg';
// Variables & state
    const props = defineProps(['navigations', 'profil']);
    const emit = defineEmits(['signup']);
    
// Functions 
    const getInitials = (nom) => {
        return (nom.charAt(0)).toUpperCase()
    }
    
    const signUp = () => {
      emit('signup');
    }

</script>