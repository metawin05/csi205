const users = [
    {
        user: 'user',
        pass: 'pass',
        role: 'admin',
        token: 'user',
    },
    {
        user: 'user2',
        pass: 'pass2',
        role: 'admin',
        token: 'user2',
    },
]

export function verifyUser(user, pass) {
    const userFound = users.find((u) => {
        return u.user === user && u.pass === pass
    })

    return userFound ? {
        role: userFound.role,
        token: userFound.token
    } : null
}