export type userType = {
    firstName: String,
    lastName: String,
    currency: String,
    address: String,
    city: String,
    country: String,
    email: String,
    password: String,
    permissionLevel: Number, 
    dateDeleted: Date,
    businessName: string
}

export interface MailInterface {
    from?: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html: string;
}