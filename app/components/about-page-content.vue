<script setup lang="ts">
import { computed } from "vue";
import backgroundImage from "~/assets/image/background.webp";
import hireImage from "~/assets/image/hire.webp";
import identityImage from "~/assets/image/identity.webp";
import worksImage from "~/assets/image/works.webp";
import ashIrisPreviewImage from "~/assets/image/board/ash-iris.webp";
import goclawPreviewImage from "~/assets/image/board/goclaw-home.webp";
import magicboardPreviewImage from "~/assets/image/board/agent-forest-result.webp";
import masterPreviewImage from "~/assets/image/board/unity-captain-proxy.webp";
import paraNavigationPreviewImage from "~/assets/image/board/para-navigation-route.webp";
import runedraPreviewImage from "~/assets/image/board/runedra-map.webp";
import wowPreviewImage from "~/assets/image/board/wow-magician-timeline.webp";

interface Skill {
  label: string;
  value: string;
}

interface OpsService {
  id: string;
  name: string;
  domain: string;
  url: string;
  healthUrl: string;
  overall: string;
  http?: {
    ok: boolean;
    statusCode: number | null;
    latencyMs: number | null;
    error: string | null;
  };
  containers?: Record<
    string,
    {
      present: boolean;
      running: boolean;
      status: string;
      health: string | null;
      restartCount: number;
      image: string;
      startedAt: string;
    }
  >;
  sqliteDatabases?: Array<{
    exists: boolean;
    ok: boolean;
    sizeBytes: number;
    error: string | null;
  }>;
}

interface OpsStatus {
  timestamp: string;
  version: number;
  host: {
    cpu: {
      usedPercent: number;
      cores: number;
    };
    memory: {
      usedPercent: number;
      totalBytes: number;
      availableBytes: number;
      usedBytes: number;
    };
    disk: {
      path: string;
      usedPercent: number;
      totalBytes: number;
      usedBytes: number;
      freeBytes: number;
    };
    load: {
      load1: number;
      load5: number;
      load15: number;
      uptimeSeconds: number;
    };
  };
  services: Record<string, OpsService>;
}

interface OpsHistoryPoint {
  timestamp: string;
  host: {
    cpuUsedPercent: number;
    memUsedPercent: number;
    diskUsedPercent: number;
    load1: number;
    load5: number;
  };
  services: Record<
    string,
    {
      overall: string;
      latencyMs: number | null;
      statusCode: number | null;
    }
  >;
}

const skills: Skill[] = [
  { label: "经验", value: "AI / 设计 / 开发" },
  { label: "技术栈", value: "任何" },
  { label: "位置", value: "杭州 / UTC+8" },
];

const fallbackOpsStatus: OpsStatus = {
  timestamp: "",
  version: 1,
  host: {
    cpu: { usedPercent: 0, cores: 0 },
    memory: {
      usedPercent: 0,
      totalBytes: 0,
      availableBytes: 0,
      usedBytes: 0,
    },
    disk: {
      path: "/",
      usedPercent: 0,
      totalBytes: 0,
      usedBytes: 0,
      freeBytes: 0,
    },
    load: {
      load1: 0,
      load5: 0,
      load15: 0,
      uptimeSeconds: 0,
    },
  },
  services: {},
};

const profilePhotoPath = "/profile-photo.jpg";
const statusEndpoint = "https://parallized.cn/ops/status/latest.json";
const historyEndpoint = "https://parallized.cn/ops/status/history-6h.json";

const contactVisualImages = [
  { id: "background", image: backgroundImage, alt: "campus building entrance" },
  { id: "identity", image: identityImage, alt: "yellow flowers in sunlight" },
  { id: "works", image: worksImage, alt: "building roof under blue sky" },
];

const featuredProjects = [
  {
    id: "blog",
    serviceIds: ["ash-iris"],
    title: "博客",
    label: "Blog",
    image: ashIrisPreviewImage,
    to: "/board",
  },
  {
    id: "magicboard",
    serviceIds: ["magicboard"],
    title: "Magicboard",
    label: "白板",
    image: magicboardPreviewImage,
    to: "/board",
  },
  {
    id: "runedra",
    serviceIds: ["runedra"],
    title: "Runedra",
    label: "知树",
    image: runedraPreviewImage,
    to: "/board",
  },
  {
    id: "goclaw",
    serviceIds: ["goclaw"],
    title: "GoClaw",
    label: "智能规划",
    image: goclawPreviewImage,
    to: "/board",
  },
  {
    id: "wowmagicians",
    serviceIds: ["wowmagicians"],
    title: "WowMagicians",
    label: "游戏社区工具",
    image: wowPreviewImage,
    to: "/board",
  },
  {
    id: "para-navigation",
    serviceIds: ["para-navigation"],
    title: "ParaNavigation",
    label: "导航路径",
    image: paraNavigationPreviewImage,
    to: "/board",
  },
  {
    id: "master",
    serviceIds: ["grok2api", "cliproxyapi"],
    title: "Master",
    label: "Grok + Master 平均",
    image: masterPreviewImage,
    to: "/board",
  },
];

const { data: opsStatus } = useFetch<OpsStatus>(statusEndpoint, {
  server: false,
  default: () => fallbackOpsStatus,
});

