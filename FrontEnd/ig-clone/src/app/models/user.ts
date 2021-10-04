export class User {
    id: number;
    last_login?: any;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff!: boolean;
    is_active: boolean;
    date_joined!: string;
    groups!: any[];
    user_permissions!: any[];
    password! : string

    constructor(){
        this.username = '';
        this.email = '';
        this.first_name = '';
        this.last_name = '';
        this.password = '';
        this.id = 0;
        this.is_active = false;
        this.is_superuser = false;
    }
    
}