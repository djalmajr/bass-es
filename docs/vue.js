import { createApp, ref } from 'vue';

createApp({
  setup() {
    const message = ref('Hello World!');

    return {
      message,
    };
  },
}).mount('#r00t');
