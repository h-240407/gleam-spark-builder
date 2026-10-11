import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Bell, Code2, LayoutGrid, Menu, Search, Trophy, UserRound, X, FileText, Users, Settings, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LearningDashboard } from "@/components/learning-dashboard";
import { WorkspaceContent } from "@/components/workspace-content";

const studentItems: [string, string][] = [["dashboard","Learning Dashboard"],["practice","Adaptive Practice"],["assessments","Assessments"],["coding","Coding Arena"],["leaderboard","Leaderboard"],["path","Learning Path"],["placement","Placement Readiness"],["profile","My Profile"]];
const roleItems: Record<string,[string, string][]> = {
  Student: studentItems,
  Faculty: [["dashboard","Faculty Dashboard"],["studio","AI Question Studio"],["analytics","Class Analytics"],["exams","Exam Studio"],["disputes","Question Disputes"],["documents","Document AI"],["plagiarism","Plagiarism Studio"],["bank","Question Bank"],["profile","My Profile"]],
  Counsellor: [["dashboard","Counsellor Dashboard"],["students","Assigned Students"],["alerts","Intervention Alerts"],["profile","Student Profiles"]],
  HOD: [["department","Department Dashboard"],["curriculum","Curriculum Mastery"],["analytics","Class Analytics"],["profile","My Profile"]],
  "Institutional Head": [["institution","Institutional Overview"],["programs","Program Comparison"],["analytics","Academic Analytics"],["profile","My Profile"]],
  "Super Admin": [["system","System Overview"],["hierarchy","Institution Hierarchy"],["settings","System Settings"],["profile","My Profile"]],
};
const icons: Record<string,typeof LayoutGrid> = {dashboard:LayoutGrid,practice:BarChart3,assessments:BarChart3,coding:Code2,leaderboard:Trophy,path:BarChart3,placement:BarChart3,profile:UserRound,students:Users,settings:Settings,studio:BookOpen,documents:FileText};

export const Route = createFileRoute("/workspace/$section")({
  validateSearch: (search:Record<string,unknown>): {topic?:string | undefined; role?:string | undefined} => ({topic:typeof search["topic"] === "string" ? search["topic"] : undefined,role:typeof search["role"] === "string" && search["role"] in roleItems ? search["role"] : undefined}),
  head: ({params}) => {
    const label = Object.values(roleItems).flat().find(([id]) => id === params.section)?.[1] || "Learning Workspace";
    return { meta: [{title:`${label} — CLIAS`},{name:"description",content:`CLIAS ${label}: personalized learning and academic intelligence.`},{property:"og:title",content:`${label} — CLIAS`},{property:"og:description",content:`Your CLIAS ${label.toLowerCase()} workspace.`},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}] };
  },
  component: Workspace,
});

function Workspace() {
  const {section} = Route.useParams();
  const {topic,role:roleSearch} = Route.useSearch();
  const navigate = Route.useNavigate();
  const role = roleSearch || "Student";
  const [menu,setMenu] = useState(false);
  const [notifications,setNotifications] = useState(false);
  const [search,setSearch] = useState("");
  const items = roleItems[role] || studentItems;
  const label = Object.values(roleItems).flat().find(([id]) => id === section)?.[1] || "Learning Workspace";
  const searchResults = search.trim() ? items.filter(([,name]) => name.toLowerCase().includes(search.toLowerCase())) : [];
  return <div className="workspace grid-paper">
    <aside className={`sidebar ${menu ? "is-open" : ""}`}><div className="sidebar-brand"><Link className="brand" to="/">CLIAS<span className="coral">.</span></Link><div className="brand-caption mono">LEARNING INTELLIGENCE</div>{menu && <Button className="absolute right-3 top-5" variant="ghost" size="icon" aria-label="Close navigation" onClick={() => setMenu(false)}><X/></Button>}</div><div className="portal-label mono"><i className="status-dot"/>{role.toUpperCase()} PORTAL</div><nav className="side-nav" aria-label="Learning navigation">{items.map(([id,name],i) => {const Icon = icons[id] || BarChart3;return <Link key={id} className={`nav-item ${id === section ? "active" : ""}`} to="/workspace/$section" params={{section:id}} search={{role:roleSearch}} onClick={() => setMenu(false)} aria-current={id === section ? "page" : undefined}><span className="nav-number mono">0{i+1}</span><Icon/><span>{name}</span></Link>;})}</nav><div className="sidebar-bottom mono"><span className="blue">CLIAS CORE</span><br/>V1.0.4 / STABLE<Link className="return-link" to="/">← RETURN HOME</Link></div></aside>
    <div className="workspace-body"><header className="workspace-header"><Button variant="ghost" size="icon" className="mobile-menu" aria-label="Open navigation" onClick={() => setMenu(true)}><Menu/></Button><div className="workspace-heading"><span className="mono">WORKSPACE / {role.toUpperCase()}</span><strong>{label}</strong></div><label className="search-box"><Search/><input aria-label="Search workspace" placeholder="Search intelligence..." value={search} onChange={e => setSearch(e.target.value)}/><span className="shortcut mono">⌘ K</span></label><Button variant="ghost" size="icon" className="notification-button" aria-label="Notifications" onClick={() => setNotifications(!notifications)}><Bell/></Button><select className="role-select" value={role} aria-label="Workspace role" onChange={e => {const next=e.target.value; navigate({params:{section:roleItems[next]?.[0]?.[0] || "dashboard"},search:{role:next}});}}>{Object.keys(roleItems).map(r => <option key={r}>{r}</option>)}</select><div className="user"><span className="avatar">{role === "Student" ? "AS" : "PM"}</span><div className="user-text"><strong>{role === "Student" ? "Aarav Shah" : "Prof. Mehta"}</strong><div className="mono">{role.toUpperCase()}</div></div></div></header>
    <main className="workspace-main">{notifications && <div className="notice" role="status"><span>Prof. Mehta assigned a new process synchronization drill. Your weekly learning report is ready.</span><Button variant="ghost" size="icon" onClick={() => setNotifications(false)} aria-label="Close notifications"><X/></Button></div>}{search.trim() && <div className="notice"><span>{searchResults.length ? "MATCHING WORKSPACES" : "No matching workspaces"}</span><div className="flex flex-wrap gap-3">{searchResults.map(([id,name]) => <Link key={id} to="/workspace/$section" params={{section:id}} search={{role:roleSearch}} onClick={() => setSearch("")} className="blue">{name} →</Link>)}</div></div>}{section === "dashboard" ? <LearningDashboard role={role}/> : <WorkspaceContent key={`${section}-${topic || ""}`} section={section} topic={topic}/>}</main><footer className="workspace-footer mono"><span>CLIAS / SECURE ACADEMIC NETWORK</span><span>ALL SYSTEMS OPERATIONAL</span></footer></div>
  </div>;
}