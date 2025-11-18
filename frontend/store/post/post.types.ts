import type {User} from '../auth/auth.types'

export interface Post {
    _id: string;
    userId: User;
    content: string;
    imageUrl: string[];
    imageId: string[];
    likes: User[];        
    createdAt: string;
    updatedAt: string;
}

