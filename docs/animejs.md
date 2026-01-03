# Anime.js Documentation

(Partial content fetched from https://animejs.com/documentation/getting-started)

## Getting Started

This section covers how to download, install and import Anime.js in your project.

### Installation

```bash
npm install animejs
```

### Module imports

```javascript
import anime from 'animejs/lib/anime.es.js';
```

### Usage with React

```javascript
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimeComponent = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = anime({
      targets: '.el',
      translateX: 250,
      rotate: '1turn',
      backgroundColor: '#FFF',
      duration: 800
    });
  }, []);

  return <div className="el" />;
};
```

## Key Concepts

Anime.js can animate:
*   CSS Properties
*   CSS Transforms
*   SVG Attributes
*   DOM Attributes
*   JavaScript Objects

### Targets

```javascript
anime({
  targets: '.css-selector',
  translateX: 250
});

anime({
  targets: domNode,
  translateX: 250
});
```

### Properties

```javascript
anime({
  targets: '.el',
  translateX: {
    value: 250,
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});
```

### Timeline

```javascript
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '.el.01',
  translateX: 250,
})
.add({
  targets: '.el.02',
  translateX: 250,
}, '-=600') // relative offset
.add({
  targets: '.el.03',
  translateX: 250,
}, 400); // absolute offset
```

*Note: This is a summary. Please refer to the official documentation for the full API.*
