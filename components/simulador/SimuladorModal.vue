<template>
  <!-- Full-screen Modal -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-white overflow-hidden"
      >
        <!-- Close Button (Top Right) -->
        <button
          @click="closeModal"
          class="fixed top-6 right-6 z-10 w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center group"
          aria-label="Cerrar simulador"
        >
          <svg
            class="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Main Content -->
        <div class="h-full overflow-y-auto">
          <SimuladorWizard @close="closeModal" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import SimuladorWizard from './SimuladorWizard.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const closeModal = () => {
  emit('close');
};

// Bloquear scroll del body cuando el modal está abierto
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Cerrar con tecla ESC
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal();
    }
  };

  window.addEventListener('keydown', handleEscape);

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscape);
    document.body.style.overflow = '';
  });
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
