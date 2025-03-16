export interface CreateUserPayload {
    firstName: string
    lastName?: string
    email: string
    password: string
    profileImageURL?: string

}

export interface GenerateTokenPayload {
    email: string
    password: string
}