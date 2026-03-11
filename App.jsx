import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MOTIVADORES = [
  { id:1,  nome:"Curiosidade",     emoji:"🔍", cor:"#6366f1", desc:"Explorar e aprender" },
  { id:2,  nome:"Honra",           emoji:"🏅", cor:"#f59e0b", desc:"Seguir valores e ética" },
  { id:3,  nome:"Aceitação",       emoji:"🤝", cor:"#10b981", desc:"Ser aceito e aprovado" },
  { id:4,  nome:"Maestria",        emoji:"⚡", cor:"#f87171", desc:"Ser bom no que faz" },
  { id:5,  nome:"Poder",           emoji:"👑", cor:"#8b5cf6", desc:"Influenciar e liderar" },
  { id:6,  nome:"Liberdade",       emoji:"🕊️", cor:"#06b6d4", desc:"Autonomia e independência" },
  { id:7,  nome:"Relacionamentos", emoji:"❤️", cor:"#ec4899", desc:"Vínculos e conexões" },
  { id:8,  nome:"Ordem",           emoji:"📐", cor:"#84cc16", desc:"Estrutura e previsibilidade" },
  { id:9,  nome:"Meta",            emoji:"🎯", cor:"#f97316", desc:"Propósito e objetivos" },
  { id:10, nome:"Status",          emoji:"⭐", cor:"#eab308", desc:"Reconhecimento e prestígio" },
];
const impactoOptions = [
  { val:"muito_positivo", label:"⬆⬆", desc:"Muito positivo", cor:"#10b981" },
  { val:"positivo",       label:"⬆",  desc:"Positivo",       cor:"#6ee7b7" },
  { val:"neutro",         label:"◼",  desc:"Neutro",         cor:"#888"    },
  { val:"negativo",       label:"⬇",  desc:"Negativo",       cor:"#fbbf24" },
  { val:"muito_negativo", label:"⬇⬇", desc:"Muito negativo", cor:"#f87171" },
];
const getImpEmoji = (v) => ({ muito_positivo:"⬆⬆", positivo:"⬆", neutro:"◼", negativo:"⬇", muito_negativo:"⬇⬇" })[v] || "◼";
const getImpCor   = (v) => ({ muito_positivo:"#10b981", positivo:"#6ee7b7", neutro:"#888", negativo:"#fbbf24", muito_negativo:"#f87171" })[v] || "#888";
const getImpLabel = (v) => ({ muito_positivo:"Muito positivo", positivo:"Positivo", neutro:"Neutro", negativo:"Negativo/pouco atendido", muito_negativo:"Muito negativo" })[v] || "Neutro";
const impScore    = (v) => ({ muito_positivo:2, positivo:1, neutro:0, negativo:-1, muito_negativo:-2 })[v] || 0;
const posScore    = (ordem, id) => { const i = ordem.indexOf(id); return i === -1 ? 0 : MOTIVADORES.length - i; };

const MM_RESULTADOS = {
  1: { ordem:[3,7,6,1,9,4,8,2,5,10], impacto:{ 1:"positivo",2:"neutro",3:"muito_positivo",4:"positivo",5:"neutro",6:"positivo",7:"muito_positivo",8:"neutro",9:"positivo",10:"negativo" } },
  2: { ordem:[4,1,9,6,5,8,2,3,7,10], impacto:{ 1:"muito_positivo",2:"neutro",3:"neutro",4:"muito_positivo",5:"positivo",6:"muito_positivo",7:"negativo",8:"positivo",9:"muito_positivo",10:"neutro" } },
  3: { ordem:[5,9,1,4,6,2,8,3,7,10], impacto:{ 1:"positivo",2:"positivo",3:"neutro",4:"positivo",5:"positivo",6:"positivo",7:"neutro",8:"neutro",9:"positivo",10:"negativo" } },
  4: { ordem:[7,3,1,6,9,4,2,8,5,10], impacto:{ 1:"positivo",2:"negativo",3:"muito_positivo",4:"neutro",5:"negativo",6:"muito_positivo",7:"muito_positivo",8:"neutro",9:"neutro",10:"negativo" } },
  101: { ordem:[5,9,1,4,6,2,8,3,7,10], impacto:{ 1:"positivo",2:"positivo",3:"neutro",4:"positivo",5:"muito_positivo",6:"positivo",7:"neutro",8:"neutro",9:"positivo",10:"negativo" } },
};

const COMPETENCIAS = ["Comunicação","Liderança","Trabalho em Equipe","Resolução de Problemas","Pensamento Crítico","Inovação","Gestão do Tempo","Orientação a Resultados","Adaptabilidade","Inteligência Emocional"];
const FERRAMENTAS = [
  { id:2, nome:"Análise SWOT",           icone:"🎯", desc:"Mapeie forças, fraquezas, oportunidades e ameaças pessoais", tipo:"estratégia"      },
  { id:7, nome:"Moving Motivators",      icone:"🃏", desc:"Descubra e avalie seus motivadores intrínsecos",              tipo:"motivação"       },
  { id:8, nome:"Mapa de Competências",   icone:"🗺️", desc:"Avalie seu nível nas competências definidas pelo time",       tipo:"autoconhecimento" },
  { id:6, nome:"Mapa de Carreira",       icone:"🗺️", desc:"Visualize seu caminho de evolução profissional",             tipo:"carreira"        },
];
const TRILHAS = [
  { id:1, nome:"Liderança",        icone:"👑", cor:"#f59e0b", desc:"Desenvolva habilidades de gestão e influência" },
  { id:2, nome:"Especialista",     icone:"⚡", cor:"#6366f1", desc:"Aprofunde conhecimento técnico na sua área"    },
  { id:3, nome:"Empreendedorismo", icone:"🚀", cor:"#10b981", desc:"Inove e crie novos negócios e soluções"        },
  { id:4, nome:"Bem-estar",        icone:"🌿", cor:"#ec4899", desc:"Equilíbrio entre vida pessoal e profissional"  },
];

const appState = {
  users: [
    { id:1, name:"Ana Souza",      email:"ana@empresa.com",     password:"123",      role:"colaborador",  cargo:"Analista de Marketing", area:"Marketing",   gestor:3, avatar:"AS", nivel:"Pleno",    tempo:"2 anos" },
    { id:2, name:"Carlos Lima",    email:"carlos@empresa.com",  password:"123",      role:"colaborador",  cargo:"Dev Frontend",          area:"Tecnologia",  gestor:3, avatar:"CL", nivel:"Sênior",   tempo:"4 anos" },
    { id:3, name:"Beatriz Ramos",  email:"bea@empresa.com",     password:"123",      role:"gestor_time",  cargo:"Tech Lead",             area:"Tecnologia",  gestor:5, avatar:"BR", nivel:"Liderança", tempo:"6 anos" },
    { id:4, name:"Lucas Ferreira", email:"lucas@empresa.com",   password:"123",      role:"colaborador",  cargo:"Designer UX",           area:"Produto",     gestor:3, avatar:"LF", nivel:"Júnior",   tempo:"1 ano"  },
    { id:5, name:"Mariana Costa",  email:"mariana@empresa.com", password:"123",      role:"gestor",       cargo:"Diretora de Produto",   area:"Produto",     gestor:null, avatar:"MC", nivel:"Diretoria", tempo:"8 anos" },
    { id:6, name:"Admin Sistema",  email:"admin@empresa.com",   password:"admin123", role:"admin",        cargo:"Administrador",         area:"TI",          gestor:null, avatar:"AD", nivel:"Admin",    tempo:"—" },
  ],
  teams: [
    { id:1, nome:"Time de Tecnologia", gestorTimeId:3, colaboradoresIds:[1,2,4], gestorId:5, cor:"#6366f1" },
  ],
  photos: {},
  ferramientasResults: {},
  acordos: [], // { id, titulo, descricao, liderId, lideradoId, prazo, status:"aberto"|"pendente_aprovacao"|"concluido", itens:[{id,descricao,prazo,status:"aberto"|"pendente"|"concluido"}], evidencias:[{itemId,texto,arquivo,nomeArquivo,data}], observacaoLiderado, observacaoLider, criadoEm }
  mapaCompetencias: {
    competencias: [], // { id, nome, descricao, categoria, criadoPor (userId), criadoEm }
    avaliacoes: {},   // { [userId]: { [compId]: 1|2|3 } }
  },
  testesResults: {
    disc: {
      1: { tipo:"S", nome:"Estável",     cor:"#10b981", emoji:"🌿", desc:"Você é paciente, confiável e um grande ouvinte. Traz harmonia e consistência ao ambiente." },
      2: { tipo:"C", nome:"Consciente",  cor:"#6366f1", emoji:"🔬", desc:"Você é analítico, preciso e criterioso. Garante qualidade e segue padrões com excelência." },
      3: { tipo:"D", nome:"Dominante",   cor:"#f87171", emoji:"🔥", desc:"Você é direto, assertivo e orientado a resultados. Toma decisões rápidas e lidera com confiança." },
      4: { tipo:"I", nome:"Influente",   cor:"#f59e0b", emoji:"⭐", desc:"Você é comunicativo, entusiasta e inspirador. Constrói relacionamentos com facilidade e energiza o time." },
    },
    competencias: {
      1: { Comunicação:8, Liderança:5, "Trabalho em Equipe":9, "Resolução de Problemas":7, "Pensamento Crítico":6, Inovação:7, "Gestão do Tempo":8, "Orientação a Resultados":7, Adaptabilidade:8, "Inteligência Emocional":9 },
      2: { Comunicação:7, Liderança:6, "Trabalho em Equipe":8, "Resolução de Problemas":9, "Pensamento Crítico":9, Inovação:8, "Gestão do Tempo":7, "Orientação a Resultados":9, Adaptabilidade:7, "Inteligência Emocional":6 },
      3: { Comunicação:9, Liderança:8, "Trabalho em Equipe":8, "Resolução de Problemas":8, "Pensamento Crítico":7, Inovação:6, "Gestão do Tempo":9, "Orientação a Resultados":9, Adaptabilidade:7, "Inteligência Emocional":8 },
    },
  },
};

const getUsers  = () => appState.users;
const getTeams  = () => appState.teams;

const getReportees = (gestorId) => {
  const gestoresTimes = getUsers().filter(u => u.gestor === gestorId && u.role === "gestor_time");
  const colabs = gestoresTimes.flatMap(gt => getUsers().filter(u => u.gestor === gt.id));
  return { gestoresTimes, colabs, todos: [...gestoresTimes, ...colabs] };
};

const delegationStore = {
  topicos: [
    { id:1, titulo:"Escolha de stack tecnológica", descricao:"Decisão sobre quais tecnologias usar no próximo projeto", status:"aberto", criadoPor:3, cartaGestor:4 },
    { id:2, titulo:"Contratação de novo membro", descricao:"Processo seletivo para Dev Backend", status:"encerrado", criadoPor:3, cartaGestor:3 },
  ],
  votos: { 1:{ 1:5, 2:4, 4:6 }, 2:{ 1:3, 2:3, 4:4 } },
};
const delegationStoreSenior = {
  topicos: [
    { id:101, titulo:"Budget trimestral do time", descricao:"Alocação de recursos para Q2", status:"aberto", criadoPor:5, cartaGestor:3 },
  ],
  votos: { 101:{ 3:4 } },
};

// ─── Components ───────────────────────────────────────────────────────────────
const Avatar = ({ initials, size=40, color="#6366f1" }) => (
  <div style={{ width:size, height:size, borderRadius:"50%", background:`linear-gradient(135deg,${color},${color}99)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:size*0.35, flexShrink:0, letterSpacing:1 }}>{initials}</div>
);
const UserAvatar = ({ user, size=40 }) => {
  if (!appState.photos) appState.photos = {};
  const foto = appState.photos[user.id];
  if (foto) return (
    <div style={{ width:size, height:size, borderRadius:"50%", overflow:"hidden", flexShrink:0, border:`2px solid ${roleColor(user.role)}44` }}>
      <img src={foto} alt={user.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    </div>
  );
  return <Avatar initials={user.avatar} size={size} color={roleColor(user.role)} />;
};
const Badge = ({ children, color="#6366f1" }) => (
  <span style={{ background:color+"22", color, border:`1px solid ${color}44`, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>{children}</span>
);
const Card = ({ children, style={} }) => (
  <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:24, ...style }}>{children}</div>
);
const ProgressBar = ({ value, max=10, color="#6366f1" }) => (
  <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:8, height:8, overflow:"hidden" }}>
    <div style={{ width:`${(value/max)*100}%`, height:"100%", background:`linear-gradient(90deg,${color},${color}bb)`, borderRadius:8, transition:"width 1s ease" }} />
  </div>
);

// ─── Role helpers ─────────────────────────────────────────────────────────────
const ROLE_LABELS = { colaborador:"Colaborador", gestor_time:"Gestor de Time", gestor:"Gestor", admin:"Administrador" };
const ROLE_COLORS = { colaborador:"#6366f1", gestor_time:"#f59e0b", gestor:"#e11d48", admin:"#06b6d4" };
const roleLabel = (r) => ROLE_LABELS[r] || r;
const roleColor = (r) => ROLE_COLORS[r] || "#6366f1";

// ─── Roda da Vida: Spider Chart ───────────────────────────────────────────────
const RodaVidaChart = ({ values, cores, readOnly=false, onChange }) => {
  const areas = Object.keys(values);
  const n = areas.length;
  const cx=200, cy=200, r=155;
  const angle = (i) => -Math.PI/2 + i*(2*Math.PI/n);
  const pt = (i, val) => { const a=angle(i), d=(val/10)*r; return [cx+d*Math.cos(a), cy+d*Math.sin(a)]; };
  const outerPt = (i) => { const a=angle(i); return [cx+r*Math.cos(a), cy+r*Math.sin(a)]; };
  const polyPoints = areas.map((a,i) => pt(i,values[a]).join(",")).join(" ");
  return (
    <svg width="400" height="400" viewBox="0 0 400 400">
      {[2,4,6,8,10].map(level => {
        const pts = areas.map((_,i) => { const a=angle(i), d=(level/10)*r; return `${cx+d*Math.cos(a)},${cy+d*Math.sin(a)}`; }).join(" ");
        return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={level===10?1.5:1} strokeDasharray={level===10?"none":"3,3"} />;
      })}
      {areas.map((_,i) => { const [ox,oy]=outerPt(i); return <line key={i} x1={cx} y1={cy} x2={ox} y2={oy} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />; })}
      {[2,4,6,8,10].map(level => { const d=(level/10)*r; return <text key={level} x={cx+4} y={cy-d+4} fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="600">{level}</text>; })}
      <polygon points={polyPoints} fill="rgba(99,102,241,0.18)" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" />
      {areas.map((area,i) => { const [x,y]=pt(i,values[area]); return <circle key={area} cx={x} cy={y} r="5" fill={cores[i]} stroke="#0d0d1a" strokeWidth="2" />; })}
      {areas.map((area,i) => {
        const a=angle(i), lx=cx+(r+26)*Math.cos(a), ly=cy+(r+26)*Math.sin(a);
        const anchor=lx<cx-5?"end":lx>cx+5?"start":"middle";
        const dy=ly<cy-5?-6:ly>cy+5?14:5;
        return <text key={area} x={lx} y={ly+dy} textAnchor={anchor} fill={cores[i]} fontSize="12" fontWeight="700">{area}</text>;
      })}
      {!readOnly && areas.map((area,i) => {
        const [x,y]=pt(i,values[area]);
        return <circle key={"hit"+area} cx={x} cy={y} r="12" fill="transparent" style={{cursor:"pointer"}} />;
      })}
    </svg>
  );
};

// ─── Ferramentas (colaborador + próprio de gestores) ──────────────────────────
const RODA_CORES = ["#f87171","#f59e0b","#10b981","#6366f1","#8b5cf6","#ec4899","#06b6d4","#84cc16"];
const RODA_DEFAULT = { "Saúde":7, "Carreira":5, "Finanças":6, "Família":8, "Social":4, "Lazer":3, "Espiritualidade":6, "Desenvolvimento":5 };

const FerramentasContent = ({ user }) => {
  const uid = user?.id;
  if (!appState.ferramientasResults) appState.ferramientasResults = {};
  if (!appState.ferramientasResults[uid]) appState.ferramientasResults[uid] = {};
  const saved = appState.ferramientasResults[uid];

  const [selected, setSelected] = useState(null);
  const [swotValues, setSwotValues] = useState(saved.swot || { forcas:"", fraquezas:"", oportunidades:"", ameacas:"" });

  const saveSwot  = () => { if(uid) appState.ferramientasResults[uid].swot  = {...swotValues};  };

  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 8px" }}>🛠️ Ferramentas de Desenvolvimento</h1>
      <p style={{ color:"#888", margin:"0 0 32px" }}>Use essas ferramentas para se autoconhecer e planejar seu crescimento.</p>

      {!selected ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {FERRAMENTAS.map(f => {
            const hasSaved = (f.id===2 && saved.swot?.forcas);
            return (
              <div key={f.id} onClick={() => setSelected(f)}
                style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${hasSaved?"rgba(16,185,129,0.3)":"rgba(255,255,255,0.08)"}`, borderRadius:16, padding:24, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <span style={{ fontSize:36 }}>{f.icone}</span>
                  {hasSaved && <Badge color="#10b981">✓ Salvo</Badge>}
                </div>
                <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 8px" }}>{f.nome}</h3>
                <p style={{ color:"#888", fontSize:13, margin:"0 0 16px", lineHeight:1.5 }}>{f.desc}</p>
                <Badge color="#6366f1">{f.tipo}</Badge>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {selected.id !== 7 && (
            <button onClick={() => setSelected(null)} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14, marginBottom:24 }}>← Voltar</button>
          )}

          {/* SWOT */}
          {selected.id === 2 && <SwotColaborador user={user} />}

          {/* Moving Motivators — reutiliza componente */}
          {selected.id === 7 && <MovingMotivatorsColaborador user={user} onBack={() => setSelected(null)} />}

          {/* Mapa de Competências */}
          {selected.id === 8 && <MapaCompColaborador user={user} />}

          {/* Em breve */}
          {selected.id === 6 && (
            <div style={{ textAlign:"center", padding:64 }}>
              <div style={{ fontSize:64, marginBottom:16 }}>{selected.icone}</div>
              <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 12px" }}>{selected.nome}</h2>
              <p style={{ color:"#555", fontSize:16 }}>Em desenvolvimento — em breve disponível.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SwotColaborador = ({ user }) => {
  const uid = user?.id;
  if (!appState.ferramientasResults) appState.ferramientasResults = {};
  if (!appState.ferramientasResults[uid]) appState.ferramientasResults[uid] = {};
  const saved = appState.ferramientasResults[uid];
  const [swotValues, setSwotValues] = useState(saved.swot || { forcas:"", fraquezas:"", oportunidades:"", ameacas:"" });
  const [savedOk, setSavedOk] = useState(false);
  const handleSave = () => {
    appState.ferramientasResults[uid].swot = { ...swotValues };
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2000);
  };
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:26, fontWeight:800, margin:"0 0 24px" }}>🎯 Análise SWOT Pessoal</h1>
      <Card>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {[
            { key:"forcas",        label:"💪 Forças",        sub:"O que você faz bem?",                   cor:"#10b981" },
            { key:"fraquezas",     label:"⚠️ Fraquezas",     sub:"O que precisa melhorar?",               cor:"#f87171" },
            { key:"oportunidades", label:"🚀 Oportunidades", sub:"O que o mercado/empresa oferece?",       cor:"#6366f1" },
            { key:"ameacas",       label:"⚡ Ameaças",        sub:"O que pode atrapalhar seu crescimento?", cor:"#f59e0b" },
          ].map(q => (
            <div key={q.key} style={{ background:`${q.cor}0d`, border:`1px solid ${q.cor}33`, borderRadius:14, padding:16 }}>
              <h4 style={{ color:q.cor, fontWeight:800, margin:"0 0 4px", fontSize:15 }}>{q.label}</h4>
              <p style={{ color:"#666", fontSize:12, margin:"0 0 12px" }}>{q.sub}</p>
              <textarea value={swotValues[q.key]} onChange={e=>setSwotValues(p=>({...p,[q.key]:e.target.value}))}
                style={{ width:"100%", minHeight:100, background:"rgba(0,0,0,0.3)", border:`1px solid ${q.cor}22`, borderRadius:8, color:"#ccc", fontSize:13, padding:"10px 12px", resize:"vertical", boxSizing:"border-box" }}
                placeholder={`Liste seus ${q.label.split(" ")[1].toLowerCase()}...`} />
            </div>
          ))}
        </div>
        <button onClick={handleSave} style={{ marginTop:20, padding:"12px 24px", background: savedOk?"rgba(16,185,129,0.2)":"linear-gradient(135deg,#6366f1,#8b5cf6)", border: savedOk?"1px solid #10b98144":"none", borderRadius:10, color: savedOk?"#10b981":"#fff", fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}>
          {savedOk ? "✓ Salvo!" : "Salvar análise"}
        </button>
      </Card>
    </div>
  );
};

