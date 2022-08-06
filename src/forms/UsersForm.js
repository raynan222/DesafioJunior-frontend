const usersForm = [
    {
        type: "group",
        label: "app.pages.users.group",
        size: 9,
        fields: [
            [
                {represent: "text", name: "nome", label: "app.pages.users.name", size: 6, required: true},
            ],
            [
                {represent: "text", name: "username", label: "app.pages.users.username", size: 5, required: true},
                {represent: "password", name: "password", label: "app.pages.users.password", size: 5, required: true},
            ],
            [
                {represent: "text", name: "email", label: "app.pages.users.email", size: 6, required: true},
            ],
        ]
    },
    {
        type: "buttons"
    }
];

export default usersForm;