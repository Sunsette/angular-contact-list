export interface Contact {
    contactId?: string;
    firstName?: string;
    familyName?: string;
    street?: string;
    city?: string,
    msisdn?: string;
    updated?: string;
    email?: string;
    zip?: string;
}

export interface GetContactResponse {
    limit: number;
    offset: number;
    total: number;
    rows: Contact[]
}