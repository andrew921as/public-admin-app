import {SignOut, SignIn} from '@/firebase/config';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
	getAuth: jest.fn(() => ({
		signOut: jest.fn().mockResolvedValue(undefined),
		currentUser: {getIdToken: jest.fn().mockResolvedValue('mock-token')},
	})),
	signInWithEmailAndPassword: jest.fn().mockImplementation((auth, email, password) => {
		if (email === 'valid@example.com' && password === 'validPassword') {
			return Promise.resolve({
				user: {
					getIdToken: jest.fn().mockResolvedValue('mock-firebase-token'),
				},
			});
		} else {
			const error = new Error('Invalid credentials');
			(error as any).code = 'auth/user-not-found';
			return Promise.reject(error);
		}
	}),
	initializeApp: jest.fn(),
}));

// Mock fetch for backend calls
global.fetch = jest.fn();

describe('Firebase Config', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(global.fetch as jest.Mock).mockClear();
		process.env.NEXT_PUBLIC_BACKEND_URL = 'https://test-api.example.com';
	});

	// describe('SignOut', () => {
	// 	it('should sign out the user and delete cookies', async () => {
	// 		await SignOut();

	// 		expect(getAuth().signOut).toHaveBeenCalled();
	// 		expect(getAuth().signOut).toHaveBeenCalled();

	// 		// Check if cookies were deleted
	// 		expect(deleteCookie).toHaveBeenCalledWith('authToken');
	// 		expect(deleteCookie).toHaveBeenCalledWith('userRole');
	// 	});

	// 	it('should throw an error if signOut fails', async () => {
	// 		const signOutError = new Error('Sign out failed');
	// 		(getAuth().signOut as jest.Mock).mockRejectedValueOnce(signOutError);

	// 		await expect(SignOut()).rejects.toThrow('Sign out failed');
	// 	});
	// });

	describe('SignIn', () => {
		it('should sign in with valid credentials', async () => {
			// Mock successful API response
			(global.fetch as jest.Mock).mockResolvedValueOnce({
				ok: true,
				json: jest.fn().mockResolvedValueOnce({
					role: 'admins',
					message: 'Login successful',
				}),
			});

			const result = await SignIn('valid@example.com', 'validPassword');

			// Should call Firebase signIn
			// Using the imported signInWithEmailAndPassword from firebase/auth
			expect(signInWithEmailAndPassword).toHaveBeenCalled();
			// Should make API call to backend
			expect(global.fetch).toHaveBeenCalledWith(
				'https://test-api.example.com/login',
				({
          body: JSON.stringify({token: 'mock-firebase-token'}),
					method: 'POST',
					headers: expect.objectContaining({
            'Content-Type': "application/json",
						'x-app-identifier': 'admins',
					}),
				})
			);
		});

		// it('should handle backend API errors', async () => {
		// 	// Mock failed API response
		// 	(global.fetch as jest.Mock).mockResolvedValueOnce({
		// 		ok: false,
		// 		json: jest.fn().mockResolvedValueOnce({
		// 			message: 'Invalid user',
		// 		}),
		// 	});

		// 	await expect(SignIn('valid@example.com', 'validPassword')).rejects.toThrow('Invalid user');

		// 	// Should call SignOut when backend returns error
		// 	expect(getAuth().signOut).toHaveBeenCalled();
		// });

		it('should handle Firebase auth errors', async () => {
			await expect(SignIn('invalid@example.com', 'wrongPassword')).rejects.toThrow('Usuario o contraseña incorrecta.');
		});
	});
});
