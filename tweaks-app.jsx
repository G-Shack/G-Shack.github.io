// Kanch Tweaks panel — theme, palette, hero layout, headline
const { useEffect } = React;

// Migrate any old multi-line headline into the two-line shape.
const RAW = window.__KANCH_DEFAULTS || {};
const DEFAULTS = (() => {
  const out = { ...RAW };
  if (!out.headlineLine1 || !out.headlineLine2) {
    const h = (out.headline || 'Invoicing,\nbuilt for glass.').split('\n');
    out.headlineLine1 = out.headlineLine1 || h[0] || 'Invoicing,';
    out.headlineLine2 = out.headlineLine2 || h.slice(1).join(' ') || 'built for glass.';
  }
  delete out.headline;
  return out;
})();

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function applyTweaks(t) {
  document.body.setAttribute('data-theme', t.theme);
  document.body.setAttribute('data-palette', t.palette);
  document.body.setAttribute('data-hero', t.heroLayout);
  const h1 = document.getElementById('hero-headline');
  if (h1) {
    h1.innerHTML = `${escapeHtml(t.headlineLine1)}\n<em>${escapeHtml(t.headlineLine2)}</em>`;
  }
}

function KanchTweaks() {
  const [t, setTweak] = useTweaks(DEFAULTS);

  useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio
          label="Mode"
          value={t.theme}
          onChange={v => setTweak('theme', v)}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark',  label: 'Dark'  },
          ]}
        />
        <TweakSelect
          label="Accent"
          value={t.palette}
          onChange={v => setTweak('palette', v)}
          options={[
            { value: 'ink',    label: 'Ink blue (default)' },
            { value: 'warm',   label: 'Terracotta'         },
            { value: 'forest', label: 'Forest'             },
            { value: 'plum',   label: 'Plum'               },
          ]}
        />
      </TweakSection>

      <TweakSection label="Hero">
        <TweakRadio
          label="Layout"
          value={t.heroLayout}
          onChange={v => setTweak('heroLayout', v)}
          options={[
            { value: 'split',    label: 'Split'    },
            { value: 'centered', label: 'Centered' },
          ]}
        />
        <TweakText
          label="Line 1"
          value={t.headlineLine1}
          onChange={v => setTweak('headlineLine1', v)}
        />
        <TweakText
          label="Line 2"
          value={t.headlineLine2}
          onChange={v => setTweak('headlineLine2', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// Apply defaults on first paint, even if panel hidden
applyTweaks(DEFAULTS);

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<KanchTweaks />);
