// Eternalgy Organisation Chart Data
const orgData = {
    id: "ceo",
    name: "Gan Lai Soon",
    role: "CEO",
    contact: "",
    dept: "ceo",
    children: [
        {
            id: "gm",
            name: "KC Lim",
            role: "General Manager",
            contact: "012-711 9693",
            dept: "gm",
            children: [
                {
                    id: "training",
                    name: "Leon",
                    role: "Training Marketing Head",
                    contact: "019-472 9327",
                    dept: "training",
                    children: [
                        {
                            id: "social1",
                            name: "Vincent",
                            role: "Social Media",
                            contact: "010-665 0885",
                            dept: "training"
                        },
                        {
                            id: "social2",
                            name: "Xiao Fong",
                            role: "Social Media",
                            contact: "018-6607766",
                            dept: "training"
                        },
                        {
                            id: "social3",
                            name: "Annie",
                            role: "Social Media",
                            contact: "011-20672895",
                            dept: "training"
                        }
                    ]
                },
                {
                    id: "event",
                    name: "Phil Moo (Jia Keat)",
                    role: "Event Head",
                    contact: "010-585 8588",
                    dept: "event",
                    children: [
                        {
                            id: "sound",
                            name: "Ah Keat",
                            role: "Sound Technician",
                            contact: "011-1169 9183",
                            dept: "event"
                        }
                    ]
                },
                {
                    id: "project",
                    name: "Wilson",
                    role: "Project Head",
                    contact: "014-3858517",
                    dept: "project",
                    children: [
                        {
                            id: "ss1",
                            name: "Ah Zhu",
                            role: "Site Supervisor",
                            contact: "010-759 1033",
                            dept: "project"
                        },
                        {
                            id: "ss2",
                            name: "Siong Chin",
                            role: "Site Supervisor",
                            contact: "018-242 0708",
                            dept: "project"
                        },
                        {
                            id: "tech1",
                            name: "Jama",
                            role: "Technician",
                            contact: "011-3932 5927",
                            dept: "project"
                        },
                        {
                            id: "tech2",
                            name: "Alzam",
                            role: "Technician",
                            contact: "018-643 7156",
                            dept: "project"
                        },
                        {
                            id: "inst1",
                            name: "Sharun",
                            role: "Installation",
                            contact: "019-767 1495",
                            dept: "project"
                        },
                        {
                            id: "inst2",
                            name: "Falis",
                            role: "Installation",
                            contact: "013-411 6579",
                            dept: "project"
                        },
                        {
                            id: "ss3",
                            name: "Kai Kin",
                            role: "Site Supervisor",
                            contact: "017-750 6708",
                            dept: "project"
                        },
                        {
                            id: "ss4",
                            name: "Ah Yuan",
                            role: "Site Supervisor",
                            contact: "014-704 9860",
                            dept: "project"
                        }
                    ]
                },
                {
                    id: "om",
                    name: "Faruq",
                    role: "O&M Head",
                    contact: "012-300 5479",
                    dept: "om",
                    children: [
                        {
                            id: "oma1",
                            name: "Jia Hao",
                            role: "O&M Assistant",
                            contact: "011-5506 0421",
                            dept: "om"
                        },
                        {
                            id: "oma2",
                            name: "Xiao Fong",
                            role: "O&M Assistant",
                            contact: "018-6607766",
                            dept: "om"
                        }
                    ]
                },
                {
                    id: "eng",
                    name: "Saiwan",
                    role: "Engineering Head",
                    contact: "011-5768 1744",
                    dept: "engineering"
                },
                {
                    id: "it",
                    name: "Zhi Hong",
                    role: "IT Head",
                    contact: "011-2100 0099",
                    dept: "it"
                }
            ]
        },
        {
            id: "cao",
            name: "Yin Chiou",
            role: "Chief Administrative Officer",
            contact: "012-773 3963",
            dept: "cao",
            children: [
                {
                    id: "admin",
                    name: "Ally",
                    role: "Admin Head",
                    contact: "011-5878 0422",
                    dept: "admin",
                    children: [
                        {
                            id: "seda",
                            name: "Aliah",
                            role: "Seda Application",
                            contact: "018-766 3692",
                            dept: "admin"
                        },
                        {
                            id: "tnb",
                            name: "Mai",
                            role: "TNB & Insurance",
                            contact: "019-970 5033",
                            dept: "admin"
                        },
                        {
                            id: "cs",
                            name: "Siau Fen",
                            role: "Customer Service",
                            contact: "018-350 0422",
                            dept: "admin"
                        },
                        {
                            id: "drawing",
                            name: "Mun",
                            role: "Drawing",
                            contact: "010-413 8239",
                            dept: "admin"
                        }
                    ]
                },
                {
                    id: "finance",
                    name: "Shu Yee",
                    role: "Finance Head",
                    contact: "012-792 0216",
                    dept: "finance",
                    children: [
                        {
                            id: "fa1",
                            name: "Elaine Teoh",
                            role: "Finance Assistant",
                            contact: "+65-9009 7334",
                            dept: "finance"
                        },
                        {
                            id: "fa2",
                            name: "Elyn",
                            role: "Finance Assistant",
                            contact: "012-776 8899",
                            dept: "finance"
                        }
                    ]
                },
                {
                    id: "procurement",
                    name: "Wei Hao",
                    role: "Procurement Head",
                    contact: "010-669 3721",
                    dept: "procurement",
                    children: [
                        {
                            id: "wh",
                            name: "Madi",
                            role: "Warehouse Assistant",
                            contact: "011-6380 5329",
                            dept: "procurement"
                        }
                    ]
                },
                {
                    id: "hr",
                    name: "Elise",
                    role: "HR Head",
                    contact: "016-658 9519",
                    dept: "hr"
                }
            ]
        }
    ]
};
