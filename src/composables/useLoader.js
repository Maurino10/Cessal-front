import { ref } from "vue";

const loading = ref(false);

export function useLoader() {
  const openLoader = (load) => {
    loading.value = load;
  };

  return { loading, openLoader };
}
    