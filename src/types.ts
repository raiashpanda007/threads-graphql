export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string
    profilePicture?: string
}