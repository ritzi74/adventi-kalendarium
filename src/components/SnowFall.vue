<script setup>
// Egyszerű CSS-alapú hóesés: a pelyhek véletlen méretűek, sebességűek és helyzetűek.
const DB = 70
const pelyhek = Array.from({ length: DB }, (_, i) => {
  const meret = 2 + Math.random() * 5
  return {
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      width: `${meret}px`,
      height: `${meret}px`,
      opacity: (0.35 + Math.random() * 0.6).toFixed(2),
      animationDuration: `${8 + Math.random() * 12}s, ${3 + Math.random() * 4}s`,
      animationDelay: `-${Math.random() * 20}s, 0s`,
    },
  }
})
</script>

<template>
  <div class="ho" aria-hidden="true">
    <span v-for="p in pelyhek" :key="p.id" class="pehely" :style="p.style"></span>
  </div>
</template>

<style scoped>
.ho {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 60;
}
.pehely {
  position: absolute;
  top: -10px;
  border-radius: 50%;
  background: #fff;
  animation-name: hull, leng;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-direction: normal, alternate;
}
@keyframes hull {
  to {
    top: 105vh;
  }
}
@keyframes leng {
  from {
    transform: translateX(-12px);
  }
  to {
    transform: translateX(12px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .ho {
    display: none;
  }
}
</style>
