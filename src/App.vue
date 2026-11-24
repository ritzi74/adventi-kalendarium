<script setup>
import { computed, ref, watch } from 'vue'
import { EV, FEJLEC, SORREND, NAPOK } from './data/days.js'
import CalendarDoor from './components/CalendarDoor.vue'
import DayModal from './components/DayModal.vue'
import SnowFall from './components/SnowFall.vue'

const TAROLO_KULCS = `adventi-kalendarium-${EV}`

// Tesztmód: az URL végére írt ?teszt minden ablakot nyithatóvá tesz
// (pl. https://felhasznalo.github.io/adventi-kalendarium/?teszt)
const tesztMod = new URLSearchParams(window.location.search).has('teszt')

function nyithato(nap) {
  if (tesztMod) return true
  const ma = new Date()
  const nyitas = new Date(EV, 11, nap) // december = 11. hónap (0-tól számolva)
  return ma >= nyitas
}

function betolt() {
  try {
    return JSON.parse(localStorage.getItem(TAROLO_KULCS)) ?? []
  } catch {
    return []
  }
}
const kinyitott = ref(betolt())
watch(
  kinyitott,
  (v) => {
    try {
      localStorage.setItem(TAROLO_KULCS, JSON.stringify(v))
    } catch {
      /* privát módban nem baj, ha nem menthető */
    }
  },
  { deep: true },
)

const ablakok = computed(() =>
  SORREND.map((n) => NAPOK.find((d) => d.nap === n)).filter(Boolean),
)

const kivalasztott = ref(null)
const uzenet = ref('')
let uzenetIdozito = null

// helyes magyar rag: 1-jén, 2-án, 4-én, 20-án …
const RAGOK = ['', 'jén', 'án', 'án', 'én', 'én', 'án', 'én', 'án', 'én', 'én', 'én', 'én',
  'án', 'én', 'én', 'án', 'én', 'án', 'én', 'án', 'én', 'én', 'án', 'én']
function rag(n) {
  return RAGOK[n] ?? 'én'
}

function katt(nap) {
  if (!nyithato(nap.nap)) {
    uzenet.value = `Még korai! Ez az ablak december ${nap.nap}-${rag(nap.nap)} nyílik.`
    clearTimeout(uzenetIdozito)
    uzenetIdozito = setTimeout(() => (uzenet.value = ''), 2600)
    return false
  }
  if (!kinyitott.value.includes(nap.nap)) {
    kinyitott.value.push(nap.nap)
    // az ajtó kinyílása után jelenik meg a nagy kép
    setTimeout(() => (kivalasztott.value = nap), 750)
  } else {
    kivalasztott.value = nap
  }
  return true
}

function visszazar() {
  kinyitott.value = []
}
</script>

<template>
  <SnowFall />

  <main class="kartya">
    <span class="ev">{{ EV }}</span>
    <h1>{{ FEJLEC.cim }}</h1>
    <p class="bevezeto">{{ FEJLEC.bevezeto }}</p>
    <p class="keszitok">
      <span v-for="sor in FEJLEC.keszitok" :key="sor">{{ sor }}<br /></span>
    </p>

    <div v-if="tesztMod" class="teszt">Tesztmód: minden ablak nyitható</div>

    <section class="racs">
      <CalendarDoor
        v-for="nap in ablakok"
        :key="nap.nap"
        :nap="nap"
        :nyitva="kinyitott.includes(nap.nap)"
        :zarva="!nyithato(nap.nap)"
        @valaszt="katt"
      />
    </section>

    <footer>
      <button class="link" v-if="kinyitott.length" @click="visszazar">Ablakok visszacsukása</button>
    </footer>
  </main>

  <Transition name="uzenet">
    <div v-if="uzenet" class="uzenet" role="status">{{ uzenet }}</div>
  </Transition>

  <DayModal :nap="kivalasztott" @bezar="kivalasztott = null" />
</template>

<style scoped>
.kartya {
  position: relative;
  width: min(1000px, calc(100% - 24px));
  margin: 48px auto;
  padding: 28px 32px 24px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 40%),
    linear-gradient(150deg, #8e1b1b 0%, #c0201f 45%, #b81c1c 70%, #9c1717 100%);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 120px rgba(192, 32, 31, 0.35);
  text-align: center;
}

.ev {
  display: inline-block;
  padding: 2px 14px;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  opacity: 0.9;
}

h1 {
  margin: 14px 0 18px;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  letter-spacing: 0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
}

.bevezeto {
  margin: 0 auto;
  max-width: 820px;
  line-height: 1.65;
  font-size: 1rem;
}

.keszitok {
  margin: 20px 0 30px;
  font-size: 0.82rem;
  opacity: 0.85;
  line-height: 1.5;
}

.teszt {
  display: inline-block;
  margin-bottom: 14px;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.25);
  color: var(--arany);
  font-size: 0.85rem;
}

.racs {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
}

@media (max-width: 860px) {
  .racs {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 640px) {
  .kartya {
    padding: 22px 14px 18px;
    margin: 20px auto;
  }
  .racs {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
}
@media (max-width: 380px) {
  .racs {
    grid-template-columns: repeat(3, 1fr);
  }
}

footer {
  min-height: 24px;
  margin-top: 18px;
}

.link {
  background: none;
  border: none;
  color: var(--szoveg);
  opacity: 0.7;
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
}
.link:hover {
  opacity: 1;
}

.uzenet {
  position: fixed;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100vw - 32px);
  text-align: center;
  padding: 12px 20px;
  border-radius: 12px;
  background: rgba(20, 0, 0, 0.9);
  border: 1px solid var(--arany);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 50;
  font-size: 0.95rem;
}
.uzenet-enter-active,
.uzenet-leave-active {
  transition: all 0.3s ease;
}
.uzenet-enter-from,
.uzenet-leave-to {
  opacity: 0;
  transform: translate(-50%, 16px);
}
</style>
