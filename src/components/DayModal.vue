<script setup>
import { onMounted, onUnmounted } from 'vue'

defineProps({ nap: { type: Object, default: null } })
const emit = defineEmits(['bezar'])

function billentyu(e) {
  if (e.key === 'Escape') emit('bezar')
}
onMounted(() => window.addEventListener('keydown', billentyu))
onUnmounted(() => window.removeEventListener('keydown', billentyu))
</script>

<template>
  <Transition name="modal">
    <div v-if="nap" class="hatter" @click.self="emit('bezar')">
      <div class="doboz" role="dialog" aria-modal="true" :aria-label="`December ${nap.nap}.`">
        <button class="bezar" aria-label="Bezárás" @click="emit('bezar')">✕</button>
        <img :src="nap.kep" :alt="nap.cim" />
        <div class="tartalom">
          <span class="datum">December {{ nap.nap }}.</span>
          <h2>{{ nap.cim }}</h2>
          <p>{{ nap.szoveg }}</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.hatter {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(3px);
}

.doboz {
  position: relative;
  width: min(640px, 100%);
  max-height: calc(100vh - 32px);
  overflow: auto;
  border-radius: 18px;
  border: 3px solid var(--arany);
  background: linear-gradient(160deg, #8e1414, #5e0707);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
}

.doboz img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.tartalom {
  padding: 18px 24px 24px;
  text-align: center;
}
.datum {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--arany);
}
h2 {
  margin: 6px 0 10px;
  font-size: 1.5rem;
}
p {
  margin: 0;
  line-height: 1.7;
  white-space: pre-line;
}

.bezar {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
}
.bezar:hover {
  background: rgba(0, 0, 0, 0.7);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-active .doboz,
.modal-leave-active .doboz {
  transition: transform 0.35s cubic-bezier(0.3, 0.7, 0.3, 1.2);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .doboz,
.modal-leave-to .doboz {
  transform: scale(0.85) translateY(20px);
}
</style>
