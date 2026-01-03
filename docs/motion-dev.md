# Motion.dev Documentation

(Partial content fetched from https://motion.dev/docs)

## Quick Start

Motion is an animation library that's easy to start and fun to master. Its unique hybrid engine combines the performance of the browser with the limitless potential of a JavaScript engine.

### Install

```bash
npm install motion
```

### Usage

```javascript
import { animate } from "motion"

animate(".box", { rotate: 360 })
```

### Motion for React

Motion for React is a React animation library for building smooth, production-grade UI animations.

```bash
npm install motion
```

```javascript
import { motion } from "motion/react"

export const MyComponent = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 2 }}
  />
)
```

### Core Features

#### `animate` function (Vanilla JS)

The `animate` function is the core of Motion's vanilla JS API.

```javascript
import { animate } from "motion"

animate(
  ".box",
  { x: 100, opacity: 1 },
  { duration: 0.5, easing: "ease-out" }
)
```

#### `<motion />` component (React)

The core of Motion's React API. It supports:
*   `initial`: Initial state
*   `animate`: Target state
*   `exit`: Exit state (requires `AnimatePresence`)
*   `transition`: Animation configuration
*   `variants`: Orchestration

```javascript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
/>
```

#### Scroll Animations

Motion supports scroll-linked and scroll-triggered animations.

**Scroll-linked (React hook):**
```javascript
const { scrollYProgress } = useScroll()
return <motion.div style={{ scaleX: scrollYProgress }} />
```

**Scroll-triggered (prop):**
```javascript
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
/>
```

### Transitions

Supported easing functions:
*   `linear`
*   `easeIn`, `easeOut`, `easeInOut`
*   `circIn`, `circOut`, `circInOut`
*   `backIn`, `backOut`, `backInOut`
*   `anticipate`

Spring animations are also supported by setting `type: "spring"`.

### Layout Animations

Motion can automatically animate layout changes (reordering, resizing) using FLIP.

```javascript
<motion.div layout />
```

*Note: This is a summary. Please refer to the official documentation for the full API.*
