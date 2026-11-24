<script setup>
import { ref } from 'vue'

const props = defineProps({
  nap: { type: Object, required: true },
  nyitva: { type: Boolean, default: false },
  zarva: { type: Boolean, default: false },
})
const emit = defineEmits(['valaszt'])

const razkodik = ref(false)

function katt() {
  emit('valaszt', props.nap)
  if (props.zarva) {
    razkodik.value = false
    requestAnimationFrame(() => (razkodik.value = true))
  }
}
</script>

<template>
  <button
    class="ablak"
    :class="{ nyitva, zarva, razkodik }"
    :aria-label="`December ${nap.nap}.` + (zarva ? ' (még zárva)' : '')"
    @click="katt"
    @animationend="razkodik = false"
  >
    <!-- Az ajtó mögötti kép -->
    <span class="mogotte">
      <img :src="nap.kep" :alt="nap.cim" loading="lazy" />
      <span class="kis-szam">{{ nap.nap }}</span>
    </span>

    <!-- Maga a kinyíló ajtó -->
    <span class="ajto">
      <svg class="ajandek" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 18 C22 4 10 8 16 17 Z M32 18 C42 4 54 8 48 17 Z" fill="#e8806a" />
        <rect x="10" y="18" width="44" height="12" rx="2" fill="#e07a63" />
        <rect x="13" y="30" width="38" height="28" rx="2" fill="#d4664f" />
        <rect x="28" y="18" width="8" height="40" fill="#f0a08a" />
      </svg>
      <span class="szam">{{ nap.nap }}</span>
    </span>
  </button>
</template>

<style scoped>
.ablak {
  position: relative;
  aspect-ratio: 1;
  padding: 0;
  border: none;
  border-radius: 14px;
  background: rgba(40, 0, 0, 0.55);
  box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.6), 0 6px 14px rgba(0, 0, 0, 0.35);
  perspective: 700px;
  cursor: pointer;
  color: inherit;
}

.mogotte {
  position: absolute;
  inset: 4px;
  border-radius: 10px;
  overflow: hidden;
}
.mogotte img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.08);
  transition: transform 0.4s ease;
}
.ablak.nyitva:hover .mogotte img {
  transform: scale(1.18);
}
.kis-szam {
  position: absolute;
  top: 4px;
  left: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0 6px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.45);
}

.ajto {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: radial-gradient(circle at 30% 0%, #d96a6a, #8b1010 55%, #5f0606);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform-origin: left center;
  transition: transform 0.75s cubic-bezier(0.3, 0.7, 0.3, 1), box-shadow 0.3s, filter 0.3s;
  backface-visibility: hidden;
}
.ablak:hover .ajto {
  filter: brightness(1.12);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45), 0 0 0 2px rgba(242, 193, 78, 0.6);
}
.ablak.nyitva .ajto {
  transform: rotateY(-105deg);
  box-shadow: none;
  pointer-events: none;
}

.ajandek {
  width: 46%;
  opacity: 0.85;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
}

.szam {
  position: absolute;
  right: 9%;
  bottom: 6%;
  font-size: clamp(1rem, 2.4vw, 1.45rem);
  font-weight: 800;
  color: rgba(255, 220, 220, 0.75);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.ablak.zarva .ajto {
  filter: saturate(0.75) brightness(0.85);
}
.ablak.zarva {
  cursor: not-allowed;
}
.ablak.zarva:hover .ajto {
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35);
  filter: saturate(0.75) brightness(0.9);
}

.ablak.razkodik .ajto {
  animation: razkod 0.45s ease;
}
@keyframes razkod {
  20% { transform: translateX(-5px) rotate(-2deg); }
  40% { transform: translateX(5px) rotate(2deg); }
  60% { transform: translateX(-4px) rotate(-1deg); }
  80% { transform: translateX(3px); }
}

.ablak:focus-visible {
  outline: 3px solid var(--arany);
  outline-offset: 2px;
}
</style>