// ─── Ferramentas: Visualização (gestor vê preenchimento de liderados) ─────────
const FerramentasVisualizacao = ({ user }) => {
  const allUsers = getUsers();
  let membros = [];
  if (user.role === "gestor_time") {
    membros = allUsers.filter(u => u.gestor === user.id);
  } else if (user.role === "gestor") {
    const { todos } = getReportees(user.id);
    membros = todos;
  }

  const [selectedMembro, setSelectedMembro] = useState(membros[0] || null);
  const [selectedFerramenta, setSelectedFerramenta] = useState(null);

  if (!membros.length) return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 12px" }}>🛠️ Ferramentas dos Liderados</h1>
      <p style={{ color:"#555" }}>Nenhum membro encontrado.</p>
    </div>
  );

  const getSaved = (uid) => (appState.ferramientasResults?.[uid]) || {};
  const hasFerramenta = (uid, fid) => {
    const s = getSaved(uid);
    if (fid===1) return !!s.roda;
    if (fid===2) return !!(s.swot?.forcas);
    if (fid===7) return !!MM_RESULTADOS[uid];
    return false;
  };

  const filledCount = (uid) => [1,2,7].filter(fid => hasFerramenta(uid, fid)).length;

  return (
    <div style={{ padding:32 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>🛠️ Ferramentas dos Liderados</h1>
        <p style={{ color:"#888", margin:0 }}>Visualize o preenchimento das ferramentas de desenvolvimento de cada membro da sua equipe.</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {[
          { label:"Roda da Vida",      fid:1, color:"#f87171" },
          { label:"SWOT",              fid:2, color:"#f59e0b" },
          { label:"Moving Motivators", fid:7, color:"#6366f1" },
        ].map(k => {
          const count = membros.filter(m => hasFerramenta(m.id, k.fid)).length;
          return (
            <Card key={k.label} style={{ padding:"14px 18px" }}>
              <p style={{ color:"#888", fontSize:11, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:1 }}>{k.label}</p>
              <p style={{ color:k.color, fontSize:22, fontWeight:900, margin:0 }}>{count}<span style={{ color:"#444", fontSize:14, fontWeight:500 }}>/{membros.length}</span></p>
            </Card>
          );
        })}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:20 }}>
        {/* Lista lateral */}
        <div>
          <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>Membros</p>
          {membros.map(m => {
            const count = filledCount(m.id);
            return (
              <div key={m.id} onClick={() => { setSelectedMembro(m); setSelectedFerramenta(null); }}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 12px", borderRadius:12, cursor:"pointer", marginBottom:8,
                  background: selectedMembro?.id===m.id ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                  border:`1px solid ${selectedMembro?.id===m.id ? "#6366f144" : "rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={m} size={34} />
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p>
                  <p style={{ color:"#666", fontSize:11, margin:0 }}>{m.cargo}</p>
                </div>
                <div style={{ display:"flex", gap:2 }}>
                  {[1,2,7].map(fid => (
                    <div key={fid} style={{ width:7, height:7, borderRadius:"50%", background: hasFerramenta(m.id,fid) ? ["#f87171","#f59e0b","#6366f1"][[1,2,7].indexOf(fid)] : "#333" }} />
                  ))}
                </div>
              </div>
            );
          })}
          <div style={{ marginTop:12, padding:"10px 12px", background:"rgba(255,255,255,0.02)", borderRadius:10 }}>
            {[["#f87171","Roda"],["#f59e0b","SWOT"],["#6366f1","MM"]].map(([c,l]) => (
              <div key={l} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:c, flexShrink:0 }} />
                <span style={{ color:"#555", fontSize:11 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Painel direito */}
        {selectedMembro && (
          <div>
            {/* Header membro */}
            <div style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 20px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, marginBottom:16 }}>
              <UserAvatar user={selectedMembro} size={52} />
              <div style={{ flex:1 }}>
                <h2 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 4px" }}>{selectedMembro.name}</h2>
                <p style={{ color:"#888", fontSize:13, margin:"0 0 8px" }}>{selectedMembro.cargo} · {selectedMembro.nivel} · {selectedMembro.area}</p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  <Badge color={roleColor(selectedMembro.role)}>{roleLabel(selectedMembro.role)}</Badge>
                  <Badge color="#888">{filledCount(selectedMembro.id)}/3 ferramentas preenchidas</Badge>
                </div>
              </div>
            </div>

            {/* Quando nenhuma ferramenta selecionada: grid de ferramentas */}
            {!selectedFerramenta && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
                {[
                  { id:1, icon:"⭕", nome:"Roda da Vida",      cor:"#f87171" },
                  { id:2, icon:"🎯", nome:"SWOT Pessoal",      cor:"#f59e0b" },
                  { id:7, icon:"🃏", nome:"Moving Motivators", cor:"#6366f1" },
                ].map(f => {
                  const has = hasFerramenta(selectedMembro.id, f.id);
                  return (
                    <div key={f.id} onClick={() => has && setSelectedFerramenta(f.id)}
                      style={{ padding:"18px 20px", borderRadius:14, border:`1px solid ${has ? f.cor+"44" : "rgba(255,255,255,0.06)"}`, background: has ? f.cor+"0d" : "rgba(255,255,255,0.02)", cursor: has ? "pointer" : "default", transition:"all 0.2s" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                        <span style={{ fontSize:28 }}>{f.icon}</span>
                        <div>
                          <p style={{ color: has ? "#fff" : "#444", fontWeight:700, margin:0, fontSize:15 }}>{f.nome}</p>
                          {has
                            ? <Badge color={f.cor}>✓ Preenchida — clique para ver</Badge>
                            : <Badge color="#333" style={{ color:"#555" }}>Não preenchida</Badge>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View de ferramenta específica */}
            {selectedFerramenta && (
              <div>
                <button onClick={() => setSelectedFerramenta(null)} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14, marginBottom:20 }}>← Voltar às ferramentas</button>

                {/* Roda da Vida read-only */}
                {selectedFerramenta === 1 && (() => {
                  const vals = getSaved(selectedMembro.id).roda || {};
                  const areas = Object.keys(vals);
                  if (!areas.length) return <p style={{ color:"#555" }}>Sem dados.</p>;
                  const sorted = Object.entries(vals).sort((a,b)=>b[1]-a[1]);
                  const media  = (Object.values(vals).reduce((a,b)=>a+b,0)/areas.length).toFixed(1);
                  return (
                    <div>
                      <h3 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 20px" }}>⭕ Roda da Vida — {selectedMembro.name.split(" ")[0]}</h3>
                      <div style={{ display:"grid", gridTemplateColumns:"420px 1fr", gap:32, alignItems:"start" }}>
                        <RodaVidaChart values={vals} cores={RODA_CORES} readOnly />
                        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                          <Card style={{ padding:20 }}>
                            <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>Notas por área</h4>
                            {areas.map((area,i) => (
                              <div key={area} style={{ marginBottom:12 }}>
                                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                                  <span style={{ color:RODA_CORES[i], fontSize:13, fontWeight:700 }}>{area}</span>
                                  <span style={{ color:RODA_CORES[i], fontWeight:900 }}>{vals[area]}/10</span>
                                </div>
                                <ProgressBar value={vals[area]} color={RODA_CORES[i]} />
                              </div>
                            ))}
                          </Card>
                          <Card style={{ padding:18, background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.2)" }}>
                            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                              <span style={{ color:"#888", fontSize:13 }}>Média geral</span>
                              <span style={{ color:"#818cf8", fontWeight:900, fontSize:18 }}>{media}/10</span>
                            </div>
                            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                              <span style={{ color:"#888", fontSize:12 }}>🏆 Mais desenvolvida</span>
                              <span style={{ color:"#10b981", fontWeight:700, fontSize:12 }}>{sorted[0][0]} ({sorted[0][1]})</span>
                            </div>
                            <div style={{ display:"flex", justifyContent:"space-between" }}>
                              <span style={{ color:"#888", fontSize:12 }}>⚡ Maior oportunidade</span>
                              <span style={{ color:"#f59e0b", fontWeight:700, fontSize:12 }}>{sorted[sorted.length-1][0]} ({sorted[sorted.length-1][1]})</span>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* SWOT read-only */}
                {selectedFerramenta === 2 && (() => {
                  const swot = getSaved(selectedMembro.id).swot || {};
                  return (
                    <div>
                      <h3 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 20px" }}>🎯 SWOT — {selectedMembro.name.split(" ")[0]}</h3>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                        {[
                          { key:"forcas",       label:"💪 Forças",        cor:"#10b981" },
                          { key:"fraquezas",    label:"⚠️ Fraquezas",     cor:"#f87171" },
                          { key:"oportunidades",label:"🚀 Oportunidades", cor:"#6366f1" },
                          { key:"ameacas",      label:"⚡ Ameaças",        cor:"#f59e0b" },
                        ].map(q => (
                          <div key={q.key} style={{ background:`${q.cor}0d`, border:`1px solid ${q.cor}33`, borderRadius:14, padding:16 }}>
                            <h4 style={{ color:q.cor, fontWeight:800, margin:"0 0 12px", fontSize:15 }}>{q.label}</h4>
                            <p style={{ color:"#bbb", fontSize:14, lineHeight:1.7, margin:0, whiteSpace:"pre-wrap" }}>{swot[q.key] || <span style={{ color:"#444" }}>Não preenchido</span>}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Moving Motivators read-only */}
                {selectedFerramenta === 7 && (() => {
                  const res = MM_RESULTADOS[selectedMembro.id];
                  if (!res) return <p style={{ color:"#555" }}>Sem dados.</p>;
                  const sorted = res.ordem.map((id,idx) => ({ ...MOTIVADORES.find(m=>m.id===id), posicao:idx+1 }));
                  const top3 = sorted.slice(0,3);
                  const tensoes = sorted.filter(m => m.posicao<=5 && impScore(res.impacto[m.id])<0);
                  return (
                    <div>
                      <h3 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 20px" }}>🃏 Moving Motivators — {selectedMembro.name.split(" ")[0]}</h3>
                      <Card style={{ marginBottom:16 }}>
                        <h4 style={{ color:"#fff", fontSize:15, fontWeight:800, margin:"0 0 16px" }}>📋 Ordenação por prioridade</h4>
                        <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:8 }}>
                          {sorted.map((m,idx) => (
                            <div key={m.id} style={{ flexShrink:0, width:80, textAlign:"center", background:`linear-gradient(160deg,${m.cor}22,${m.cor}0a)`, border:`2px solid ${idx<3?m.cor+"88":m.cor+"33"}`, borderRadius:14, padding:"12px 6px", position:"relative" }}>
                              <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:idx<3?["#ffd700","#c0c0c0","#cd7f32"][idx]:"#333", color:idx<3?"#000":"#888", width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, border:"2px solid #0d0d1a" }}>{idx+1}</div>
                              <div style={{ fontSize:24, marginBottom:4, marginTop:4 }}>{m.emoji}</div>
                              <div style={{ color:m.cor, fontWeight:800, fontSize:10, lineHeight:1.2 }}>{m.nome}</div>
                              <div style={{ marginTop:6, background:getImpCor(res.impacto[m.id])+"22", borderRadius:6, padding:"3px 0" }}>
                                <span style={{ color:getImpCor(res.impacto[m.id]), fontSize:14 }}>{getImpEmoji(res.impacto[m.id])}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                        <Card style={{ background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.15)" }}>
                          <h4 style={{ color:"#10b981", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>🏆 Top 3</h4>
                          {top3.map((m,i) => (
                            <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:"rgba(255,255,255,0.03)", borderRadius:8, marginBottom:6 }}>
                              <span style={{ color:["#ffd700","#c0c0c0","#cd7f32"][i], fontWeight:900, fontSize:12 }}>#{i+1}</span>
                              <span style={{ fontSize:16 }}>{m.emoji}</span>
                              <span style={{ color:"#fff", fontWeight:700, fontSize:13 }}>{m.nome}</span>
                              <span style={{ marginLeft:"auto", color:getImpCor(res.impacto[m.id]), fontSize:14 }}>{getImpEmoji(res.impacto[m.id])}</span>
                            </div>
                          ))}
                        </Card>
                        <Card style={{ background: tensoes.length>0?"rgba(251,191,36,0.05)":"rgba(16,185,129,0.04)", border:`1px solid ${tensoes.length>0?"rgba(251,191,36,0.2)":"rgba(16,185,129,0.12)"}` }}>
                          <h4 style={{ color:tensoes.length>0?"#fbbf24":"#10b981", fontSize:14, fontWeight:800, margin:"0 0 12px" }}>{tensoes.length>0?"⚠️ Tensões":"✅ Sem tensões"}</h4>
                          {tensoes.length>0 ? tensoes.map(m=>(
                            <div key={m.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", background:"rgba(248,113,113,0.08)", borderRadius:8, marginBottom:6 }}>
                              <span style={{ fontSize:16 }}>{m.emoji}</span>
                              <span style={{ color:"#fff", fontWeight:700, fontSize:13 }}>{m.nome}</span>
                              <button style={{ marginLeft:"auto", padding:"3px 8px", background:"#6366f122", border:"1px solid #6366f144", borderRadius:5, color:"#818cf8", fontSize:10, fontWeight:700, cursor:"pointer" }}>+ PDI</button>
                            </div>
                          )) : <p style={{ color:"#555", fontSize:13 }}>Motivadores bem atendidos 🎉</p>}
                        </Card>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Resultado DISC (reutilizável) ────────────────────────────────────────────
const ResultadoDISC = ({ res, onRefazer, readOnly=false }) => (
  <Card style={{ textAlign:"center", padding:40, background:`${res.cor}09`, border:`1px solid ${res.cor}33` }}>
    <div style={{ fontSize:72, marginBottom:12 }}>{res.emoji||"🧠"}</div>
    <p style={{ color:"#888", margin:"0 0 6px", fontSize:13, textTransform:"uppercase", letterSpacing:2 }}>Perfil dominante</p>
    <h2 style={{ color:res.cor, fontSize:48, fontWeight:900, margin:"0 0 4px", letterSpacing:-1 }}>{res.tipo}</h2>
    <h3 style={{ color:"#fff", fontSize:22, fontWeight:700, margin:"0 0 20px" }}>{res.nome}</h3>
    <p style={{ color:"#bbb", fontSize:15, lineHeight:1.8, maxWidth:480, margin:"0 auto 28px" }}>{res.desc}</p>
    {!readOnly && onRefazer && (
      <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
        <button style={{ padding:"11px 24px", background:res.cor, border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>Adicionar ao PDI</button>
        <button onClick={onRefazer} style={{ padding:"11px 24px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#aaa", fontWeight:600, cursor:"pointer", fontSize:14 }}>Refazer teste</button>
      </div>
    )}
  </Card>
);

const CompetenciasReadOnly = ({ dados }) => (
  <Card>
    <h4 style={{ color:"#fff", fontSize:15, fontWeight:800, margin:"0 0 20px" }}>📊 Autoavaliação de Competências</h4>
    {COMPETENCIAS.map(c => {
      const val = dados[c]||0;
      return (
        <div key={c} style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ color:"#ccc", fontSize:13, fontWeight:600 }}>{c}</span>
            <span style={{ color:val>=7?"#10b981":val>=4?"#f59e0b":"#f87171", fontWeight:800, fontSize:13 }}>{val}/10</span>
          </div>
          <ProgressBar value={val} color={val>=7?"#10b981":val>=4?"#f59e0b":"#f87171"} />
        </div>
      );
    })}
  </Card>
);

// ─── Testes & Perfil ──────────────────────────────────────────────────────────
const TestesEPerfil = ({ user }) => {
  const uid = user?.id;
  if (!appState.testesResults.disc) appState.testesResults.disc = {};
  if (!appState.testesResults.competencias) appState.testesResults.competencias = {};
  if (!appState.ferramientasResults) appState.ferramientasResults = {};
  if (!appState.ferramientasResults[uid]) appState.ferramientasResults[uid] = {};
  const saved = appState.ferramientasResults[uid];

  const [testeAtivo, setTesteAtivo] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(uid && appState.testesResults.disc[uid] ? appState.testesResults.disc[uid] : null);
  const [compVals, setCompVals] = useState(uid && appState.testesResults.competencias[uid] ? appState.testesResults.competencias[uid] : Object.fromEntries(COMPETENCIAS.map(c=>[c,5])));
  const [compSalvo, setCompSalvo] = useState(!!(uid && appState.testesResults.competencias[uid]));
  const [rodaValues, setRodaValues] = useState(saved.roda || { ...RODA_DEFAULT });

  const saveRoda = () => { if(uid) appState.ferramientasResults[uid].roda = {...rodaValues}; };
  const rodaSalva = !!(saved.roda);
  const sorted = Object.entries(rodaValues).sort((a,b)=>b[1]-a[1]);
  const media  = (Object.values(rodaValues).reduce((a,b)=>a+b,0)/Object.keys(rodaValues).length).toFixed(1);
  const questoesDISC = [
    { id:1, texto:"Como você reage a desafios no trabalho?", opcoes:[{valor:"D",texto:"Enfrento diretamente e busco resultados rápidos"},{valor:"I",texto:"Mobilizo as pessoas ao meu redor para resolvermos juntos"},{valor:"S",texto:"Analiso com cuidado antes de agir"},{valor:"C",texto:"Sigo processos e checo todos os detalhes"}] },
    { id:2, texto:"Em reuniões, você costuma:", opcoes:[{valor:"D",texto:"Tomar a frente e ser direto sobre o que precisa ser feito"},{valor:"I",texto:"Animar o grupo e trazer energia positiva"},{valor:"S",texto:"Ouvir mais do que falar e apoiar as decisões"},{valor:"C",texto:"Questionar dados e garantir que as informações estão corretas"}] },
    { id:3, texto:"O que mais te motiva profissionalmente?", opcoes:[{valor:"D",texto:"Conquistar resultados e superar metas"},{valor:"I",texto:"Criar relações e ser reconhecido pelo time"},{valor:"S",texto:"Ambiente estável, com rotina e clareza"},{valor:"C",texto:"Fazer trabalho de alta qualidade com precisão"}] },
  ];
  const descDISC = {
    D:{ nome:"Dominante",  cor:"#f87171", emoji:"🔥", desc:"Você é direto, assertivo e orientado a resultados." },
    I:{ nome:"Influente",  cor:"#f59e0b", emoji:"⭐", desc:"Você é comunicativo, entusiasta e inspirador." },
    S:{ nome:"Estável",    cor:"#10b981", emoji:"🌿", desc:"Você é paciente, confiável e um grande ouvinte." },
    C:{ nome:"Consciente", cor:"#6366f1", emoji:"🔬", desc:"Você é analítico, preciso e criterioso." },
  };
  const calcularDISC = () => {
    const cnt = {D:0,I:0,S:0,C:0};
    Object.values(respostas).forEach(v=>{cnt[v]++;});
    const dominant = Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0][0];
    const res = { tipo:dominant, ...descDISC[dominant] };
    setResultado(res);
    if(uid) appState.testesResults.disc[uid] = res;
  };
  const discSalvo = uid && appState.testesResults.disc[uid];

  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 8px" }}>🧪 Testes & Perfil Comportamental</h1>
      <p style={{ color:"#888", margin:"0 0 32px" }}>Aprofunde seu autoconhecimento com testes validados.</p>
      {!testeAtivo && !resultado && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
          {[
            { id:"roda", icon:"⭕", nome:"Roda da Vida", desc:"Avalie o equilíbrio entre as áreas da sua vida.", tempo:"3 min", feito:rodaSalva },
            { id:"disc", icon:"🧠", nome:"Teste DISC",   desc:"Descubra seu perfil comportamental.",             tempo:"5 min", feito:!!discSalvo },
          ].map(t => (
            <div key={t.id} onClick={() => setTesteAtivo(t.id)}
              style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${t.feito?"rgba(16,185,129,0.3)":"rgba(255,255,255,0.08)"}`, borderRadius:16, padding:24, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <span style={{ fontSize:40 }}>{t.icon}</span>
                <div style={{ display:"flex", gap:6 }}>
                  {t.feito && <Badge color="#10b981">✓ Preenchido</Badge>}
                  <Badge color="#6366f1">⏱ {t.tempo}</Badge>
                </div>
              </div>
              <h3 style={{ color:"#fff", fontSize:17, fontWeight:700, margin:"0 0 8px" }}>{t.nome}</h3>
              <p style={{ color:"#888", fontSize:14, lineHeight:1.6, margin:"0 0 16px" }}>{t.desc}</p>
              <button style={{ padding:"10px 20px", background:t.feito?"rgba(16,185,129,0.12)":"rgba(99,102,241,0.15)", border:`1px solid ${t.feito?"#10b98144":"#6366f144"}`, borderRadius:8, color:t.feito?"#10b981":"#818cf8", fontWeight:700, cursor:"pointer", fontSize:14 }}>{t.feito?"Refazer →":"Iniciar →"}</button>
            </div>
          ))}
        </div>
      )}
      {!testeAtivo && discSalvo && !resultado && (
        <div style={{ marginTop:24 }}>
          <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 16px" }}>Seu resultado mais recente</h3>
          <ResultadoDISC res={discSalvo} onRefazer={() => { setTesteAtivo("disc"); setRespostas({}); }} />
        </div>
      )}
      {testeAtivo === "roda" && (
        <div>
          <button onClick={() => setTesteAtivo(null)} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14, marginBottom:24 }}>← Voltar</button>
          <div style={{ marginBottom:20 }}>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 6px" }}>⭕ Roda da Vida</h2>
            <p style={{ color:"#888", margin:0 }}>Avalie cada área de 0 a 10 — veja seu equilíbrio em tempo real</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"420px 1fr", gap:32, alignItems:"start" }}>
            <RodaVidaChart values={rodaValues} cores={RODA_CORES} />
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              <Card style={{ padding:20 }}>
                <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 18px" }}>Ajuste suas notas</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {Object.keys(rodaValues).map((area,i) => (
                    <div key={area}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <span style={{ color:RODA_CORES[i], fontSize:13, fontWeight:700 }}>{area}</span>
                        <span style={{ color:RODA_CORES[i], fontWeight:900, fontSize:14, minWidth:32, textAlign:"right" }}>{rodaValues[area]}</span>
                      </div>
                      <input type="range" min="0" max="10" value={rodaValues[area]}
                        onChange={e => setRodaValues(p=>({...p,[area]:Number(e.target.value)}))}
                        style={{ width:"100%", accentColor:RODA_CORES[i], height:4 }} />
                    </div>
                  ))}
                </div>
              </Card>
              <Card style={{ padding:18, background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.2)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                  <span style={{ color:"#888", fontSize:13 }}>Média geral</span>
                  <span style={{ color:"#818cf8", fontWeight:900, fontSize:18 }}>{media}/10</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ color:"#888", fontSize:12 }}>🏆 Mais desenvolvida</span>
                  <span style={{ color:"#10b981", fontWeight:700, fontSize:12 }}>{sorted[0][0]} ({sorted[0][1]})</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ color:"#888", fontSize:12 }}>⚡ Maior oportunidade</span>
                  <span style={{ color:"#f59e0b", fontWeight:700, fontSize:12 }}>{sorted[sorted.length-1][0]} ({sorted[sorted.length-1][1]})</span>
                </div>
              </Card>
              <button onClick={() => { saveRoda(); alert("Roda da Vida salva!"); setTesteAtivo(null); }} style={{ padding:"12px 20px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>Salvar ✓</button>
            </div>
          </div>
        </div>
      )}
      {testeAtivo === "disc" && !resultado && (
        <div>
          <button onClick={() => { setTesteAtivo(null); setRespostas({}); }} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14, marginBottom:24 }}>← Voltar</button>
          <Card>
            <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 28px" }}>🧠 Teste DISC</h2>
            {questoesDISC.map((q,qi) => (
              <div key={q.id} style={{ marginBottom:28 }}>
                <p style={{ color:"#fff", fontWeight:700, marginBottom:14, fontSize:15 }}>{qi+1}. {q.texto}</p>
                <div style={{ display:"grid", gap:10 }}>
                  {q.opcoes.map(op => (
                    <div key={op.valor} onClick={() => setRespostas(p=>({...p,[q.id]:op.valor}))}
                      style={{ padding:"12px 16px", borderRadius:10, cursor:"pointer", background:respostas[q.id]===op.valor?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.04)", border:`1px solid ${respostas[q.id]===op.valor?"#6366f1":"rgba(255,255,255,0.08)"}`, color:respostas[q.id]===op.valor?"#fff":"#aaa", fontSize:14, transition:"all 0.15s" }}>
                      {op.texto}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={calcularDISC} disabled={Object.keys(respostas).length < questoesDISC.length}
              style={{ padding:"14px 32px", background:Object.keys(respostas).length<questoesDISC.length?"#333":"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:Object.keys(respostas).length<questoesDISC.length?"default":"pointer", fontSize:15 }}>
              Ver meu resultado
            </button>
          </Card>
        </div>
      )}
      {resultado && (
        <div>
          <button onClick={() => { setTesteAtivo(null); setRespostas({}); setResultado(null); }} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14, marginBottom:24 }}>← Voltar</button>
          <ResultadoDISC res={resultado} onRefazer={() => { setResultado(null); setTesteAtivo("disc"); setRespostas({}); }} />
        </div>
      )}
    </div>
  );
};

// ─── Testes: Visualização ─────────────────────────────────────────────────────
const TestesVisualizacao = ({ user }) => {
  const allUsers = getUsers();
  let membros = [];
  if (user.role==="gestor_time") membros = allUsers.filter(u=>u.gestor===user.id);
  else if (user.role==="gestor") { const { todos } = getReportees(user.id); membros = todos; }
  const [selectedMembro, setSelectedMembro] = useState(membros[0]||null);
  if (!membros.length) return <div style={{ padding:32 }}><p style={{ color:"#555" }}>Nenhum membro.</p></div>;
  const discCount = membros.filter(m=>appState.testesResults.disc[m.id]).length;
  const compCount = membros.filter(m=>appState.testesResults.competencias[m.id]).length;
  const mmCount   = membros.filter(m=>MM_RESULTADOS[m.id]).length;
  const rodaCount = membros.filter(m=>appState.ferramientasResults?.[m.id]?.roda).length;
  const discRes   = selectedMembro ? appState.testesResults.disc[selectedMembro.id]        : null;
  const compRes   = selectedMembro ? appState.testesResults.competencias[selectedMembro.id] : null;
  const mmRes     = selectedMembro ? MM_RESULTADOS[selectedMembro.id]                       : null;
  const rodaRes   = selectedMembro ? appState.ferramientasResults?.[selectedMembro.id]?.roda : null;
  return (
    <div style={{ padding:32 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>🧪 Testes dos Liderados</h1>
        <p style={{ color:"#888", margin:0 }}>Visualize os testes e perfis preenchidos pelos membros da sua equipe.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {[{label:"DISC",cor:"#6366f1",val:discCount},{label:"Competências",cor:"#10b981",val:compCount},{label:"Moving Motivators",cor:"#f59e0b",val:mmCount},{label:"Roda da Vida",cor:"#f87171",val:rodaCount}].map(k=>(
          <Card key={k.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ color:"#888", fontSize:13 }}>{k.label}</span>
            <span style={{ color:k.cor, fontSize:20, fontWeight:900 }}>{k.val}/{membros.length}</span>
          </Card>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:20 }}>
        <div>
          {membros.map(m => {
            const hasDisc=!!appState.testesResults.disc[m.id], hasComp=!!appState.testesResults.competencias[m.id], hasMM=!!MM_RESULTADOS[m.id], hasRoda=!!appState.ferramientasResults?.[m.id]?.roda;
            return (
              <div key={m.id} onClick={() => setSelectedMembro(m)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 12px", borderRadius:12, cursor:"pointer", marginBottom:8,
                  background:selectedMembro?.id===m.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)",
                  border:`1px solid ${selectedMembro?.id===m.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={m} size={34} />
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p>
                  <p style={{ color:"#666", fontSize:11, margin:0 }}>{m.cargo}</p>
                </div>
                <div style={{ display:"flex", gap:2 }}>
                  {[hasDisc,hasComp,hasMM,hasRoda].map((f,i)=>(
                    <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:f?["#6366f1","#10b981","#f59e0b","#f87171"][i]:"#333" }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {selectedMembro && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 20px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16 }}>
              <UserAvatar user={selectedMembro} size={52} />
              <div>
                <h2 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 4px" }}>{selectedMembro.name}</h2>
                <p style={{ color:"#888", fontSize:13, margin:"0 0 8px" }}>{selectedMembro.cargo} · {selectedMembro.nivel}</p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  <Badge color={roleColor(selectedMembro.role)}>{roleLabel(selectedMembro.role)}</Badge>
                  {discRes && <Badge color="#6366f1">🧠 {discRes.tipo} — {discRes.nome}</Badge>}
                  {compRes && <Badge color="#10b981">📊 Competências ✓</Badge>}
                  {mmRes   && <Badge color="#f59e0b">🃏 MM ✓</Badge>}
                  {rodaRes && <Badge color="#f87171">⭕ Roda ✓</Badge>}
                </div>
              </div>
            </div>
            {rodaRes ? (
              <Card>
                <h4 style={{ color:"#fff", fontSize:15, fontWeight:800, margin:"0 0 16px" }}>⭕ Roda da Vida — {selectedMembro.name.split(" ")[0]}</h4>
                <div style={{ display:"grid", gridTemplateColumns:"340px 1fr", gap:24, alignItems:"start" }}>
                  <RodaVidaChart values={rodaRes} cores={RODA_CORES} readOnly />
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {Object.entries(rodaRes).map(([ area, val ], i) => (
                      <div key={area}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ color:RODA_CORES[i], fontSize:13, fontWeight:700 }}>{area}</span>
                          <span style={{ color:RODA_CORES[i], fontWeight:900 }}>{val}/10</span>
                        </div>
                        <ProgressBar value={val} color={RODA_CORES[i]} />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ) : <Card style={{ textAlign:"center", padding:32 }}><p style={{ color:"#444", fontSize:32, margin:"0 0 8px" }}>⭕</p><p style={{ color:"#555" }}>Roda da Vida não preenchida</p></Card>}
            {discRes ? <ResultadoDISC res={discRes} readOnly /> : <Card style={{ textAlign:"center", padding:32 }}><p style={{ color:"#444", fontSize:32, margin:"0 0 8px" }}>🧠</p><p style={{ color:"#555" }}>DISC não preenchido</p></Card>}
            {compRes ? <CompetenciasReadOnly dados={compRes} /> : <Card style={{ textAlign:"center", padding:32 }}><p style={{ color:"#444", fontSize:32, margin:"0 0 8px" }}>📊</p><p style={{ color:"#555" }}>Competências não preenchidas</p></Card>}
            {mmRes ? (
              <Card>
                <h4 style={{ color:"#fff", fontSize:15, fontWeight:800, margin:"0 0 16px" }}>🃏 Moving Motivators — Top 5</h4>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {mmRes.ordem.slice(0,5).map((id,i) => {
                    const m=MOTIVADORES.find(x=>x.id===id), imp=mmRes.impacto[id];
                    return (
                      <div key={id} style={{ display:"flex", alignItems:"center", gap:8, background:m.cor+"18", border:`1px solid ${m.cor}33`, borderRadius:10, padding:"8px 14px" }}>
                        <span style={{ color:"#888", fontSize:11, fontWeight:800 }}>#{i+1}</span>
                        <span style={{ fontSize:18 }}>{m.emoji}</span>
                        <span style={{ color:m.cor, fontWeight:700, fontSize:13 }}>{m.nome}</span>
                        <span style={{ color:getImpCor(imp), fontSize:14 }}>{getImpEmoji(imp)}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ) : <Card style={{ textAlign:"center", padding:32 }}><p style={{ color:"#444", fontSize:32, margin:"0 0 8px" }}>🃏</p><p style={{ color:"#555" }}>MM não preenchido</p></Card>}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Moving Motivators Colaborador ────────────────────────────────────────────
const MovingMotivatorsColaborador = ({ user, onBack }) => {
  const uid = user?.id;
  const existing = uid && MM_RESULTADOS[uid];
  const [fase, setFase] = useState(existing ? 3 : 1);
  const [ordem, setOrdem] = useState(existing ? existing.ordem.map(id=>MOTIVADORES.find(m=>m.id===id)) : [...MOTIVADORES]);
  const [dragging, setDragging] = useState(null);
  const [impacto, setImpacto] = useState(existing ? existing.impacto : Object.fromEntries(MOTIVADORES.map(m=>[m.id,"neutro"])));

  const moverCard = (from, to) => {
    const newOrdem = [...ordem];
    const [removed] = newOrdem.splice(from, 1);
    newOrdem.splice(to, 0, removed);
    setOrdem(newOrdem);
  };

  const salvar = () => {
    if(uid) {
      MM_RESULTADOS[uid] = { ordem: ordem.map(m=>m.id), impacto };
    }
  };

  const top3 = ordem.slice(0,3);
  const tensoes = ordem.slice(0,5).filter(m => impScore(impacto[m.id]) < 0);

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
        {onBack && <button onClick={onBack} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14 }}>← Voltar</button>}
        <div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 4px" }}>🃏 Moving Motivators</h2>
          <p style={{ color:"#888", margin:0 }}>Fase {fase} de 3</p>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
          {[1,2,3].map(f => (
            <div key={f} style={{ width:32, height:32, borderRadius:"50%", background:fase>=f?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:fase>=f?"#fff":"#555" }}>{f}</div>
          ))}
        </div>
      </div>

      {fase === 1 && (
        <Card>
          <h3 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 6px" }}>Ordene por importância</h3>
          <p style={{ color:"#888", margin:"0 0 20px" }}>Arraste os cards: o mais importante fica à esquerda</p>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:12 }}>
            {ordem.map((m, i) => (
              <div key={m.id}
                draggable
                onDragStart={() => setDragging(i)}
                onDragOver={e => { e.preventDefault(); }}
                onDrop={() => { if(dragging!==null && dragging!==i) moverCard(dragging, i); setDragging(null); }}
                style={{ flexShrink:0, width:90, textAlign:"center", background:`${m.cor}18`, border:`2px solid ${m.cor}44`, borderRadius:14, padding:"14px 8px", cursor:"grab", opacity:dragging===i?0.5:1, transition:"transform 0.15s" }}>
                <div style={{ color:m.cor, fontSize:11, fontWeight:800, marginBottom:4 }}>#{i+1}</div>
                <div style={{ fontSize:28, marginBottom:6 }}>{m.emoji}</div>
                <div style={{ color:m.cor, fontWeight:800, fontSize:11 }}>{m.nome}</div>
                <div style={{ color:"#555", fontSize:9, marginTop:4 }}>{m.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setFase(2)} style={{ marginTop:20, padding:"12px 28px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>Próximo →</button>
        </Card>
      )}

      {fase === 2 && (
        <Card>
          <h3 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 6px" }}>Avalie o impacto no trabalho atual</h3>
          <p style={{ color:"#888", margin:"0 0 24px" }}>Como seu trabalho atual afeta cada motivador?</p>
          {ordem.map((m, i) => (
            <div key={m.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color:"#555", fontSize:12, fontWeight:800, minWidth:24 }}>#{i+1}</span>
              <span style={{ fontSize:22 }}>{m.emoji}</span>
              <span style={{ color:m.cor, fontWeight:700, fontSize:14, minWidth:120 }}>{m.nome}</span>
              <div style={{ display:"flex", gap:8, marginLeft:"auto" }}>
                {impactoOptions.map(op => (
                  <button key={op.val} onClick={() => setImpacto(p=>({...p,[m.id]:op.val}))}
                    style={{ width:40, height:34, borderRadius:8, border:`1px solid ${impacto[m.id]===op.val?op.cor:op.cor+"33"}`, background:impacto[m.id]===op.val?op.cor+"33":"rgba(255,255,255,0.04)", color:op.cor, fontWeight:800, cursor:"pointer", fontSize:16, transition:"all 0.15s" }}>
                    {op.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display:"flex", gap:12, marginTop:20 }}>
            <button onClick={() => setFase(1)} style={{ padding:"12px 20px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#aaa", cursor:"pointer" }}>← Voltar</button>
            <button onClick={() => { salvar(); setFase(3); }} style={{ padding:"12px 28px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>Ver resultado →</button>
          </div>
        </Card>
      )}

      {fase === 3 && (
        <div>
          <div style={{ display:"flex", gap:12, marginBottom:20 }}>
            <button onClick={() => setFase(2)} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14 }}>← Refazer</button>
          </div>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:12, marginBottom:20 }}>
            {ordem.map((m,i) => (
              <div key={m.id} style={{ flexShrink:0, width:88, textAlign:"center", background:`${m.cor}18`, border:`2px solid ${i<3?m.cor+"88":m.cor+"33"}`, borderRadius:14, padding:"12px 6px", position:"relative" }}>
                <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:i<3?["#ffd700","#c0c0c0","#cd7f32"][i]:"#333", color:i<3?"#000":"#888", width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, border:"2px solid #0d0d1a" }}>{i+1}</div>
                <div style={{ fontSize:26, marginBottom:4, marginTop:4 }}>{m.emoji}</div>
                <div style={{ color:m.cor, fontWeight:800, fontSize:10 }}>{m.nome}</div>
                <div style={{ marginTop:6, background:getImpCor(impacto[m.id])+"22", borderRadius:6, padding:"3px 0" }}>
                  <span style={{ color:getImpCor(impacto[m.id]), fontSize:14 }}>{getImpEmoji(impacto[m.id])}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <Card style={{ background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.15)" }}>
              <h4 style={{ color:"#10b981", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>🏆 Top 3 Motivadores</h4>
              {top3.map((m,i) => (
                <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(255,255,255,0.03)", borderRadius:10, marginBottom:8 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:["#ffd70022","#c0c0c022","#cd7f3222"][i], border:`2px solid ${["#ffd700","#c0c0c0","#cd7f32"][i]}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:["#ffd700","#c0c0c0","#cd7f32"][i] }}>{i+1}</div>
                  <span style={{ fontSize:18 }}>{m.emoji}</span>
                  <span style={{ color:"#fff", fontWeight:700, fontSize:13 }}>{m.nome}</span>
                  <span style={{ marginLeft:"auto", color:getImpCor(impacto[m.id]), fontSize:15 }}>{getImpEmoji(impacto[m.id])}</span>
                </div>
              ))}
            </Card>
            <Card style={{ background:tensoes.length>0?"rgba(251,191,36,0.05)":"rgba(16,185,129,0.04)", border:`1px solid ${tensoes.length>0?"rgba(251,191,36,0.2)":"rgba(16,185,129,0.15)"}` }}>
              <h4 style={{ color:tensoes.length>0?"#fbbf24":"#10b981", fontSize:14, fontWeight:800, margin:"0 0 8px" }}>{tensoes.length>0?"⚠️ Tensões":"✅ Sem tensões"}</h4>
              {tensoes.length>0 ? tensoes.map(m=>(
                <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(248,113,113,0.08)", borderRadius:10, marginBottom:8 }}>
                  <span style={{ fontSize:18 }}>{m.emoji}</span>
                  <div><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13 }}>{m.nome}</p><p style={{ color:getImpCor(impacto[m.id]), fontSize:11, margin:0 }}>{getImpLabel(impacto[m.id])}</p></div>
                  <button style={{ marginLeft:"auto", padding:"4px 10px", background:"#6366f122", border:"1px solid #6366f144", borderRadius:6, color:"#818cf8", fontSize:11, fontWeight:700, cursor:"pointer" }}>+ PDI</button>
                </div>
              )) : <p style={{ color:"#555", fontSize:13 }}>Todos os motivadores bem atendidos 🎉</p>}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Login ────────────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(""); const [pass, setPass] = useState(""); const [err, setErr] = useState("");
  const tryLogin = () => {
    const u = getUsers().find(u => u.email===email && u.password===pass);
    if(u) onLogin(u); else setErr("E-mail ou senha incorretos.");
  };
  const quick = (e,p) => { setEmail(e); setPass(p); };
  return (
    <div style={{ minHeight:"100vh", background:"#0d0d1a", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:420, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:24, padding:40 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>🚀</div>
          <h1 style={{ color:"#fff", fontSize:28, fontWeight:900, margin:"0 0 8px" }}>PDI Platform</h1>
          <p style={{ color:"#555", fontSize:14, margin:0 }}>Sua plataforma de desenvolvimento individual</p>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ color:"#888", fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>E-mail</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@empresa.com"
            style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:15, padding:"12px 16px", boxSizing:"border-box" }} />
        </div>
        <div style={{ marginBottom:24 }}>
          <label style={{ color:"#888", fontSize:13, fontWeight:600, display:"block", marginBottom:6 }}>Senha</label>
          <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
            style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:15, padding:"12px 16px", boxSizing:"border-box" }} />
        </div>
        {err && <div style={{ background:"rgba(248,113,113,0.12)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:8, padding:"10px 14px", color:"#f87171", fontSize:14, marginBottom:16 }}>{err}</div>}
        <button onClick={tryLogin} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:12, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:16, marginBottom:24 }}>Entrar</button>
        <div>
          <p style={{ color:"#555", fontSize:12, margin:"0 0 10px", textTransform:"uppercase", letterSpacing:1 }}>Acesso rápido</p>
          <div style={{ display:"grid", gap:6 }}>
            {getUsers().map(u => (
              <button key={u.id} onClick={() => quick(u.email, u.password)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, cursor:"pointer", textAlign:"left" }}>
                <Avatar initials={u.avatar} size={26} color={roleColor(u.role)} />
                <div>
                  <span style={{ color:"#ccc", fontSize:13, fontWeight:600 }}>{u.name}</span>
                  <span style={{ color:roleColor(u.role), fontSize:11, marginLeft:8 }}>{roleLabel(u.role)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Acordos ──────────────────────────────────────────────────────────────────
let _acordoId = 100;
const newAcordoId = () => ++_acordoId;

const STATUS_LABEL = { aberto:"Em andamento", pendente_aprovacao:"Aguardando aprovação", concluido:"Concluído", nao_cumprido:"Não cumprido" };
const STATUS_COR   = { aberto:"#6366f1", pendente_aprovacao:"#f59e0b", concluido:"#10b981", nao_cumprido:"#f87171" };
const ITEM_STATUS_LABEL = { aberto:"Pendente", pendente:"Aguard. aprovação", concluido:"Concluído", nao_cumprido:"Não cumprido" };
const ITEM_STATUS_COR   = { aberto:"#888", pendente:"#f59e0b", concluido:"#10b981", nao_cumprido:"#f87171" };

const fmtDate = (iso) => { if(!iso) return "—"; const d=new Date(iso); return d.toLocaleDateString("pt-BR"); };
const isOverdue = (iso) => iso && new Date(iso) < new Date() && new Date(iso).toDateString() !== new Date().toDateString();

// Formulário de criação/edição de acordo (usado pelo líder)
const AcordoForm = ({ user, lideradoId, onSave, onCancel, existing }) => {
  const liderado = getUsers().find(u=>u.id===lideradoId);
  const [titulo, setTitulo] = useState(existing?.titulo||"");
  const [descricao, setDescricao] = useState(existing?.descricao||"");
  const [prazo, setPrazo] = useState(existing?.prazo||"");
  const [itens, setItens] = useState(existing?.itens || []);
  const [novoItem, setNovoItem] = useState({ descricao:"", prazo:"" });

  const addItem = () => {
    if (!novoItem.descricao.trim()) return;
    setItens(p=>[...p, { id:newAcordoId(), descricao:novoItem.descricao, prazo:novoItem.prazo, status:"aberto" }]);
    setNovoItem({ descricao:"", prazo:"" });
  };
  const removeItem = (id) => setItens(p=>p.filter(i=>i.id!==id));

  const handleSave = () => {
    if (!titulo.trim()) return alert("Informe o título do acordo.");
    if (!prazo) return alert("Informe o prazo final.");
    const acordo = {
      id: existing?.id || newAcordoId(),
      titulo, descricao, prazo,
      liderId: user.id,
      lideradoId,
      status: "aberto",
      itens,
      evidencias: existing?.evidencias || [],
      observacaoLiderado: existing?.observacaoLiderado || "",
      observacaoLider: existing?.observacaoLider || "",
      criadoEm: existing?.criadoEm || new Date().toISOString(),
    };
    if (existing) {
      const idx = appState.acordos.findIndex(a=>a.id===existing.id);
      if (idx>=0) appState.acordos[idx] = acordo;
    } else {
      appState.acordos.push(acordo);
    }
    onSave();
  };

  const inp = (val, set, ph, type="text") => (
    <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
      style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:14, padding:"10px 14px", boxSizing:"border-box", outline:"none" }} />
  );

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <button onClick={onCancel} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14 }}>← Voltar</button>
        <div>
          <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0 }}>{existing?"Editar Acordo":"Novo Acordo"}</h2>
          {liderado && <p style={{ color:"#888", fontSize:13, margin:"2px 0 0" }}>Para: {liderado.name} — {liderado.cargo}</p>}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Card>
            <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>📋 Detalhes do Acordo</h4>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div>
                <label style={{ color:"#aaa", fontSize:12, fontWeight:700, display:"block", marginBottom:6 }}>TÍTULO *</label>
                {inp(titulo, setTitulo, "Ex: Melhorar comunicação com o time")}
              </div>
              <div>
                <label style={{ color:"#aaa", fontSize:12, fontWeight:700, display:"block", marginBottom:6 }}>DESCRIÇÃO</label>
                <textarea value={descricao} onChange={e=>setDescricao(e.target.value)} placeholder="Contexto, expectativas e critérios de sucesso..."
                  style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:14, padding:"10px 14px", resize:"vertical", minHeight:90, boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ color:"#aaa", fontSize:12, fontWeight:700, display:"block", marginBottom:6 }}>PRAZO FINAL *</label>
                {inp(prazo, setPrazo, "", "date")}
              </div>
            </div>
          </Card>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Card>
            <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>📌 Itens do Acordo <span style={{ color:"#555", fontWeight:400 }}>(opcional)</span></h4>
            {itens.map((item,i) => (
              <div key={item.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, marginBottom:8 }}>
                <span style={{ color:"#555", fontSize:12, fontWeight:700, minWidth:20 }}>{i+1}.</span>
                <div style={{ flex:1 }}>
                  <p style={{ color:"#ccc", fontSize:13, margin:"0 0 2px" }}>{item.descricao}</p>
                  {item.prazo && <p style={{ color: isOverdue(item.prazo)?"#f87171":"#888", fontSize:11, margin:0 }}>📅 {fmtDate(item.prazo)}</p>}
                </div>
                <button onClick={()=>removeItem(item.id)} style={{ background:"none", border:"none", color:"#f87171", cursor:"pointer", fontSize:16, padding:4 }}>×</button>
              </div>
            ))}
            <div style={{ background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.1)", borderRadius:10, padding:14, marginTop:4 }}>
              <p style={{ color:"#666", fontSize:12, fontWeight:700, margin:"0 0 10px" }}>+ ADICIONAR ITEM</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <input value={novoItem.descricao} onChange={e=>setNovoItem(p=>({...p,descricao:e.target.value}))} placeholder="Descrição do item..."
                  style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:13, padding:"8px 12px", boxSizing:"border-box" }} />
                <div style={{ display:"flex", gap:8 }}>
                  <input type="date" value={novoItem.prazo} onChange={e=>setNovoItem(p=>({...p,prazo:e.target.value}))}
                    style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:13, padding:"8px 12px" }} />
                  <button onClick={addItem} style={{ padding:"8px 16px", background:"rgba(99,102,241,0.2)", border:"1px solid #6366f144", borderRadius:8, color:"#818cf8", fontWeight:700, cursor:"pointer", fontSize:13, whiteSpace:"nowrap" }}>Adicionar</button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"flex-end", marginTop:20 }}>
        <button onClick={handleSave} style={{ padding:"12px 32px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:15 }}>
          {existing ? "Salvar alterações ✓" : "Criar Acordo ✓"}
        </button>
      </div>
    </div>
  );
};

