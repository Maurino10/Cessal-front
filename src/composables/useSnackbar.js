import { ref } from "vue";

const show = ref(false);
const message = ref("");
const color = ref("success");

export function useSnackbar() {
  const openSnackbar = (msg, type = "success") => {
    message.value = msg;
    color.value = type;
    show.value = true;

    setTimeout(() => {
      show.value = false;
    }, 2000);
  };

  return { show, message, color, openSnackbar };
}
    