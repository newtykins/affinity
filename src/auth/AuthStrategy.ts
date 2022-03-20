import { AxiosInstance } from 'axios';

interface AuthStrategy {
	token: string;
	rest: AxiosInstance;
	authenticated: boolean;

	checkAuthentication(): Promise<boolean>;
}

interface AuthResponse {
	token: string;
	expires: number;
}

export { AuthResponse };

export default AuthStrategy;