// Detalhe do acordo — visão do liderado
const AcordoDetalheLiderado = ({ acordo, user, onBack, refresh }) => {
  const [obs, setObs] = useState(acordo.observacaoLiderado || "");
  const [saving, setSaving] = useState(false);

  const handleSinalizar = (itemId) => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    const a = { ...appState.acordos[idx] };
    a.itens = a.itens.map(it => it.id===itemId ? {...it, status:"pendente"} : it);
    // se todos itens pendentes ou concluidos, sinaliza o acordo
    const allDone = a.itens.length === 0 || a.itens.every(it=>it.status==="pendente"||it.status==="concluido");
    if (allDone) a.status = "pendente_aprovacao";
    appState.acordos[idx] = a;
    refresh();
  };

  const handleSinalizarAcordo = () => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    appState.acordos[idx] = { ...appState.acordos[idx], status:"pendente_aprovacao", observacaoLiderado: obs };
    refresh();
  };

  const handleNaoCumprir = (itemId) => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    const a = { ...appState.acordos[idx] };
    a.itens = a.itens.map(it => it.id===itemId ? {...it, status:"nao_cumprido"} : it);
    appState.acordos[idx] = a;
    refresh();
  };

  const handleNaoCumprirAcordo = () => {
    if (!confirm("Tem certeza que deseja sinalizar este acordo como não cumprido?")) return;
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    appState.acordos[idx] = { ...appState.acordos[idx], status:"nao_cumprido", observacaoLiderado: obs };
    refresh();
  };

  const handleUpload = (itemId, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
      if (idx<0) return;
      const a = { ...appState.acordos[idx] };
      a.evidencias = [...(a.evidencias||[]), { itemId, texto:"", arquivo:ev.target.result, nomeArquivo:file.name, data:new Date().toISOString() }];
      appState.acordos[idx] = a;
      refresh();
    };
    reader.readAsDataURL(file);
  };

  const handleAddObs = () => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    appState.acordos[idx] = { ...appState.acordos[idx], observacaoLiderado: obs };
    alert("Observação salva!");
    refresh();
  };

  const evidenciasDe = (itemId) => (acordo.evidencias||[]).filter(e=>e.itemId===itemId);
  const isConcluido = acordo.status === "concluido";

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <button onClick={onBack} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14 }}>← Voltar</button>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0 }}>{acordo.titulo}</h2>
            <Badge color={STATUS_COR[acordo.status]}>{STATUS_LABEL[acordo.status]}</Badge>
          </div>
          <p style={{ color:"#888", fontSize:13, margin:"4px 0 0" }}>Prazo final: <span style={{ color: isOverdue(acordo.prazo) && !isConcluido ? "#f87171":"#aaa" }}>{fmtDate(acordo.prazo)}</span></p>
        </div>
      </div>

      {acordo.descricao && (
        <Card style={{ marginBottom:16 }}>
          <p style={{ color:"#aaa", fontSize:13, margin:0, lineHeight:1.7 }}>{acordo.descricao}</p>
        </Card>
      )}

      {/* Itens */}
      {acordo.itens.length > 0 && (
        <Card style={{ marginBottom:16 }}>
          <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>📌 Itens do Acordo</h4>
          {acordo.itens.map((item,i) => {
            const evs = evidenciasDe(item.id);
            return (
              <div key={item.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", paddingBottom:16, marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ color:"#555", fontSize:12, fontWeight:700 }}>{i+1}.</span>
                      <p style={{ color:"#ccc", fontSize:14, margin:0, fontWeight:600 }}>{item.descricao}</p>
                      <Badge color={ITEM_STATUS_COR[item.status]}>{ITEM_STATUS_LABEL[item.status]}</Badge>
                    </div>
                    {item.prazo && <p style={{ color: isOverdue(item.prazo) && item.status==="aberto"?"#f87171":"#666", fontSize:12, margin:"0 0 10px" }}>📅 Prazo: {fmtDate(item.prazo)}</p>}
                    {evs.length > 0 && (
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
                        {evs.map((ev,ei) => (
                          <div key={ei} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:8, padding:"5px 10px" }}>
                            <span style={{ fontSize:14 }}>📎</span>
                            <span style={{ color:"#10b981", fontSize:12 }}>{ev.nomeArquivo}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {!isConcluido && item.status === "aberto" && (
                    <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                      <label style={{ padding:"7px 12px", background:"rgba(99,102,241,0.15)", border:"1px solid #6366f144", borderRadius:8, color:"#818cf8", fontWeight:700, cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
                        📎 Anexar
                        <input type="file" style={{ display:"none" }} onChange={e=>handleUpload(item.id,e)} />
                      </label>
                      <button onClick={()=>handleSinalizar(item.id)} style={{ padding:"7px 12px", background:"rgba(245,158,11,0.15)", border:"1px solid #f59e0b44", borderRadius:8, color:"#f59e0b", fontWeight:700, cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
                        ✓ Cumpri
                      </button>
                      <button onClick={()=>handleNaoCumprir(item.id)} style={{ padding:"7px 12px", background:"rgba(248,113,113,0.12)", border:"1px solid #f8717144", borderRadius:8, color:"#f87171", fontWeight:700, cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
                        ✗ Não cumpri
                      </button>
                    </div>
                  )}
                  {item.status === "pendente" && <Badge color="#f59e0b">Aguardando líder</Badge>}
                  {item.status === "nao_cumprido" && <Badge color="#f87171">✗ Não cumprido</Badge>}
                  {item.status === "concluido" && <Badge color="#10b981">✓ Aprovado</Badge>}
                </div>
              </div>
            );
          })}
        </Card>
      )}

      {/* Observação do liderado */}
      <Card style={{ marginBottom:16 }}>
        <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 12px" }}>💬 Sua Observação</h4>
        <textarea value={obs} onChange={e=>setObs(e.target.value)} disabled={isConcluido}
          placeholder="Adicione comentários, contexto ou justificativas sobre o cumprimento deste acordo..."
          style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:14, padding:"12px 14px", resize:"vertical", minHeight:80, boxSizing:"border-box", opacity: isConcluido?0.5:1 }} />
        {!isConcluido && (
          <button onClick={handleAddObs} style={{ marginTop:10, padding:"8px 18px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", fontWeight:600, cursor:"pointer", fontSize:13 }}>Salvar observação</button>
        )}
      </Card>

      {/* Observação do líder */}
      {acordo.observacaoLider && (
        <Card style={{ background:"rgba(99,102,241,0.05)", border:"1px solid rgba(99,102,241,0.15)" }}>
          <h4 style={{ color:"#818cf8", fontSize:14, fontWeight:800, margin:"0 0 8px" }}>💬 Feedback do Líder</h4>
          <p style={{ color:"#bbb", fontSize:14, margin:0, lineHeight:1.7 }}>{acordo.observacaoLider}</p>
        </Card>
      )}

      {/* Sinalizar acordo completo (sem itens ou com itens todos pendentes) */}
      {!isConcluido && acordo.status === "aberto" && acordo.itens.length === 0 && (
        <div style={{ marginTop:16, display:"flex", justifyContent:"flex-end", gap:10 }}>
          <button onClick={handleNaoCumprirAcordo} style={{ padding:"12px 24px", background:"rgba(248,113,113,0.12)", border:"1px solid #f8717144", borderRadius:10, color:"#f87171", fontWeight:700, cursor:"pointer", fontSize:14 }}>
            ✗ Não cumpri
          </button>
          <button onClick={handleSinalizarAcordo} style={{ padding:"12px 28px", background:"linear-gradient(135deg,#f59e0b,#f97316)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>
            ✓ Cumpri
          </button>
        </div>
      )}
    </div>
  );
};

// Detalhe do acordo — visão do líder
const AcordoDetalheLider = ({ acordo, user, onBack, refresh }) => {
  const liderado = getUsers().find(u=>u.id===acordo.lideradoId);
  const [obsLider, setObsLider] = useState(acordo.observacaoLider || "");

  const handleAprovarItem = (itemId) => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    const a = { ...appState.acordos[idx] };
    a.itens = a.itens.map(it => it.id===itemId ? {...it, status:"concluido"} : it);
    const allDone = a.itens.every(it=>it.status==="concluido");
    if (allDone) a.status = "pendente_aprovacao";
    appState.acordos[idx] = a;
    refresh();
  };

  const handleConcluir = () => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    appState.acordos[idx] = { ...appState.acordos[idx], status:"concluido", observacaoLider: obsLider };
    refresh();
  };

  const handleSalvarObs = () => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    appState.acordos[idx] = { ...appState.acordos[idx], observacaoLider: obsLider };
    alert("Feedback salvo!");
    refresh();
  };

  const handleNaoCumpridoLider = () => {
    if (!confirm("Sinalizar este acordo como não cumprido pelo liderado?")) return;
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    appState.acordos[idx] = { ...appState.acordos[idx], status:"nao_cumprido", observacaoLider: obsLider };
    refresh();
  };

  const handleRejeitarItem = (itemId) => {
    const idx = appState.acordos.findIndex(a=>a.id===acordo.id);
    if (idx<0) return;
    const a = { ...appState.acordos[idx] };
    a.itens = a.itens.map(it => it.id===itemId ? {...it, status:"nao_cumprido"} : it);
    appState.acordos[idx] = a;
    refresh();
  };

  const handleExcluir = () => {
    if (!confirm("Excluir este acordo?")) return;
    appState.acordos = appState.acordos.filter(a=>a.id!==acordo.id);
    onBack();
  };

  const evidenciasDe = (itemId) => (acordo.evidencias||[]).filter(e=>e.itemId===itemId);
  const isConcluido = acordo.status === "concluido";

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <button onClick={onBack} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14 }}>← Voltar</button>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0 }}>{acordo.titulo}</h2>
            <Badge color={STATUS_COR[acordo.status]}>{STATUS_LABEL[acordo.status]}</Badge>
          </div>
          <p style={{ color:"#888", fontSize:13, margin:"4px 0 0" }}>
            Liderado: <span style={{ color:"#ccc" }}>{liderado?.name}</span> · Prazo: <span style={{ color: isOverdue(acordo.prazo) && !isConcluido?"#f87171":"#aaa" }}>{fmtDate(acordo.prazo)}</span>
          </p>
        </div>
        {!isConcluido && (
          <button onClick={handleExcluir} style={{ padding:"7px 14px", background:"rgba(248,113,113,0.1)", border:"1px solid #f8717144", borderRadius:8, color:"#f87171", cursor:"pointer", fontSize:13 }}>Excluir</button>
        )}
      </div>

      {acordo.descricao && (
        <Card style={{ marginBottom:16 }}>
          <p style={{ color:"#aaa", fontSize:13, margin:0, lineHeight:1.7 }}>{acordo.descricao}</p>
        </Card>
      )}

      {/* Itens */}
      {acordo.itens.length > 0 && (
        <Card style={{ marginBottom:16 }}>
          <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>📌 Itens do Acordo</h4>
          {acordo.itens.map((item,i) => {
            const evs = evidenciasDe(item.id);
            return (
              <div key={item.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", paddingBottom:16, marginBottom:16 }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ color:"#555", fontSize:12, fontWeight:700 }}>{i+1}.</span>
                      <p style={{ color:"#ccc", fontSize:14, margin:0, fontWeight:600 }}>{item.descricao}</p>
                      <Badge color={ITEM_STATUS_COR[item.status]}>{ITEM_STATUS_LABEL[item.status]}</Badge>
                    </div>
                    {item.prazo && <p style={{ color:"#666", fontSize:12, margin:"0 0 8px" }}>📅 {fmtDate(item.prazo)}</p>}
                    {evs.length > 0 && (
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {evs.map((ev,ei) => (
                          <a key={ei} href={ev.arquivo} download={ev.nomeArquivo}
                            style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:8, padding:"5px 10px", textDecoration:"none" }}>
                            <span style={{ fontSize:14 }}>📎</span>
                            <span style={{ color:"#10b981", fontSize:12 }}>{ev.nomeArquivo}</span>
                          </a>
                        ))}
                      </div>
                    )}
                    {acordo.observacaoLiderado && (
                      <div style={{ marginTop:8, padding:"8px 12px", background:"rgba(255,255,255,0.03)", borderRadius:8 }}>
                        <p style={{ color:"#666", fontSize:11, fontWeight:700, margin:"0 0 4px" }}>OBSERVAÇÃO DO LIDERADO</p>
                        <p style={{ color:"#bbb", fontSize:13, margin:0 }}>{acordo.observacaoLiderado}</p>
                      </div>
                    )}
                  </div>
                  {item.status === "pendente" && (
                    <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                      <button onClick={()=>handleRejeitarItem(item.id)} style={{ padding:"7px 14px", background:"rgba(248,113,113,0.12)", border:"1px solid #f8717144", borderRadius:8, color:"#f87171", fontWeight:700, cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
                        ✗ Rejeitar
                      </button>
                      <button onClick={()=>handleAprovarItem(item.id)} style={{ padding:"7px 14px", background:"rgba(16,185,129,0.15)", border:"1px solid #10b98144", borderRadius:8, color:"#10b981", fontWeight:700, cursor:"pointer", fontSize:12, whiteSpace:"nowrap" }}>
                        ✓ Aprovar
                      </button>
                    </div>
                  )}
                  {item.status === "nao_cumprido" && <Badge color="#f87171">✗ Não cumprido</Badge>}
                  {item.status === "concluido" && <Badge color="#10b981">✓ Aprovado</Badge>}
                </div>
              </div>
            );
          })}
        </Card>
      )}

      {/* Observação do liderado */}
      {acordo.observacaoLiderado && (
        <Card style={{ marginBottom:16, background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.15)" }}>
          <h4 style={{ color:"#f59e0b", fontSize:14, fontWeight:800, margin:"0 0 8px" }}>💬 Observação do Liderado</h4>
          <p style={{ color:"#bbb", fontSize:14, margin:0, lineHeight:1.7 }}>{acordo.observacaoLiderado}</p>
        </Card>
      )}

      {/* Feedback do líder */}
      <Card style={{ marginBottom:16 }}>
        <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 12px" }}>💬 Seu Feedback</h4>
        <textarea value={obsLider} onChange={e=>setObsLider(e.target.value)} disabled={isConcluido}
          placeholder="Adicione feedback, considerações ou orientações para o liderado..."
          style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:14, padding:"12px 14px", resize:"vertical", minHeight:80, boxSizing:"border-box", opacity:isConcluido?0.5:1 }} />
        {!isConcluido && (
          <button onClick={handleSalvarObs} style={{ marginTop:10, padding:"8px 18px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", fontWeight:600, cursor:"pointer", fontSize:13 }}>Salvar feedback</button>
        )}
      </Card>

      {/* Concluir acordo */}
      {!isConcluido && acordo.status !== "nao_cumprido" && (acordo.status === "pendente_aprovacao" || acordo.itens.length === 0) && (
        <div style={{ display:"flex", justifyContent:"flex-end", gap:10 }}>
          <button onClick={handleNaoCumpridoLider} style={{ padding:"12px 24px", background:"rgba(248,113,113,0.12)", border:"1px solid #f8717144", borderRadius:10, color:"#f87171", fontWeight:700, cursor:"pointer", fontSize:14 }}>
            ✗ Não cumprido
          </button>
          <button onClick={handleConcluir} style={{ padding:"12px 32px", background:"linear-gradient(135deg,#10b981,#059669)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:15 }}>
            ✅ Marcar como Concluído
          </button>
        </div>
      )}
    </div>
  );
};

// Lista de acordos
const AcordosLider = ({ user }) => {
  const allUsers = getUsers();
  let liderados = [];
  if (user.role==="gestor_time") liderados = allUsers.filter(u=>u.gestor===user.id);
  else if (user.role==="gestor") { const { todos } = getReportees(user.id); liderados = todos; }

  const [view, setView] = useState("lista"); // lista | form | detalhe
  const [selectedLideradoId, setSelectedLideradoId] = useState(liderados[0]?.id || null);
  const [selectedAcordo, setSelectedAcordo] = useState(null);
  const [acordosList, setAcordosList] = useState(() => appState.acordos.filter(a => a.liderId === user.id));
  const refresh = () => setAcordosList(appState.acordos.filter(a => a.liderId === user.id));

  const meusAcordos = acordosList;
  const filtrados = selectedLideradoId ? meusAcordos.filter(a=>a.lideradoId===selectedLideradoId) : meusAcordos;

  const kpis = [
    { label:"Total", val: meusAcordos.length, cor:"#6366f1" },
    { label:"Em andamento",    val: meusAcordos.filter(a=>a.status==="aberto").length,               cor:"#888"    },
    { label:"Aguard. aprovação",val: meusAcordos.filter(a=>a.status==="pendente_aprovacao").length,   cor:"#f59e0b" },
    { label:"Concluídos",       val: meusAcordos.filter(a=>a.status==="concluido").length,            cor:"#10b981" },
    { label:"Não cumpridos",    val: meusAcordos.filter(a=>a.status==="nao_cumprido").length,         cor:"#f87171" },
  ];

  if (view === "form") return (
    <div style={{ padding:32 }}>
      <AcordoForm user={user} lideradoId={selectedLideradoId} onSave={()=>{ refresh(); setView("lista"); }} onCancel={()=>setView("lista")} />
    </div>
  );
  if (view === "detalhe" && selectedAcordo) {
    const acordo = appState.acordos.find(a=>a.id===selectedAcordo) || selectedAcordo;
    return (
      <div style={{ padding:32 }}>
        <AcordoDetalheLider acordo={appState.acordos.find(a=>a.id==(typeof selectedAcordo==="object"?selectedAcordo.id:selectedAcordo)) || {}} user={user} onBack={()=>setView("lista")} refresh={()=>{ refresh(); }} />
      </div>
    );
  }

  return (
    <div style={{ padding:32 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>🤝 Acordos de Desenvolvimento</h1>
          <p style={{ color:"#888", margin:0 }}>Gerencie os acordos firmados com seus liderados.</p>
        </div>
        {selectedLideradoId && (
          <button onClick={()=>setView("form")} style={{ padding:"10px 20px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer", fontSize:14 }}>
            + Novo Acordo
          </button>
        )}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {kpis.map(k=>(
          <Card key={k.label} style={{ padding:"14px 18px" }}>
            <p style={{ color:"#888", fontSize:11, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:1 }}>{k.label}</p>
            <p style={{ color:k.cor, fontSize:22, fontWeight:900, margin:0 }}>{k.val}</p>
          </Card>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
        <div>
          <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Liderados</p>
          {liderados.map(l => {
            const cnt = meusAcordos.filter(a=>a.lideradoId===l.id).length;
            const pendente = meusAcordos.filter(a=>a.lideradoId===l.id && a.status==="pendente_aprovacao").length;
            return (
              <div key={l.id} onClick={()=>setSelectedLideradoId(l.id)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", marginBottom:6,
                  background:selectedLideradoId===l.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)",
                  border:`1px solid ${selectedLideradoId===l.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={l} size={32} />
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.name.split(" ")[0]}</p>
                  <p style={{ color:"#666", fontSize:11, margin:0 }}>{cnt} acordo{cnt!==1?"s":""}</p>
                </div>
                {pendente > 0 && <div style={{ width:8, height:8, borderRadius:"50%", background:"#f59e0b", flexShrink:0 }} title="Aguardando aprovação" />}
              </div>
            );
          })}
        </div>
        <div>
          {filtrados.length === 0 ? (
            <div style={{ textAlign:"center", padding:64, background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.08)", borderRadius:16 }}>
              <p style={{ fontSize:48, margin:"0 0 12px" }}>🤝</p>
              <p style={{ color:"#555", fontSize:15 }}>Nenhum acordo ainda.</p>
              <button onClick={()=>setView("form")} style={{ marginTop:12, padding:"10px 24px", background:"rgba(99,102,241,0.15)", border:"1px solid #6366f144", borderRadius:10, color:"#818cf8", fontWeight:700, cursor:"pointer" }}>Criar primeiro acordo</button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {filtrados.map(a => {
                const liderado = allUsers.find(u=>u.id===a.lideradoId);
                const itensTotal = a.itens.length;
                const itensDone = a.itens.filter(i=>i.status==="concluido").length;
                return (
                  <div key={a.id} onClick={()=>{ setSelectedAcordo(a.id); setView("detalhe"); }}
                    style={{ padding:"16px 20px", background:"rgba(255,255,255,0.03)", border:`1px solid ${a.status==="pendente_aprovacao"?"rgba(245,158,11,0.3)":a.status==="concluido"?"rgba(16,185,129,0.2)":"rgba(255,255,255,0.07)"}`, borderRadius:14, cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                          <p style={{ color:"#fff", fontWeight:700, fontSize:15, margin:0 }}>{a.titulo}</p>
                          <Badge color={STATUS_COR[a.status]}>{STATUS_LABEL[a.status]}</Badge>
                        </div>
                        <p style={{ color:"#666", fontSize:12, margin:0 }}>
                          {liderado?.name} · Prazo: <span style={{ color: isOverdue(a.prazo) && a.status!=="concluido"?"#f87171":"#888" }}>{fmtDate(a.prazo)}</span>
                        </p>
                      </div>
                    </div>
                    {itensTotal > 0 && (
                      <div style={{ marginTop:8 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ color:"#666", fontSize:12 }}>Itens concluídos</span>
                          <span style={{ color:"#aaa", fontSize:12 }}>{itensDone}/{itensTotal}</span>
                        </div>
                        <div style={{ height:4, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:`${itensTotal?itensDone/itensTotal*100:0}%`, background:"#10b981", borderRadius:4, transition:"width 0.3s" }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AcordosLiderado = ({ user }) => {
  const lider = getUsers().find(u=>u.id===user.gestor);
  const [selectedAcordo, setSelectedAcordo] = useState(null);
  const [meusList, setMeusList] = useState(() => appState.acordos.filter(a=>a.lideradoId===user.id));
  const refresh = () => setMeusList(appState.acordos.filter(a=>a.lideradoId===user.id));
  const meus = meusList;

  if (selectedAcordo !== null) {
    const acordo = appState.acordos.find(a=>a.id===selectedAcordo);
    if (!acordo) { setSelectedAcordo(null); return null; }
    return (
      <div style={{ padding:32 }}>
        <AcordoDetalheLiderado acordo={acordo} user={user} onBack={()=>setSelectedAcordo(null)} refresh={refresh} />
      </div>
    );
  }

  const kpis = [
    { label:"Total", val: meus.length, cor:"#6366f1" },
    { label:"Em andamento",    val: meus.filter(a=>a.status==="aberto").length,             cor:"#888"    },
    { label:"Aguard. aprovação",val: meus.filter(a=>a.status==="pendente_aprovacao").length, cor:"#f59e0b" },
    { label:"Concluídos",       val: meus.filter(a=>a.status==="concluido").length,          cor:"#10b981" },
    { label:"Não cumpridos",    val: meus.filter(a=>a.status==="nao_cumprido").length,       cor:"#f87171" },
  ];

  return (
    <div style={{ padding:32 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>🤝 Meus Acordos</h1>
        <p style={{ color:"#888", margin:0 }}>Acordos de desenvolvimento firmados com sua liderança{lider ? ` (${lider.name})` : ""}.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {kpis.map(k=>(
          <Card key={k.label} style={{ padding:"14px 18px" }}>
            <p style={{ color:"#888", fontSize:11, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:1 }}>{k.label}</p>
            <p style={{ color:k.cor, fontSize:22, fontWeight:900, margin:0 }}>{k.val}</p>
          </Card>
        ))}
      </div>
      {meus.length === 0 ? (
        <div style={{ textAlign:"center", padding:80, background:"rgba(255,255,255,0.02)", border:"1px dashed rgba(255,255,255,0.08)", borderRadius:16 }}>
          <p style={{ fontSize:48, margin:"0 0 12px" }}>🤝</p>
          <p style={{ color:"#555", fontSize:15 }}>Nenhum acordo registrado ainda.</p>
          <p style={{ color:"#444", fontSize:13 }}>Quando sua liderança criar um acordo, ele aparecerá aqui.</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {meus.map(a => {
            const itensTotal = a.itens.length;
            const itensDone = a.itens.filter(i=>i.status==="concluido").length;
            const temPendente = a.itens.some(i=>i.status==="pendente");
            return (
              <div key={a.id} onClick={()=>setSelectedAcordo(a.id)}
                style={{ padding:"16px 20px", background:"rgba(255,255,255,0.03)", border:`1px solid ${a.status==="pendente_aprovacao"?"rgba(245,158,11,0.25)":a.status==="concluido"?"rgba(16,185,129,0.2)":"rgba(255,255,255,0.07)"}`, borderRadius:14, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <p style={{ color:"#fff", fontWeight:700, fontSize:15, margin:0 }}>{a.titulo}</p>
                      <Badge color={STATUS_COR[a.status]}>{STATUS_LABEL[a.status]}</Badge>
                    </div>
                    <p style={{ color:"#666", fontSize:12, margin:0 }}>
                      Prazo: <span style={{ color: isOverdue(a.prazo) && a.status!=="concluido"?"#f87171":"#888" }}>{fmtDate(a.prazo)}</span>
                      {temPendente && <span style={{ color:"#f59e0b", marginLeft:8 }}>· Itens aguardando aprovação do líder</span>}
                    </p>
                  </div>
                </div>
                {itensTotal > 0 && (
                  <div style={{ marginTop:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ color:"#666", fontSize:12 }}>Progresso dos itens</span>
                      <span style={{ color:"#aaa", fontSize:12 }}>{itensDone}/{itensTotal}</span>
                    </div>
                    <div style={{ height:4, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${itensTotal?itensDone/itensTotal*100:0}%`, background:"#10b981", borderRadius:4 }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Mapa de Competências ─────────────────────────────────────────────────────
let _mcId = 200;
const newMcId = () => ++_mcId;

const NIVEL_LABEL = { 1:"Iniciante", 2:"Intermediário", 3:"Avançado" };
const NIVEL_COR   = { 1:"#f87171",   2:"#f59e0b",        3:"#10b981"  };
const NIVEL_EMOJI = { 1:"🌱",         2:"🌿",              3:"🌳"        };

// Cadastro de competências — gestor de time e gestor podem cadastrar
const MapaCompCadastro = ({ user, onBack }) => {
  const mc = appState.mapaCompetencias;
  const [lista, setLista] = useState(mc.competencias);
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editId, setEditId] = useState(null);

  const refresh = () => setLista([...appState.mapaCompetencias.competencias]);

  const handleSave = () => {
    if (!nome.trim()) return alert("Informe o nome da competência.");
    if (editId) {
      const idx = mc.competencias.findIndex(c=>c.id===editId);
      if (idx>=0) mc.competencias[idx] = { ...mc.competencias[idx], nome, descricao:desc, categoria };
      setEditId(null);
    } else {
      mc.competencias.push({ id:newMcId(), nome, descricao:desc, categoria, criadoPor:user.id, criadoEm:new Date().toISOString() });
    }
    setNome(""); setDesc(""); setCategoria("");
    refresh();
  };

  const handleEdit = (c) => { setEditId(c.id); setNome(c.nome); setDesc(c.descricao||""); setCategoria(c.categoria||""); };
  const handleDel  = (id) => { if(!confirm("Excluir competência?")) return; mc.competencias = mc.competencias.filter(c=>c.id!==id); refresh(); };

  const categorias = [...new Set(mc.competencias.map(c=>c.categoria).filter(Boolean))];

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <button onClick={onBack} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14 }}>← Voltar</button>
        <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0 }}>🗺️ Gerenciar Competências do Mapa</h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:24, alignItems:"start" }}>
        {/* Lista */}
        <Card>
          <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>Competências cadastradas ({lista.length})</h4>
          {lista.length === 0 && <p style={{ color:"#555", textAlign:"center", padding:24 }}>Nenhuma competência cadastrada ainda.</p>}
          {categorias.length > 0 ? categorias.map(cat => (
            <div key={cat} style={{ marginBottom:20 }}>
              <p style={{ color:"#6366f1", fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>{cat}</p>
              {lista.filter(c=>c.categoria===cat).map(c => (
                <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, marginBottom:6 }}>
                  <div style={{ flex:1 }}>
                    <p style={{ color:"#fff", fontWeight:700, margin:"0 0 2px", fontSize:14 }}>{c.nome}</p>
                    {c.descricao && <p style={{ color:"#666", fontSize:12, margin:0 }}>{c.descricao}</p>}
                  </div>
                  <button onClick={()=>handleEdit(c)} style={{ padding:"5px 10px", background:"rgba(99,102,241,0.12)", border:"1px solid #6366f144", borderRadius:7, color:"#818cf8", cursor:"pointer", fontSize:12 }}>Editar</button>
                  <button onClick={()=>handleDel(c.id)} style={{ padding:"5px 10px", background:"rgba(248,113,113,0.1)", border:"1px solid #f8717144", borderRadius:7, color:"#f87171", cursor:"pointer", fontSize:12 }}>✕</button>
                </div>
              ))}
            </div>
          )) : lista.map(c => (
            <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, marginBottom:6 }}>
              <div style={{ flex:1 }}>
                <p style={{ color:"#fff", fontWeight:700, margin:"0 0 2px", fontSize:14 }}>{c.nome}</p>
                {c.descricao && <p style={{ color:"#666", fontSize:12, margin:0 }}>{c.descricao}</p>}
              </div>
              <button onClick={()=>handleEdit(c)} style={{ padding:"5px 10px", background:"rgba(99,102,241,0.12)", border:"1px solid #6366f144", borderRadius:7, color:"#818cf8", cursor:"pointer", fontSize:12 }}>Editar</button>
              <button onClick={()=>handleDel(c.id)} style={{ padding:"5px 10px", background:"rgba(248,113,113,0.1)", border:"1px solid #f8717144", borderRadius:7, color:"#f87171", cursor:"pointer", fontSize:12 }}>✕</button>
            </div>
          ))}
        </Card>
        {/* Formulário */}
        <Card>
          <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>{editId?"✏️ Editar":"+ Nova"} Competência</h4>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <label style={{ color:"#aaa", fontSize:12, fontWeight:700, display:"block", marginBottom:6 }}>NOME *</label>
              <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Ex: Comunicação assertiva"
                style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:14, padding:"10px 14px", boxSizing:"border-box" }} />
            </div>
            <div>
              <label style={{ color:"#aaa", fontSize:12, fontWeight:700, display:"block", marginBottom:6 }}>CATEGORIA</label>
              <input value={categoria} onChange={e=>setCategoria(e.target.value)} placeholder="Ex: Técnica, Comportamental..."
                style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:14, padding:"10px 14px", boxSizing:"border-box" }} />
            </div>
            <div>
              <label style={{ color:"#aaa", fontSize:12, fontWeight:700, display:"block", marginBottom:6 }}>DESCRIÇÃO</label>
              <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="O que significa ter essa competência..."
                style={{ width:"100%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#ccc", fontSize:14, padding:"10px 14px", resize:"vertical", minHeight:70, boxSizing:"border-box" }} />
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={handleSave} style={{ flex:1, padding:"11px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>
                {editId?"Salvar":"Adicionar"}
              </button>
              {editId && <button onClick={()=>{ setEditId(null); setNome(""); setDesc(""); setCategoria(""); }} style={{ padding:"11px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#aaa", cursor:"pointer" }}>Cancelar</button>}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Autoavaliação — colaborador
const MapaCompColaborador = ({ user }) => {
  const mc = appState.mapaCompetencias;
  const [avs, setAvs] = useState({ ...(mc.avaliacoes[user.id]||{}) });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    mc.avaliacoes[user.id] = { ...avs };
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  if (mc.competencias.length === 0) return (
    <div style={{ textAlign:"center", padding:64 }}>
      <p style={{ fontSize:48, margin:"0 0 12px" }}>🗺️</p>
      <p style={{ color:"#555", fontSize:15 }}>Nenhuma competência cadastrada ainda.</p>
      <p style={{ color:"#444", fontSize:13 }}>Aguarde seu gestor configurar o mapa.</p>
    </div>
  );

  const categorias = [...new Set(mc.competencias.map(c=>c.categoria||"Geral"))];
  const preenchidas = mc.competencias.filter(c=>avs[c.id]).length;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 6px" }}>🗺️ Mapa de Competências</h2>
          <p style={{ color:"#888", margin:0 }}>Avalie seu nível em cada competência definida pelo time.</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <Badge color="#6366f1">{preenchidas}/{mc.competencias.length} avaliadas</Badge>
          <button onClick={handleSave} style={{ padding:"10px 22px", background: saved?"rgba(16,185,129,0.2)":"linear-gradient(135deg,#6366f1,#8b5cf6)", border: saved?"1px solid #10b98144":"none", borderRadius:10, color: saved?"#10b981":"#fff", fontWeight:700, cursor:"pointer", fontSize:14, transition:"all 0.2s" }}>
            {saved ? "✓ Salvo!" : "Salvar avaliação"}
          </button>
        </div>
      </div>
      {/* Legenda */}
      <div style={{ display:"flex", gap:12, marginBottom:24 }}>
        {[1,2,3].map(n=>(
          <div key={n} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", background:`${NIVEL_COR[n]}10`, border:`1px solid ${NIVEL_COR[n]}33`, borderRadius:10 }}>
            <span style={{ fontSize:18 }}>{NIVEL_EMOJI[n]}</span>
            <span style={{ color:NIVEL_COR[n], fontWeight:700, fontSize:13 }}>{n} — {NIVEL_LABEL[n]}</span>
          </div>
        ))}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10 }}>
          <span style={{ color:"#555", fontWeight:700, fontSize:13 }}>— Não avaliado</span>
        </div>
      </div>
      {/* Competências por categoria */}
      {categorias.map(cat => {
        const comps = mc.competencias.filter(c=>(c.categoria||"Geral")===cat);
        return (
          <div key={cat} style={{ marginBottom:28 }}>
            <p style={{ color:"#6366f1", fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:1, margin:"0 0 14px" }}>{cat}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {comps.map(c => {
                const val = avs[c.id] || 0;
                return (
                  <div key={c.id} style={{ padding:"16px 18px", background:"rgba(255,255,255,0.03)", border:`1px solid ${val?NIVEL_COR[val]+"33":"rgba(255,255,255,0.07)"}`, borderRadius:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                      <div>
                        <p style={{ color:"#fff", fontWeight:700, fontSize:14, margin:"0 0 3px" }}>{c.nome}</p>
                        {c.descricao && <p style={{ color:"#666", fontSize:12, margin:0 }}>{c.descricao}</p>}
                      </div>
                      {val > 0 && <Badge color={NIVEL_COR[val]}>{NIVEL_EMOJI[val]} {NIVEL_LABEL[val]}</Badge>}
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      {[1,2,3].map(n=>(
                        <button key={n} onClick={()=>setAvs(p=>({...p,[c.id]:n}))}
                          style={{ flex:1, padding:"8px 4px", border:`2px solid ${val===n?NIVEL_COR[n]:"rgba(255,255,255,0.08)"}`, borderRadius:10, background:val===n?`${NIVEL_COR[n]}18`:"rgba(255,255,255,0.03)", cursor:"pointer", transition:"all 0.15s", textAlign:"center" }}>
                          <div style={{ fontSize:18 }}>{NIVEL_EMOJI[n]}</div>
                          <div style={{ color:val===n?NIVEL_COR[n]:"#555", fontSize:11, fontWeight:700, marginTop:2 }}>{NIVEL_LABEL[n]}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Visualização do mapa — gestor vê todos os liderados
const MapaCompVisualizacao = ({ user }) => {
  const mc = appState.mapaCompetencias;
  const allUsers = getUsers();
  let membros = [];
  if (user.role==="gestor_time") membros = allUsers.filter(u=>u.gestor===user.id);
  else if (user.role==="gestor") { const { todos } = getReportees(user.id); membros = todos; }

  const [viewMode, setViewMode] = useState("heatmap"); // heatmap | pessoa
  const [selMembro, setSelMembro] = useState(membros[0]||null);

  if (mc.competencias.length === 0) return (
    <div style={{ textAlign:"center", padding:64 }}>
      <p style={{ fontSize:48, margin:"0 0 12px" }}>🗺️</p>
      <p style={{ color:"#555", fontSize:15 }}>Nenhuma competência cadastrada ainda.</p>
    </div>
  );

  const getAv = (uid, cid) => mc.avaliacoes[uid]?.[cid] || 0;
  const categorias = [...new Set(mc.competencias.map(c=>c.categoria||"Geral"))];

  // Heatmap — tabela membros × competências
  const Heatmap = () => (
    <div style={{ overflowX:"auto" }}>
      <table style={{ borderCollapse:"collapse", width:"100%", minWidth:600 }}>
        <thead>
          <tr>
            <th style={{ color:"#888", fontSize:11, fontWeight:700, textAlign:"left", padding:"8px 14px", borderBottom:"1px solid rgba(255,255,255,0.08)", minWidth:140 }}>COMPETÊNCIA</th>
            {membros.map(m=>(
              <th key={m.id} style={{ color:"#ccc", fontSize:11, fontWeight:700, textAlign:"center", padding:"8px 10px", borderBottom:"1px solid rgba(255,255,255,0.08)", minWidth:90 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <UserAvatar user={m} size={24} />
                  <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:80 }}>{m.name.split(" ")[0]}</span>
                </div>
              </th>
            ))}
            <th style={{ color:"#888", fontSize:11, fontWeight:700, textAlign:"center", padding:"8px 10px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>MÉDIA</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => ([
            <tr key={`cat-${cat}`}>
              <td colSpan={membros.length+2} style={{ padding:"10px 14px 4px", color:"#6366f1", fontSize:10, fontWeight:800, textTransform:"uppercase", letterSpacing:1 }}>{cat}</td>
            </tr>,
            ...mc.competencias.filter(c=>(c.categoria||"Geral")===cat).map(c => {
              const vals = membros.map(m=>getAv(m.id,c.id)).filter(v=>v>0);
              const media = vals.length ? (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1) : "—";
              return (
                <tr key={c.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding:"10px 14px" }}>
                    <p style={{ color:"#ccc", fontWeight:600, margin:"0 0 2px", fontSize:13 }}>{c.nome}</p>
                    {c.descricao && <p style={{ color:"#555", fontSize:11, margin:0 }}>{c.descricao}</p>}
                  </td>
                  {membros.map(m=>{
                    const v=getAv(m.id,c.id);
                    return (
                      <td key={m.id} style={{ textAlign:"center", padding:"10px 8px" }}>
                        {v>0
                          ? <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                              <span style={{ fontSize:18 }}>{NIVEL_EMOJI[v]}</span>
                              <span style={{ color:NIVEL_COR[v], fontSize:10, fontWeight:700 }}>{NIVEL_LABEL[v]}</span>
                            </div>
                          : <span style={{ color:"#333", fontSize:18 }}>—</span>}
                      </td>
                    );
                  })}
                  <td style={{ textAlign:"center", padding:"10px 8px" }}>
                    <span style={{ color: media==="—"?"#444":Number(media)>=2.5?"#10b981":Number(media)>=1.5?"#f59e0b":"#f87171", fontWeight:800, fontSize:14 }}>{media}</span>
                  </td>
                </tr>
              );
            })
          ]))}
        </tbody>
      </table>
    </div>
  );

  // Visão individual por pessoa
  const PorPessoa = () => (
    <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
      <div>
        <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Membros</p>
        {membros.map(m=>{
          const preenchidas=mc.competencias.filter(c=>getAv(m.id,c.id)>0).length;
          return (
            <div key={m.id} onClick={()=>setSelMembro(m)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", marginBottom:6, background:selMembro?.id===m.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)", border:`1px solid ${selMembro?.id===m.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
              <UserAvatar user={m} size={32} />
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p>
                <p style={{ color:"#666", fontSize:11, margin:0 }}>{preenchidas}/{mc.competencias.length} avaliadas</p>
              </div>
            </div>
          );
        })}
      </div>
      {selMembro && (
        <Card>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
            <UserAvatar user={selMembro} size={44} />
            <div><h4 style={{ color:"#fff", fontWeight:800, margin:0 }}>{selMembro.name}</h4><p style={{ color:"#888", fontSize:12, margin:0 }}>{selMembro.cargo}</p></div>
          </div>
          {categorias.map(cat=>{
            const comps=mc.competencias.filter(c=>(c.categoria||"Geral")===cat);
            return (
              <div key={cat} style={{ marginBottom:20 }}>
                <p style={{ color:"#6366f1", fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>{cat}</p>
                {comps.map(c=>{
                  const v=getAv(selMembro.id,c.id);
                  return (
                    <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ flex:1 }}>
                        <p style={{ color:"#ccc", fontWeight:600, margin:"0 0 2px", fontSize:13 }}>{c.nome}</p>
                        {c.descricao && <p style={{ color:"#555", fontSize:11, margin:0 }}>{c.descricao}</p>}
                      </div>
                      {v>0
                        ? <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", background:`${NIVEL_COR[v]}12`, border:`1px solid ${NIVEL_COR[v]}33`, borderRadius:10 }}>
                            <span style={{ fontSize:16 }}>{NIVEL_EMOJI[v]}</span>
                            <span style={{ color:NIVEL_COR[v], fontWeight:700, fontSize:12 }}>{NIVEL_LABEL[v]}</span>
                          </div>
                        : <span style={{ color:"#444", fontSize:13 }}>Não avaliado</span>}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 6px" }}>🗺️ Mapa de Competências — Equipe</h2>
          <p style={{ color:"#888", margin:0 }}>{membros.length} membros · {mc.competencias.length} competências</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["heatmap","pessoa"].map(m=>(
            <button key={m} onClick={()=>setViewMode(m)} style={{ padding:"9px 18px", border:"none", borderRadius:10, cursor:"pointer", fontWeight:700, fontSize:13, background:viewMode===m?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.06)", color:viewMode===m?"#fff":"#888" }}>
              {m==="heatmap"?"📊 Heatmap":"👤 Por pessoa"}
            </button>
          ))}
        </div>
      </div>
      {viewMode==="heatmap" ? <Heatmap /> : <PorPessoa />}
    </div>
  );
};

// Tela unificada do Mapa de Competências para gestores (só visualização — cadastro está em Cadastros)
const MapaCompGestor = ({ user }) => {
  const [aba, setAba] = useState("proprio");
  const TabBtn = ({ id, label }) => (
    <button onClick={()=>setAba(id)} style={{ padding:"10px 22px", border:"none", borderRadius:10, cursor:"pointer", fontWeight:700, fontSize:14, background:aba===id?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.05)", color:aba===id?"#fff":"#888", transition:"all 0.15s" }}>{label}</button>
  );
  return (
    <div style={{ padding:32 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:"#fff", fontSize:26, fontWeight:800, margin:"0 0 6px" }}>🗺️ Mapa de Competências</h1>
        <p style={{ color:"#888", margin:0 }}>Visualize as autoavaliações do time. Para gerenciar competências, acesse <strong style={{ color:"#6366f1" }}>Cadastros</strong>.</p>
      </div>
      <div style={{ display:"flex", gap:10, marginBottom:28 }}>
        <TabBtn id="proprio"       label="📝 Meu preenchimento" />
        <TabBtn id="colaboradores" label="👥 Ver colaboradores"  />
      </div>
      {aba==="proprio"       && <MapaCompColaborador user={user} />}
      {aba==="colaboradores" && <MapaCompVisualizacao user={user} />}
    </div>
  );
};

// ─── Ferramentas Unificado para Gestores ─────────────────────────────────────
// Uma tela por ferramenta com duas abas: meu preenchimento | ver colaboradores
const FerramentaGestorView = ({ user, ferramenta }) => {
  const [aba, setAba] = useState("proprio");

  const TOOLS = {
    roda:            { icon:"⭕", nome:"Roda da Vida"         },
    swot:            { icon:"🎯", nome:"Análise SWOT"          },
    motivadores:     { icon:"🃏", nome:"Moving Motivators"     },
    disc:            { icon:"🧠", nome:"Teste DISC"            },
    competencias:    { icon:"📊", nome:"Competências"          },
    "mapa-comp":     { icon:"🗺️", nome:"Mapa de Competências"  },
    delegation:      { icon:"♟️", nome:"Delegation Poker"      },
  };
  const tool = TOOLS[ferramenta] || {};

  // membros liderados
  const allUsers = getUsers();
  let membros = [];
  if (user.role==="gestor_time") membros = allUsers.filter(u=>u.gestor===user.id);
  else if (user.role==="gestor") { const { todos } = getReportees(user.id); membros = todos; }

  const TabBtn = ({ id, label }) => (
    <button onClick={()=>setAba(id)} style={{
      padding:"10px 22px", border:"none", borderRadius:10, cursor:"pointer", fontWeight:700, fontSize:14,
      background: aba===id ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.05)",
      color: aba===id ? "#fff" : "#888", transition:"all 0.15s",
    }}>{label}</button>
  );

  // ── RODA DA VIDA colaboradores ──
  const RodaColaboradores = () => {
    const [sel, setSel] = useState(membros[0]||null);
    const rodaRes = sel ? appState.ferramientasResults?.[sel.id]?.roda : null;
    const filled = membros.filter(m=>appState.ferramientasResults?.[m.id]?.roda).length;
    return (
      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
        <div>
          <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Membros ({filled}/{membros.length} preenchidos)</p>
          {membros.map(m=>{
            const has=!!appState.ferramientasResults?.[m.id]?.roda;
            return (
              <div key={m.id} onClick={()=>setSel(m)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", marginBottom:6, background:sel?.id===m.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)", border:`1px solid ${sel?.id===m.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={m} size={32} />
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p>
                  <p style={{ color:"#666", fontSize:11, margin:0 }}>{m.cargo}</p>
                </div>
                <div style={{ width:8, height:8, borderRadius:"50%", background:has?"#10b981":"#333", flexShrink:0 }} />
              </div>
            );
          })}
        </div>
        {sel && (
          <Card>
            {rodaRes ? (() => {
              const areas=Object.keys(rodaRes);
              const sorted=Object.entries(rodaRes).sort((a,b)=>b[1]-a[1]);
              const media=(Object.values(rodaRes).reduce((a,b)=>a+b,0)/areas.length).toFixed(1);
              return (
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                    <UserAvatar user={sel} size={40} />
                    <div><h4 style={{ color:"#fff", fontWeight:800, margin:0 }}>{sel.name}</h4><p style={{ color:"#888", fontSize:12, margin:0 }}>{sel.cargo}</p></div>
                    <Badge color="#818cf8" style={{ marginLeft:"auto" }}>Média {media}/10</Badge>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"340px 1fr", gap:24, alignItems:"start" }}>
                    <RodaVidaChart values={rodaRes} cores={RODA_CORES} readOnly />
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {areas.map((area,i)=>(
                        <div key={area}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                            <span style={{ color:RODA_CORES[i], fontSize:13, fontWeight:700 }}>{area}</span>
                            <span style={{ color:RODA_CORES[i], fontWeight:900 }}>{rodaRes[area]}/10</span>
                          </div>
                          <ProgressBar value={rodaRes[area]} color={RODA_CORES[i]} />
                        </div>
                      ))}
                      <div style={{ marginTop:8, padding:"12px", background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.15)", borderRadius:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ color:"#888", fontSize:12 }}>🏆 Mais desenvolvida</span><span style={{ color:"#10b981", fontWeight:700, fontSize:12 }}>{sorted[0][0]} ({sorted[0][1]})</span></div>
                        <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#888", fontSize:12 }}>⚡ Maior oportunidade</span><span style={{ color:"#f59e0b", fontWeight:700, fontSize:12 }}>{sorted[sorted.length-1][0]} ({sorted[sorted.length-1][1]})</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div style={{ textAlign:"center", padding:48 }}>
                <p style={{ fontSize:40, margin:"0 0 8px" }}>⭕</p>
                <p style={{ color:"#555" }}>{sel.name.split(" ")[0]} ainda não preencheu a Roda da Vida.</p>
              </div>
            )}
          </Card>
        )}
      </div>
    );
  };

  // ── SWOT colaboradores ──
  const SwotColaboradores = () => {
    const [sel, setSel] = useState(membros[0]||null);
    const swotRes = sel ? appState.ferramientasResults?.[sel.id]?.swot : null;
    const filled = membros.filter(m=>appState.ferramientasResults?.[m.id]?.swot?.forcas).length;
    return (
      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
        <div>
          <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Membros ({filled}/{membros.length})</p>
          {membros.map(m=>{
            const has=!!appState.ferramientasResults?.[m.id]?.swot?.forcas;
            return (
              <div key={m.id} onClick={()=>setSel(m)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", marginBottom:6, background:sel?.id===m.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)", border:`1px solid ${sel?.id===m.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={m} size={32} />
                <div style={{ flex:1, minWidth:0 }}><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p><p style={{ color:"#666", fontSize:11, margin:0 }}>{m.cargo}</p></div>
                <div style={{ width:8, height:8, borderRadius:"50%", background:has?"#10b981":"#333", flexShrink:0 }} />
              </div>
            );
          })}
        </div>
        {sel && (
          <Card>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <UserAvatar user={sel} size={40} />
              <div><h4 style={{ color:"#fff", fontWeight:800, margin:0 }}>{sel.name}</h4><p style={{ color:"#888", fontSize:12, margin:0 }}>{sel.cargo}</p></div>
            </div>
            {swotRes?.forcas ? (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[{key:"forcas",label:"💪 Forças",cor:"#10b981"},{key:"fraquezas",label:"⚠️ Fraquezas",cor:"#f87171"},{key:"oportunidades",label:"🚀 Oportunidades",cor:"#6366f1"},{key:"ameacas",label:"⚡ Ameaças",cor:"#f59e0b"}].map(q=>(
                  <div key={q.key} style={{ background:`${q.cor}0d`, border:`1px solid ${q.cor}33`, borderRadius:14, padding:16 }}>
                    <h4 style={{ color:q.cor, fontWeight:800, margin:"0 0 10px", fontSize:14 }}>{q.label}</h4>
                    <p style={{ color:"#bbb", fontSize:13, margin:0, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{swotRes[q.key]||<span style={{ color:"#444" }}>Não preenchido</span>}</p>
                  </div>
                ))}
              </div>
            ) : <div style={{ textAlign:"center", padding:40 }}><p style={{ color:"#555" }}>{sel.name.split(" ")[0]} ainda não preencheu o SWOT.</p></div>}
          </Card>
        )}
      </div>
    );
  };

  // ── DISC colaboradores ──
  const DiscColaboradores = () => {
    const [sel, setSel] = useState(membros[0]||null);
    const discRes = sel ? appState.testesResults.disc?.[sel.id] : null;
    const filled = membros.filter(m=>appState.testesResults.disc?.[m.id]).length;
    return (
      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
        <div>
          <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Membros ({filled}/{membros.length})</p>
          {membros.map(m=>{
            const res=appState.testesResults.disc?.[m.id];
            return (
              <div key={m.id} onClick={()=>setSel(m)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", marginBottom:6, background:sel?.id===m.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)", border:`1px solid ${sel?.id===m.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={m} size={32} />
                <div style={{ flex:1, minWidth:0 }}><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p><p style={{ color:"#666", fontSize:11, margin:0 }}>{m.cargo}</p></div>
                {res ? <span style={{ fontSize:14 }}>{res.emoji}</span> : <div style={{ width:8, height:8, borderRadius:"50%", background:"#333", flexShrink:0 }} />}
              </div>
            );
          })}
        </div>
        {sel && (
          discRes ? (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, padding:"16px 20px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16 }}>
                <UserAvatar user={sel} size={44} />
                <div><h4 style={{ color:"#fff", fontWeight:800, margin:0 }}>{sel.name}</h4><p style={{ color:"#888", fontSize:12, margin:0 }}>{sel.cargo}</p></div>
              </div>
              <ResultadoDISC res={discRes} readOnly />
            </div>
          ) : (
            <Card style={{ textAlign:"center", padding:48 }}><p style={{ fontSize:40, margin:"0 0 8px" }}>🧠</p><p style={{ color:"#555" }}>{sel.name.split(" ")[0]} ainda não fez o teste DISC.</p></Card>
          )
        )}
      </div>
    );
  };

  // ── Competências colaboradores ──
  const CompColaboradores = () => {
    const [sel, setSel] = useState(membros[0]||null);
    const compRes = sel ? appState.testesResults.competencias?.[sel.id] : null;
    const filled = membros.filter(m=>appState.testesResults.competencias?.[m.id]).length;
    return (
      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
        <div>
          <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Membros ({filled}/{membros.length})</p>
          {membros.map(m=>{
            const has=!!appState.testesResults.competencias?.[m.id];
            return (
              <div key={m.id} onClick={()=>setSel(m)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", marginBottom:6, background:sel?.id===m.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)", border:`1px solid ${sel?.id===m.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={m} size={32} />
                <div style={{ flex:1, minWidth:0 }}><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p><p style={{ color:"#666", fontSize:11, margin:0 }}>{m.cargo}</p></div>
                <div style={{ width:8, height:8, borderRadius:"50%", background:has?"#10b981":"#333", flexShrink:0 }} />
              </div>
            );
          })}
        </div>
        {sel && (
          compRes ? (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, padding:"16px 20px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16 }}>
                <UserAvatar user={sel} size={44} />
                <div><h4 style={{ color:"#fff", fontWeight:800, margin:0 }}>{sel.name}</h4><p style={{ color:"#888", fontSize:12, margin:0 }}>{sel.cargo}</p></div>
              </div>
              <CompetenciasReadOnly dados={compRes} />
            </div>
          ) : (
            <Card style={{ textAlign:"center", padding:48 }}><p style={{ fontSize:40, margin:"0 0 8px" }}>📊</p><p style={{ color:"#555" }}>{sel.name.split(" ")[0]} ainda não preencheu as Competências.</p></Card>
          )
        )}
      </div>
    );
  };

  // ── Moving Motivators colaboradores ──
  const MMColaboradores = () => {
    const [sel, setSel] = useState(membros[0]||null);
    const mmRes = sel ? MM_RESULTADOS[sel.id] : null;
    const filled = membros.filter(m=>MM_RESULTADOS[m.id]).length;
    return (
      <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", gap:20 }}>
        <div>
          <p style={{ color:"#aaa", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Membros ({filled}/{membros.length})</p>
          {membros.map(m=>{
            const has=!!MM_RESULTADOS[m.id];
            return (
              <div key={m.id} onClick={()=>setSel(m)} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, cursor:"pointer", marginBottom:6, background:sel?.id===m.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)", border:`1px solid ${sel?.id===m.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
                <UserAvatar user={m} size={32} />
                <div style={{ flex:1, minWidth:0 }}><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.name.split(" ")[0]}</p><p style={{ color:"#666", fontSize:11, margin:0 }}>{m.cargo}</p></div>
                <div style={{ width:8, height:8, borderRadius:"50%", background:has?"#10b981":"#333", flexShrink:0 }} />
              </div>
            );
          })}
        </div>
        {sel && (
          mmRes ? (() => {
            const sorted=mmRes.ordem.map((id,idx)=>({...MOTIVADORES.find(m=>m.id===id),posicao:idx+1}));
            const top3=sorted.slice(0,3);
            const tensoes=sorted.filter(m=>m.posicao<=5&&impScore(mmRes.impacto[m.id])<0);
            return (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, padding:"16px 20px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16 }}>
                  <UserAvatar user={sel} size={44} />
                  <div><h4 style={{ color:"#fff", fontWeight:800, margin:0 }}>{sel.name}</h4><p style={{ color:"#888", fontSize:12, margin:0 }}>{sel.cargo}</p></div>
                </div>
                <Card style={{ marginBottom:14 }}>
                  <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 14px" }}>Ordenação por prioridade</h4>
                  <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6 }}>
                    {sorted.map((m,idx)=>(
                      <div key={m.id} style={{ flexShrink:0, width:72, textAlign:"center", background:`${m.cor}18`, border:`2px solid ${idx<3?m.cor+"88":m.cor+"33"}`, borderRadius:12, padding:"10px 4px", position:"relative" }}>
                        <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", background:idx<3?["#ffd700","#c0c0c0","#cd7f32"][idx]:"#333", color:idx<3?"#000":"#888", width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900 }}>{idx+1}</div>
                        <div style={{ fontSize:22, margin:"4px 0 3px" }}>{m.emoji}</div>
                        <div style={{ color:m.cor, fontWeight:800, fontSize:9, lineHeight:1.2 }}>{m.nome}</div>
                        <div style={{ marginTop:4 }}><span style={{ color:getImpCor(mmRes.impacto[m.id]), fontSize:12 }}>{getImpEmoji(mmRes.impacto[m.id])}</span></div>
                      </div>
                    ))}
                  </div>
                </Card>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <Card style={{ background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.15)" }}>
                    <h4 style={{ color:"#10b981", fontSize:13, fontWeight:800, margin:"0 0 12px" }}>🏆 Top 3</h4>
                    {top3.map((m,i)=>(
                      <div key={m.id} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                        <span style={{ color:"#555", fontSize:11, fontWeight:800, minWidth:16 }}>#{i+1}</span>
                        <span style={{ fontSize:18 }}>{m.emoji}</span>
                        <span style={{ color:m.cor, fontWeight:700, fontSize:13 }}>{m.nome}</span>
                        <span style={{ color:getImpCor(mmRes.impacto[m.id]), fontSize:13 }}>{getImpEmoji(mmRes.impacto[m.id])}</span>
                      </div>
                    ))}
                  </Card>
                  <Card style={{ background:"rgba(248,113,113,0.05)", border:"1px solid rgba(248,113,113,0.15)" }}>
                    <h4 style={{ color:"#f87171", fontSize:13, fontWeight:800, margin:"0 0 12px" }}>⚠️ Tensões</h4>
                    {tensoes.length===0 ? <p style={{ color:"#555", fontSize:13 }}>Nenhuma tensão identificada.</p> : tensoes.map(m=>(
                      <div key={m.id} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                        <span style={{ fontSize:18 }}>{m.emoji}</span>
                        <span style={{ color:m.cor, fontWeight:700, fontSize:13 }}>{m.nome}</span>
                        <span style={{ color:"#f87171", fontSize:13 }}>↓</span>
                      </div>
                    ))}
                  </Card>
                </div>
              </div>
            );
          })() : (
            <Card style={{ textAlign:"center", padding:48 }}><p style={{ fontSize:40, margin:"0 0 8px" }}>🃏</p><p style={{ color:"#555" }}>{sel.name.split(" ")[0]} ainda não preencheu o Moving Motivators.</p></Card>
          )
        )}
      </div>
    );
  };

  const renderPropio = () => {
    if (ferramenta==="roda" || ferramenta==="swot") return ferramenta==="swot" ? <SwotColaborador user={user} /> : <FerramentasContent user={user} />;
    if (ferramenta==="motivadores") return <MovingMotivatorsColaborador user={user} onBack={null} />;
    if (ferramenta==="disc" || ferramenta==="competencias") return <TestesEPerfil user={user} initialTeste={ferramenta==="disc"?"disc":"competencias"} />;
    if (ferramenta==="mapa-comp") return <MapaCompColaborador user={user} />;
    if (ferramenta==="delegation") return <div style={{ padding:20, textAlign:"center", color:"#555" }}>Use o menu Delegation Poker dedicado.</div>;
    return null;
  };

  const renderColaboradores = () => {
    if (ferramenta==="roda")         return <RodaColaboradores />;
    if (ferramenta==="swot")         return <SwotColaboradores />;
    if (ferramenta==="motivadores")  return <MMColaboradores />;
    if (ferramenta==="disc")         return <DiscColaboradores />;
    if (ferramenta==="competencias") return <CompColaboradores />;
    if (ferramenta==="mapa-comp")    return <MapaCompVisualizacao user={user} />;
    return <p style={{ color:"#555" }}>Visualização não disponível para esta ferramenta.</p>;
  };

  return (
    <div style={{ padding:32 }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:"#fff", fontSize:26, fontWeight:800, margin:"0 0 6px" }}>{tool.icon} {tool.nome}</h1>
        <p style={{ color:"#888", margin:0 }}>Escolha a visualização desejada.</p>
      </div>
      <div style={{ display:"flex", gap:10, marginBottom:28 }}>
        <TabBtn id="proprio"       label="📝 Meu preenchimento" />
        <TabBtn id="colaboradores" label="👥 Ver colaboradores"  />
      </div>
      {aba==="proprio"       && renderPropio()}
      {aba==="colaboradores" && renderColaboradores()}
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ user, activeTab, setActiveTab, onLogout }) => {
  const isAdmin      = user.role==="admin";
  const isGestor     = user.role==="gestor";
  const isGestorTime = user.role==="gestor_time";

  const subFerramentasGT = [
    { id:"motivadores", icon:"🃏", label:"Moving Motivators" },
    { id:"delegation",  icon:"♟️", label:"Delegation Poker"  },
  ];
  const subTestesGT = [
    { id:"testes-proprio", icon:"📝", label:"Meus Testes"  },
    { id:"testes-equipe",  icon:"👥", label:"Equipe"        },
  ];
  const subFerramentasGT_items = [
    { id:"ferramenta-roda",            icon:"⭕", label:"Roda da Vida"        },
    { id:"ferramenta-swot",            icon:"🎯", label:"Análise SWOT"         },
    { id:"ferramenta-motivadores",     icon:"🃏", label:"Moving Motivators"    },
    { id:"ferramenta-disc",            icon:"🧠", label:"Teste DISC"           },
    { id:"ferramenta-mapa-comp",       icon:"🗺️", label:"Mapa de Competências" },
    { id:"delegation",                 icon:"♟️", label:"Delegation Poker"     },
  ];
  const subFerramentasG_items = [
    { id:"ferramenta-roda",            icon:"⭕", label:"Roda da Vida"        },
    { id:"ferramenta-swot",            icon:"🎯", label:"Análise SWOT"         },
    { id:"ferramenta-motivadores",     icon:"🃏", label:"Moving Motivators"    },
    { id:"ferramenta-disc",            icon:"🧠", label:"Teste DISC"           },
    { id:"ferramenta-mapa-comp",       icon:"🗺️", label:"Mapa de Competências" },
    { id:"delegation-g",               icon:"♟️", label:"Delegation Poker"     },
  ];
  const subTestesG = [
    { id:"testes-proprio-g",  icon:"📝", label:"Meus Testes"    },
    { id:"testes-equipe-g",   icon:"👥", label:"Meus Liderados" },
  ];
  const subCadastros = [
    { id:"cadastros-comp", icon:"🗺️", label:"Competências do Mapa" },
  ];
  const subFerramentasColab = [
    { id:"ferramenta-colab-swot",       icon:"🎯", label:"Análise SWOT"      },
    { id:"ferramenta-colab-motivadores",icon:"🃏", label:"Moving Motivators"  },
    { id:"delegation-colab",            icon:"♟️", label:"Delegation Poker"   },
  ];

  const menuAdmin = [
    { id:"inicio",       icon:"🏠", label:"Início"            },
    { id:"admin-pessoas",icon:"🧑‍💼", label:"Gestão de Pessoas" },
    { id:"admin-times",  icon:"🏷️", label:"Cadastro de Times" },
    { id:"admin-senhas", icon:"🔑", label:"Reset de Senhas"   },
    { id:"perfil",       icon:"👤", label:"Meu Perfil"        },
  ];
  const menuGestorTime = [
    { id:"inicio",             icon:"🏠", label:"Início"               },
    { id:"equipe",             icon:"👥", label:"Minha Equipe"          },
    { id:"avaliacoes",         icon:"⭐", label:"Avaliações"            },
    { id:"pdis",               icon:"📋", label:"PDIs da Equipe"        },
    { id:"acordos-lider",      icon:"🤝", label:"Acordos"               },
    { id:"ferramentas-gt",     icon:"🛠️", label:"Ferramentas",     hasSubmenu:true, subKey:"ferramentas" },
    { id:"testes-gt",          icon:"🧪", label:"Testes & Perfil", hasSubmenu:true, subKey:"testes"      },
    { id:"cadastros-gt",       icon:"🗂️", label:"Cadastros",       hasSubmenu:true, subKey:"cadastros"   },
    { id:"perfil",             icon:"👤", label:"Meu Perfil"            },
  ];
  const menuGestor = [
    { id:"inicio",       icon:"🏠", label:"Início"               },
    { id:"visao-geral",  icon:"🔭", label:"Visão Geral"           },
    { id:"meus-gts",     icon:"👥", label:"Gestores de Time"      },
    { id:"times",        icon:"🏷️", label:"Cadastro de Times"    },
    { id:"ferramentas-g",icon:"🛠️", label:"Ferramentas",     hasSubmenu:true, subKey:"ferramentas" },
    { id:"testes-g",     icon:"🧪", label:"Testes & Perfil", hasSubmenu:true, subKey:"testes"      },
    { id:"acordos-lider",icon:"🤝", label:"Acordos"          },
    { id:"cadastros-g",  icon:"🗂️", label:"Cadastros",       hasSubmenu:true, subKey:"cadastros"   },
    { id:"pessoas",      icon:"🧑‍💼", label:"Gestão de Pessoas"   },
    { id:"perfil",       icon:"👤", label:"Meu Perfil"            },
  ];
  const menuColaborador = [
    { id:"inicio",       icon:"🏠", label:"Início"           },
    { id:"meu-pdi",      icon:"📋", label:"Meu PDI"          },
    { id:"acordos",      icon:"🤝", label:"Acordos"           },
    { id:"ferramentas",  icon:"🛠️", label:"Ferramentas", hasSubmenu:true, subKey:"ferramentas" },
    { id:"testes",       icon:"🧪", label:"Testes & Perfil"  },
    { id:"perfil",       icon:"👤", label:"Meu Perfil"       },
  ];

  const menu = isAdmin ? menuAdmin : isGestor ? menuGestor : isGestorTime ? menuGestorTime : menuColaborador;

  const getSubItems = (item) => {
    if (!item.hasSubmenu) return [];
    if (item.subKey==="testes")    return isGestor ? subTestesG : subTestesGT;
    if (item.subKey==="cadastros") return subCadastros;
    if (!isGestor && !isGestorTime) return subFerramentasColab;
    return isGestor ? subFerramentasG_items : subFerramentasGT_items;
  };
  const isSubActiveFor = (item) => item.hasSubmenu && getSubItems(item).some(s=>s.id===activeTab);

  const [openSubmenus, setOpenSubmenus] = useState(() => {
    const init = {};
    const ferramentasIds = [...subFerramentasGT_items,...subFerramentasG_items,...subFerramentasColab].map(s=>s.id);
    const testesIds = [...subTestesGT,...subTestesG].map(s=>s.id);
    const cadastrosIds = subCadastros.map(s=>s.id);
    if (ferramentasIds.includes(activeTab)) init["ferramentas"]=true;
    if (testesIds.includes(activeTab))      init["testes"]=true;
    if (cadastrosIds.includes(activeTab))   init["cadastros"]=true;
    return init;
  });

  const handleClick = (item) => {
    if (item.hasSubmenu) {
      const key = item.subKey || item.id;
      setOpenSubmenus(p=>({...p,[key]:!p[key]}));
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div style={{ width:240, minHeight:"100vh", background:"#0d0d1a", borderRight:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", flexShrink:0 }}>
      <div style={{ padding:"28px 20px 20px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:24 }}>🚀</span>
          <div><p style={{ color:"#fff", fontWeight:800, fontSize:16, margin:0 }}>PDI Platform</p><p style={{ color:"#555", fontSize:11, margin:0 }}>v1.0</p></div>
        </div>
      </div>
      <div style={{ padding:"16px 12px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 8px", background:"rgba(255,255,255,0.04)", borderRadius:12 }}>
          <UserAvatar user={user} size={36} />
          <div style={{ overflow:"hidden" }}>
            <p style={{ color:"#fff", fontWeight:700, fontSize:13, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name.split(" ")[0]}</p>
            <p style={{ color:roleColor(user.role), fontSize:11, margin:0 }}>{roleLabel(user.role)}</p>
          </div>
        </div>
      </div>
      <nav style={{ flex:1, padding:"12px 12px" }}>
        {menu.map(item => {
          const subActive = isSubActiveFor(item);
          const isActive  = activeTab===item.id || subActive;
          const subKey    = item.subKey || item.id;
          const subOpen   = openSubmenus[subKey];
          const subItems  = getSubItems(item);
          return (
            <div key={item.id}>
              <button onClick={() => handleClick(item)} style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"10px 12px", border:"none", borderRadius:10, cursor:"pointer", background:isActive?"rgba(99,102,241,0.15)":"transparent", color:isActive?"#818cf8":"#666", fontSize:14, fontWeight:isActive?600:500, marginBottom:2, transition:"all 0.15s", textAlign:"left", borderLeft:isActive?"3px solid #6366f1":"3px solid transparent" }}>
                <span>{item.icon}</span>
                <span style={{ flex:1 }}>{item.label}</span>
                {item.hasSubmenu && <span style={{ fontSize:10, color:"#555", display:"inline-block", transform:subOpen?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.2s" }}>▶</span>}
              </button>
              {item.hasSubmenu && subOpen && (
                <div style={{ marginLeft:16, marginBottom:4, borderLeft:"2px solid rgba(99,102,241,0.2)", paddingLeft:8 }}>
                  {subItems.map(sub => (
                    <button key={sub.id} onClick={() => setActiveTab(sub.id)} style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"8px 10px", border:"none", borderRadius:8, cursor:"pointer", background:activeTab===sub.id?"rgba(99,102,241,0.12)":"transparent", color:activeTab===sub.id?"#818cf8":"#555", fontSize:13, fontWeight:activeTab===sub.id?600:400, marginBottom:1, textAlign:"left" }}>
                      <span style={{ fontSize:12 }}>{sub.icon}</span> {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div style={{ padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={onLogout} style={{ width:"100%", padding:"10px", background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:10, color:"#f87171", fontWeight:600, cursor:"pointer", fontSize:14 }}>Sair</button>
      </div>
    </div>
  );
};

// ─── Perfil ───────────────────────────────────────────────────────────────────
const PerfilColaborador = ({ user }) => {
  if (!appState.photos) appState.photos = {};
  const [foto, setFoto] = useState(appState.photos[user.id]||null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const processFile = (file) => {
    if(!file||!file.type.startsWith("image/")) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => { appState.photos[user.id]=e.target.result; setFoto(e.target.result); setUploading(false); };
    reader.readAsDataURL(file);
  };
  const gestorUser = getUsers().find(u=>u.id===user.gestor);
  const FotoOuAvatar = ({ size=80 }) => foto ? (
    <div style={{ width:size, height:size, borderRadius:"50%", overflow:"hidden", flexShrink:0, border:`3px solid ${roleColor(user.role)}44`, boxShadow:`0 0 0 4px ${roleColor(user.role)}15` }}>
      <img src={foto} alt="foto" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
    </div>
  ) : <Avatar initials={user.avatar} size={size} color={roleColor(user.role)} />;

  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>👤 Meu Perfil</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:20 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Card style={{ textAlign:"center" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
              <div style={{ position:"relative", display:"inline-block" }}>
                <FotoOuAvatar size={90} />
                {foto && <button onClick={() => { delete appState.photos[user.id]; setFoto(null); }} style={{ position:"absolute", top:-4, right:-4, width:22, height:22, borderRadius:"50%", background:"#ef4444", border:"2px solid #0d0d1a", color:"#fff", fontSize:11, fontWeight:900, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>}
              </div>
            </div>
            <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:"0 0 4px" }}>{user.name}</h2>
            <p style={{ color:"#888", margin:"0 0 8px" }}>{user.cargo}</p>
            <Badge color={roleColor(user.role)}>{roleLabel(user.role)} · {user.nivel}</Badge>
            <div onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} onDrop={e=>{e.preventDefault();setDragging(false);processFile(e.dataTransfer.files[0]);}} onClick={()=>document.getElementById(`fi-${user.id}`).click()}
              style={{ marginTop:20, padding:"18px 14px", border:`2px dashed ${dragging?"#6366f1":"rgba(255,255,255,0.12)"}`, borderRadius:14, cursor:"pointer", background:dragging?"rgba(99,102,241,0.1)":"rgba(255,255,255,0.03)", transition:"all 0.2s" }}>
              {uploading ? <div style={{ color:"#818cf8", fontSize:13, fontWeight:700 }}>⏳ Processando...</div> : (
                <><div style={{ fontSize:28, marginBottom:6 }}>📷</div>
                <p style={{ color:"#aaa", fontSize:13, fontWeight:600, margin:"0 0 4px" }}>{foto?"Trocar foto":"Adicionar foto"}</p>
                <p style={{ color:"#555", fontSize:11, margin:0 }}>Clique ou arraste · JPG, PNG, WEBP</p></>
              )}
              <input id={`fi-${user.id}`} type="file" accept="image/*" onChange={e=>processFile(e.target.files[0])} style={{ display:"none" }} />
            </div>
            <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div style={{ background:"rgba(99,102,241,0.08)", borderRadius:10, padding:12 }}><p style={{ color:"#818cf8", fontWeight:800, fontSize:16, margin:"0 0 4px" }}>{user.tempo}</p><p style={{ color:"#666", fontSize:11, margin:0 }}>Na empresa</p></div>
              <div style={{ background:"rgba(16,185,129,0.08)", borderRadius:10, padding:12 }}><p style={{ color:"#10b981", fontWeight:800, fontSize:16, margin:"0 0 4px" }}>3</p><p style={{ color:"#666", fontSize:11, margin:0 }}>PDIs ativos</p></div>
            </div>
            {gestorUser && (
              <div style={{ marginTop:16, padding:"12px 14px", background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:12, textAlign:"left" }}>
                <p style={{ color:"#888", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Reporta a</p>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}><UserAvatar user={gestorUser} size={32} /><div><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13 }}>{gestorUser.name}</p><p style={{ color:"#888", fontSize:11, margin:0 }}>{gestorUser.cargo}</p></div></div>
              </div>
            )}
          </Card>
        </div>
        <div style={{ display:"grid", gap:16 }}>
          <Card>
            <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 20px" }}>Informações Profissionais</h3>
            {[{label:"Nome completo",value:user.name},{label:"E-mail",value:user.email},{label:"Área",value:user.area},{label:"Cargo",value:user.cargo},{label:"Nível",value:user.nivel},{label:"Tempo",value:user.tempo+" na empresa"}].map(item=>(
              <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color:"#888", fontSize:14 }}>{item.label}</span>
                <span style={{ color:"#fff", fontSize:14, fontWeight:600 }}>{item.value}</span>
              </div>
            ))}
          </Card>
          <Card>
            <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 20px" }}>Histórico de Avaliações</h3>
            {[{periodo:"Jan 2025",nota:8.5,gestor:gestorUser?.name||"—"},{periodo:"Jul 2024",nota:7.8,gestor:gestorUser?.name||"—"}].map(av=>(
              <div key={av.periodo} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <div><p style={{ color:"#fff", fontWeight:600, margin:"0 0 4px" }}>{av.periodo}</p><p style={{ color:"#888", fontSize:13, margin:0 }}>Por {av.gestor}</p></div>
                <div style={{ background:"#10b98122", color:"#10b981", borderRadius:10, padding:"6px 16px", fontWeight:800, fontSize:18 }}>{av.nota}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── Colaborador Tabs ─────────────────────────────────────────────────────────
const InicioColaborador = ({ user }) => {
  const gestor = getUsers().find(u=>u.id===user.gestor);
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>Olá, {user.name.split(" ")[0]}! 👋</h1>
      <p style={{ color:"#888", margin:"0 0 32px" }}>Bem-vindo de volta ao seu PDI.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[{label:"Metas Ativas",value:3,icon:"🎯",color:"#6366f1"},{label:"Concluídas",value:7,icon:"✅",color:"#10b981"},{label:"Progresso",value:"68%",icon:"📈",color:"#f59e0b"},{label:"Próxima Review",value:"15 dias",icon:"📅",color:"#8b5cf6"}].map(item=>(
          <Card key={item.label} style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:28 }}>{item.icon}</span>
            <div><p style={{ color:"#888", fontSize:11, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:1 }}>{item.label}</p><p style={{ color:item.color, fontSize:22, fontWeight:800, margin:0 }}>{item.value}</p></div>
          </Card>
        ))}
      </div>
      {gestor && (
        <Card>
          <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 16px" }}>Seu Gestor</h3>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <UserAvatar user={gestor} size={52} />
            <div><h4 style={{ color:"#fff", fontWeight:700, margin:"0 0 4px" }}>{gestor.name}</h4><p style={{ color:"#888", fontSize:13, margin:0 }}>{gestor.cargo} · {roleLabel(gestor.role)}</p></div>
          </div>
        </Card>
      )}
    </div>
  );
};

const MeuPDI = () => {
  const metas = [
    { id:1, titulo:"Certificação em Product Management", prazo:"Jun 2025", progresso:65, status:"Em andamento", categoria:"Técnica" },
    { id:2, titulo:"Melhorar comunicação executiva", prazo:"Mar 2025", progresso:40, status:"Em andamento", categoria:"Comportamental" },
    { id:3, titulo:"Liderar um projeto end-to-end", prazo:"Dez 2025", progresso:20, status:"Planejado", categoria:"Liderança" },
  ];
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>📋 Meu PDI</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
        <div>
          {metas.map(m=>(
            <Card key={m.id} style={{ marginBottom:12, cursor:"pointer", border:selected?.id===m.id?"1px solid #6366f1":"1px solid rgba(255,255,255,0.08)" }} onClick={()=>setSelected(m)}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <h3 style={{ color:"#fff", fontSize:15, fontWeight:700, margin:0 }}>{m.titulo}</h3>
                <Badge color={m.status==="Em andamento"?"#f59e0b":"#6366f1"}>{m.status}</Badge>
              </div>
              <div style={{ display:"flex", gap:12, marginBottom:12 }}>
                <Badge color="#888">📅 {m.prazo}</Badge>
                <Badge color="#6366f1">{m.categoria}</Badge>
              </div>
              <ProgressBar value={m.progresso} max={100} color="#6366f1" />
              <span style={{ color:"#6366f1", fontSize:12, fontWeight:700 }}>{m.progresso}%</span>
            </Card>
          ))}
        </div>
        {selected && (
          <Card>
            <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 16px" }}>{selected.titulo}</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#888", fontSize:13 }}>Status</span><Badge color="#f59e0b">{selected.status}</Badge></div>
              <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#888", fontSize:13 }}>Prazo</span><span style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{selected.prazo}</span></div>
              <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ color:"#888", fontSize:13 }}>Categoria</span><Badge color="#6366f1">{selected.categoria}</Badge></div>
              <div style={{ marginTop:8 }}><p style={{ color:"#888", fontSize:13, marginBottom:6 }}>Progresso</p><ProgressBar value={selected.progresso} max={100} color="#6366f1" /><span style={{ color:"#6366f1", fontWeight:700 }}>{selected.progresso}%</span></div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

const TrilhasCarreira = () => (
  <div style={{ padding:32 }}>
    <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>🗺️ Trilhas de Carreira</h1>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
      {TRILHAS.map(t=>(
        <Card key={t.id} style={{ border:`1px solid ${t.cor}33`, cursor:"pointer" }}>
          <div style={{ display:"flex", gap:16, marginBottom:16 }}>
            <div style={{ fontSize:40 }}>{t.icone}</div>
            <div><h3 style={{ color:"#fff", fontSize:18, fontWeight:700, margin:"0 0 6px" }}>{t.nome}</h3><p style={{ color:"#888", fontSize:14, margin:0 }}>{t.desc}</p></div>
          </div>
          <div style={{ background:t.cor+"11", borderRadius:10, padding:16 }}>
            <p style={{ color:t.cor, fontWeight:700, margin:"0 0 10px", fontSize:13 }}>COMPETÊNCIAS NECESSÁRIAS</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {["Comunicação","Pensamento Estratégico","Gestão de Pessoas","Inovação"].map(c=>(
                <span key={c} style={{ background:t.cor+"22", color:t.cor, borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:600 }}>{c}</span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ─── Gestor Time Tabs ─────────────────────────────────────────────────────────
// ─── Mini SVG charts ──────────────────────────────────────────────────────────
const DonutChart = ({ value, total, color, size=72 }) => {
  const pct = total === 0 ? 0 : value / total;
  const r = 28; const cx = size/2; const cy = size/2;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round"
        style={{ transition:"stroke-dasharray 0.5s ease" }} />
      <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={12} fontWeight={800}>
        {total===0?"—":`${Math.round(pct*100)}%`}
      </text>
    </svg>
  );
};

const BarMini = ({ items, maxVal }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {items.map((it,i) => (
      <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ color:"#888", fontSize:11, minWidth:80, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{it.label}</span>
        <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${maxVal?it.val/maxVal*100:0}%`, background:it.color||"#6366f1", borderRadius:4, transition:"width 0.4s ease" }} />
        </div>
        <span style={{ color:it.color||"#aaa", fontSize:11, fontWeight:700, minWidth:20, textAlign:"right" }}>{it.val}</span>
      </div>
    ))}
  </div>
);

// Painel executivo individual de um membro
const PainelMembro = ({ membro, lider, onBack }) => {
  const acordosMembro = appState.acordos.filter(a => a.lideradoId === membro.id && a.liderId === lider.id);
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const diffDias = (iso) => { const d = new Date(iso); d.setHours(0,0,0,0); return Math.round((d-hoje)/(1000*60*60*24)); };

  const total      = acordosMembro.length;
  const concluidos = acordosMembro.filter(a=>a.status==="concluido").length;
  const pendentes  = acordosMembro.filter(a=>a.status==="pendente_aprovacao").length;
  const emAndamento= acordosMembro.filter(a=>a.status==="aberto").length;
  const atrasados  = acordosMembro.filter(a=>a.status!=="concluido" && a.prazo && diffDias(a.prazo)<0).length;
  const proximos   = acordosMembro.filter(a=>a.status!=="concluido" && a.prazo && diffDias(a.prazo)>=0 && diffDias(a.prazo)<=7).length;
  const noPrazo    = emAndamento - atrasados - proximos < 0 ? 0 : emAndamento - atrasados - proximos;

  const discRes  = appState.testesResults.disc?.[membro.id];
  const rodaRes  = appState.ferramientasResults?.[membro.id]?.roda;
  const rodaMedia= rodaRes ? (Object.values(rodaRes).reduce((a,b)=>a+b,0)/Object.keys(rodaRes).length).toFixed(1) : null;

  const getStatusAcordo = (a) => {
    if (a.status==="concluido") return { label:"Concluído", color:"#10b981", icon:"✅" };
    if (a.status==="nao_cumprido") return { label:"Não cumprido", color:"#f87171", icon:"✗" };
    if (a.status==="pendente_aprovacao") return { label:"Aguard. aprovação", color:"#f59e0b", icon:"⏳" };
    if (a.prazo && diffDias(a.prazo) < 0) return { label:`Atrasado ${Math.abs(diffDias(a.prazo))}d`, color:"#f87171", icon:"🔴" };
    if (a.prazo && diffDias(a.prazo) <= 7) return { label:`Vence em ${diffDias(a.prazo)}d`, color:"#f59e0b", icon:"🟡" };
    return { label:"No prazo", color:"#10b981", icon:"🟢" };
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
        <button onClick={onBack} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14 }}>← Equipe</button>
        <UserAvatar user={membro} size={48} />
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:0 }}>{membro.name}</h2>
            {discRes && <Badge color={discRes.cor}>{discRes.emoji} {discRes.nome}</Badge>}
          </div>
          <p style={{ color:"#888", fontSize:13, margin:"4px 0 0" }}>{membro.cargo} · {membro.nivel} · {membro.area} · {membro.tempo} na empresa</p>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:24 }}>
        {[
          { label:"Total acordos", val:total,       color:"#6366f1" },
          { label:"Concluídos",    val:concluidos,   color:"#10b981" },
          { label:"Aguard. aprv.", val:pendentes,    color:"#f59e0b" },
          { label:"Atrasados",     val:atrasados,    color:"#f87171" },
          { label:"Venc. em 7d",   val:proximos,     color:"#fb923c" },
        ].map(k=>(
          <Card key={k.label} style={{ padding:"14px 16px", textAlign:"center" }}>
            <p style={{ color:"#666", fontSize:11, margin:"0 0 6px", textTransform:"uppercase", letterSpacing:0.8 }}>{k.label}</p>
            <p style={{ color:k.color, fontSize:24, fontWeight:900, margin:0 }}>{k.val}</p>
          </Card>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        {/* Donut + status breakdown */}
        <Card>
          <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 20px" }}>📊 Performance de Acordos</h4>
          <div style={{ display:"flex", alignItems:"center", gap:28 }}>
            <div style={{ textAlign:"center" }}>
              <DonutChart value={concluidos} total={total} color="#10b981" size={88} />
              <p style={{ color:"#888", fontSize:11, margin:"8px 0 0" }}>Taxa de conclusão</p>
            </div>
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { label:"✅ Concluídos",       val:concluidos, color:"#10b981" },
                { label:"⏳ Aguard. aprovação", val:pendentes,  color:"#f59e0b" },
                { label:"🟢 No prazo",          val:noPrazo,    color:"#6366f1" },
                { label:"🟡 Próx. do prazo",    val:proximos,   color:"#fb923c" },
                { label:"🔴 Atrasados",          val:atrasados,  color:"#f87171" },
              ].map(it=>(
                <div key={it.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ color:"#888", fontSize:12 }}>{it.label}</span>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:60, height:5, background:"rgba(255,255,255,0.05)", borderRadius:3, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${total?it.val/total*100:0}%`, background:it.color, borderRadius:3 }} />
                    </div>
                    <span style={{ color:it.color, fontWeight:700, fontSize:12, minWidth:16 }}>{it.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Roda da vida snapshot */}
        <Card>
          <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>⭕ Roda da Vida {rodaMedia && <span style={{ color:"#818cf8", fontWeight:400 }}>· média {rodaMedia}</span>}</h4>
          {rodaRes ? (
            <BarMini
              items={Object.entries(rodaRes).map(([area,val],i)=>({ label:area, val, color:RODA_CORES[i] }))}
              maxVal={10}
            />
          ) : (
            <div style={{ textAlign:"center", padding:24 }}>
              <p style={{ color:"#444", fontSize:28, margin:"0 0 8px" }}>⭕</p>
              <p style={{ color:"#555", fontSize:13 }}>Não preenchida</p>
            </div>
          )}
        </Card>
      </div>

      {/* Lista de acordos */}
      <Card>
        <h4 style={{ color:"#fff", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>🤝 Acordos ({total})</h4>
        {total === 0 ? (
          <p style={{ color:"#555", textAlign:"center", padding:"24px 0" }}>Nenhum acordo registrado.</p>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {acordosMembro.map(a => {
              const st = getStatusAcordo(a);
              const itensTotal = a.itens.length;
              const itensDone  = a.itens.filter(i=>i.status==="concluido").length;
              return (
                <div key={a.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 16px", background:"rgba(255,255,255,0.03)", border:`1px solid ${st.color}22`, borderRadius:12 }}>
                  <span style={{ fontSize:18 }}>{st.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ color:"#fff", fontWeight:700, fontSize:14, margin:"0 0 3px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.titulo}</p>
                    <p style={{ color:"#666", fontSize:12, margin:0 }}>Prazo: {fmtDate(a.prazo)}{itensTotal>0 ? ` · ${itensDone}/${itensTotal} itens` : ""}</p>
                  </div>
                  <Badge color={st.color}>{st.label}</Badge>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

const InicioGestorTime = ({ user }) => {
  const equipe = getUsers().filter(u=>u.gestor===user.id);
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  if (membroSelecionado) return (
    <div style={{ padding:32 }}>
      <PainelMembro membro={membroSelecionado} lider={user} onBack={()=>setMembroSelecionado(null)} />
    </div>
  );

  const hoje = new Date(); hoje.setHours(0,0,0,0);
  const diffDias = (iso) => { const d = new Date(iso); d.setHours(0,0,0,0); return Math.round((d-hoje)/(1000*60*60*24)); };

  const meusAcordos = appState.acordos.filter(a=>a.liderId===user.id);
  const totalAcordos   = meusAcordos.length;
  const concluidos     = meusAcordos.filter(a=>a.status==="concluido").length;
  const atrasados      = meusAcordos.filter(a=>a.status!=="concluido" && a.prazo && diffDias(a.prazo)<0).length;
  const pendAprovacao  = meusAcordos.filter(a=>a.status==="pendente_aprovacao").length;

  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>Olá, {user.name.split(" ")[0]}! 👋</h1>
      <p style={{ color:"#888", margin:"0 0 28px" }}>Visão executiva da sua equipe.</p>

      {/* KPIs globais */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
        {[
          { label:"Colaboradores",     value:equipe.length,  icon:"👥", color:"#6366f1" },
          { label:"Acordos ativos",    value:totalAcordos,   icon:"🤝", color:"#8b5cf6" },
          { label:"Aguard. aprovação", value:pendAprovacao,  icon:"⏳", color:"#f59e0b" },
          { label:"Atrasados",         value:atrasados,      icon:"🔴", color:"#f87171" },
        ].map(item=>(
          <Card key={item.label} style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:28 }}>{item.icon}</span>
            <div>
              <p style={{ color:"#888", fontSize:11, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:1 }}>{item.label}</p>
              <p style={{ color:item.color, fontSize:22, fontWeight:800, margin:0 }}>{item.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Cards da equipe — clicáveis */}
      <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 16px" }}>👥 Equipe — clique para ver o painel completo</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {equipe.map(col => {
          const acordosCol  = meusAcordos.filter(a=>a.lideradoId===col.id);
          const concl       = acordosCol.filter(a=>a.status==="concluido").length;
          const tot         = acordosCol.length;
          const atras       = acordosCol.filter(a=>a.status!=="concluido" && a.prazo && diffDias(a.prazo)<0).length;
          const pend        = acordosCol.filter(a=>a.status==="pendente_aprovacao").length;
          const taxa        = tot > 0 ? Math.round(concl/tot*100) : null;
          const discRes     = appState.testesResults.disc?.[col.id];
          const temAlerta   = atras > 0 || pend > 0;
          return (
            <div key={col.id} onClick={()=>setMembroSelecionado(col)}
              style={{ padding:"18px 20px", background:"rgba(255,255,255,0.03)", border:`1px solid ${temAlerta?"rgba(248,113,113,0.25)":"rgba(255,255,255,0.07)"}`, borderRadius:16, cursor:"pointer", transition:"all 0.15s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <UserAvatar user={col} size={44} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                    <p style={{ color:"#fff", fontWeight:700, fontSize:15, margin:0 }}>{col.name}</p>
                    {discRes && <span style={{ fontSize:14 }} title={discRes.nome}>{discRes.emoji}</span>}
                  </div>
                  <p style={{ color:"#888", fontSize:12, margin:0 }}>{col.cargo} · {col.nivel}</p>
                </div>
                {taxa !== null && <DonutChart value={concl} total={tot} color={taxa>=70?"#10b981":taxa>=40?"#f59e0b":"#f87171"} size={52} />}
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <Badge color="#6366f1">{tot} acordo{tot!==1?"s":""}</Badge>
                {concl>0 && <Badge color="#10b981">✅ {concl} concluído{concl!==1?"s":""}</Badge>}
                {pend>0  && <Badge color="#f59e0b">⏳ {pend} aguard. aprv.</Badge>}
                {atras>0 && <Badge color="#f87171">🔴 {atras} atrasado{atras!==1?"s":""}</Badge>}
                {tot===0 && <Badge color="#444">Sem acordos</Badge>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AvaliacaoGestor = ({ user }) => {
  const colabs = getUsers().filter(u=>u.gestor===user.id);
  const [selected, setSelected] = useState(null); const [notas, setNotas] = useState({});
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>⭐ Avaliações</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
        <div>
          {colabs.map(col=>(
            <Card key={col.id} style={{ marginBottom:12, cursor:"pointer", border:selected?.id===col.id?"1px solid #f59e0b":"1px solid rgba(255,255,255,0.08)" }} onClick={()=>setSelected(col)}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <UserAvatar user={col} size={44} />
                <div style={{ flex:1 }}><h3 style={{ color:"#fff", fontSize:15, fontWeight:700, margin:0 }}>{col.name}</h3><p style={{ color:"#888", fontSize:13, margin:0 }}>{col.cargo}</p></div>
                {notas[col.id] ? <Badge color="#10b981">✓ Avaliado</Badge> : <Badge color="#f59e0b">Pendente</Badge>}
              </div>
            </Card>
          ))}
        </div>
        {selected && (
          <Card>
            <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 16px" }}>{selected.name}</h3>
            {["Técnica","Comunicação","Resultado","Colaboração"].map(c=>(
              <div key={c} style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ color:"#ccc", fontSize:13 }}>{c}</span><span style={{ color:"#f59e0b", fontWeight:800 }}>{notas[selected.id]?.[c]||5}/10</span></div>
                <input type="range" min="0" max="10" value={notas[selected.id]?.[c]||5} onChange={e=>setNotas(p=>({...p,[selected.id]:{...p[selected.id],[c]:Number(e.target.value)}}))} style={{ width:"100%", accentColor:"#f59e0b" }} />
              </div>
            ))}
            <button onClick={()=>setNotas(p=>({...p,[selected.id]:{...p[selected.id],saved:true}}))} style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", borderRadius:10, color:"#000", fontWeight:700, cursor:"pointer" }}>Salvar Avaliação</button>
          </Card>
        )}
      </div>
    </div>
  );
};

const PDIsEquipe = ({ user }) => {
  const colabs = getUsers().filter(u=>u.gestor===user.id);
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>📋 PDIs da Equipe</h1>
      {colabs.map(col=>(
        <Card key={col.id} style={{ marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
            <UserAvatar user={col} size={44} />
            <div><h3 style={{ color:"#fff", fontWeight:700, margin:0 }}>{col.name}</h3><p style={{ color:"#888", fontSize:13, margin:0 }}>{col.cargo}</p></div>
            <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
              <Badge color="#10b981">3 metas</Badge><Badge color="#f59e0b">68%</Badge>
            </div>
          </div>
          <ProgressBar value={68} max={100} color="#6366f1" />
        </Card>
      ))}
    </div>
  );
};

// ─── Moving Motivators Gestor (analítico + individual) ────────────────────────
const MotivadoresGestor = ({ user }) => {
  const colaboradores = getUsers().filter(u=>u.gestor===user.id && MM_RESULTADOS[u.id]);
  const [selectedColab, setSelectedColab] = useState(null);
  const teamPrioridade = MOTIVADORES.map(m => {
    const scores = colaboradores.map(c=>posScore(MM_RESULTADOS[c.id].ordem,m.id));
    return { ...m, avgPrio: scores.reduce((a,b)=>a+b,0)/(scores.length||1) };
  }).sort((a,b)=>b.avgPrio-a.avgPrio);
  const teamImpacto = MOTIVADORES.map(m => {
    const scores = colaboradores.map(c=>impScore(MM_RESULTADOS[c.id].impacto[m.id]));
    return { ...m, avgImp: scores.reduce((a,b)=>a+b,0)/(scores.length||1) };
  });
  const tensoes = teamPrioridade.slice(0,5).filter(m=>(teamImpacto.find(i=>i.id===m.id)?.avgImp??0)<0);

  return (
    <div style={{ padding:32 }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>🃏 Moving Motivators da Equipe</h1>
        <p style={{ color:"#888", margin:0 }}>Veja o que motiva cada colaborador e o panorama geral do time.</p>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:28, flexWrap:"wrap" }}>
        <button onClick={()=>setSelectedColab(null)} style={{ padding:"10px 20px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:700, fontSize:14, background:!selectedColab?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.06)", color:!selectedColab?"#fff":"#888" }}>📊 Analítico do Time</button>
        {colaboradores.map(c=>(
          <button key={c.id} onClick={()=>setSelectedColab(c)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:700, fontSize:14, background:selectedColab?.id===c.id?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.06)", color:selectedColab?.id===c.id?"#818cf8":"#888", borderLeft:selectedColab?.id===c.id?"3px solid #6366f1":"3px solid transparent" }}>
            <UserAvatar user={c} size={22} />{c.name.split(" ")[0]}
          </button>
        ))}
      </div>
      {!selectedColab && (
        <div style={{ display:"grid", gap:20 }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            <Card><p style={{ color:"#888", fontSize:12, textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Avaliados</p><p style={{ color:"#6366f1", fontSize:32, fontWeight:900, margin:0 }}>{colaboradores.length}</p></Card>
            <Card><p style={{ color:"#888", fontSize:12, textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Mais valorizado</p><p style={{ color:"#fff", fontSize:18, fontWeight:800, margin:0 }}>{teamPrioridade[0]?.emoji} {teamPrioridade[0]?.nome}</p></Card>
            <Card style={{ background:tensoes.length>0?"rgba(251,191,36,0.06)":"rgba(16,185,129,0.06)", borderColor:tensoes.length>0?"rgba(251,191,36,0.2)":"rgba(16,185,129,0.2)" }}><p style={{ color:"#888", fontSize:12, textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Tensões</p><p style={{ color:tensoes.length>0?"#fbbf24":"#10b981", fontSize:32, fontWeight:900, margin:0 }}>{tensoes.length}</p></Card>
          </div>
          <Card>
            <h3 style={{ color:"#fff", fontSize:17, fontWeight:800, margin:"0 0 20px" }}>🏆 O que o time mais valoriza</h3>
            {teamPrioridade.map((m,idx)=>{
              const imp=teamImpacto.find(i=>i.id===m.id);
              const impC=imp?.avgImp>=1?"#10b981":imp?.avgImp>=0?"#6ee7b7":imp?.avgImp>-1?"#fbbf24":"#f87171";
              return (
                <div key={m.id} style={{ display:"grid", gridTemplateColumns:"28px 28px 1fr 80px 120px", alignItems:"center", gap:12, marginBottom:10 }}>
                  <span style={{ color:idx<3?"#fbbf24":"#555", fontSize:13, fontWeight:800, textAlign:"right" }}>#{idx+1}</span>
                  <span style={{ fontSize:20 }}>{m.emoji}</span>
                  <div style={{ position:"relative", height:28, borderRadius:8, background:"rgba(255,255,255,0.04)", overflow:"hidden" }}>
                    <div style={{ position:"absolute", left:0, top:0, bottom:0, width:`${(m.avgPrio/MOTIVADORES.length)*100}%`, background:`${m.cor}33`, borderRadius:8 }} />
                    <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:m.cor, fontSize:12, fontWeight:700 }}>{m.nome}</span>
                  </div>
                  <span style={{ color:impC, fontSize:15, fontWeight:800, textAlign:"center" }}>{getImpEmoji(imp?.avgImp>=1?"positivo":imp?.avgImp>=0?"neutro":imp?.avgImp>=-1?"negativo":"muito_negativo")}</span>
                  <span style={{ color:impC, fontSize:12 }}>{imp?.avgImp>0.5?"Bem atendido":imp?.avgImp>-0.5?"Neutro":"Pouco atendido"}</span>
                </div>
              );
            })}
          </Card>
        </div>
      )}
      {selectedColab && (() => {
        const res=MM_RESULTADOS[selectedColab.id];
        const sorted=res.ordem.map((id,idx)=>({...MOTIVADORES.find(m=>m.id===id),posicao:idx+1}));
        const top3=sorted.slice(0,3);
        const tensoesPessoais=sorted.filter(m=>m.posicao<=5&&impScore(res.impacto[m.id])<0);
        return (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:16, padding:"20px 24px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, marginBottom:24 }}>
              <UserAvatar user={selectedColab} size={60} />
              <div style={{ flex:1 }}>
                <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:"0 0 4px" }}>{selectedColab.name}</h2>
                <p style={{ color:"#888", margin:"0 0 8px" }}>{selectedColab.cargo} · {selectedColab.nivel}</p>
                <div style={{ display:"flex", gap:8 }}>
                  {tensoesPessoais.length>0?<Badge color="#fbbf24">⚠️ {tensoesPessoais.length} tensão{tensoesPessoais.length>1?"ões":""}</Badge>:<Badge color="#10b981">✅ Sem tensões</Badge>}
                  <Badge color="#6366f1">🃏 MM preenchido</Badge>
                </div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {top3.map((m,i)=>(
                  <div key={m.id} style={{ textAlign:"center", width:56 }}>
                    <div style={{ background:m.cor+"22", border:`2px solid ${m.cor}55`, borderRadius:10, padding:"6px 4px", marginBottom:2 }}>
                      <div style={{ fontSize:22 }}>{m.emoji}</div>
                      <div style={{ color:["#ffd700","#c0c0c0","#cd7f32"][i], fontSize:10, fontWeight:900 }}>#{i+1}</div>
                    </div>
                    <div style={{ color:m.cor, fontSize:9, fontWeight:700 }}>{m.nome}</div>
                  </div>
                ))}
              </div>
            </div>
            <Card style={{ marginBottom:18 }}>
              <h3 style={{ color:"#fff", fontSize:16, fontWeight:800, margin:"0 0 16px" }}>📋 Ordenação por prioridade</h3>
              <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:8 }}>
                {sorted.map((m,idx)=>(
                  <div key={m.id} style={{ flexShrink:0, width:88, textAlign:"center", background:`linear-gradient(160deg,${m.cor}22,${m.cor}0a)`, border:`2px solid ${idx<3?m.cor+"88":m.cor+"33"}`, borderRadius:14, padding:"14px 8px", position:"relative" }}>
                    <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:idx<3?["#ffd700","#c0c0c0","#cd7f32"][idx]:"#333", color:idx<3?"#000":"#888", width:22, height:22, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, border:"2px solid #0d0d1a" }}>{idx+1}</div>
                    <div style={{ fontSize:28, marginBottom:6, marginTop:4 }}>{m.emoji}</div>
                    <div style={{ color:m.cor, fontWeight:800, fontSize:11, lineHeight:1.2 }}>{m.nome}</div>
                    <div style={{ color:"#666", fontSize:9, marginTop:4 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <Card style={{ background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.15)" }}>
                <h4 style={{ color:"#10b981", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>🏆 Top 3</h4>
                {top3.map((m,i)=>(
                  <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(255,255,255,0.03)", borderRadius:10, marginBottom:8 }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:["#ffd70022","#c0c0c022","#cd7f3222"][i], border:`2px solid ${["#ffd700","#c0c0c0","#cd7f32"][i]}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:["#ffd700","#c0c0c0","#cd7f32"][i], flexShrink:0 }}>{i+1}</div>
                    <span style={{ fontSize:18 }}>{m.emoji}</span>
                    <div style={{ flex:1 }}><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13 }}>{m.nome}</p></div>
                    <div style={{ textAlign:"center" }}><div style={{ color:getImpCor(res.impacto[m.id]), fontSize:16 }}>{getImpEmoji(res.impacto[m.id])}</div></div>
                  </div>
                ))}
              </Card>
              <Card style={{ background:tensoesPessoais.length>0?"rgba(251,191,36,0.05)":"rgba(99,102,241,0.04)", border:`1px solid ${tensoesPessoais.length>0?"rgba(251,191,36,0.2)":"rgba(99,102,241,0.12)"}` }}>
                {tensoesPessoais.length>0?(
                  <>
                    <h4 style={{ color:"#fbbf24", fontSize:14, fontWeight:800, margin:"0 0 12px" }}>⚠️ Tensões — PDI</h4>
                    {tensoesPessoais.map(m=>(
                      <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(248,113,113,0.08)", borderRadius:10, marginBottom:8 }}>
                        <span style={{ color:"#555", fontSize:11, fontWeight:800, minWidth:20 }}>#{m.posicao}</span>
                        <span style={{ fontSize:18 }}>{m.emoji}</span>
                        <div style={{ flex:1 }}><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13 }}>{m.nome}</p></div>
                        <button style={{ padding:"5px 10px", background:"#6366f122", border:"1px solid #6366f144", borderRadius:6, color:"#818cf8", fontSize:11, fontWeight:700, cursor:"pointer" }}>+ PDI</button>
                      </div>
                    ))}
                  </>
                ):<><h4 style={{ color:"#818cf8", fontSize:14, fontWeight:800, margin:"0 0 8px" }}>✅ Sem tensões</h4><p style={{ color:"#555", fontSize:13 }}>Motivadores bem atendidos 🎉</p></>}
              </Card>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ─── Delegation Poker ─────────────────────────────────────────────────────────
const DELEGATION_LEVELS = [
  { level:1, name:"Diz", color:"#f87171",  desc:"Gestor decide e comunica" },
  { level:2, name:"Vende", color:"#f97316", desc:"Gestor decide e explica" },
  { level:3, name:"Consulta", color:"#f59e0b", desc:"Gestor consulta antes" },
  { level:4, name:"Concorda", color:"#eab308", desc:"Decide junto" },
  { level:5, name:"Aconselha", color:"#84cc16", desc:"Time decide com conselho" },
  { level:6, name:"Pergunta", color:"#10b981", desc:"Time decide, informa depois" },
  { level:7, name:"Delega", color:"#06b6d4", desc:"Total autonomia ao time" },
];

const DelegationPokerColaborador = ({ user }) => {
  const gestorTimeUser = getUsers().find(u=>u.id===user.gestor&&u.role==="gestor_time");
  const [votos, setVotos] = useState({...delegationStore.votos});
  if(!gestorTimeUser) return <div style={{ padding:32 }}><p style={{ color:"#555" }}>Nenhum tópico disponível.</p></div>;
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>♟️ Delegation Poker</h1>
      {delegationStore.topicos.filter(t=>t.criadoPor===gestorTimeUser.id).map(topico=>(
        <Card key={topico.id} style={{ marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
            <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:0 }}>{topico.titulo}</h3>
            <Badge color={topico.status==="aberto"?"#10b981":"#666"}>{topico.status}</Badge>
          </div>
          <p style={{ color:"#888", fontSize:13, margin:"0 0 20px" }}>{topico.descricao}</p>
          {topico.status==="aberto" && (
            <div>
              <p style={{ color:"#aaa", fontSize:13, marginBottom:12 }}>Seu voto:</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {DELEGATION_LEVELS.map(l=>(
                  <button key={l.level} onClick={()=>setVotos(p=>({...p,[topico.id]:{...p[topico.id],[user.id]:l.level}}))}
                    style={{ padding:"10px 16px", borderRadius:10, border:`2px solid ${votos[topico.id]?.[user.id]===l.level?l.color:l.color+"44"}`, background:votos[topico.id]?.[user.id]===l.level?l.color+"33":"rgba(255,255,255,0.04)", color:l.color, fontWeight:700, cursor:"pointer", fontSize:13, transition:"all 0.15s" }}>
                    {l.level} — {l.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {votos[topico.id]?.[user.id] && (
            <div style={{ marginTop:12, padding:"10px 14px", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:10 }}>
              <span style={{ color:"#10b981", fontSize:13, fontWeight:700 }}>✓ Seu voto: Nível {votos[topico.id][user.id]} — {DELEGATION_LEVELS.find(l=>l.level===votos[topico.id][user.id])?.name}</span>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

const DelegationPokerGestor = ({ user }) => {
  const [topicos, setTopicos] = useState(delegationStore.topicos);
  const [votos, setVotos] = useState(delegationStore.votos);
  const [view, setView] = useState("lista");
  const [topicoAtivo, setTopicoAtivo] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoDesc, setNovoDesc] = useState("");
  const [cartaGestor, setCartaGestor] = useState(null);
  const colaboradores = getUsers().filter(u=>u.gestor===user.id);
  const calcMedia = (tid) => { const v=votos[tid]; if(!v) return null; const vals=Object.values(v); return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1):null; };
  const criarTopico = () => {
    if(!novoTitulo.trim()||cartaGestor===null) return;
    const novo={id:Date.now(),titulo:novoTitulo,descricao:novoDesc,status:"aberto",criadoPor:user.id,cartaGestor};
    const updated=[...topicos,novo];
    setTopicos(updated); delegationStore.topicos=updated;
    setNovoTitulo(""); setNovoDesc(""); setCartaGestor(null); setView("lista");
  };
  return (
    <div style={{ padding:32 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:0 }}>♟️ Delegation Poker</h1>
        {view==="lista"&&<button onClick={()=>setView("novo")} style={{ padding:"10px 20px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>+ Novo Tópico</button>}
      </div>
      {view==="lista"&&topicos.filter(t=>t.criadoPor===user.id).map(t=>{
        const media=calcMedia(t.id);
        return (
          <Card key={t.id} style={{ marginBottom:12, cursor:"pointer" }} onClick={()=>{setTopicoAtivo(t);setView("detalhe");}}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <h3 style={{ color:"#fff", fontSize:15, fontWeight:700, margin:0 }}>{t.titulo}</h3>
              <Badge color={t.status==="aberto"?"#10b981":"#666"}>{t.status}</Badge>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              <Badge color="#6366f1">Gestor: Nível {t.cartaGestor}</Badge>
              {media&&<Badge color="#f59e0b">Média equipe: {media}</Badge>}
              <Badge color="#888">{Object.keys(votos[t.id]||{}).length}/{colaboradores.length} votos</Badge>
            </div>
          </Card>
        );
      })}
      {view==="novo"&&(
        <Card>
          <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:"0 0 20px" }}>Novo Tópico</h2>
          <div style={{ marginBottom:16 }}><label style={{ color:"#888", fontSize:13, display:"block", marginBottom:6 }}>Título</label><input value={novoTitulo} onChange={e=>setNovoTitulo(e.target.value)} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:15, padding:"12px 16px", boxSizing:"border-box" }} /></div>
          <div style={{ marginBottom:20 }}><label style={{ color:"#888", fontSize:13, display:"block", marginBottom:6 }}>Descrição</label><textarea value={novoDesc} onChange={e=>setNovoDesc(e.target.value)} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"12px 16px", resize:"vertical", minHeight:80, boxSizing:"border-box" }} /></div>
          <p style={{ color:"#aaa", fontSize:14, marginBottom:12 }}>Sua carta (nível de delegação esperado):</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
            {DELEGATION_LEVELS.map(l=>(
              <button key={l.level} onClick={()=>setCartaGestor(l.level)}
                style={{ padding:"10px 14px", borderRadius:10, border:`2px solid ${cartaGestor===l.level?l.color:l.color+"44"}`, background:cartaGestor===l.level?l.color+"33":"rgba(255,255,255,0.04)", color:l.color, fontWeight:700, cursor:"pointer", fontSize:13 }}>
                {l.level} — {l.name}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={()=>setView("lista")} style={{ padding:"12px 20px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#aaa", cursor:"pointer" }}>Cancelar</button>
            <button onClick={criarTopico} style={{ padding:"12px 24px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>Criar Tópico</button>
          </div>
        </Card>
      )}
      {view==="detalhe"&&topicoAtivo&&(
        <div>
          <button onClick={()=>setView("lista")} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14, marginBottom:20 }}>← Voltar</button>
          <Card>
            <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:"0 0 8px" }}>{topicoAtivo.titulo}</h2>
            <p style={{ color:"#888", margin:"0 0 24px" }}>{topicoAtivo.descricao}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
              <div style={{ textAlign:"center", padding:20, background:"rgba(99,102,241,0.08)", borderRadius:12 }}>
                <p style={{ color:"#888", fontSize:12, margin:"0 0 8px" }}>Sua carta</p>
                <div style={{ fontSize:36, fontWeight:900, color:"#6366f1" }}>{topicoAtivo.cartaGestor}</div>
                <p style={{ color:"#818cf8", fontWeight:700, margin:"4px 0 0" }}>{DELEGATION_LEVELS.find(l=>l.level===topicoAtivo.cartaGestor)?.name}</p>
              </div>
              <div style={{ textAlign:"center", padding:20, background:"rgba(245,158,11,0.08)", borderRadius:12 }}>
                <p style={{ color:"#888", fontSize:12, margin:"0 0 8px" }}>Média Equipe</p>
                <div style={{ fontSize:36, fontWeight:900, color:"#f59e0b" }}>{calcMedia(topicoAtivo.id)||"—"}</div>
                <p style={{ color:"#f59e0b", fontWeight:700, margin:"4px 0 0" }}>{Object.keys(votos[topicoAtivo.id]||{}).length}/{colaboradores.length} votaram</p>
              </div>
              <div style={{ textAlign:"center", padding:20, background:"rgba(16,185,129,0.08)", borderRadius:12 }}>
                <p style={{ color:"#888", fontSize:12, margin:"0 0 8px" }}>Consenso</p>
                <div style={{ fontSize:36, fontWeight:900, color:"#10b981" }}>{calcMedia(topicoAtivo.id)?Math.abs(Number(calcMedia(topicoAtivo.id))-topicoAtivo.cartaGestor)<1?"✅":"⚠️":"—"}</div>
              </div>
            </div>
            <div style={{ marginTop:20 }}>
              <h4 style={{ color:"#fff", fontSize:14, fontWeight:700, margin:"0 0 12px" }}>Votos individuais</h4>
              {colaboradores.map(c=>{
                const v=votos[topicoAtivo.id]?.[c.id];
                const lv=v?DELEGATION_LEVELS.find(l=>l.level===v):null;
                return (
                  <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                    <UserAvatar user={c} size={32} />
                    <span style={{ color:"#ccc", fontSize:13, flex:1 }}>{c.name}</span>
                    {v?<Badge color={lv?.color||"#888"}>Nível {v} — {lv?.name}</Badge>:<Badge color="#555">Não votou</Badge>}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

const DelegationPokerGTVotante = ({ user }) => {
  const [votos, setVotos] = useState({...delegationStoreSenior.votos});
  const gestorSenior = getUsers().find(u=>u.id===user.gestor&&u.role==="gestor");
  if(!gestorSenior) return <div style={{ padding:32 }}><p style={{ color:"#555" }}>Nenhum tópico.</p></div>;
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>♟️ Delegation do Gestor</h1>
      {delegationStoreSenior.topicos.map(t=>(
        <Card key={t.id} style={{ marginBottom:16 }}>
          <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 8px" }}>{t.titulo}</h3>
          <p style={{ color:"#888", fontSize:13, margin:"0 0 20px" }}>{t.descricao}</p>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {DELEGATION_LEVELS.map(l=>(
              <button key={l.level} onClick={()=>setVotos(p=>({...p,[t.id]:{...p[t.id],[user.id]:l.level}}))}
                style={{ padding:"10px 14px", borderRadius:10, border:`2px solid ${votos[t.id]?.[user.id]===l.level?l.color:l.color+"44"}`, background:votos[t.id]?.[user.id]===l.level?l.color+"33":"rgba(255,255,255,0.04)", color:l.color, fontWeight:700, cursor:"pointer", fontSize:13 }}>
                {l.level} — {l.name}
              </button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

// ─── Gestor Sênior Tabs ───────────────────────────────────────────────────────
const InicioGestor = ({ user }) => {
  const { gestoresTimes, colabs } = getReportees(user.id);
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 6px" }}>Olá, {user.name.split(" ")[0]}! 👋</h1>
      <p style={{ color:"#888", margin:"0 0 32px" }}>Visão geral da cadeia.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[{label:"Gestores de Time",value:gestoresTimes.length,icon:"👑",color:"#f59e0b"},{label:"Colaboradores",value:colabs.length,icon:"👥",color:"#6366f1"},{label:"Times Ativos",value:getTeams().filter(t=>t.gestorId===user.id).length,icon:"🏷️",color:"#10b981"},{label:"PDIs em curso",value:colabs.length,icon:"📋",color:"#8b5cf6"}].map(item=>(
          <Card key={item.label} style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:28 }}>{item.icon}</span>
            <div><p style={{ color:"#888", fontSize:11, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:1 }}>{item.label}</p><p style={{ color:item.color, fontSize:22, fontWeight:800, margin:0 }}>{item.value}</p></div>
          </Card>
        ))}
      </div>
      <Card>
        <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 20px" }}>Gestores de Time</h3>
        {gestoresTimes.map(gt=>{
          const equipe=getUsers().filter(u=>u.gestor===gt.id);
          return (
            <div key={gt.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <UserAvatar user={gt} size={40} />
              <div style={{ flex:1 }}><p style={{ color:"#fff", fontWeight:600, margin:0 }}>{gt.name}</p><p style={{ color:"#888", fontSize:13, margin:0 }}>{gt.cargo}</p></div>
              <Badge color="#f59e0b">{equipe.length} colaboradores</Badge>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

const VisaoGeralGestor = ({ user }) => {
  const { gestoresTimes, colabs } = getReportees(user.id);
  const todos = [...gestoresTimes, ...colabs];
  const mmCount = todos.filter(u=>MM_RESULTADOS[u.id]).length;
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>🔭 Visão Geral</h1>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        {[{label:"Total na cadeia",value:todos.length,color:"#6366f1"},{label:"MM preenchidos",value:mmCount,color:"#f59e0b"},{label:"Times",value:getTeams().filter(t=>t.gestorId===user.id).length,color:"#10b981"}].map(k=>(
          <Card key={k.label}><p style={{ color:"#888", fontSize:13, margin:"0 0 8px" }}>{k.label}</p><p style={{ color:k.color, fontSize:28, fontWeight:900, margin:0 }}>{k.value}</p></Card>
        ))}
      </div>
      <Card>
        <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 20px" }}>Toda a cadeia</h3>
        {todos.map(u=>(
          <div key={u.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            <UserAvatar user={u} size={36} />
            <div style={{ flex:1 }}><p style={{ color:"#fff", fontWeight:600, margin:0, fontSize:14 }}>{u.name}</p><p style={{ color:"#888", fontSize:12, margin:0 }}>{u.cargo}</p></div>
            <Badge color={roleColor(u.role)}>{roleLabel(u.role)}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
};

const MeusGTs = ({ user }) => {
  const { gestoresTimes } = getReportees(user.id);
  const [selected, setSelected] = useState(gestoresTimes[0]||null);
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>👥 Gestores de Time</h1>
      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:20 }}>
        <div>
          {gestoresTimes.map(gt=>(
            <div key={gt.id} onClick={()=>setSelected(gt)}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"12px", borderRadius:12, cursor:"pointer", marginBottom:8, background:selected?.id===gt.id?"rgba(99,102,241,0.15)":"rgba(255,255,255,0.03)", border:`1px solid ${selected?.id===gt.id?"#6366f144":"rgba(255,255,255,0.07)"}` }}>
              <UserAvatar user={gt} size={36} />
              <div><p style={{ color:"#fff", fontWeight:700, margin:0, fontSize:13 }}>{gt.name}</p><p style={{ color:"#888", fontSize:11, margin:0 }}>{gt.cargo}</p></div>
            </div>
          ))}
        </div>
        {selected && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:16, padding:20, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, marginBottom:16 }}>
              <UserAvatar user={selected} size={56} />
              <div><h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:"0 0 4px" }}>{selected.name}</h2><p style={{ color:"#888", margin:0 }}>{selected.cargo} · {selected.nivel}</p></div>
            </div>
            <Card>
              <h4 style={{ color:"#fff", fontSize:15, fontWeight:700, margin:"0 0 16px" }}>Equipe</h4>
              {getUsers().filter(u=>u.gestor===selected.id).map(c=>(
                <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <UserAvatar user={c} size={34} />
                  <div style={{ flex:1 }}><p style={{ color:"#fff", fontWeight:600, margin:0, fontSize:13 }}>{c.name}</p><p style={{ color:"#888", fontSize:12, margin:0 }}>{c.cargo}</p></div>
                  <Badge color="#6366f1">{c.nivel}</Badge>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const MotivadoresGestorSenior = ({ user }) => {
  const { todos } = getReportees(user.id);
  const comMM = todos.filter(u=>MM_RESULTADOS[u.id]);
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>🃏 Moving Motivators — Cadeia</h1>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
        <button onClick={()=>setSelected(null)} style={{ padding:"10px 20px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:700, fontSize:14, background:!selected?"linear-gradient(135deg,#6366f1,#8b5cf6)":"rgba(255,255,255,0.06)", color:!selected?"#fff":"#888" }}>📊 Visão Geral</button>
        {comMM.map(u=>(
          <button key={u.id} onClick={()=>setSelected(u)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:10, border:"none", cursor:"pointer", fontWeight:700, fontSize:14, background:selected?.id===u.id?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.06)", color:selected?.id===u.id?"#818cf8":"#888", borderLeft:selected?.id===u.id?"3px solid #6366f1":"3px solid transparent" }}>
            <UserAvatar user={u} size={20} />{u.name.split(" ")[0]}<Badge color={roleColor(u.role)} style={{ fontSize:9 }}>{u.role==="gestor_time"?"GT":"C"}</Badge>
          </button>
        ))}
      </div>
      {!selected && (
        <Card>
          <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 20px" }}>Resumo da cadeia — {comMM.length}/{todos.length} preenchidos</h3>
          {comMM.map(u=>{
            const res=MM_RESULTADOS[u.id];
            const top3=res.ordem.slice(0,3).map(id=>MOTIVADORES.find(m=>m.id===id));
            const tensoes=res.ordem.slice(0,5).filter(id=>impScore(res.impacto[id])<0).length;
            return (
              <div key={u.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", cursor:"pointer" }} onClick={()=>setSelected(u)}>
                <UserAvatar user={u} size={36} />
                <div style={{ flex:1 }}><p style={{ color:"#fff", fontWeight:600, margin:0 }}>{u.name}</p><p style={{ color:"#888", fontSize:12, margin:0 }}>{u.cargo}</p></div>
                <div style={{ display:"flex", gap:4 }}>
                  {top3.map(m=><span key={m.id} title={m.nome} style={{ fontSize:18 }}>{m.emoji}</span>)}
                </div>
                {tensoes>0&&<Badge color="#fbbf24">⚠️ {tensoes}</Badge>}
              </div>
            );
          })}
        </Card>
      )}
      {selected&&MM_RESULTADOS[selected.id]&&(()=>{
        const res=MM_RESULTADOS[selected.id];
        const sorted=res.ordem.map((id,idx)=>({...MOTIVADORES.find(m=>m.id===id),posicao:idx+1}));
        return (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:16, padding:20, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, marginBottom:20 }}>
              <UserAvatar user={selected} size={56} />
              <div><h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:"0 0 4px" }}>{selected.name}</h2><p style={{ color:"#888", margin:0 }}>{selected.cargo}</p></div>
            </div>
            <Card>
              <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:8 }}>
                {sorted.map((m,idx)=>(
                  <div key={m.id} style={{ flexShrink:0, width:84, textAlign:"center", background:`${m.cor}18`, border:`2px solid ${idx<3?m.cor+"88":m.cor+"33"}`, borderRadius:12, padding:"10px 6px", position:"relative" }}>
                    <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", background:idx<3?["#ffd700","#c0c0c0","#cd7f32"][idx]:"#333", color:idx<3?"#000":"#888", width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:900, border:"2px solid #0d0d1a" }}>{idx+1}</div>
                    <div style={{ fontSize:24, marginBottom:4, marginTop:4 }}>{m.emoji}</div>
                    <div style={{ color:m.cor, fontWeight:800, fontSize:10 }}>{m.nome}</div>
                    <div style={{ marginTop:4, background:getImpCor(res.impacto[m.id])+"22", borderRadius:5, padding:"2px 0" }}>
                      <span style={{ color:getImpCor(res.impacto[m.id]), fontSize:12 }}>{getImpEmoji(res.impacto[m.id])}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })()}
    </div>
  );
};

const DelegationPokerGestorSenior = ({ user }) => {
  const { gestoresTimes } = getReportees(user.id);
  const [topicos, setTopicos] = useState(delegationStoreSenior.topicos);
  const [votos, setVotos] = useState(delegationStoreSenior.votos);
  const [view, setView] = useState("lista");
  const [topicoAtivo, setTopicoAtivo] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState(""); const [novoDesc, setNovoDesc] = useState(""); const [cartaGestor, setCartaGestor] = useState(null);
  const calcMedia = (tid) => { const v=votos[tid]; if(!v) return null; const vals=Object.values(v); return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1):null; };
  return (
    <div style={{ padding:32 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:0 }}>♟️ Delegation — Gestores de Time</h1>
        {view==="lista"&&<button onClick={()=>setView("novo")} style={{ padding:"10px 20px", background:"linear-gradient(135deg,#e11d48,#be123c)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>+ Novo Tópico</button>}
      </div>
      {view==="lista"&&topicos.map(t=>{
        const media=calcMedia(t.id);
        return (
          <Card key={t.id} style={{ marginBottom:12, cursor:"pointer" }} onClick={()=>{setTopicoAtivo(t);setView("detalhe");}}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}><h3 style={{ color:"#fff", fontSize:15, fontWeight:700, margin:0 }}>{t.titulo}</h3><Badge color={t.status==="aberto"?"#10b981":"#666"}>{t.status}</Badge></div>
            <div style={{ display:"flex", gap:12 }}>
              <Badge color="#e11d48">Gestor: Nível {t.cartaGestor}</Badge>
              {media&&<Badge color="#f59e0b">Média GTs: {media}</Badge>}
              <Badge color="#888">{Object.keys(votos[t.id]||{}).length}/{gestoresTimes.length} votaram</Badge>
            </div>
          </Card>
        );
      })}
      {view==="novo"&&(
        <Card>
          <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:"0 0 20px" }}>Novo Tópico</h2>
          <div style={{ marginBottom:16 }}><input value={novoTitulo} onChange={e=>setNovoTitulo(e.target.value)} placeholder="Título" style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:15, padding:"12px 16px", boxSizing:"border-box" }} /></div>
          <div style={{ marginBottom:20 }}><textarea value={novoDesc} onChange={e=>setNovoDesc(e.target.value)} placeholder="Descrição" style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"12px 16px", resize:"vertical", minHeight:80, boxSizing:"border-box" }} /></div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:24 }}>
            {DELEGATION_LEVELS.map(l=>(
              <button key={l.level} onClick={()=>setCartaGestor(l.level)} style={{ padding:"10px 14px", borderRadius:10, border:`2px solid ${cartaGestor===l.level?l.color:l.color+"44"}`, background:cartaGestor===l.level?l.color+"33":"rgba(255,255,255,0.04)", color:l.color, fontWeight:700, cursor:"pointer", fontSize:13 }}>{l.level} — {l.name}</button>
            ))}
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={()=>setView("lista")} style={{ padding:"12px 20px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#aaa", cursor:"pointer" }}>Cancelar</button>
            <button onClick={()=>{if(!novoTitulo.trim()||!cartaGestor)return;const novo={id:Date.now(),titulo:novoTitulo,descricao:novoDesc,status:"aberto",criadoPor:user.id,cartaGestor};setTopicos(p=>[...p,novo]);setNovoTitulo("");setNovoDesc("");setCartaGestor(null);setView("lista");}} style={{ padding:"12px 24px", background:"linear-gradient(135deg,#e11d48,#be123c)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>Criar</button>
          </div>
        </Card>
      )}
      {view==="detalhe"&&topicoAtivo&&(
        <div>
          <button onClick={()=>setView("lista")} style={{ padding:"8px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer", fontSize:14, marginBottom:20 }}>← Voltar</button>
          <Card>
            <h2 style={{ color:"#fff", fontSize:20, fontWeight:800, margin:"0 0 20px" }}>{topicoAtivo.titulo}</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:20 }}>
              <div style={{ textAlign:"center", padding:20, background:"rgba(225,29,72,0.08)", borderRadius:12 }}>
                <p style={{ color:"#888", fontSize:12, margin:"0 0 8px" }}>Sua carta</p>
                <div style={{ fontSize:36, fontWeight:900, color:"#e11d48" }}>{topicoAtivo.cartaGestor}</div>
              </div>
              <div style={{ textAlign:"center", padding:20, background:"rgba(245,158,11,0.08)", borderRadius:12 }}>
                <p style={{ color:"#888", fontSize:12, margin:"0 0 8px" }}>Média GTs</p>
                <div style={{ fontSize:36, fontWeight:900, color:"#f59e0b" }}>{calcMedia(topicoAtivo.id)||"—"}</div>
              </div>
              <div style={{ textAlign:"center", padding:20, background:"rgba(16,185,129,0.08)", borderRadius:12 }}>
                <p style={{ color:"#888", fontSize:12, margin:"0 0 8px" }}>Consenso</p>
                <div style={{ fontSize:36, fontWeight:900, color:"#10b981" }}>{calcMedia(topicoAtivo.id)?Math.abs(Number(calcMedia(topicoAtivo.id))-topicoAtivo.cartaGestor)<1?"✅":"⚠️":"—"}</div>
              </div>
            </div>
            {gestoresTimes.map(gt=>{const v=votos[topicoAtivo.id]?.[gt.id];const lv=v?DELEGATION_LEVELS.find(l=>l.level===v):null;return(
              <div key={gt.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <UserAvatar user={gt} size={32} /><span style={{ color:"#ccc", fontSize:13, flex:1 }}>{gt.name}</span>
                {v?<Badge color={lv?.color||"#888"}>Nível {v} — {lv?.name}</Badge>:<Badge color="#555">Não votou</Badge>}
              </div>
            );})}
          </Card>
        </div>
      )}
    </div>
  );
};

// ─── Admin Tabs ───────────────────────────────────────────────────────────────
const AdminInicio = () => {
  const users = getUsers();
  const byRole = (r) => users.filter(u=>u.role===r).length;
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>🏠 Admin — Visão Geral</h1>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[{label:"Colaboradores",value:byRole("colaborador"),color:"#6366f1"},{label:"Gestores de Time",value:byRole("gestor_time"),color:"#f59e0b"},{label:"Gestores",value:byRole("gestor"),color:"#e11d48"},{label:"Admins",value:byRole("admin"),color:"#06b6d4"}].map(k=>(
          <Card key={k.label}><p style={{ color:"#888", fontSize:12, textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>{k.label}</p><p style={{ color:k.color, fontSize:32, fontWeight:900, margin:0 }}>{k.value}</p></Card>
        ))}
      </div>
      <Card>
        <h3 style={{ color:"#fff", fontSize:16, fontWeight:700, margin:"0 0 20px" }}>Todos os usuários</h3>
        {users.map(u=>(
          <div key={u.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
            <UserAvatar user={u} size={36} />
            <div style={{ flex:1 }}><p style={{ color:"#fff", fontWeight:600, margin:0 }}>{u.name}</p><p style={{ color:"#888", fontSize:12, margin:0 }}>{u.cargo} · {u.area}</p></div>
            <Badge color={roleColor(u.role)}>{roleLabel(u.role)}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
};

const GestaoPessoas = () => {
  const [users, setUsers] = useState(getUsers());
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const startEdit = (u) => { setEditingId(u.id); setForm({...u}); };
  const saveEdit = () => {
    const idx = appState.users.findIndex(u=>u.id===editingId);
    if(idx>=0) appState.users[idx]={...form};
    setUsers([...appState.users]); setEditingId(null);
  };
  const deleteUser = (id) => { appState.users=appState.users.filter(u=>u.id!==id); setUsers([...appState.users]); };
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>🧑‍💼 Gestão de Pessoas</h1>
      {users.map(u=>(
        <Card key={u.id} style={{ marginBottom:12 }}>
          {editingId===u.id?(
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {["name","cargo","area","nivel","email"].map(field=>(
                <div key={field}><label style={{ color:"#888", fontSize:12, display:"block", marginBottom:4 }}>{field}</label><input value={form[field]||""} onChange={e=>setForm(p=>({...p,[field]:e.target.value}))} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:13, padding:"8px 12px", boxSizing:"border-box" }} /></div>
              ))}
              <div><label style={{ color:"#888", fontSize:12, display:"block", marginBottom:4 }}>role</label>
                <select value={form.role||""} onChange={e=>setForm(p=>({...p,role:e.target.value}))} style={{ width:"100%", background:"#1a1a2e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:13, padding:"8px 12px" }}>
                  {Object.keys(ROLE_LABELS).map(r=><option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                </select>
              </div>
              <div style={{ gridColumn:"1/-1", display:"flex", gap:10, marginTop:8 }}>
                <button onClick={saveEdit} style={{ padding:"10px 20px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:8, color:"#fff", fontWeight:700, cursor:"pointer" }}>Salvar</button>
                <button onClick={()=>setEditingId(null)} style={{ padding:"10px 20px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#aaa", cursor:"pointer" }}>Cancelar</button>
              </div>
            </div>
          ):(
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <UserAvatar user={u} size={44} />
              <div style={{ flex:1 }}><h3 style={{ color:"#fff", fontSize:15, fontWeight:700, margin:"0 0 4px" }}>{u.name}</h3><p style={{ color:"#888", fontSize:13, margin:0 }}>{u.cargo} · {u.area}</p></div>
              <Badge color={roleColor(u.role)}>{roleLabel(u.role)}</Badge>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>startEdit(u)} style={{ padding:"8px 14px", background:"rgba(99,102,241,0.15)", border:"1px solid #6366f144", borderRadius:8, color:"#818cf8", cursor:"pointer", fontSize:12 }}>Editar</button>
                <button onClick={()=>deleteUser(u.id)} style={{ padding:"8px 14px", background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.2)", borderRadius:8, color:"#f87171", cursor:"pointer", fontSize:12 }}>Remover</button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

const CadastroTimes = ({ user }) => {
  const allUsers = getUsers();
  const isAdmin = user.role==="admin";
  const isGestor = user.role==="gestor";
  const isGT = user.role==="gestor_time";
  const times = getTeams().filter(t=>isAdmin?true:isGestor?t.gestorId===user.id:t.gestorTimeId===user.id);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nome:"", gestorTimeId:null, gestorId:null, cor:"#6366f1", colaboradoresIds:[] });
  const CORES = ["#6366f1","#f59e0b","#10b981","#e11d48","#8b5cf6","#06b6d4","#f97316","#ec4899"];
  const GTs = allUsers.filter(u=>u.role==="gestor_time");
  const Gestores = allUsers.filter(u=>u.role==="gestor");
  const colabsDisponiveis = allUsers.filter(u=>u.role==="colaborador"&&(!getTeams().find(t=>t.colaboradoresIds.includes(u.id)&&t.id!==editing?.id)));

  const startEdit = (t) => { setEditing(t); setForm({nome:t.nome,gestorTimeId:t.gestorTimeId,gestorId:t.gestorId,cor:t.cor,colaboradoresIds:[...t.colaboradoresIds]}); };
  const saveTime = () => {
    if(editing) {
      const idx = appState.teams.findIndex(t=>t.id===editing.id);
      if(idx>=0) appState.teams[idx]={...appState.teams[idx],...form};
    } else {
      appState.teams.push({id:Date.now(),...form});
    }
    setEditing(null);
  };

  if (editing !== null || editing === null && false) {}

  return (
    <div style={{ padding:32 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:0 }}>🏷️ Cadastro de Times</h1>
        {!editing&&<button onClick={()=>{setEditing({id:null});setForm({nome:"",gestorTimeId:null,gestorId:isGestor?user.id:null,cor:"#6366f1",colaboradoresIds:[]});}} style={{ padding:"10px 20px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>+ Novo Time</button>}
      </div>
      {editing&&(
        <Card style={{ marginBottom:24 }}>
          <h3 style={{ color:"#fff", fontSize:18, fontWeight:800, margin:"0 0 20px" }}>{editing.id?"Editar Time":"Novo Time"}</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
            <div><label style={{ color:"#888", fontSize:13, display:"block", marginBottom:6 }}>Nome</label><input value={form.nome} onChange={e=>setForm(p=>({...p,nome:e.target.value}))} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"12px 16px", boxSizing:"border-box" }} /></div>
            <div><label style={{ color:"#888", fontSize:13, display:"block", marginBottom:6 }}>Cor</label><div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>{CORES.map(c=><div key={c} onClick={()=>setForm(p=>({...p,cor:c}))} style={{ width:28, height:28, borderRadius:"50%", background:c, cursor:"pointer", border:form.cor===c?"3px solid #fff":"3px solid transparent" }} />)}</div></div>
            {(isAdmin||isGestor)&&<div><label style={{ color:"#888", fontSize:13, display:"block", marginBottom:6 }}>Gestor de Time</label><select value={form.gestorTimeId||""} onChange={e=>setForm(p=>({...p,gestorTimeId:Number(e.target.value)}))} style={{ width:"100%", background:"#1a1a2e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"12px 16px" }}><option value="">Selecionar</option>{GTs.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></div>}
            {isAdmin&&<div><label style={{ color:"#888", fontSize:13, display:"block", marginBottom:6 }}>Gestor Responsável</label><select value={form.gestorId||""} onChange={e=>setForm(p=>({...p,gestorId:Number(e.target.value)}))} style={{ width:"100%", background:"#1a1a2e", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"12px 16px" }}><option value="">Selecionar</option>{Gestores.map(g=><option key={g.id} value={g.id}>{g.name}</option>)}</select></div>}
          </div>
          <div><label style={{ color:"#888", fontSize:13, display:"block", marginBottom:10 }}>Colaboradores</label><div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>{colabsDisponiveis.map(c=>{const sel=form.colaboradoresIds.includes(c.id);return(<div key={c.id} onClick={()=>setForm(p=>({...p,colaboradoresIds:sel?p.colaboradoresIds.filter(id=>id!==c.id):[...p.colaboradoresIds,c.id]}))} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px", borderRadius:10, cursor:"pointer", background:sel?"rgba(99,102,241,0.2)":"rgba(255,255,255,0.03)", border:`1px solid ${sel?"#6366f1":"rgba(255,255,255,0.07)"}` }}><UserAvatar user={c} size={28} /><span style={{ color:sel?"#fff":"#888", fontSize:13 }}>{c.name}</span></div>);})}</div></div>
          <div style={{ display:"flex", gap:12, marginTop:20 }}>
            <button onClick={saveTime} style={{ padding:"12px 24px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>Salvar</button>
            <button onClick={()=>setEditing(null)} style={{ padding:"12px 20px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#aaa", cursor:"pointer" }}>Cancelar</button>
          </div>
        </Card>
      )}
      {times.map(t=>{
        const gt=allUsers.find(u=>u.id===t.gestorTimeId);
        const colabs=allUsers.filter(u=>t.colaboradoresIds.includes(u.id));
        return (
          <Card key={t.id} style={{ marginBottom:16, borderLeft:`4px solid ${t.cor}` }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}><div style={{ width:12, height:12, borderRadius:"50%", background:t.cor }} /><h3 style={{ color:"#fff", fontSize:17, fontWeight:700, margin:0 }}>{t.nome}</h3><Badge color={t.cor}>{colabs.length} membros</Badge></div>
              <button onClick={()=>startEdit(t)} style={{ padding:"6px 14px", background:"rgba(99,102,241,0.12)", border:"1px solid #6366f144", borderRadius:8, color:"#818cf8", cursor:"pointer", fontSize:12 }}>Editar</button>
            </div>
            {gt&&<div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:10, marginBottom:12 }}><UserAvatar user={gt} size={36} /><div><p style={{ color:"#f59e0b", fontWeight:700, margin:0, fontSize:13 }}>Gestor de Time</p><p style={{ color:"#fff", fontSize:14, margin:0 }}>{gt.name}</p></div></div>}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {colabs.map(c=><div key={c.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8 }}><UserAvatar user={c} size={26} /><span style={{ color:"#ccc", fontSize:13 }}>{c.name}</span></div>)}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const AdminSenhas = () => {
  const [query, setQuery] = useState(""); const [encontrado, setEncontrado] = useState(null); const [novaSenha, setNovaSenha] = useState(""); const [mostrar, setMostrar] = useState(false); const [salvo, setSalvo] = useState(false);
  const buscar = () => { const u=getUsers().find(u=>u.name.toLowerCase().includes(query.toLowerCase())||u.email.toLowerCase().includes(query.toLowerCase())); setEncontrado(u||null); setSalvo(false); };
  const gerar = () => { const chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$"; setNovaSenha(Array.from({length:10},()=>chars[Math.floor(Math.random()*chars.length)]).join("")); };
  const salvar = () => { if(encontrado&&novaSenha){const u=appState.users.find(u=>u.id===encontrado.id);if(u){u.password=novaSenha;setSalvo(true);}}}
  return (
    <div style={{ padding:32 }}>
      <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 32px" }}>🔑 Reset de Senhas</h1>
      <Card style={{ maxWidth:520 }}>
        <div style={{ display:"flex", gap:12, marginBottom:24 }}>
          <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&buscar()} placeholder="Nome ou e-mail" style={{ flex:1, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"12px 16px" }} />
          <button onClick={buscar} style={{ padding:"12px 20px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>Buscar</button>
        </div>
        {encontrado&&(
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"rgba(255,255,255,0.04)", borderRadius:12, marginBottom:20 }}>
              <UserAvatar user={encontrado} size={44} />
              <div><h3 style={{ color:"#fff", fontWeight:700, margin:"0 0 4px" }}>{encontrado.name}</h3><p style={{ color:"#888", fontSize:13, margin:0 }}>{encontrado.email}</p></div>
              <Badge color={roleColor(encontrado.role)}>{roleLabel(encontrado.role)}</Badge>
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ color:"#888", fontSize:13, display:"block", marginBottom:6 }}>Nova senha</label>
              <div style={{ display:"flex", gap:10 }}>
                <div style={{ flex:1, position:"relative" }}>
                  <input type={mostrar?"text":"password"} value={novaSenha} onChange={e=>setNovaSenha(e.target.value)} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:14, padding:"12px 40px 12px 16px", boxSizing:"border-box" }} />
                  <button onClick={()=>setMostrar(p=>!p)} style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:"#888", cursor:"pointer", fontSize:16 }}>{mostrar?"🙈":"👁️"}</button>
                </div>
                <button onClick={gerar} style={{ padding:"12px 14px", background:"rgba(99,102,241,0.15)", border:"1px solid #6366f144", borderRadius:10, color:"#818cf8", fontWeight:700, cursor:"pointer", fontSize:13 }}>🎲 Gerar</button>
              </div>
            </div>
            <button onClick={salvar} style={{ width:"100%", padding:"12px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:10, color:"#fff", fontWeight:700, cursor:"pointer" }}>Salvar nova senha</button>
            {salvo&&<div style={{ marginTop:12, padding:"10px 14px", background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:10, color:"#10b981", fontWeight:700, textAlign:"center" }}>✓ Senha atualizada com sucesso!</div>}
          </div>
        )}
        {query&&!encontrado&&<p style={{ color:"#555", textAlign:"center" }}>Nenhum usuário encontrado.</p>}
      </Card>
    </div>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("inicio");

  if (!user) return <Login onLogin={(u) => { setUser(u); setActiveTab("inicio"); }} />;

  const renderContent = () => {
    if (user.role === "admin") {
      if (activeTab === "inicio")        return <AdminInicio />;
      if (activeTab === "admin-pessoas") return <GestaoPessoas />;
      if (activeTab === "admin-times")   return <CadastroTimes user={user} />;
      if (activeTab === "admin-senhas")  return <AdminSenhas />;
      if (activeTab === "perfil")        return <PerfilColaborador user={user} />;
    } else if (user.role === "gestor") {
      if (activeTab === "inicio")                return <InicioGestor user={user} />;
      if (activeTab === "visao-geral")           return <VisaoGeralGestor user={user} />;
      if (activeTab === "meus-gts")              return <MeusGTs user={user} />;
      if (activeTab === "times")                 return <CadastroTimes user={user} />;
      if (activeTab === "motivadores-g")         return <MotivadoresGestorSenior user={user} />;
      if (activeTab === "delegation-g")          return <DelegationPokerGestorSenior user={user} />;
      if (activeTab === "ferramentas-proprio-g") return <FerramentasContent user={user} />;
      if (activeTab === "ferramentas-liderados-g") return <FerramentasVisualizacao user={user} />;
      if (activeTab === "ferramenta-roda")         return <FerramentaGestorView user={user} ferramenta="roda" />;
      if (activeTab === "ferramenta-swot")         return <FerramentaGestorView user={user} ferramenta="swot" />;
      if (activeTab === "ferramenta-motivadores")  return <FerramentaGestorView user={user} ferramenta="motivadores" />;
      if (activeTab === "ferramenta-disc")         return <FerramentaGestorView user={user} ferramenta="disc" />;
      if (activeTab === "ferramenta-competencias") return <FerramentaGestorView user={user} ferramenta="competencias" />;
      if (activeTab === "ferramenta-mapa-comp")    return <MapaCompGestor user={user} />;
      if (activeTab === "cadastros-comp")          return <div style={{padding:32}}><MapaCompCadastro user={user} onBack={null} /></div>;
      if (activeTab === "delegation-g")            return <DelegationPokerGestorSenior user={user} />;
      if (activeTab === "testes-proprio-g")      return <TestesEPerfil user={user} />;
      if (activeTab === "testes-equipe-g")       return <TestesVisualizacao user={user} />;
      if (activeTab === "acordos-lider")         return <AcordosLider user={user} />;
      if (activeTab === "pessoas")               return <GestaoPessoas />;
      if (activeTab === "perfil")                return <PerfilColaborador user={user} />;
    } else if (user.role === "gestor_time") {
      if (activeTab === "inicio")                  return <InicioGestorTime user={user} />;
      if (activeTab === "equipe")                  return <InicioGestorTime user={user} />;
      if (activeTab === "meu-time")                return <CadastroTimes user={user} />;
      if (activeTab === "avaliacoes")              return <AvaliacaoGestor user={user} />;
      if (activeTab === "pdis")                    return <PDIsEquipe user={user} />;
      if (activeTab === "motivadores")             return <MotivadoresGestor user={user} />;
      if (activeTab === "delegation")              return <DelegationPokerGestor user={user} />;
      if (activeTab === "ferramentas-proprio-gt")  return <FerramentasContent user={user} />;
      if (activeTab === "ferramentas-equipe-gt")   return <FerramentasVisualizacao user={user} />;
      if (activeTab === "ferramenta-roda")         return <FerramentaGestorView user={user} ferramenta="roda" />;
      if (activeTab === "ferramenta-swot")         return <FerramentaGestorView user={user} ferramenta="swot" />;
      if (activeTab === "ferramenta-motivadores")  return <FerramentaGestorView user={user} ferramenta="motivadores" />;
      if (activeTab === "ferramenta-disc")         return <FerramentaGestorView user={user} ferramenta="disc" />;
      if (activeTab === "ferramenta-competencias") return <FerramentaGestorView user={user} ferramenta="competencias" />;
      if (activeTab === "ferramenta-mapa-comp")    return <MapaCompGestor user={user} />;
      if (activeTab === "cadastros-comp")          return <div style={{padding:32}}><MapaCompCadastro user={user} onBack={null} /></div>;
      if (activeTab === "delegation")              return <DelegationPokerGestor user={user} />;
      if (activeTab === "testes-proprio")          return <TestesEPerfil user={user} />;
      if (activeTab === "testes-equipe")           return <TestesVisualizacao user={user} />;
      if (activeTab === "delegation-gt-vota")      return <DelegationPokerGTVotante user={user} />;
      if (activeTab === "acordos-lider")           return <AcordosLider user={user} />;
      if (activeTab === "perfil")                  return <PerfilColaborador user={user} />;
    } else {
      // colaborador
      if (activeTab === "inicio")           return <InicioColaborador user={user} />;
      if (activeTab === "meu-pdi")          return <MeuPDI />;
      if (activeTab === "acordos")          return <AcordosLiderado user={user} />;
      if (activeTab === "ferramentas")      return <FerramentasContent user={user} />;
      if (activeTab === "ferramenta-colab-swot")        return <SwotColaborador user={user} />;
      if (activeTab === "ferramenta-colab-motivadores")  return <MovingMotivatorsColaborador user={user} onBack={null} />;
      if (activeTab === "ferramenta-colab-mapa-comp")    return <MapaCompColaborador user={user} />;
      if (activeTab === "testes")           return <TestesEPerfil user={user} />;
      if (activeTab === "trilhas")          return <TrilhasCarreira />;
      if (activeTab === "delegation-colab") return <DelegationPokerColaborador user={user} />;
      if (activeTab === "perfil")           return <PerfilColaborador user={user} />;
    }
    return <div style={{ padding:32, color:"#555" }}>Tela não encontrada.</div>;
  };

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#0d0d1a", fontFamily:"'Outfit',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => { setUser(null); setActiveTab("inicio"); }} />
      <div style={{ flex:1, overflowY:"auto", maxHeight:"100vh" }}>
        {renderContent()}
      </div>
    </div>
  );
}
