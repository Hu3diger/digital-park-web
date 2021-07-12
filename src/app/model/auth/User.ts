import { UserType } from 'src/app/enums/UserType.enum';

export class User {
	id: Number;
	username: string;
	email: string;
	userType: UserType;
	password: string;
	token: string;
}
