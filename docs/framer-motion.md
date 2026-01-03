# Framer Motion Documentation

(Partial content fetched from https://www.framer.com/motion/)

*Note: Framer Motion is now `motion` (Motion for React). See `motion-dev.md` for the latest documentation. This file retains older Framer Motion specific context if needed.*

## Introduction

Motion is a production-ready motion library for React. It brings the power of the Framer Motion API to a wider range of platforms.

### Installation

```bash
npm install framer-motion
```

### Usage

```javascript
import { motion } from "framer-motion"

export const MyComponent = () => (
  <motion.div
    animate={{ scale: 2 }}
    transition={{ duration: 0.5 }}
  />
)
```

### Key Features

*   **Declarative Animation:** Animate via simple props like `animate` and `initial`.
*   **Gestures:** Powerful gesture recognition with `whileHover`, `whileTap`, `whileDrag`.
*   **Variants:** Orchestrate animations across component trees.
*   **Scroll Animations:** `whileInView` and `useScroll`.
*   **Layout Animations:** Automatic layout animations with `layout` prop.

### Animation

```javascript
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: "easeOut", duration: 2 }}
/>
```

### Variants

```javascript
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

<motion.div
  initial="hidden"
  animate="visible"
  variants={variants}
/>
```

### Gestures

```javascript
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
/>
```

*Note: Framer Motion documentation and Motion.dev documentation are largely overlapping as Motion is the successor.*