const { data: latencyHistory } = useFetch<OpsHistoryPoint[]>(historyEndpoint, {
  server: false,
  default: () => [],
});

const serviceTotal = computed(
  () => Object.keys(opsStatus.value?.services ?? {}).length
);

const serviceUpTotal = computed(
  () =>
    Object.values(opsStatus.value?.services ?? {}).filter(
      (service) => service.overall === "up"
    ).length
);

const summarizeOverall = (states: string[]) => {
  if (states.includes("down")) return "down";
  if (states.includes("degraded")) return "degraded";
  if (states.includes("up")) return "up";
  return "unknown";
};

const averageLatency = (latencies: Array<number | null | undefined>) => {
  const usableLatencies = latencies.filter(
    (latency): latency is number => typeof latency === "number"
  );

  if (!usableLatencies.length) return null;

  return (
    usableLatencies.reduce((total, latency) => total + latency, 0) /
    usableLatencies.length
  );
};

const uptimeTone = (overall: string, latency: number | null) => {
  if (overall === "down") return "is-red";
  if (overall === "degraded") return "is-orange";
  if (overall === "unknown") return "is-yellow";
  if (typeof latency === "number" && latency >= 900) return "is-orange";
  if (typeof latency === "number" && latency >= 650) return "is-yellow";
  return "is-green";
};

const uptimeSegmentsForProject = (serviceIds: string[]) => {
  const history = latencyHistory.value ?? [];
  const selectedHistory = history.length > 18
    ? history.filter((_, index) => index % Math.ceil(history.length / 18) === 0)
    : history;

  return selectedHistory.slice(-18).map((point, index) => {
    const services = serviceIds
      .map((serviceId) => point.services[serviceId])
      .filter(Boolean);
    const latency = averageLatency(services.map((service) => service.latencyMs));
    const overall = summarizeOverall(services.map((service) => service.overall));

    return {
      id: `${point.timestamp}-${index}`,
      overall,
      tone: uptimeTone(overall, latency),
    };
  });
};

const projectCards = computed(() =>
  featuredProjects.map((project) => {
    const services = project.serviceIds
      .map((serviceId) => opsStatus.value?.services[serviceId])
      .filter((service): service is OpsService => Boolean(service));
    const latencyMs = averageLatency(services.map((service) => service.http?.latencyMs));
    const uptimeSegments = uptimeSegmentsForProject(project.serviceIds);
    const goodSegments = uptimeSegments.filter((segment) => segment.overall === "up").length;

    return {
      ...project,
      overall: summarizeOverall(services.map((service) => service.overall)),
      latencyMs,
      uptimePercent: uptimeSegments.length
        ? Math.round((goodSegments / uptimeSegments.length) * 100)
        : null,
      uptimeSegments,
      url: services[0]?.url,
    };
  })
);

const chartWidth = 720;
const chartHeight = 220;
const chartPaddingX = 54;
const chartPaddingRight = 24;
const chartPlotTop = 26;
const chartPlotBottom = 184;
const chartGridLines = [26, 79, 132, 184];
const metricYAxisLabels = [
  { label: "100%", y: chartPlotTop },
  { label: "50%", y: (chartPlotTop + chartPlotBottom) / 2 },
  { label: "0", y: chartPlotBottom },
];

