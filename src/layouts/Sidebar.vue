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
                class="flex items-center gap-6 px-2 py-3 text-sm font-bold text-gray-400 transition-all duration-200 ease-in rounded-lg"
                active-class="!text-emerald-500"
              >
                <v-icon 
                  :icon="navigation.icon"
                  size="22"
                ></v-icon>
                <p class="text-nowrap whitespace-nowrap">{{ navigation.title }}</p>
              </router-link>
              
            </li>
          </ul>

        <div class="text-center">
          <v-menu v-model="menu" :close-on-content-click="true" location="top">
            <template v-slot:activator="{ props }">
              <button
                v-bind="props"
                class="flex items-center w-full gap-4 px-3 py-2 transition border-t"
              >
                <v-avatar class="!bg-orange-500" size="32">
                  <span class="text-sm font-bold text-white">
                    {{ getInitials(profil.first_name) }}
                  </span>
                </v-avatar>
                
                <div class="flex flex-col items-start whitespace-nowrap">
                    <span class="text-sm font-medium text-gray-800">
                      {{ profil.first_name }}
                    </span>
                    <span class="text-gray-400 text-caption">
                      {{ profil.user.post.name }}
                    </span>
                </div>
              </button>
            </template>

            <v-card min-width="300">
              <v-list>
                <v-list-item
                  :title="profil.first_name+' '+profil.last_name"
                  :subtitle="profil.user.post.name"
                >
                  <template v-slot:prepend>
                    <v-avatar class="!bg-orange-500">
                      <span class="text-sm font-bold text-white">
                        {{ getInitials(profil.first_name) }}
                      </span>
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-list>

              <v-divider class="border-black"></v-divider>

              <v-list>
                <v-list-item
                  v-if="props.profil.role !== 'admin'"
                >
                  <div 
                    @click="emit('details')"  
                    class="flex items-center gap-3 p-2 text-sm text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <span>
                      <v-icon
                        icon="mdi-account-outline"
                      ></v-icon>
                    </span>
                    <p>Mon profil</p>
                  </div>
                </v-list-item>

                <v-list-item>
                  <div 
                    @click="emit('signup');"  
                    class="flex items-center gap-3 p-2 text-sm text-gray-600 rounded-lg cursor-pointer hover:bg-gray-200"
                  >
                    <span>
                      <v-icon
                        icon="mdi-logout"
                      ></v-icon>
                    </span>
                    <p>Déconnexion</p>
                  </div>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>

      </div>
          
    
    </v-navigation-drawer>
</template>

<script setup>
// Imports
  import logo from '@assets/images/logo/logo.jpg';
  import { ref } from 'vue';
// Variables & state

    const menu = ref(false);
    const props = defineProps(['navigations', 'profil']);
    const emit = defineEmits(['signup', 'details']);

// Functions  
    const getInitials = (nom) => {
        return (nom.charAt(0)).toUpperCase()
    }
    

</script>