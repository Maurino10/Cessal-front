<template>
    <v-app id="inspire">
        <Sidebar :navigations="navigations" :profil="profil" @signup="signUp" />

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
    
    const profil = {
      first_name: 'Admin',
      last_name: 'Super'
    }; 

    const navigations = [
      {icon: 'mdi-bank-outline', title: 'Instances', link: '/admin/instances'},
      {icon: 'mdi-map-outline', title: 'Territoires', link: '/admin/territoires'},
      {icon: 'mdi-account-outline', title: 'Utilisateurs', link: '/admin/utilisateurs'},
      {icon: 'mdi-database-import-outline', title: 'Importations', link: '/admin/importations'},
      {icon: 'mdi-tune', title: 'Paramètres', link: '/admin/parametres'},
    ]

    const signUp  = async () => {
        try {
            await authService.logoutAdmin();
            localStorage.removeItem('token')
            
            router.push({ name: 'login' });
        } catch (error) {
            console.error(error.response.data);

        }
    }
</script>