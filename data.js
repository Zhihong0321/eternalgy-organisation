// Eternalgy Organisation Chart Data - Standardized Official Names Jan 2026
const orgData = {
    id: "ceo",
    name: "Gan Lai Soon",
    role: "CEO / Acting Outsource Head",
    contact: "",
    dept: "ceo",
    children: [
        {
            id: "ai_kindergarten",
            name: "Gan Zhi Hong",
            role: "AI Kindergarten Head",
            contact: "",
            dept: "it",
            children: [
                { id: "ai_eng", name: "TBD", role: "AI Engineer", contact: "(Recruiting)", dept: "it" }
            ]
        },
        {
            id: "gm",
            name: "Lim Kim Chang",
            role: "General Operations",
            contact: "",
            dept: "gm",
            children: [
                {
                    id: "project_dept",
                    name: "Tan Wei Sheng",
                    role: "Project Head",
                    contact: "",
                    dept: "project",
                    children: [
                        { id: "p1", name: "Choong Ye Hong", role: "Site Supervisor", contact: "", dept: "project" },
                        { id: "p2", name: "Xiangjun", role: "Site Supervisor", contact: "", dept: "project" },
                        { id: "p3", name: "Kaijian", role: "Site Supervisor", contact: "", dept: "project" },
                        { id: "p4", name: "Anyuan", role: "Site Supervisor", contact: "", dept: "project" }
                    ]
                },
                {
                    id: "om_dept",
                    name: "Ahmad Faruoqi Bin Ibrahim",
                    role: "O&M Head",
                    contact: "",
                    dept: "om",
                    children: [
                        { id: "om1", name: "Jia Hao", role: "O&M Assistant", contact: "", dept: "om" },
                        { id: "om2", name: "Khoo Wei Feng", role: "O&M Assistant", contact: "", dept: "om" }
                    ]
                },
                { id: "eng_dept", name: "Ahmad Safwan Bin Ahmad Nazri", role: "Engineering Head", contact: "", dept: "engineering" },
                { id: "it_dept", name: "Gan Zhi Hong", role: "IT Head", contact: "", dept: "it" },
                {
                    id: "seremban_branch",
                    name: "Ching Zhe Hang",
                    role: "Seremban Branch Assistant Manager",
                    contact: "",
                    dept: "admin",
                    children: [
                        { id: "jb1", name: "Ling Liang Kang", role: "Scrum Master", contact: "", dept: "admin" },
                        { id: "jb2", name: "Hing Swee Chuan", role: "Team Member", contact: "", dept: "admin" }
                    ]
                },
                {
                    id: "kluang_branch",
                    name: "Gan Lai Hock",
                    role: "Kluang Branch Manager",
                    contact: "",
                    dept: "admin"
                },
                {
                    id: "ci_project",
                    name: "Koh Chong Lee",
                    role: "C&I Project Head",
                    contact: "",
                    dept: "strategy"
                },
{
                    id: "culture_happiness",
                    name: "Phil Moo",
                    role: "Culture & Happiness Head",
                    contact: "",
                    dept: "culture"
                },
                { id: "coo_assist", name: "TBD", role: "Assistant COO", contact: "(Recruiting)", dept: "gm" }
            ]
        },
        {
            id: "digital_marketing",
            name: "Chong Kien Leong",
            role: "Digital Marketing Head / Training Head",
            contact: "",
            dept: "training",
            children: [
                { id: "dm_assist", name: "Gan Zhi Hong", role: "Assistant (Algorithms/Data)", contact: "", dept: "it" },
                { id: "dm1", name: "Vincent Tan Wen Xi", role: "Poster/Copy/Web", contact: "", dept: "training", children: [{ id: "dm_xiaomi", name: "Denise Ng Pei Sing", role: "Assistant", contact: "", dept: "training" }] },
                { id: "dm2", name: "Khoo Wei Feng", role: "Video/Ad Delivery", contact: "", dept: "training" },
                { id: "dm3", name: "Joseph", role: "Web Maintenance", contact: "", dept: "training" },
                { id: "dm4", name: "Chee Kai Kian", role: "Video Shooting/Ad Coord", contact: "", dept: "training" },
                { id: "dm5", name: "Joshua Yap Jia Hao", role: "Team Member", contact: "", dept: "training" }
            ]
        },
        {
            id: "procurement_top",
            name: "Wong Wei Hao",
            role: "Procurement Head",
            contact: "",
            dept: "procurement",
            children: [
                { id: "wh_assist", name: "Mark", role: "Warehouse Assistant", contact: "", dept: "procurement" }
            ]
        },
        {
            id: "strategy_top",
            name: "Koh Chong Lee",
            role: "Strategy & Partnership Head",
            contact: "",
            dept: "strategy"
        },
        {
            id: "efficiency_discipline",
            name: "Gan Zhi Hong",
            role: "Efficiency & Discipline Head",
            contact: "",
            dept: "efficiency"
        },
        {
            id: "administrative_top",
            name: "Teoh Yin Chiou",
            role: "Administrative",
            contact: "",
            dept: "admin",
            children: [
                {
                    id: "admin_dept",
                    name: "Yap Yuet Kwan",
                    role: "Admin Head",
                    contact: "",
                    dept: "admin",
                    children: [
                        { id: "adm1", name: "Aria", role: "Admin Team", contact: "", dept: "admin" }
                    ]
                },
                {
                    id: "finance_dept",
                    name: "Lim Shu Yee",
                    role: "Finance Head",
                    contact: "",
                    dept: "finance",
                    children: [
                        { id: "fin1", name: "Elantio", role: "Finance Assistant", contact: "", dept: "finance" },
                        { id: "fin2", name: "Elene", role: "Finance Assistant", contact: "", dept: "finance" }
                    ]
                },
                { id: "hr_dept", name: "Yeap Jia Yih", role: "HR Head", contact: "", dept: "hr" }
            ]
        }
    ]
};