const Menu = {
    "1": [ // Admin
            { type: "link", title: "app.pages.home.side", url: "/", icon: "home" },
            { type: "group",
                "links": [
                    { type: "label", title: "app.pages.home.subtitle"},
                    { type: "link", title: "app.pages.users.title", url: "/user/all", icon: "users" },
                    { type: "link", title: "app.pages.users.edit", url: "/user/view", icon: "user" },
                ]
            },
        ],
    "2": [ // Default
        { type: "link", title: "app.pages.home.side", url: "/", icon: "home" },
        { type: "group",
            "links": [
                { type: "label", title: "app.pages.home.subtitle"},
                { type: "link", title: "app.pages.users.edit", url: "/user/view", icon: "user" },
            ]
        },
    ]
}


export default Menu;