const createSmoothPath = (points: Array<{ x: number; y: number }>) => {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;

    const previous = points[index - 1];
    const controlOffset = (point.x - previous.x) * 0.48;

    return `${path} C ${(previous.x + controlOffset).toFixed(2)} ${previous.y.toFixed(2)}, ${(point.x - controlOffset).toFixed(2)} ${point.y.toFixed(2)}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, "");
};

const averagePointLatency = (point: OpsHistoryPoint) => {
  const latencies = Object.values(point.services)
    .map((service) => service.latencyMs)
    .filter((latency): latency is number => typeof latency === "number");

  if (!latencies.length) return null;

  return Math.round(
    latencies.reduce((total, latency) => total + latency, 0) / latencies.length
  );
};

const clampPercent = (value: number) => Math.min(Math.max(value, 0), 100);

const metricSamples = computed(() =>
  (latencyHistory.value ?? []).map((point) => ({
    timestamp: point.timestamp,
    cpu: point.host.cpuUsedPercent,
    mem: point.host.memUsedPercent,
    response: averagePointLatency(point),
  }))
);

const metricChartLines = computed(() => {
  const samples = metricSamples.value;
  const usableWidth = chartWidth - chartPaddingX - chartPaddingRight;
  const usableHeight = chartPlotBottom - chartPlotTop;
  const denominator = Math.max(samples.length - 1, 1);
  const configs = [
    { key: "cpu", label: "CPU", className: "is-cpu", scale: "percent" },
    { key: "mem", label: "MEM", className: "is-mem", scale: "percent" },
    { key: "response", label: "RESPONSE", className: "is-response", scale: "relative" },
  ] as const;

  return configs.map((config) => {
    const values = samples
      .map((sample, index) => ({ value: sample[config.key], index }))
      .filter(
        (sample): sample is { value: number; index: number } =>
          typeof sample.value === "number"
      );

    if (!values.length) {
      return { ...config, path: "" };
    }

    const min = Math.min(...values.map((sample) => sample.value));
    const max = Math.max(...values.map((sample) => sample.value));
    const range = max - min || 1;

    const coordinates = values.map((sample) => {
      const normalized =
        config.scale === "percent"
          ? clampPercent(sample.value) / 100
          : max === min
            ? 0.5
            : (sample.value - min) / range;

      return {
        x: chartPaddingX + (sample.index / denominator) * usableWidth,
        y: chartPlotBottom - normalized * usableHeight,
      };
    });

    return {
      ...config,
      path: createSmoothPath(coordinates),
    };
  });
});

const formatMetricTimestamp = (timestamp?: string) => {
  if (!timestamp) return "";

  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Shanghai",
  }).format(new Date(timestamp));
};

const metricXAxisLabels = computed(() => {
  const samples = metricSamples.value;
  const fallbackLabels = [
    { label: "-6H", x: chartPaddingX, anchor: "start" },
    { label: "-3H", x: chartWidth / 2, anchor: "middle" },
    { label: "NOW", x: chartWidth - chartPaddingRight, anchor: "end" },
  ];

  if (!samples.length) return fallbackLabels;

  const first = samples[0];
  const middle = samples[Math.floor((samples.length - 1) / 2)];
  const last = samples[samples.length - 1];

  return [
    { label: formatMetricTimestamp(first.timestamp), x: chartPaddingX, anchor: "start" },
    { label: formatMetricTimestamp(middle.timestamp), x: chartWidth / 2, anchor: "middle" },
    { label: formatMetricTimestamp(last.timestamp), x: chartWidth - chartPaddingRight, anchor: "end" },
  ];
});

const statusLabel = (overall?: string) => {
  if (overall === "up") return "UP";
  if (overall === "down") return "DOWN";
  if (overall === "degraded") return "DEGRADED";
  if (overall === "local") return "LOCAL";
  return "UNKNOWN";
};

const formatLatency = (latency?: number | null) =>
  typeof latency === "number" ? `${Math.round(latency)}ms` : "--";

const serviceTone = (overall?: string) => {
  if (overall === "up") return "is-up";
  if (overall === "down") return "is-down";
  if (overall === "degraded") return "is-degraded";
  if (overall === "local") return "is-local";
  return "is-unknown";
};

const handlePortraitError = (event: Event) => {
  const image = event.target as HTMLImageElement | null;
  if (!image || image.dataset.fallbackApplied === "true") return;

  image.dataset.fallbackApplied = "true";
  image.src = identityImage;
};
</script>

<template>
  <main class="home-page">
    <div class="screen-gate" role="status" aria-live="polite">
      <Icon name="ph:monitor" class="screen-gate-icon" />
      <p class="screen-gate-text screen-gate-resize">请调整屏幕宽度</p>
      <p class="screen-gate-text screen-gate-pc">请使用 PC 端访问</p>
    </div>
    <section class="home-shell" aria-labelledby="home-title">
      <header class="home-hero">
        <div class="hero-copy">
          <h1 id="home-title">Go gentle into that goood night.</h1>
        </div>

        <div class="hero-meta" aria-label="Current profile">
          <span v-for="item in skills" :key="item.label">
            <strong>{{ item.value }}</strong>
            <small>{{ item.label }}</small>
          </span>
        </div>
      </header>

      <section class="card-board" aria-label="Profile and operations overview">
        <article class="panel intro-panel">
          <figure class="portrait-frame">
            <a
              :href="profilePhotoPath"
              target="_blank"
              rel="noreferrer"
              aria-label="Open portrait"
            >
              <img
                :src="profilePhotoPath"
                alt="parallized mirror portrait"
                loading="eager"
                decoding="async"
                @error="handlePortraitError"
              />
            </a>
          </figure>

          <div class="intro-body">
            <p>
              我是一名全栈创意开发工程师。主要的工作围绕设计、开发、探索新的 AI-Native 工具链与 Agents 编排，在此之前有 2 年 AI 与互联网经验，曾在某知名像素风社区游戏以及某是兄弟就来砍我游戏 5 年时间内独自完成全周期相关工作，从 0 到 1000 人同时在线。后续就读数字媒体技术专业在杭州学习建模与技术美术，喜欢会画画的人。
            </p>
            <NuxtLink
              to="/contact"
              class="inline-action"
              aria-label="Go to contact page"
            >
              <span>Contact</span>
              <Icon name="ph:arrow-up-right" class="action-icon" />
            </NuxtLink>
          </div>
        </article>

        <NuxtLink to="/board" class="panel project-callout">
          <div class="callout-head">
            <p class="panel-label">Live work</p>
            <Icon name="ph:arrow-up-right" class="callout-icon" />
          </div>
          <div class="callout-title">
            <h2>
              <span>线上作品集</span>
              <span class="muted-line">遵从 Power to 的能力与表达</span>
            </h2>
          </div>
          <svg
            class="callout-illustration"
            viewBox="0 0 430 270"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <path class="wire faint" d="M48 210 170 146 322 218" />
              <path class="wire faint" d="M72 222 192 158 338 226" />
              <path class="wire faint" d="M95 234 214 170 354 235" />
              <path class="wire faint" d="M122 134v118" stroke-dasharray="4 8" />
              <path class="wire faint" d="M212 102v150" stroke-dasharray="4 8" />
              <path class="wire faint" d="M302 180v64" stroke-dasharray="4 8" />
              <path class="wire" d="M108 194 236 128 326 172 196 241 108 194Z" />
              <path class="wire" d="M108 194v24l88 47 130-70v-23" />
              <path class="wire" d="M196 241v24" />
              <path class="wire" d="M153 194 210 163 256 185 198 216 153 194Z" />
              <path class="wire bold" d="M245 197 285 176" />
              <path class="wire bold" d="M164 218 183 208" />
              <path class="wire" d="M210 226 252 204" />
              <path class="wire" d="M204 116c0-32 37-58 82-58s82 26 82 58-37 58-82 58-82-26-82-58Z" />
              <path class="wire" d="M229 119c0-19 26-35 57-35s57 16 57 35-26 35-57 35-57-16-57-35Z" />
              <path class="wire" d="M204 116v28c0 32 37 58 82 58 25 0 48-8 63-22" />
              <path class="wire" d="M368 146 418 179" />
              <path class="wire bold" d="M346 162 404 202" />
            </g>
          </svg>
        </NuxtLink>

        <article class="panel latency-panel" aria-label="Six hour service metrics">
          <div class="latency-head">
            <div>
              <p class="panel-label">Server 6H</p>
              <h2>核心状态</h2>
            </div>
            <div class="metric-legend" aria-label="Metric legend">
              <span
                v-for="line in metricChartLines"
                :key="line.key"
                :class="line.className"
              >
                {{ line.label }}
              </span>
            </div>
          </div>
          <svg
            class="latency-chart"
            viewBox="0 0 720 220"
            role="img"
            aria-label="CPU, memory, and response trend for the last six hours"
          >
            <path
              v-for="lineY in chartGridLines"
              :key="lineY"
              class="metric-grid-line"
              :d="`M ${chartPaddingX} ${lineY} H ${chartWidth - chartPaddingRight}`"
            />
            <text
              v-for="label in metricYAxisLabels"
              :key="label.label"
              class="metric-axis-label metric-axis-y"
              x="28"
              :y="label.y"
            >
              {{ label.label }}
            </text>
            <text
              v-for="label in metricXAxisLabels"
              :key="`${label.label}-${label.x}`"
              class="metric-axis-label metric-axis-x"
              :x="label.x"
              y="211"
              :text-anchor="label.anchor"
            >
              {{ label.label }}
            </text>
            <path
              v-for="line in metricChartLines"
              v-show="line.path"
              :key="line.key"
              :class="['metric-line', line.className]"
              :d="line.path"
            />
          </svg>
        </article>

        <article class="panel archive-panel">
          <div>
            <h2>服务在线状态</h2>
          </div>
          <div class="archive-metric">
            <strong>{{ serviceTotal ? Math.round((serviceUpTotal / serviceTotal) * 100) : "--" }}%</strong>
            <p>Avg. reachable</p>
          </div>
          <Icon name="ph:hourglass-high" class="archive-icon" />
        </article>

        <article class="panel projects-panel">
          <img
            :src="worksImage"
            alt=""
            class="project-status-backdrop"
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
          <div class="project-status-list">
            <NuxtLink
              v-for="project in projectCards"
              :key="project.id"
              :to="project.to"
              class="project-status-card"
              :class="serviceTone(project.overall)"
            >
              <img
                :src="project.image"
                :alt="`${project.title} ${project.label}`"
                loading="eager"
                decoding="async"
              />
              <span class="project-status-copy">
                <strong>{{ project.title }}</strong>
                <small>{{ project.label }}</small>
              </span>
              <span class="project-status-meta">
                <i aria-hidden="true"></i>
                <Icon
                  :name="project.overall === 'up' ? 'ph:check-circle-fill' : 'ph:spinner-gap-bold'"
                  class="project-status-icon"
                  aria-hidden="true"
                />
              </span>
            </NuxtLink>
          </div>
        </article>

        <NuxtLink to="/contact" class="panel contact-panel">
          <div class="contact-visual" aria-hidden="true">
            <figure class="contact-shot contact-shot-brand">
              <img
                :src="hireImage"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure class="contact-shot contact-shot-main">
              <img
                src="/contact-photo.jpg"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div class="contact-support-grid">
              <figure
                v-for="item in contactVisualImages"
                :key="item.id"
                class="contact-shot contact-shot-support"
                :class="`contact-shot-${item.id}`"
              >
                <img
                  :src="item.image"
                  :alt="item.alt"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
            <div class="contact-palette">
              <span style="--swatch-color: #1f211f"></span>
              <span style="--swatch-color: #7f7770"></span>
              <span style="--swatch-color: #6f7650"></span>
              <span style="--swatch-color: #c6ad3d"></span>
              <span style="--swatch-color: #596c8f"></span>
            </div>
          </div>
          <div class="contact-copy">
            <p class="panel-label">Contact</p>
            <span class="contact-note">杭州 / 可远程协作</span>
          </div>
          <div class="contact-bottom">
            <span class="contact-action">
              联系
              <Icon name="ph:paper-plane-tilt" class="contact-icon" />
            </span>
          </div>
        </NuxtLink>
      </section>
    </section>
  </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;600;700&display=swap");

.home-page {
  --film-grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23grain)' opacity='.82'/%3E%3C/svg%3E");
  min-height: 100vh;
  background:
    radial-gradient(circle at 28% 8%, rgb(32 33 31 / 4%), transparent 28rem),
    #f1f1ee;
  color: #20211f;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
}

@supports (height: 100svh) {
  .home-page {
    min-height: 100svh;
  }
}

.home-shell {
  width: min(100%, 1520px);
  margin: 0 auto;
  padding: clamp(56px, 8vw, 108px) clamp(18px, 5vw, 72px) 116px;
}

.screen-gate {
  display: none;
  min-height: inherit;
  place-items: center;
  align-content: center;
  gap: 18px;
  padding: 28px;
  text-align: center;
}

.screen-gate-icon {
  width: 54px;
  height: 54px;
  color: rgb(32 33 31 / 72%);
}

.screen-gate-text {
  margin: 0;
  color: rgb(32 33 31 / 72%);
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(18px, 5vw, 24px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.04em;
}

.screen-gate-pc {
  display: none;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.34fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: end;
  margin-bottom: clamp(42px, 7vw, 104px);
}

.hero-copy {
  display: grid;
  gap: 26px;
}

.kicker,
.panel-label {
  margin: 0;
  color: #555953;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hero-copy h1 {
  max-width: 930px;
  margin: 0;
  padding-top: 0.08em;
  color: #20211f;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(42px, 5.15vw, 86px);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: 0;
}

.hero-meta {
  display: inline-flex;
  grid-column: 1 / -1;
  align-self: end;
  justify-self: end;
  width: auto;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  color: rgb(32 33 31 / 78%);
  box-shadow: none;
}

.hero-meta span {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 6px;
  min-width: 0;
  padding: 0 22px;
  border-left: 0;
  text-align: center;
}

.hero-meta span:first-child {
  border-left: 0;
  padding-left: 0;
}

.hero-meta span:last-child {
  padding-right: 0;
}

.hero-meta span + span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 3px;
  bottom: 3px;
  width: 1px;
  background: rgb(32 33 31 / 13%);
}

.hero-meta strong {
  overflow: hidden;
  max-width: 100%;
  color: rgb(32 33 31 / 88%);
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: clamp(13px, 0.95vw, 15px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0;
  text-transform: none;
  text-overflow: ellipsis;
  text-shadow: 0 1px 0 rgb(255 255 255 / 62%);
  white-space: nowrap;
}

.hero-meta small {
  overflow: hidden;
  max-width: 100%;
  color: rgb(32 33 31 / 56%);
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-board {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-areas:
    "intro intro intro intro intro intro intro intro project project project project"
    "color color color monitor monitor monitor monitor camera camera camera camera camera"
    "contact contact contact contact contact contact contact camera camera camera camera camera";
  gap: 18px;
  align-items: stretch;
}

.panel {
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(32 33 31 / 8%);
  border-radius: 8px;
  background: rgb(252 252 249 / 78%);
  box-shadow:
    0 18px 48px -42px rgb(15 23 42 / 26%),
    inset 0 1px 0 rgb(255 255 255 / 70%);
}

.intro-panel {
  grid-area: intro;
  display: grid;
  grid-template-columns: minmax(190px, 0.36fr) minmax(0, 1fr);
  align-items: stretch;
  gap: 0;
  height: clamp(280px, 20vw, 310px);
  min-height: 0;
}

.portrait-frame {
  display: grid;
  align-self: stretch;
  min-height: 0;
  margin: 0;
  background: transparent;
}

.portrait-frame a {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
  overflow: hidden;
  isolation: isolate;
}

.portrait-frame a::before,
.contact-shot::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(rgb(128 128 128 / 74%), rgb(128 128 128 / 74%)),
    var(--film-grain);
  background-size: auto, 86px 86px;
  background-blend-mode: overlay, normal;
  mix-blend-mode: soft-light;
  opacity: 0.36;
  filter: contrast(2.1);
}

.portrait-frame img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: cover;
  object-position: 42% 44%;
  filter: saturate(0.82) contrast(0.98);
}

.intro-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  padding: clamp(20px, 2.1vw, 28px) clamp(18px, 2.2vw, 28px) clamp(16px, 1.8vw, 22px);
}

.intro-body p {
  max-width: 680px;
  margin: 0;
  color: #343731;
  font-size: clamp(14px, 0.98vw, 16px);
  line-height: 1.78;
}

.inline-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: fit-content;
  min-height: 44px;
  padding: 0 18px 0 20px;
  border: 1px solid rgb(32 33 31 / 8%);
  border-radius: 999px;
  background: #ebeDEA;
  color: #20211f;
  font-size: 14px;
  font-weight: 650;
  text-decoration: none;
  transition:
    background-color 220ms ease,
    transform 220ms ease;
}

.inline-action:hover,
.inline-action:focus-visible {
  background: #dedfda;
  transform: translateY(-1px);
}

.action-icon,
.callout-icon,
.contact-icon {
  width: 20px;
  height: 20px;
  flex: none;
}

.project-callout {
  grid-area: project;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 22px;
  min-height: 0;
  padding: clamp(24px, 2.4vw, 34px);
  border-color: rgb(32 33 31 / 8%);
  background: rgb(252 252 249 / 90%);
  color: #20211f;
  text-decoration: none;
  isolation: isolate;
  box-shadow:
    0 18px 48px -42px rgb(15 23 42 / 26%),
    inset 0 1px 0 rgb(255 255 255 / 76%);
}

.callout-head,
.code-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.code-head span {
  color: #777a72;
  font-size: 13px;
  font-weight: 600;
}

.projects-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.62;
  pointer-events: none;
  background-image:
    linear-gradient(rgb(32 33 31 / 4%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(32 33 31 / 4%) 1px, transparent 1px);
  background-size: 18px 18px;
}

.projects-panel > * {
  position: relative;
  z-index: 1;
}

.project-callout::before {
  content: "";
  position: absolute;
  inset: auto -12% -22% 34%;
  z-index: -1;
  width: 84%;
  aspect-ratio: 1;
  border-radius: 999px;
  background: radial-gradient(circle, rgb(32 33 31 / 5%), transparent 62%);
  pointer-events: none;
}

.project-callout > * {
  position: relative;
  z-index: 1;
}

.project-callout .panel-label {
  color: #666a62;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.project-callout .callout-icon {
  color: #3c4039;
}

.callout-title {
  max-width: 360px;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  letter-spacing: 0;
}

.callout-title h2 {
  display: grid;
  gap: 4px;
  margin: 0;
  color: #20211f;
  font-size: clamp(24px, 2.15vw, 34px);
  font-weight: 500;
  line-height: 1.12;
}

.callout-title .muted-line {
  color: rgb(32 33 31 / 38%);
  line-height: 1.16;
}

.callout-illustration {
  position: absolute;
  right: -54px;
  bottom: -38px;
  z-index: 0;
  width: min(68%, 360px);
  color: rgb(32 33 31 / 82%);
  pointer-events: none;
}

.callout-illustration .wire {
  stroke-width: 2.2;
}

.callout-illustration .bold {
  stroke-width: 6;
}

.callout-illustration .faint {
  opacity: 0.22;
  stroke-width: 1.2;
}

.project-callout p:last-child {
  max-width: 420px;
  margin: 0;
  color: #4c5049;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: 14px;
  line-height: 1.72;
}

.status-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.status-summary span {
  display: grid;
  gap: 7px;
  min-height: 86px;
  padding: 14px;
  border: 1px solid rgb(32 33 31 / 8%);
  border-radius: 7px;
  background: rgb(255 255 255 / 45%);
  color: #6a6d66;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 11px;
  line-height: 1.3;
  text-transform: uppercase;
}

.status-summary strong {
  color: #20211f;
  font-size: clamp(17px, 1.55vw, 23px);
  font-weight: 800;
  line-height: 1;
  text-transform: none;
}

.monitor-panel {
  grid-area: monitor;
  display: flex;
  align-items: center;
  min-height: 92px;
  padding: 14px 18px;
  border-color: #0b0b0a;
  background: #050505;
  box-shadow:
    0 18px 42px -34px rgb(0 0 0 / 42%),
    inset 0 1px 0 rgb(255 255 255 / 8%);
}

.monitor-strip {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 18px;
  overflow: hidden;
  color: #f4f4ef;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: clamp(13px, 1.2vw, 17px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.13em;
  white-space: nowrap;
}

.latency-panel,
.archive-panel,
.projects-panel,
.host-panel,
.contact-panel {
  padding: 20px;
}

.latency-panel {
  grid-area: monitor;
  display: grid;
  align-content: space-between;
  gap: 12px;
  min-height: 250px;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 72%), rgb(250 249 244 / 92%)),
    #f7f5ee;
}

.latency-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.latency-head h2 {
  margin: 8px 0 0;
  color: #303229;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: clamp(17px, 1.65vw, 23px);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: 0.04em;
}

.metric-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: nowrap;
  white-space: nowrap;
}

.metric-legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #686b61;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.metric-legend span::before {
  content: "";
  width: 17px;
  height: 3px;
  border-radius: 999px;
  background: currentColor;
}

.metric-legend .is-cpu {
  color: #8f45df;
}

.metric-legend .is-mem {
  color: #6f91e8;
}

.metric-legend .is-response {
  color: #e85f83;
}

.latency-chart {
  display: block;
  width: 100%;
  min-height: 156px;
  overflow: visible;
}

.metric-grid-line {
  fill: none;
  stroke: rgb(32 33 31 / 8%);
  stroke-dasharray: 2 9;
  stroke-linecap: round;
  stroke-width: 0.85;
}

.metric-axis-label {
  fill: rgb(67 70 62 / 58%);
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.metric-axis-y {
  dominant-baseline: middle;
  text-anchor: end;
}

.metric-axis-x {
  dominant-baseline: hanging;
}

.metric-line {
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 22 7;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.8;
  filter: drop-shadow(0 7px 10px rgb(32 33 31 / 8%));
}

.metric-line.is-cpu {
  color: #8f45df;
}

.metric-line.is-mem {
  color: #7fa0ee;
}

.metric-line.is-response {
  color: #ed6688;
}

.archive-panel {
  grid-area: color;
  display: grid;
  align-content: space-between;
  gap: 16px;
  min-height: 230px;
  border-color: rgb(255 255 255 / 54%);
  background:
    radial-gradient(circle at 18% 12%, rgb(255 207 191 / 95%), transparent 36%),
    radial-gradient(circle at 50% 28%, rgb(244 160 219 / 68%), transparent 34%),
    radial-gradient(circle at 89% 26%, rgb(132 193 255 / 86%), transparent 37%),
    radial-gradient(circle at 82% 84%, rgb(218 242 249 / 88%), transparent 42%),
    linear-gradient(135deg, #ffe5d8 0%, #ffd7e7 42%, #9dccff 100%);
  box-shadow:
    0 20px 52px -38px rgb(15 23 42 / 32%),
    inset 0 1px 0 rgb(255 255 255 / 68%);
}

.archive-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(rgb(128 128 128 / 74%), rgb(128 128 128 / 74%)),
    var(--film-grain);
  background-size: auto, 78px 78px;
  background-blend-mode: overlay, normal;
  mix-blend-mode: soft-light;
  opacity: 0.34;
  filter: contrast(2.05);
}

.archive-panel > div,
.archive-icon {
  z-index: 1;
}

.archive-panel h2 {
  max-width: 190px;
  margin: 0;
  color: rgb(22 23 19 / 86%);
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(22px, 1.8vw, 27px);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: 0;
  text-shadow:
    0 1px 0 rgb(255 255 255 / 44%),
    0 8px 22px rgb(255 255 255 / 18%);
}

.archive-metric {
  display: grid;
  justify-items: start;
  gap: 4px;
}

.archive-panel p {
  margin: 0;
  color: rgb(22 23 19 / 64%);
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  text-shadow: 0 1px 0 rgb(255 255 255 / 34%);
}

.archive-panel strong {
  color: rgb(5 5 4 / 82%);
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(39px, 3.45vw, 52px);
  font-weight: 600;
  line-height: 0.88;
  letter-spacing: -0.02em;
  text-shadow:
    0 1px 0 rgb(255 255 255 / 52%),
    0 10px 28px rgb(255 255 255 / 20%);
}

.archive-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  padding: 13px;
  border-radius: 999px;
  background: rgb(255 255 255 / 24%);
  color: rgb(22 23 19 / 70%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 36%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.host-panel {
  grid-area: color;
  display: grid;
  align-content: space-between;
  gap: 22px;
  min-height: 230px;
}

.quiet-status {
  color: #777a72;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.host-meter-list {
  display: grid;
  gap: 14px;
}

.host-meter {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 7px 14px;
  color: #666a62;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.host-meter strong {
  color: #20211f;
  font-size: 16px;
  line-height: 1;
}

.host-meter small {
  grid-column: 1;
  color: #898c84;
  font-size: 11px;
  font-weight: 600;
  text-transform: none;
}

.host-meter i {
  grid-column: 1 / -1;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(32 33 31 / 8%);
}

.host-meter i::before {
  content: "";
  display: block;
  width: var(--metric-value);
  height: 100%;
  border-radius: inherit;
  background: #20211f;
}

.panel-footnote {
  margin: 0;
  color: #757870;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: 13px;
  line-height: 1.62;
}

.projects-panel {
  grid-area: camera;
  align-self: start;
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 0;
  padding: clamp(74px, 8vw, 118px) 28px;
  border: 0;
  border-radius: 18px;
  background: #121416;
  box-shadow: none;
  isolation: isolate;
}

.panel-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}

.project-status-list {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: min(420px, 100%);
}

.project-status-backdrop {
  position: absolute;
  inset: -8%;
  z-index: 0;
  display: block;
  width: 116%;
  height: 116%;
  object-fit: cover;
  object-position: 50% 50%;
  filter: blur(26px) saturate(1.05) contrast(1.08) brightness(0.54);
  transform: scale(1.08);
}

.projects-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(circle at 76% 14%, rgb(255 176 118 / 30%), transparent 31%),
    radial-gradient(circle at 20% 0%, rgb(194 117 153 / 25%), transparent 34%),
    linear-gradient(180deg, rgb(7 9 11 / 8%), rgb(4 6 8 / 56%)),
    linear-gradient(90deg, rgb(5 7 9 / 62%), transparent 44%, rgb(5 7 9 / 42%));
}

.project-status-card {
  position: relative;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 28px;
  align-items: center;
  gap: 13px;
  min-height: 70px;
  padding: 10px 14px 10px 11px;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 17px;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 12%), rgb(255 255 255 / 5%)),
    rgb(18 22 25 / 42%);
  color: rgb(255 255 255 / 90%);
  text-decoration: none;
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 16%),
    0 18px 42px -30px rgb(0 0 0 / 80%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition:
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;
}

.project-status-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgb(128 128 128 / 58%), rgb(128 128 128 / 58%)),
    var(--film-grain);
  background-size: auto, 74px 74px;
  background-blend-mode: overlay, normal;
  mix-blend-mode: soft-light;
  opacity: 0.18;
  filter: contrast(1.95);
}

.project-status-card:hover,
.project-status-card:focus-visible {
  border-color: rgb(255 255 255 / 24%);
  background:
    linear-gradient(180deg, rgb(255 255 255 / 17%), rgb(255 255 255 / 7%)),
    rgb(18 22 25 / 48%);
  transform: translateY(-1px);
}

.project-status-card > * {
  position: relative;
  z-index: 1;
}

.project-status-card img {
  display: block;
  width: 48px;
  height: 48px;
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 9px;
  background:
    linear-gradient(135deg, rgb(238 238 232 / 48%), rgb(250 250 246 / 18%));
  object-fit: cover;
  filter: saturate(0.9) contrast(0.98);
}

.project-status-copy {
  display: grid;
  gap: 6px;
  min-width: 0;
}

.project-status-copy strong {
  overflow: hidden;
  color: rgb(255 255 255 / 94%);
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-status-copy small {
  overflow: hidden;
  color: rgb(255 255 255 / 62%);
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-status-meta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #36e0b4;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 18px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.project-status-meta i {
  display: none;
}

.project-status-icon {
  width: 18px;
  height: 18px;
}

.project-status-card.is-down .project-status-meta {
  color: #ff9ca2;
}

.project-status-card.is-degraded .project-status-meta,
.project-status-card.is-unknown .project-status-meta {
  color: #f2c45f;
}

.contact-panel {
  grid-area: contact;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  align-content: stretch;
  gap: 16px;
  min-height: 350px;
  padding: 0;
  color: #20211f;
  text-decoration: none;
}

.contact-visual {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  grid-template-rows: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 0;
  min-height: 224px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #ece7df;
  box-shadow: none;
}

.contact-shot-brand {
  margin: 0;
}

.contact-shot {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #e8e6dc;
  box-shadow: none;
}

.contact-shot-main {
  grid-column: 2;
  grid-row: 1;
  margin: 0;
}

.contact-shot::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 3;
  background:
    linear-gradient(180deg, rgb(10 11 10 / 2%), rgb(10 11 10 / 20%)),
    radial-gradient(circle at 20% 15%, rgb(255 255 255 / 22%), transparent 38%);
  pointer-events: none;
}

.contact-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.88) contrast(0.96);
}

.contact-shot-main img {
  object-position: 54% 48%;
}

.contact-shot-brand img {
  object-position: 50% 58%;
}

.contact-support-grid {
  grid-column: 1 / -1;
  grid-row: 2;
  display: grid;
  grid-template-columns: 0.76fr 1fr 1fr;
  gap: 0;
  min-width: 0;
  min-height: 0;
}

.contact-shot-support {
  margin: 0;
}

.contact-shot-background img {
  object-position: 50% 52%;
}

.contact-shot-identity img {
  object-position: 50% 48%;
}

.contact-shot-works img {
  object-position: 58% 50%;
}

.contact-palette {
  position: absolute;
  z-index: 6;
  left: 27.55%;
  top: 54%;
  bottom: 0;
  display: grid;
  grid-template-rows: repeat(5, minmax(0, 1fr));
  width: 14px;
}

.contact-palette span {
  display: block;
  min-width: 0;
  border: 0;
  border-radius: 0;
  background: var(--swatch-color);
  box-shadow: none;
}

.contact-copy,
.contact-bottom {
  padding-inline: 24px;
}

.contact-note {
  display: block;
  margin-top: 14px;
  color: #757870;
  font-size: 14px;
}

.contact-bottom {
  display: grid;
  align-self: end;
  gap: 14px;
  padding-bottom: 24px;
}

.contact-bottom strong {
  color: #343731;
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
  font-size: clamp(18px, 1.35vw, 21px);
  font-weight: 400;
  line-height: 1.22;
  overflow-wrap: anywhere;
}

.contact-action {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: fit-content;
  min-height: 40px;
  padding: 0 14px 0 16px;
  border-radius: 999px;
  background: #20211f;
  color: #f4f4ef;
  font-size: 14px;
}

.contact-action .contact-icon {
  color: currentColor;
}

@media (max-width: 980px) {
  .home-page {
    display: grid;
    min-height: 100vh;
  }

  .home-shell {
    display: none;
  }

  .screen-gate {
    display: grid;
  }
}

@supports (height: 100svh) {
  @media (max-width: 980px) {
    .home-page {
      min-height: 100svh;
    }
  }
}

@media (max-width: 760px), (max-width: 980px) and (hover: none), (max-width: 980px) and (pointer: coarse) {
  .screen-gate-resize {
    display: none;
  }

  .screen-gate-pc {
    display: block;
  }
}

@media (max-width: 1180px) {
  .home-hero {
    grid-template-columns: 1fr;
  }

  .card-board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "intro intro"
      "project monitor"
      "color contact"
      "camera camera";
  }

  .project-callout {
    min-height: 280px;
  }

  .intro-panel {
    height: auto;
    min-height: 320px;
  }

  .status-summary {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 760px) {
  .home-shell {
    padding-inline: 14px;
    padding-top: 42px;
  }

  .home-hero {
    margin-bottom: 32px;
  }

  .kicker,
  .panel-label {
    font-size: 11px;
  }

  .intro-panel {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 0;
  }

  .portrait-frame img {
    min-height: 0;
    aspect-ratio: 1 / 1;
  }

  .card-board {
    grid-template-columns: 1fr;
    grid-template-areas:
      "intro"
      "project"
      "monitor"
      "color"
      "camera"
      "contact";
  }

  .monitor-strip {
    flex-direction: column;
  }

  .archive-panel,
  .latency-panel,
  .host-panel,
  .contact-panel {
    min-height: 210px;
  }

  .latency-head,
  .panel-topline {
    align-items: start;
    flex-direction: column;
  }

  .metric-legend {
    justify-content: start;
  }

}
</style>
