export interface UtenteBack {
    model: "struttura.userprofile",
    pk: number,
    fields: {
        last_login: string,
        is_superuser: boolean,
        first_name: string,
        last_name: string,
        email: string,
        is_staff: boolean,
        is_active: boolean,
        date_joined: string,
        username: string,
        password: string,
        groups: string[],
        user_permissions: string[]
    }
}