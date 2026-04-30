<script setup lang="ts">
import { ref } from "vue";

const email = "1317699264@qq.com";
const copied = ref(false);
let copyTimer: number | undefined;

const copyEmail = async () => {
  if (!import.meta.client) return;

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(email);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = email;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  copied.value = true;
  if (copyTimer !== undefined) window.clearTimeout(copyTimer);
  copyTimer = window.setTimeout(() => {
    copied.value = false;
  }, 1600);
};
</script>

<template>
  <main class="contact-page">
    <NuxtLink to="/about" class="contact-brand" aria-label="About parallized">
      <Icon name="ph:hand-peace-bold" class="contact-brand-icon" />
      <span>parallized</span>
    </NuxtLink>

    <section class="contact-center" aria-label="Contact">
      <p class="contact-kicker">Say hi or talk future projects</p>
      <a :href="`mailto:${email}`" class="contact-email">{{ email }}</a>

      <div class="contact-actions" aria-label="Contact links">
        <button type="button" class="contact-chip" @click="copyEmail">
          {{ copied ? "Copied" : "Copy email" }}
        </button>
        <a
          class="contact-chip"
          href="https://github.com/parallized"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          class="contact-chip"
          href="https://parallized.cn"
          target="_blank"
          rel="noreferrer"
        >
          Blog
        </a>
        <a class="contact-chip" :href="`mailto:${email}`">Mail</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  position: relative;
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 80px 24px 132px;
  background: #f6f6f4;
  color: #4a4a47;
  overflow: hidden;
}

@supports (height: 100svh) {
  .contact-page {
    min-height: 100svh;
  }
}

.contact-brand {
  position: fixed;
  top: 28px;
  left: clamp(22px, 6vw, 128px);
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #555650;
  font-size: clamp(16px, 1.4vw, 21px);
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
}

.contact-brand-icon {
  width: 24px;
  height: 24px;
}

.contact-center {
  width: min(100%, 900px);
  text-align: center;
}

.contact-kicker {
  margin: 0 0 18px;
  color: #4f514d;
  font-size: clamp(15px, 1.5vw, 21px);
  font-weight: 500;
  letter-spacing: 0.01em;
}

.contact-email {
  display: inline-block;
  color: #50514f;
  font-size: clamp(38px, 6vw, 78px);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-decoration: none;
  word-break: break-word;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 42px;
}

.contact-chip {
  border: 0;
  border-radius: 999px;
  background: #eef1ee;
  color: #555650;
  padding: 12px 22px;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background 220ms ease,
    color 220ms ease,
    transform 220ms ease;
}

.contact-chip:hover {
  background: #20211f;
  color: #f7f6f1;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .contact-page {
    padding-inline: 18px;
  }

  .contact-brand {
    left: 20px;
  }

  .contact-email {
    font-size: clamp(34px, 13vw, 52px);
  }

  .contact-chip {
    padding: 11px 16px;
    font-size: 14px;
  }
}
</style>
