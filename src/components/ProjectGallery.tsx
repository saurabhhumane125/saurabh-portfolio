import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, X } from 'lucide-react';

type Screenshot = { src: string; label: string; alt: string };
const assets = import.meta.glob('/src/assets/projects/*.{png,jpg,jpeg,webp}', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>;

export function getProjectScreenshots(project: string): Screenshot[] {
  const screens = project === 'Trove' ? [
    ['trove-showcase', 'Project showcase', 'Trove presentation composed from the supplied document dashboard and family profile screenshots'],
    ['trove-dashboard', 'Document dashboard', 'Trove document dashboard with secure vault summary, storage usage, and recent documents'],
    ['trove-family', 'Family profiles', 'Trove family member selection screen'],
    ['trove-splash', 'Welcome screen', 'Trove welcome screen with its lock icon and Keep what matters tagline'],
  ] : [
    ['tradox-showcase', 'Project showcase', 'Tradox presentation based on the supplied market overview and stock research screenshots'],
    ['tradox-overview', 'Market overview', 'Tradox market research overview with signal watch and news wire'],
    ['tradox-stock', 'Stock research', 'Tradox stock research screen with price chart and model decision support'],
    ['tradox-launch', 'Launch screen', 'Tradox launch screen with Clarity before every trade tagline'],
  ];
  return screens.flatMap(([name, label, alt]) => {
    const src = Object.entries(assets).find(([path]) => path.match(new RegExp(`/${name}\\.(png|jpe?g|webp)$`)))?.[1];
    return src ? [{ src, label, alt }] : [];
  });
}

export default function ProjectGallery({ project, images }: { project: string; images: Screenshot[] }) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const image = images[selected];
  const shift = (direction: number) => setSelected(current => (current + direction + images.length) % images.length);
  return <div className={`project-gallery ${project === 'Trove' ? 'phone-gallery' : 'desktop-gallery'}`}>
    <div className="gallery-topline"><span>{project.toUpperCase()} / {image.label === 'Project showcase' ? 'PROJECT SHOWCASE' : 'PRODUCT SCREENS'}</span><span>{String(selected + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></div>
    <button className="gallery-open" type="button" aria-label={`Enlarge ${project}: ${image.label}`} onClick={() => dialog.current?.showModal()}>
      <span className={`screenshot-frame ${image.label === 'Project showcase' ? 'showcase-frame' : ''}`}><img src={image.src} alt={image.alt} loading="lazy" /></span>
      <span className="gallery-expand"><Expand size={14} /> Enlarge</span>
    </button>
    {images.length > 1 && <div className="gallery-choices" role="group" aria-label={`${project} screenshots`}>{images.map((item, index) => <button key={item.src} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}</div>}
    <dialog className="screenshot-dialog" ref={dialog} aria-label={`${project} screenshot viewer`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); shift(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); shift(-1); }
    }}>
      <div className="screenshot-dialog-body"><div className="screenshot-dialog-header"><div><strong>{project}</strong><span>{image.label}</span></div><button type="button" aria-label="Close screenshot viewer" onClick={() => dialog.current?.close()}><X size={21} /></button></div><div className="screenshot-full"><img src={image.src} alt={image.alt} /></div><div className="screenshot-dialog-footer">{images.length > 1 && <><button type="button" aria-label="Previous screenshot" onClick={() => shift(-1)}><ArrowLeft size={19} /></button><span>{selected + 1} / {images.length}</span><button type="button" aria-label="Next screenshot" onClick={() => shift(1)}><ArrowRight size={19} /></button></>}<a href={image.src} target="_blank" rel="noopener noreferrer">Open image <ArrowUpRight size={14} /></a></div></div>
    </dialog>
  </div>;
}
