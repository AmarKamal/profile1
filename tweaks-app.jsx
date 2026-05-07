/* global React, ReactDOM, TweaksPanel, TweakSection, TweakColor, TweakSlider, TweakRadio, TweakToggle, TweakText, useTweaks */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3b82f6",
  "fontScale": 1,
  "gridOverlay": true,
  "monoNav": true,
  "headline": "Amar bin Mohd Kamal"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to the page
  useEffect(() => {
    const root = document.documentElement;
    // Accent palette swap
    const hex = t.accent || '#3b82f6';
    root.style.setProperty('--accent', hex);
    // derive a slightly lighter accent-2 by mixing with white
    root.style.setProperty('--accent-2', hex);
    root.style.setProperty('--accent-soft', hex + '1f');
    root.style.setProperty('--accent-glow', hex + '5a');

    // Font scale on body
    document.body.style.fontSize = (t.fontScale || 1) * 16 + 'px';

    // Grid overlay
    document.body.style.setProperty(
      '--grid',
      t.gridOverlay ? 'rgba(255,255,255,0.04)' : 'transparent'
    );

    // Mono nav toggle
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.style.fontFamily = t.monoNav ? 'var(--mono)' : 'var(--sans)';
    }

    // Headline rewrite (split across line break, keep "Kamal" accent if last word)
    const h1 = document.querySelector('.hero h1');
    if (h1 && t.headline) {
      const words = t.headline.trim().split(/\s+/);
      const last = words.pop();
      const rest = words.join(' ');
      h1.innerHTML =
        (rest ? rest + '<br />' : '') +
        '<span class="accent">' + last + '</span>' +
        '<span class="blink"></span>';
    }
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Look">
        <TweakColor
          label="Accent color"
          value={t.accent}
          onChange={v => setTweak('accent', v)}
          options={['#3b82f6', '#22d3ee', '#a855f7', '#22c55e', '#f97316', '#ef4444']}
        />
        <TweakToggle
          label="Grid overlay"
          value={t.gridOverlay}
          onChange={v => setTweak('gridOverlay', v)}
        />
        <TweakToggle
          label="Monospace nav"
          value={t.monoNav}
          onChange={v => setTweak('monoNav', v)}
        />
      </TweakSection>
      <TweakSection title="Typography">
        <TweakSlider
          label="Font scale"
          value={t.fontScale}
          min={0.85}
          max={1.2}
          step={0.05}
          onChange={v => setTweak('fontScale', v)}
        />
      </TweakSection>
      <TweakSection title="Content">
        <TweakText
          label="Headline"
          value={t.headline}
          onChange={v => setTweak('headline', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<TweaksApp />);
