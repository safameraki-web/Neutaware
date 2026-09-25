const base = import.meta.env.BASE_URL;

export default function Slide01() {
  return <div className="relative w-screen h-screen overflow-hidden bg-bg text-text font-body"><div className="cover-layout"><div className="cover-content"><img src={`${base}neutaware-logo.png`} crossOrigin="anonymous" alt="Neutaware logo" className="cover-logo"/><div className="cover-rule"/><h1 className="cover-title">Neutaware</h1><p className="cover-tagline">Intelligence. Governance. Impact.</p></div><div className="cover-photo"><img src={`${base}intelligence-network.jpg`} crossOrigin="anonymous" alt="Abstract blue intelligence network" className="cover-image"/></div></div></div>;
}