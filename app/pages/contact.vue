<script setup lang="ts">
import { ref } from "vue";

const email = "parallizedcn@gmail.com";
const copiedType = ref<string | null>(null);
let copyTimer: number | undefined;

const copyText = async (text: string, type: string) => {
  if (!import.meta.client) return;

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  copiedType.value = type;
  if (copyTimer !== undefined) window.clearTimeout(copyTimer);
  copyTimer = window.setTimeout(() => {
    copiedType.value = null;
  }, 1600);
};
</script>

<template>
  <main class="contact-page">
    <div class="contact-container">
      <article class="cv-card-inner">
        <header class="cv-header">
          <div class="cv-title-row">
            <h1 class="cv-title">{{ email }}</h1>
            <div class="cv-title-line"></div>
          </div>
          <p class="cv-label">打个招呼，或是探讨未来的合作</p>
        </header>

        <div class="cv-body">
          <p class="cv-brief">
            如果你希望建立合作、有任何问题，或者只是想交个朋友，欢迎随时联系我。我始终乐于探讨新项目、创意想法，或是参与到你的愿景之中。
          </p>
          <ul class="cv-list">
            <li>
              <button type="button" class="action-link" @click="copyText(email, 'email')">
                <Icon name="ph:envelope-simple-fill" class="action-icon" />
                <span><strong>{{ copiedType === 'email' ? '已复制' : '邮箱' }}</strong>：点击复制 {{ email }}</span>
              </button>
            </li>
            <li>
              <button type="button" class="action-link" @click="copyText('parallized', 'wechat')">
                <Icon name="simple-icons:wechat" class="action-icon" />
                <span><strong>微信</strong>：点击复制 parallized</span>
              </button>
            </li>
            <li>
              <button type="button" class="action-link" @click="copyText('1317699264', 'qq')">
                <Icon name="simple-icons:tencentqq" class="action-icon" />
                <span><strong>QQ</strong>：点击复制 1317699264</span>
              </button>
            </li>
            <li>
              <a href="https://github.com/parallized" target="_blank" rel="noreferrer" class="action-link">
                <Icon name="simple-icons:github" class="action-icon" />
                <span><strong>GitHub</strong>：github.com/parallized</span>
              </a>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;600;700;900&family=Noto+Serif+SC:wght@400;600;700&display=swap');

.contact-page {
  position: relative;
  min-height: 100vh;
  background: #f1f1ee;
  color: #20211f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 10vw;
}

@supports (height: 100svh) {
  .contact-page {
    min-height: 100svh;
  }
}

.contact-container {
  width: 100%;
  max-width: 900px;
}

.cv-card-inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(20px, 3vw, 40px);
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  width: 100%;
}

.cv-header {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vw, 20px);
}

.cv-title-row {
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 32px);
}

.cv-title {
  margin: 0;
  color: #20211f;
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  word-break: break-all;
}

.cv-title-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, #20211f9f 0%, #8ba264 40%, transparent 100%);
  border-radius: 2px;
  opacity: 0.8;
}

.cv-label {
  margin: 0;
  color: #8c8f87;
  font-size: clamp(13px, 1vw, 15px);
  font-weight: 400;
  letter-spacing: 0.04em;
  font-family: "Inter", "Noto Sans SC", sans-serif;
}

.cv-body {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vw, 28px);
}

.cv-brief {
  margin: 0;
  color: #262824;
  font-size: clamp(14px, 1.15vw, 16px);
  font-weight: 400;
  line-height: 1.8;
  text-align: justify;
}

.cv-list {
  margin: 0;
  padding: 0 0 0 24px;
  list-style: square;
  color: #62655e;
  font-size: clamp(14px, 1.1vw, 15px);
  line-height: 1.8;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cv-list li::marker {
  color: #8ba264;
}

.action-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  transition: opacity 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.action-link:hover {
  opacity: 0.7;
}

.action-link strong {
  color: #20211f;
  font-weight: 700;
}

.action-icon {
  font-size: 1.1em;
  color: #8ba264;
  opacity: 0.9;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .contact-page {
    padding-inline: 24px;
  }
  
  .cv-title {
    font-size: clamp(28px, 8vw, 40px);
  }
}
</style>
