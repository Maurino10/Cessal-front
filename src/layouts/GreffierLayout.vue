<template>
    <v-app id="inspire">
        <Sidebar v-if="profil" :navigations="navigations" :profil="profil" @signup="signUp" @details="detailsProfil" />

        <v-main> 
            <v-container>
              <router-view />
            </v-container>
        </v-main>
  </v-app>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import Sidebar from './Sidebar.vue';
    import authService from "@/services/auth/authService";
    import { useRouter } from 'vue-router';
    
    const router = useRouter();

    const profil = ref(null); 

    const navigations = [
      {icon: 'mdi-chart-donut', title: 'Cessions', link: '/greffier/cessions'},
    ]

    const detailsProfil = () => {
      router.push({ name: 'greffier-profil' });
    }

    const signUp = async () => {
      try {
          await authService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('profil');
          
          router.push({ name: 'login' });
      } catch (error) {
          console.error(error.response.data);

      }
    }

    onMounted(() =>{
      profil.value = JSON.parse(localStorage.getItem('profil'));
    });
</script>