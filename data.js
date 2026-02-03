// Eternalgy Organisation Chart Data - Standardized Jan 2026
const orgData = {
    id: "ceo",
    name: "Gan Lai Soon",
    role: "CEO / Acting Outsource Head",
    contact: "",
    dept: "ceo",
    children: [
        {
            id: "ai_kindergarten",
            name: "Zhihong",
            role: "AI Kindergarten Head",
            contact: "",
            dept: "it",
            children: [
                { id: "ai_eng", name: "TBD", role: "AI Engineer", contact: "(Recruiting)", dept: "it" }
            ]
        },
        {
            id: "gm",
            name: "KC Lim",
            role: "General Operations",
            contact: "",
            dept: "gm",
            children: [
                {
                    id: "project_dept",
                    name: "Wilson",
                    role: "Project Head",
                    contact: "",
                    dept: "project",
                    children: [
                        { id: "p1", name: "Ah Zhu", role: "Site Supervisor", contact: "", dept: "project" },
                        { id: "p2", name: "Xiangjun", role: "Site Supervisor", contact: "", dept: "project" },
                        { id: "p3", name: "Kaijian", role: "Site Supervisor", contact: "", dept: "project" },
                        { id: "p4", name: "Anyuan", role: "Site Supervisor", contact: "", dept: "project" }
                    ]
                },
                {
                    id: "om_dept",
                    name: "Furoki",
                    role: "O&M Head",
                    contact: "",
                    dept: "om",
                    children: [
                        { id: "om1", name: "Jia Hao", role: "O&M Assistant", contact: "", dept: "om" },
                        { id: "om2", name: "Weifeng", role: "O&M Assistant", contact: "", dept: "om" }
                    ]
                },
                { id: "eng_dept", name: "Safwan", role: "Engineering Head", contact: "", dept: "engineering" },
                { id: "it_dept", name: "Zhihong", role: "IT Head", contact: "", dept: "it" },
                {
                    id: "admin_dept",
                    name: "Eli",
                    role: "Admin Head",
                    contact: "",
                    dept: "admin",
                    children: [
                        { id: "adm1", name: "Aria", role: "Admin Team", contact: "", dept: "admin" }
                    ]
                },
                {
                    id: "finance_dept",
                    name: "Sui",
                    role: "Finance Head",
                    contact: "",
                    dept: "finance",
                    children: [
                        { id: "fin1", name: "Elantio", role: "Finance Assistant", contact: "", dept: "finance" },
                        { id: "fin2", name: "Elene", role: "Finance Assistant", contact: "", dept: "finance" }
                    ]
                },
                { id: "hr_dept", name: "Elise", role: "HR Head", contact: "", dept: "hr" },
                {
                    id: "seremban_branch",
                    name: "Zhehang",
                    role: "Seremban Branch Assistant Manager",
                    contact: "",
                    dept: "admin",
                    children: [
                        { id: "jb1", name: "Jui", role: "Scrum Master", contact: "", dept: "admin" },
                        { id: "jb2", name: "Martin", role: "Team Member", contact: "", dept: "admin" }
                    ]
                },
                {
                    id: "ci_project",
                    name: "Olivia",
                    role: "C&I Project Head",
                    contact: "",
                    dept: "strategy"
                },
                { id: "coo_assist", name: "TBD", role: "Assistant COO", contact: "(Recruiting)", dept: "gm" }
            ]
        },
        {
            id: "digital_marketing",
            name: "Leon",
            role: "Digital Marketing Head / Training Head",
            contact: "",
            dept: "training",
            children: [
                { id: "dm_assist", name: "Zhihong", role: "Assistant (Algorithms/Data)", contact: "", dept: "it" },
                { id: "dm1", name: "Vincent", role: "Poster/Copy/Web", contact: "", dept: "training", children: [{ id: "dm_xiaomi", name: "Xiaomi", role: "Assistant", contact: "", dept: "training" }] },
                { id: "dm2", name: "Weifeng", role: "Video/Ad Delivery", contact: "", dept: "training" },
                { id: "dm3", name: "Joseph", role: "Web Maintenance", contact: "", dept: "training" },
                { id: "dm4", name: "Xiaofeng", role: "Video Shooting/Ad Coord", contact: "", dept: "training" },
                { id: "dm5", name: "Joshua", role: "Team Member", contact: "", dept: "training" }
            ]
        },
        {
            id: "procurement_top",
            name: "Wei Hao",
            role: "Procurement Head",
            contact: "",
            dept: "procurement",
            children: [
                { id: "wh_assist", name: "Mark", role: "Warehouse Assistant", contact: "", dept: "procurement" }
            ]
        },
        {
            id: "strategy_top",
            name: "Olivia",
            role: "Strategy & Partnership Head",
            contact: "",
            dept: "strategy"
        },
        {
            id: "administrative_top",
            name: "YinChiou",
            role: "Administrative",
            contact: "",
            dept: "admin"
        }
    ]
};